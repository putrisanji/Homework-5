import { Typography, Spin, Space, Alert } from "antd"
import "./Home.css"
import NavbarComponent from "../../components/navbar/NavbarComponent"
import { useAuthorizedContext } from "../../AuthorizedContext"
import useGetTransaction from "../../Query/useGetTransaction"
import CardComponent from "../Card/CardComponent"

const { Title, Text } = Typography

function HomeCustomer() {
 
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
          <Title>Transaksi Saat Ini:</Title>
        </div>
        <div className="resume">
          <Space direction="vertical">
            {isLoading ? (
              <Spin tip="Loading..."></Spin>
            ) : isError ? (
              <Alert message="Gagal Memuat Data" type="error" />
            ) : (
              data.map((transaction) => (
                <CardComponent
                  key={transaction.id}
                  transaction={transaction}
                  refetchTransactions={refetchTransactions}
                />
              ))
            )}
          </Space>
        </div>
      </div>
    </div>
  )
}

export default HomeCustomer
