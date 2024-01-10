import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Dropdown from 'react-bootstrap/Dropdown';
import { faArrowRight, faBell, faCoffee, faFilter } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function SearchSidebar() {
  const [phong, setPhong] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedMax, setSelectedMax] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/phong')
      .then(res => {
        setPhong(res.data.phong);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching room data:', err);
        setError('Error fetching room data');
        setLoading(false);
      });
  }, []);

  const roomOptions = phong.map((room) => ({
    value: room.tenphong,
    label: room.tenphong,
    max: room.max,
    price: room.giatien,
  }));

  const maxOptions = phong
    .filter((room) => selectedRoom && room.tenphong === selectedRoom.value)
    .map((room) => ({
      value: room.max,
      label: room.max.toString(),
    }));

  const priceOptions = phong
    .filter(
      (room) =>
        selectedRoom &&
        selectedMax &&
        room.tenphong === selectedRoom.value &&
        room.max === selectedMax.value
    )
    .map((room) => ({
      value: room.giatien,
      label: room.giatien.toString(),
    }));

  const handleRoomChange = (selected) => {
    setSelectedRoom(selected);
    setSelectedMax(null);
    setSelectedPrice(null);
  };

  const handleMaxChange = (selected) => {
    setSelectedMax(selected);
    setSelectedPrice(null);
  };

  const handlePriceChange = (selected) => {
    setSelectedPrice(selected);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Your logic to handle form submission (e.g., sending data to the server)
    // You can access selectedRoom, selectedMax, selectedPrice, startDate, endDate here
    // Example:
    console.log("Room:", selectedRoom);
    console.log("Max:", selectedMax);
    console.log("Price:", selectedPrice);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic" style={{backgroundColor:"#8d703b"}}>
Lọc
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item > <form onSubmit={handleFormSubmit}>
      <div className=" lg:w-full lg:p-4  ">
        
        <div>
            <h3 className="lg:font-bold">Select Room Type: </h3>
        </div>
        <div style={{ marginTop: "20px" }}>
          <input className="w-full"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            required
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <input className="w-full "
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            required
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          {/* ComboBox chọn phòng */}
          <Select
            options={roomOptions}
            value={selectedRoom}
            onChange={handleRoomChange}
            placeholder="Chọn một phòng..."
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          {/* ComboBox chọn số lượng người tối đa */}
          <Select
            options={maxOptions}
            value={selectedMax}
            onChange={handleMaxChange}
            placeholder="Chọn số lượng người tối đa..."
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          {/* ComboBox chọn giá tiền */}
          <Select
            options={priceOptions}
            value={selectedPrice}
            onChange={handlePriceChange}
            placeholder="Chọn giá tiền..."
          />
        </div>

        <div className="form-group" style={{ marginTop: "20px" }}>
        <button
            type="submit"
            className="btn"
            style={{
                padding: "14px 14px",
                fontSize: "18px",
                width:"100%",
                backgroundColor: "#8d703b", // Mã màu hex hoặc tên màu
                color: "#ffffff", // Tùy chọn: Đặt màu văn bản để đảm bảo độ tương phản
            }}
            >
                Search
        </button>


        </div>
      </div>

      
    </form></Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>
   
  );
}

export default SearchSidebar;
