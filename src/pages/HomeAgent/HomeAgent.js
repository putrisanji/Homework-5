import React from "react"
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Card,
  Typography,
  Spin,
  Space,
  Alert,
} from "antd"

import NavbarComponent from "../../components/navbarAgen/NavbarAgenComp"
import { useAuthorizedContext } from "../../AuthorizedContext"
import useGetTransaction from "../../Query/useGetTransaction"
import "./HomeAgent.sass"
import CardComponent from "../CardAgent/CardAgent"

const { Title} = Typography



function HomeAgent() {
  const { isLoggedIn, userLevel } = useAuthorizedContext()
  console.log("value >> ", isLoggedIn, userLevel)
  const {
    data,
    isError,
    isLoading,
    refetch: refetchTransactions,
  } = useGetTransaction()
  console.log("data >> ", isLoading, data)
  return (
    <div className="outer-home">
      <NavbarComponent />
      <div className="statusTransaksi">
        <div className="title">
          <Title>Request Transaksi Hari Ini:</Title>
        </div>
        <div className="resume">
          <Space direction="vertical">
            {isLoading ? (
              <Spin tip="Loading..."></Spin>
            ) : data ? (
              data.map((transaction) => (
                <CardComponent
                  key={transaction.id}
                  transaction={transaction}
                  refetchTransactions={refetchTransactions}
                />
              ))
            ) : (
              <Alert message="Gagal Memuat Data" type="error" />
            )}
          </Space>
        </div>
      </div>
    </div>
  )
}

export default HomeAgent