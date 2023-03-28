import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import productsReducer, { productsFetch } from "./features/productsSlice";
import { productsApi } from "./features/productsApi";
import cartReducer, { getTotals } from "./features/cartSlice";
import authReducer, { loadUser } from "./features/authSlice";
import ordersReducer from "./features/ordersSlice";
import usersReducer from "./features/usersSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
    orders: ordersReducer,
    cart: cartReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(productsFetch());
store.dispatch(getTotals());
store.dispatch(loadUser(null));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
