import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const Modal = ({ onClose, onSubmit, isUpdate, initialData }) => {
    const [roomData, setRoomData] = useState({
      tenphong: '',
      tinhtrang: '',
      max: '',
      size: '',
      bed: '',
      gia: '',
      moTa: '',
      anh: '', // Thêm trường anh để lưu đường dẫn hình ảnh
    });
  
    // Hàm để đặt dữ liệu ban đầu
    const setInitialData = () => {
      if (isUpdate && initialData) {
        setRoomData(initialData);
      }
    };
  
    // Sử dụng hàm này trong useEffect
    useEffect(() => {
      setInitialData();
    }, [isUpdate, initialData]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setRoomData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = () => {
      console.log("Submitting roomData:", roomData);
  
      const data = {
        anh: roomData.anh,
        tenphong: roomData.tenphong,
        tinhtrang: roomData.tinhtrang,
        max: parseInt(roomData.max),
        size: parseInt(roomData.size),
        bed: roomData.bed,
        gia: parseInt(roomData.gia),
        moTa: roomData.moTa,
      };
  
      axios
        .post("http://127.0.0.1:5000/phong", JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(() => {
          onSubmit();
          onClose();
        })
        .catch((error) => {
          console.error("Error adding room:", error);
          // Ghi lại thông tin lỗi chi tiết từ máy chủ
          if (error.response) {
            console.error("Server error details:", error.response.data);
          }
        });
    };
  return (
    <div className="modal-overlay">
      <div className="bg-white grid grid-cols-2 p-4 gap-3">
        {/* Thay đổi thành trường nhập văn bản */}
        <Form.Control
          type="text"
          placeholder="ảnh"
          name="anh"
          value={roomData.anh}
          onChange={handleChange}
        />
        <Form.Control
          type="text"
          placeholder="Tên phòng"
          name="tenPhong"
          value={roomData.tenPhong}
          onChange={handleChange}
        />
        <Form.Control
          type="text"
          placeholder="Tình trạng"
          name="tinhTrang"
          value={roomData.tinhTrang}
          onChange={handleChange}
        />
        <Form.Control
          type="text"
          placeholder="Tối đa"
          name="toiDa"
          value={roomData.toiDa}
          onChange={handleChange}
        />
        <Form.Control
          type="text"
          placeholder="Kích thước"
          name="kichThuoc"
          value={roomData.kichThuoc}
          onChange={handleChange}
        />
        <Form.Control
          type="text"
          placeholder="Giường"
          name="giuong"
          value={roomData.giuong}
          onChange={handleChange}
        />
        <Form.Control
          type="text"
          placeholder="Giá"
          name="gia"
          value={roomData.gia}
          onChange={handleChange}
        />
        <Form.Control
          type="text"
          placeholder="Mô tả"
          name="moTa"
          value={roomData.moTa}
          onChange={handleChange}
        />

        <button onClick={handleSubmit} className="bg-amber-600 rounded-2xl text-white">
          {isUpdate ? 'Update' : 'Thêm'}
        </button>
        <button onClick={onClose} className="bg-amber-600 rounded-2xl text-white">
          Đóng
        </button>
      </div>
    </div>
  );
}

export default Modal;
