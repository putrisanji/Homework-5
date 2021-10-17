import React, {useState, useMemo} from "react"
import {
  Row,
  Col,
  Form,
  Button,
  Select,
  InputNumber,
  Input,
  Spin,
  Table,
  Typography,
  Space,
} from "antd"
import { useHistory } from "react-router-dom"

import DataAgent from "./DataAgent"
import DataAlamat from "./DataAlamat"
import JenisTransaksi from "./DataJenisTransaksi"
import useCreateTransaction from "../../Mutations/useCreateTransaction"
import NavbarComponent from "../../components/navbar/NavbarComponent"
import "./TransaksiPage.css"

const { Option } = Select
const { Text } = Typography

const TransaksiPage = () => {
  const [selectedProvinsi, setSelectedProvinsi] = useState(null)
  const [selectedKabupaten, setSelectedKabupaten] = useState(null)
  const [selectedKecamatan, setSelectedKecamatan] = useState(null)
  const [showTableAgen, setShowTableAgen] = useState(false)
  const history = useHistory()
  const [formState, setFormState] = useState({
    created_date: new Date().toString(),
    jenis_transaksi: "",
    provinsi_customer: " ",
    kabupaten_customer: " ",
    kecamatan_customer: " ",
    alamat_lengkap: " ",
    nominal_transaksi: "",
    status: 0,
  })

  const { mutate, isLoading, isError } = useCreateTransaction(
    formState,
    (result) => {
      console.log("success mutation >> ", result)
      history.replace("/home")
    }
  )

  const currencyParser = (val) => {
    try {
      // for when the input gets clears
      if (typeof val === "string" && !val.length) {
        val = "0.0"
      }

      // detecting and parsing between comma and dot
      var group = new Intl.NumberFormat("id-ID").format(1111).replace(/1/g, "")
      var reversedVal = val.replace(new RegExp("\\" + group, "g"), "")
      //  => 1232.21

      // removing everything except the digits and dot
      reversedVal = reversedVal.replace(/[^0-9.]/g, "")
      //  => 1232.21

      // appending digits properly
      const digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length
      const needsDigitsAppended = digitsAfterDecimalCount > 2

      if (needsDigitsAppended) {
        reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2)
      }

      return Number.isNaN(reversedVal) ? 0 : reversedVal
    } catch (error) {
      console.error(error)
    }
  }

  const handleSelectedProvinsi = (value) => {
    setSelectedProvinsi(value)
  }

  const handleSelectedKabupaten = (value) => {
    setSelectedKabupaten(value)
  }

  const handleSelectedKecamatan = (value) => {
    setSelectedKecamatan(value)
  }

  const handleFormProvinsi = (value) => {
    setFormState({ ...formState, provinsi_customer: value })
  }
  const handleFormKabupaten = (value) => {
    setFormState({ ...formState, kabupaten_customer: value })
  }
  const handleFormKecamatan = (value) => {
    setFormState({ ...formState, kecamatan_customer: value })
  }

  const dataKabupaten = useMemo(() => {
    return (
      DataAlamat?.find((provinsi) => provinsi.name === selectedProvinsi)
        ?.kabupaten || []
    )
  }, [selectedProvinsi])

  const dataKecamatan = useMemo(() => {
    return (
      dataKabupaten?.find((kabupaten) => kabupaten.name === selectedKabupaten)
        ?.kecamatan || []
    )
  }, [selectedKabupaten, dataKabupaten])

  const getTableAgen = () => setShowTableAgen(true)

  const ColumnsAgen = [
    {
      title: "Nama Agen",
      dataIndex: "agent_name",
      key: "agent_name",
    },
    {
      title: "Nomer Whatsapp",
      dataIndex: "no_hp",
      key: "no_hp",
      render: (text) => (
        <Button type="link" href={"https://wa.me/62" + text}>
          {text}
        </Button>
      ),
    },
    {
      title: "Alamat Agen",
      dataIndex: "agent_address",
      key: "agent_address",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text) => (
        <Button type="link" onClick={mutate}>
          {text}
        </Button>
      ),
    },
  ]

  return (
    <div>
      <NavbarComponent />
      <div className="formTransaksi" style={{ width: "100%" }}>
        <div style={{ width: "50%" }}>
          <Row style={{ width: "100%" }}>
            <Col span={24} style={{ paddingTop: "100px" }}>
              <Form style={{ width: "100%" }}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign="left"
                  label="Jenis Transaksi"
                  name="Jenis Transaksi"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Col>
                    <Select
                      placeholder="Pilih Jenis Transaksi"
                      onChange={(value) => {
                        setFormState({ ...formState, jenis_transaksi: value })
                      }}
                    >
                      {JenisTransaksi.map((option) => (
                        <Option
                          key={option.key}
                          value={option.value}
                          disabled={option.isDisabled}
                        >
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign="left"
                  label="Nominal Transaksi"
                  name="Nominal Transaksi"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Col>
                    <InputNumber
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(value)
                      }
                      parser={currencyParser}
                      onChange={(value) => {
                        console.log("value >> ", value)
                        setFormState({
                          ...formState,
                          nominal_transaksi: value,
                        })
                      }}
                    />
                  </Col>
                </Form.Item>

                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign="left"
                  label="Alamat Saat Ini"
                  name="address"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Row justify="space-between" style={{ marginBottom: "10px" }}>
                    <Col span={7}>
                      <Select
                        placeholder="Pilih Provinsi"
                        onChange={(e) => {
                          handleSelectedProvinsi(e)
                          handleFormProvinsi(e)
                        }}
                      >
                        {DataAlamat.map((provinsi, index) => (
                          <Option key={index.toString()} value={provinsi.name}>
                            {provinsi.name}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                    <Col span={7}>
                      <Select
                        placeholder="Pilih Kabupaten"
                        onChange={(e) => {
                          handleSelectedKabupaten(e)
                          handleFormKabupaten(e)
                        }}
                      >
                        {dataKabupaten.map((kabupaten, index) => (
                          <Option key={index.toString()} value={kabupaten.name}>
                            {kabupaten.name}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                    <Col span={7}>
                      <Select
                        placeholder="Pilih Kecamatan"
                        onChange={(e) => {
                          handleSelectedKecamatan(e)
                          handleFormKecamatan(e)
                        }}
                      >
                        {dataKecamatan.map((kecamatan, index) => (
                          <Option key={index.toString()} value={kecamatan}>
                            {kecamatan}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                  </Row>
                  <Row>
                    <Input.TextArea
                      onChange={(event) => {
                        console.log("value >> ", event.target.value)
                        setFormState({
                          ...formState,
                          alamat_lengkap: event.target.value,
                        })
                      }}
                    />
                  </Row>
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Row justify="center">
            <Button
              type="primary"
              className="searching-agent"
              style={{ marginTop: "50px" }}
              onClick={getTableAgen}
            >
              Cari Agen
            </Button>
          </Row>
        </div>

        <div style={{ margin: "50px 0" }}>
          <Row justify="center">
            {isLoading ? (
              <Spin />
            ) : isError ? (
              <Space align="center" direction="vertical" size="large">
                <Text style={{ color: "red" }}> Gagal memilih Agen</Text>
                <Table
                  columns={ColumnsAgen}
                  dataSource={DataAgent}
                  pagination={false}
                />
              </Space>
            ) : (
              showTableAgen && (
                <Table
                  columns={ColumnsAgen}
                  dataSource={DataAgent}
                  pagination={false}
                />
              )
            )}
          </Row>
        </div>
      </div>
    </div>
  )
}

export default TransaksiPage
