import React, { useCallback } from "react"
import { Button, Card } from "antd"
import moment from "moment"
import useDeleteTransaction from "../../Mutations/useDeleteTransaction"
import Swal from "sweetalert2"
import "./CardAgent.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCheck,
  faClipboardCheck,
  faEye,
  faTimesCircle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons"

import useUpdateTransactionsAccepted from "../../Mutations/useUpdateTansactionsAccepted"
import useUpdateTransactionsDelete from "../../Mutations/useUpdateTransactionDelete"
import useUpdateTransactionsFinished from "../../Mutations/useUpdateTransactionsFinished"

const CardAgent = (props) => {
  const { mutate: deleteTransaction } = useDeleteTransaction(
    props.transaction.id,
    props.refetchTransactions
  )
  const handleCancelTransaction = useCallback(() => {
    // console.log("id transaction >> ", props.transaction.id);
    deleteTransaction()
  }, [deleteTransaction])

  const { mutate: updateTransactionStatusAccepted } = useUpdateTransactionsAccepted(
    props.transaction.id,
    props.refetchTransactions
  )

  const { mutate: updateTransactionStatusDalate } = useUpdateTransactionsDelete(
    props.transaction.id,
    props.refetchTransactions
  )
  const { mutate: updateTransactionStatusFinished } = useUpdateTransactionsFinished(
    props.transaction.id,
    props.refetchTransactions
  )

  const handleAcceptTransactions = () => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Anda yakin ingin menerima request?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Ya",
      confirmButtonColor: "#292961",
      cancelButtonColor: "#292961",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "transaksi diterima",
          showConfirmButton: false,
          timer: 1500,
        })
      }
    })
  }
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
          <b>Alamat Customer</b>
          {props.transaction.alamat_lengkap}
        </li>
        <li>
          <b>Status</b>{" "}
          {props.transaction.status === 0
            ? "Menunggu konfirmasi agent"
            : props.transaction.status === 1
            ? "Agen dalam perjalanan"
            : props.transaction.status === 2
            ? "Transaksi Dibatalkan"
            : props.transaction.status === 3
            ? "Selesai"
            : "Error"}
        </li>
      </ul>

      <div className="float-right">
        {props.transaction.status === 0 ? (
          <>
            <Button
              type="primary"
              style={{
                margin: "0px",
                paddingRight: "15px",
                backgroundColor: "green",
                fontWeight: "bold",
                borderRadius: "10px",
                marginRight: "80px",
                marginLeft: "50px",
              }}
              onClick={updateTransactionStatusAccepted}
            >
              <FontAwesomeIcon icon={faCheck} style={{ marginRight: "5px" }} />{" "}
              Terima
            </Button>

            <Button
              style={{
                backgroundColor: "black",
                color: "white",
                fontWeight: "bold",
                borderRadius: "10px",
                paddingRight: "15px",
                margin: "0px",
                marginLeft: "50px",
              }}
              onClick={updateTransactionStatusDalate}
            >
              <FontAwesomeIcon icon={faTimesCircle} style={{ marginRight: "5px" }} />{" "}
              Tolak
            </Button>
          </>
        ) : props.transaction.status === 1 ? (
          <>
            <Button
              style={{
                backgroundColor: "black",
                color: "white",
                fontWeight: "bold",
                borderRadius: "10px",
                paddingRight: "15px",
                margin: "0px",
                marginLeft: "50px",
              }}
              onClick={updateTransactionStatusDalate}
            >
              <FontAwesomeIcon icon={faTimesCircle} style={{ marginRight: "5px" }} />{" "}
              Batakan
            </Button>

            <Button
              className="btn btn-primary"
              onClick={updateTransactionStatusFinished}
            >
              {" "}
              <FontAwesomeIcon
                icon={faClipboardCheck}
                style={{ marginRight: "8px" }}
              />
              Transaksi Selesai{" "}
            </Button>
          </>
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
            <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: "5px" }} />{" "}
            Hapus
          </Button>
        ) : props.transaction.status === 3 ? (
          <Button
            style={{
              backgroundColor: "blue",
              color: "white",
              fontWeight: "bold",
              borderRadius: "10px",
              paddingRight: "15px",
              margin: "0px",
              marginLeft: "50px",
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faEye} style={{ marginRight: "5px" }} /> Lihat
            Rating
          </Button>
        ) : (
          "Transasi Error"
        )}
      </div>
    </Card>
  )
}

export default CardAgent
