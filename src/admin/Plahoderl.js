import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Modal from './Them';
import Modal1 from './Suaphong';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSquarePlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function CardExample() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [phong, setPhong] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModal1Open, setModal1Open] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("http://127.0.0.1:5000/phong")
      .then(res => {
        setPhong(res.data.phong);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching room data:", err);
        setError("Error fetching room data");
        setLoading(false);
      });
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal1 = () => {
    setModal1Open(true);
  };

  const closeModal1 = () => {
    setModal1Open(false);
  };

  const handleAddRoom = (newRoomData) => {
    // Implement the logic to add a new room using the newRoomData
    // Make a POST request to your backend API
    axios.post("http://127.0.0.1:5000/phong", newRoomData)
      .then(() => {
        // Refresh data after adding
        fetchData();
        closeModal();
      })
      .catch(error => {
        console.error("Error adding room:", error);
        // Handle error if needed
      });
  };

  const handleUpdateRoom = (updatedRoomData) => {
    // Implement the logic to update the room using the updatedRoomData
    // Make a PUT request to your backend API
    axios.put(`http://127.0.0.1:5000/phong/${updatedRoomData.id}`, updatedRoomData)
      .then(() => {
        // Refresh data after updating
        fetchData();
        closeModal1();
      })
      .catch(error => {
        console.error("Error updating room:", error);
        // Handle error if needed
      });
  };

  const handleDeleteRoom = (roomId) => {
    // Implement the logic to delete the room with roomId
    // Make a DELETE request to your backend API
    axios.delete(`http://127.0.0.1:5000/phong/${roomId}`)
      .then(() => {
        // Refresh data after deleting
        fetchData();
      })
      .catch(error => {
        console.error("Error deleting room:", error);
        // Handle error if needed
      });
  };

  return (
    <div className="relative">
      <div className=" grid grid-cols-4">
        {phong.map(item => (
          <div key={item.id} className="p-2 mb-2 ">
            <Card >
              <Card.Img variant="top" src={item.anh} className="lg:h-[264px]" />
              <Card.Body>
                {/* Display room details */}
                <Card.Text>Tên phòng: {item.tenphong}</Card.Text>
                <Card.Text>Mô tả: {item.mota}</Card.Text>
                <Card.Text>Tình trạng: {item.tinhtrang}</Card.Text>
                <Card.Text>Tối đa: {item.max}</Card.Text>
                <Card.Text>Kích thước: {item.size}</Card.Text>
                <Card.Text>Tầm nhìn: {item.view}</Card.Text>
                <Card.Text>Giá:{item.giatien}$/đêm</Card.Text>
                {/* Add more details as needed */}

                <div className='flex justify-around my-4'>
                  <button className='bg-amber-700 p-3 rounded-lg text-white font-bold' onClick={() => handleDeleteRoom(item.id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                  <button className='bg-amber-700 p-3 rounded-lg text-white font-bold' onClick={() => { openModal1(); /* Additional logic if needed */ }}><FontAwesomeIcon icon={faPenToSquare} /></button>

                </div>

              </Card.Body>
            </Card>
          </div>
        ))}

        {/* Modals */}
        {isModalOpen && <Modal onClose={closeModal} onSubmit={handleAddRoom} />}
        {isModal1Open && <Modal1 onClose={closeModal1} onSubmit={handleUpdateRoom} />}
      </div>
      <button className='bg-amber-700 p-3 rounded-lg text-white font-bold fixed right-8 top-60' onClick={() => { openModal(); /* Additional logic if needed */ }}><FontAwesomeIcon icon={faSquarePlus} />  Thêm</button>

    </div>
  );
}

export default CardExample;
