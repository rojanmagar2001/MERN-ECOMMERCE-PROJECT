import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setHeaders, url } from "./api";

const initialState = {
  list: [],
  status: null,
  deleteStatus: null,
};

export const usersFetch = createAsyncThunk("users/usersFetch", async () => {
  try {
    const response = await axios.get(`${url}/users`, setHeaders());

    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const usersDelete = createAsyncThunk("users/usersDelete", async (id) => {
  try {
    const response = await axios.delete(`${url}/users/${id}`, setHeaders());

    return response.data;
  } catch (err) {
    console.log(err.response.data);
    toast.error(err.response.data, {
      position: "bottom-left",
    });
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(usersFetch.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(usersFetch.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "success";
      })
      .addCase(usersFetch.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(usersDelete.pending, (state, action) => {
        state.deleteStatus = "pending";
      })
      .addCase(usersDelete.fulfilled, (state, action) => {
        const newList = state.list.filter(
          (user) => user._id !== action.payload._id
        );
        state.list = newList;
        state.deleteStatus = "success";
        toast.success("User Deleted", {
          position: "bottom-left",
        });
      })
      .addCase(usersDelete.rejected, (state, action) => {
        state.deleteStatus = "rejected";
      });
  },
});

export default usersSlice.reducer;
