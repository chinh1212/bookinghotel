import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Hoadon() {
  const { id } = useParams(); // Access 'id' from the URL
  const [hoadon, setHoaDon] = useState([]);
  const [phong, setPhong] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    // Lấy dữ liệu cho hóa đơn
    axios.get("http://127.0.0.1:5000/hoadon")
      .then(res => {
        setHoaDon(res.data.Hoadon);
      })
      .catch(err => {
        console.error("Lỗi khi lấy dữ liệu hóa đơn:", err);
        setError("Lỗi khi lấy dữ liệu hóa đơn");
      })
      .finally(() => {
        setLoading(false);
      });

    // Lấy dữ liệu cho phòng
    axios.get(`http://127.0.0.1:5000/phong/${id}`)
      .then(res => {
        setPhong(res.data.phong);
      })
      .catch(err => {
        console.error("Lỗi khi lấy dữ liệu phòng:", err);
        setError("Lỗi khi lấy dữ liệu phòng");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    // Tính toán tổng giá khi startDate hoặc endDate thay đổi
    if (startDate && endDate) {
      const daysDifference = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      const roomPrice = phong.length > 0 ? phong[0].giatien : 0; // Giả sử phong là một mảng chứa thông tin phòng
      const totalPrice = daysDifference * roomPrice;
      setTotalPrice(totalPrice);
    }
  }, [startDate, endDate, phong]);

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (phong.length > 0) {
    return (
      <>
        <div style={{ display: "flex" }}>
          <div className="row" style={{ display: "flex" }}>
            <div>
              <Card border="primary">
                <Card.Img variant="top" src={phong.anh} height="200px" />
                <Card.Body>
                  <div className="space-y-1 mb-2">
                    <h4 className="font-serif text-xl ">{phong.tenphong}</h4>

                    <h5>${phong.giatien}
                      <span style={{ marginLeft: "10px" }}>mỗi đêm</span></h5>

                    <p>Max: {phong.max} Người</p>
                    <p>Size: {phong.size}</p>
                    <p>View: {phong.view}</p>
                    <p>Bed: {phong.bed}</p>
                  </div>
                  <hr></hr>

                  <div className="grid grid-cols-2 ">
                    <div>
                      <label>Ngày đặt:</label>
                      <DatePicker className="border-2 border-solid border-black mt-2"
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>

                    <div>
                      <label>Ngày trả:</label>
                      <DatePicker className="border-2 border-solid border-black mt-2"
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                  </div>

                  <div>
                    {startDate && endDate && (
                      <span>Giá:{totalPrice || '0'}</span>
                    )}

                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    // Xử lý trường hợp khi phong là mảng trống hoặc undefined
    return <p>Không có dữ liệu cho phòng.</p>;
  }
}


export default Hoadon;
