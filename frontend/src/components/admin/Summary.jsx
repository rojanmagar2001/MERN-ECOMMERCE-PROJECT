import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaUsers, FaChartBar, FaClipboard } from "react-icons/fa";
import Widget from "./summary-components/Widget";
import axios from "axios";
import { setHeaders, url } from "../../features/api";
import Chart from "./summary-components/Chart";
import Transactions from "./summary-components/Transactions";
import AllTimeData from "./summary-components/AllTimeData";

const Summary = () => {
  const [users, setUsers] = useState();
  const [usersPerc, setUsersPerc] = useState();
  const [orders, setOrders] = useState();
  const [ordersPerc, setOrdersPerc] = useState();
  const [income, setIncome] = useState();
  const [incomePerc, setIncomePerc] = useState();

  function compare(a, b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/users/stats`, setHeaders());

        if (res.data.length > 1) {
          res.data.sort(compare);
          setUsers(res.data[0]);
          setUsersPerc(
            ((res.data[0].total - res.data[1].total) * 100) / res.data[1].total
          );
        } else {
          setUsers(res.data[0]);
          setUsersPerc(res.data[0].total * 100);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/orders/stats`, setHeaders());

        if (res.data.length > 1) {
          res.data.sort(compare);
          setOrders(res.data[0]);
          setOrdersPerc(
            ((res.data[0].total - res.data[1].total) * 100) / res.data[1].total
          );
        } else {
          setOrders(res.data[0]);
          setOrdersPerc(res.data[0].total * 100);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/orders/income/stats`, setHeaders());

        if (res.data.length > 1) {
          res.data.sort(compare);
          setIncome(res.data[0]);
          setIncomePerc(
            ((res.data[0].total - res.data[1].total) * 100) / res.data[1].total
          );
        } else {
          setIncome(res.data[0]);
          setIncomePerc(res.data[0].total * 100);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  const data = [
    {
      icon: <FaUsers />,
      digits: users?.total,
      isMoney: false,
      title: "Users",
      color: "rgb(102,108, 255)",
      bgColor: "rgba(102,108, 255, 0.12)",
      percentage: usersPerc,
    },
    {
      icon: <FaClipboard />,
      digits: orders?.total,
      isMoney: false,
      title: "Orders",
      color: "rgb(38,198, 249)",
      bgColor: "rgba(38,198, 249, 0.12)",
      percentage: ordersPerc,
    },
    {
      icon: <FaChartBar />,
      digits: income?.total,
      isMoney: true,
      title: "Earnings",
      color: "rgb(253,181, 40)",
      bgColor: "rgba(253,181, 40, 0.12)",
      percentage: incomePerc,
    },
  ];

  return (
    <StyledSummary>
      <MainStats>
        <Overview>
          <Title>
            <h2>Overview</h2>
            <p>How your Shop is performing compared to the previous month.</p>
          </Title>
          <WidgetWrapper>
            {data?.map((data, index) => (
              <Widget key={index} data={data} />
            ))}
          </WidgetWrapper>
        </Overview>
        <Chart />
      </MainStats>
      <SideStats>
        <Transactions />
        <AllTimeData />
      </SideStats>
    </StyledSummary>
  );
};

export default Summary;

const StyledSummary = styled.div`
  width: 100%;
  display: flex;
`;

const MainStats = styled.div`
  flex: 2;
  width: 100%;
`;

const Title = styled.div`
  p {
    font-size: 14px;
    color: rgba(234, 234, 255, 0.68);
  }
`;

const Overview = styled.div`
  background: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  width: 100%;
  padding: 1.5rem;
  height: 170px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WidgetWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SideStats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width: 100%;
`;
