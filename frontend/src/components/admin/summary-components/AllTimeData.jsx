import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ordersFetch } from "../../../features/ordersSlice";
import { usersFetch } from "../../../features/usersSlice";

const AllTimeData = () => {
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.products);
  const users = useSelector((state) => state.users);
  const orders = useSelector((state) => state.orders);

  const [earnings, setEarnings] = useState();

  useEffect(() => {
    dispatch(ordersFetch());
    dispatch(usersFetch());
  }, [dispatch]);

  useEffect(() => {
    function getTotalEarnings() {
      var total = 0;
      orders.list?.map((order) => (total += order.total));
      setEarnings(total);
    }

    getTotalEarnings();
  }, [orders?.list]);

  return (
    <Main>
      <h3>All Time</h3>
      <Info>
        <Title>Users</Title>
        <Data>{users.list?.length}</Data>
      </Info>
      <Info>
        <Title>Products</Title>
        <Data>{items.length}</Data>
      </Info>
      <Info>
        <Title>Orders</Title>
        <Data>{orders.list?.length}</Data>
      </Info>
      <Info>
        <Title>Earnings</Title>
        <Data>${earnings?.toLocaleString()}</Data>
      </Info>
    </Main>
  );
};

export default AllTimeData;

const Main = styled.div`
  background: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  margin-top: 1.5rem;
  border-radius: 5px;
  padding: 1rem;
  font-size: 14px;
`;

const Info = styled.div`
  display: flex;
  margin-top: 1rem;
  padding: 0.3rem;
  border-radius: 3px;
  background: rgba(38, 198, 249, 0.12);
  &:nth-child()even {
    background: rgba(102, 108, 255, 0.12);
  }
`;
const Title = styled.div`
  flex: 1;
`;

const Data = styled.div`
  flex: 1;
  font-weight: 700;
`;
