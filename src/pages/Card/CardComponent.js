import React, { useCallback } from "react"
import { Button, Card } from "antd"
import moment from "moment"
import { useHistory } from "react-router-dom"
import { faBan, faSmile, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Swal from "sweetalert2"

import useDeleteTransaction from "../../Mutations/useDeleteTransaction"
// import useUpdateTransactionsAccepted from "../../Mutations/useUpdateTansactionsAccepted"
import useUpdateTransactionsDelete from "../../Mutations/useUpdateTransactionDelete"

const CardComponent = (props) => {
  const history = useHistory()

  const { mutate: deleteTransaction } = useDeleteTransaction(
    props.transaction.id,
    props.refetchTransactions
  )
  const { mutate: updateTransactionStatusDalate } = useUpdateTransactionsDelete(
    props.transaction.id,
    props.refetchTransactions
  )

  const handleStatusCancelTransaction = useCallback(() => {
    console.log("id transaction >> ", props.transaction.status);
    updateTransactionStatusDalate()
  }, [updateTransactionStatusDalate])


  const handleRate = useCallback(() => {
    history.push("/rate")
  }, [])

  const handleCancelTransaction = useCallback(() => {
    console.log("id transaction >> ", props.transaction.id);
    deleteTransaction()
  }, [deleteTransaction])

  const handleDelete = () => {
    Swal.fire({
      title: "Anda yakin ingin menghapus transaksi ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus !",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Berhasil", "Transaksi telah dihapus.", "success")
      }
    })
  }

  return (
    <Card
      style={{
        width: 450,
        border: "2px solid black",
        marginBottom: "20px",
      }}
    >
      <ul className="alignMe">
        <li>
          <b>Waktu Request</b>{" "}
          {moment(new Date(props.transaction.created_date)).format(
            "DD MMMM YYYY, hh:mm A"
          )}
        </li>
        <li>
          <b>Jenis Transaksi</b> {props.transaction.jenis_transaksi}
        </li>
        <li>
          <b>Nominal Transaksi</b>Rp. {props.transaction.nominal_transaksi}
        </li>
        <li>
          <b>Alamat Anda</b>
          {props.transaction.alamat_lengkap}
        </li>
        <li>
          <b>Agen BRILink</b>
        </li>
        <li>
          <b>Alamat Agen</b>
        </li>
        <li>
          <b>Status</b>{" "}
          {props.transaction.status === 0
            ? "Menunggu konfirmasi agent"
            : props.transaction.status === 1
            ? "Agen dalam perjalanan"
            : props.transaction.status === 2
            ? "Dibatalkan Customer"
            : props.transaction.status === 3
            ? "Selesai"
            : "Error"}
        </li>
      </ul>

      <div className="float-right">
        {props.transaction.status === 0 || props.transaction.status === 1 ? (
          <Button
            type="primary"
            style={{
              margin: "0px",
              paddingRight: "15px",
              backgroundColor: "brown",
              fontWeight: "bold",
              borderRadius: "10px",
              marginLeft: "50px",
            }}
            onClick={updateTransactionStatusDalate}
          >
            <FontAwesomeIcon icon={faBan} style={{ marginRight: "5px" }} />
            Batalkan
          </Button>
        ) : props.transaction.status === 2 ? (
          <Button
            style={{
              backgroundColor: "red",
              color: "white",
              fontWeight: "bold",
              borderRadius: "10px",
              paddingRight: "15px",
              margin: "0px",
              marginLeft: "50px",
            }}
            onClick={handleDelete}
          >
            {" "}
            <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: "5px" }} />{" "}
            Hapus{" "}
          </Button>
        ) : props.transaction.status === 3 ? (
          <Button
            style={{
              margin: "0px",
              color: "white",
              paddingRight: "15px",
              backgroundColor: "blue",
              fontWeight: "bold",
              borderRadius: "10px",
              marginLeft: "50px",
            }}
            onClick={handleRate}
          >
            <FontAwesomeIcon icon={faSmile} style={{ marginRight: "5px" }} />
            Beri Rating{" "}
          </Button>
        ): 'Error Transaksi'}
      </div>
    </Card>
  )
}

export default CardComponent
