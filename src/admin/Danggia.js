import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardImg } from 'react-bootstrap';
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";

function RoomSinger() {
  const [phong, setPhong] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [danhgia, setDanhgia] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    

    axios.get(`http://127.0.0.1:5000/danhgia`)
      .then(res => {
        console.log(res.data);
        if (Array.isArray(res.data.danhgia)) {
          setDanhgia(res.data.danhgia);
        } else {
          console.error("Dữ liệu từ API không phải là mảng.");
        }
      })
      .catch(err => {
        console.error("Lỗi khi lấy dữ liệu đánh giá:", err);
      });
  }, [id]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : phong.length > 0 ? (
        <div>
          <h1 className="lg:text-3xl md:text-xl mb-4 font-serif">{phong[0].tenphong}</h1>
          <MDBCarousel showControls fade>
            {phong.map((item, index) => (
              <MDBCarouselItem key={index} itemId={index + 1}>
                <CardImg src={item.anh} className='d-block w-100' alt='Room' />
              </MDBCarouselItem>
            ))}
          </MDBCarousel>
          <p className="text-base font-medium text-[#808080] my-4">{phong[0].mota}</p>
          <p className="text-base font-medium text-[#808080] mb-2">Tối đa: <span>{phong[0].max}</span></p>
          <p className="text-base font-medium text-[#808080] mb-2">Kích thước: <span>{phong[0].size}</span></p>
          <p className="text-base font-medium text-[#808080] mb-2">Giường: <span>{phong[0].bed}</span></p>
        </div>
      ) : (
        <p>No room data available.</p>
      )}

      {/* Table for reviews */}
      <table>
        <thead>
          <tr >
            <th>Tên khách hàng</th>
            <th>Đánh giá</th>
            <th>Loại phòng đánh giá</th>
          </tr>
        </thead>
        <tbody>
          {danhgia.map((item, index) => (
            <tr key={index}>
              <td>{item.tenkhachhang}</td>
              <td>{item.danhgia}</td>
              <td>{item.loaiphong}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default RoomSinger;
