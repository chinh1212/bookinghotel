import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

function SearchHome() {
    const [phong, setPhong] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedMax, setSelectedMax] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/phong")
            .then(res => {
                // Check if the received data has a "phong" property and it's an array
                if (res.data && Array.isArray(res.data.phong)) {
                    setPhong(res.data.phong);
                } else {
                    console.error("Invalid data format. Expected an object with a 'phong' property that is an array.");
                    setError("Invalid data format. Expected an object with a 'phong' property that is an array.");
                }
            })
            .catch(err => {
                console.error("Error fetching room data:", err);
                setError("Error fetching room data");
            })
            .finally(() => {
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
        <form onSubmit={handleFormSubmit}  >
            <div style={{   display:"flex",justifyContent:"center",alignItems:"center" }} className="lg:space-x-4 md:space-x-1 lg:w-[926px]">

                <div >
                    <input className="lg:w-full p-2 rounded-md"
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        required
                    />
                </div>
                <div >
                    <input className="w-full  p-2 rounded-md"
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        required
                    />
                </div>
                <div  >
                    {/* ComboBox chọn phòng */}
                    <Select 
                        options={roomOptions}
                        value={selectedRoom}
                        onChange={handleRoomChange}
                        placeholder="Chọn một phòng..."
                    />
                </div>

                <div >
                    {/* ComboBox chọn số lượng người tối đa */}
                    <Select 
                        options={maxOptions}
                        value={selectedMax}
                        onChange={handleMaxChange}
                        placeholder="Chọn số lượng người tối đa..."
                    />
                </div>



                <div className="form-group" >
                    <button
                        type="submit"
                        className="btn"
                        style={{
                            padding: "10px 10px",
                            fontSize: "13px",
                            
                            fontWeight:"bold",
                            backgroundColor: "#8d703b", // Mã màu hex hoặc tên màu
                            color: "#ffffff", // Tùy chọn: Đặt màu văn bản để đảm bảo độ tương phản
                        }}
                    >
                        Check
                    </button>


                </div>
            </div>


        </form>
    );
}

export default SearchHome;
