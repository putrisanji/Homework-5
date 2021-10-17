import { Form, Input,  Button, Rate, Typography } from 'antd';
import React, { useState } from "react"
import "./Rate.css"
import {useHistory} from "react-router-dom";

const desc = ["terrible", "bad", "normal", "good", "wonderful"]

const { Title, Text } = Typography

function RateComponent() {
  const [currentValue, setCurrentValue] = useState(0)
   const history = useHistory()

  const handleChange = (value) => {
    setCurrentValue(value)
  }

  const handleBack = () => {
    history.push("/home")     
  }

  return (
    <div className="outer-rate">
      <div className="inner-rate">
        {/* <h4> Terima Kasih! </h4> */}
        <Text style={{textAlign:"center", color:"#292961", fontWeight:"bold", fontSize:"24px", marginBottom:"30px"}}>
             Transaksi Anda Telah Selesai</Text> <br /> <br />
        <Text style={{marginTop:"20px", fontSize:"20px"}}> Beri Rating Untuk Agent Kami ?</Text>
        <hr />
        <span>
          <Rate onChange={handleChange} value={currentValue} /> <br /> <br />
          Current Rating: {currentValue}
          {currentValue ? (
            <span className="ant-rate-text">{desc[currentValue - 1]}</span>
          ) : (
            ""
          )}
        </span>{" "}
        <br /> <br />
        <Form.Item  name="rating">
          <Input.TextArea  placeholder="Ketik Ulasanmu disini!"/>
        </Form.Item>
        <Button  style={{ backgroundColor: "#292961 " , borderRadius:"10px", color:"white"}}
       onClick = {handleBack}
       >
          {" "}
          KEMBALI KE HALAMAN UTAMA
        </Button>
      </div>
    </div>
  )
}

export default RateComponent
