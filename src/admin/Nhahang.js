import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal3 from './Themnhahang';
import Modal2 from './Suanhahang';
import { faPenToSquare, faSquarePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Nhahang() {
  const [isModal3Open, setModal3Open] = useState(false);
  const [isModal2Open, setModal2Open] = useState(false);
  const [ourmenu, setOurmenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/ourmenu")
      .then(res => {
        setOurmenu(res.data.ourmenu);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching ourmenu data:", err);
        setError("Error fetching ourmenu data");
        setLoading(false);
      });
  }, []);

  const openModal3 = () => setModal3Open(true);
  const closeModal3 = () => setModal3Open(false);

  const openModal2 = () => setModal2Open(true);
  const closeModal2 = () => setModal2Open(false);

  return (
    <div className="px-8 gap-2 relative" style={{ display: "flex" }}>
      <table style={{ width: "100%" }}>
        <thead>
          <tr className="text-center">
            <th className="text-xl font-bold lg:w-60">Tên </th>
            <th className="text-xl font-bold "> Mô tả</th>
            <th className="text-xl font-bold w-44 ">Giá</th>
            <th className="text-xl font-bold lg:w-60">Ảnh</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ourmenu.map(item => (
            <tr key={item.id} className='space-y-3'>
              <td className="text-lg  ">{item.name}</td>
              <td className="text-lg  ">{item.mota}</td>
              <td className="text-lg  ">{item.gia}</td>
              <td><img src={item.anh}></img></td>
            <td>  <div className='space-x-3 flex justify-center items-center'>
        <button className='bg-amber-700 p-3 rounded-lg text-white font-bold'><FontAwesomeIcon icon={faTrashCan} /></button>
        <button className='bg-amber-700 p-3 rounded-lg text-white font-bold' onClick={openModal2}><FontAwesomeIcon icon={faPenToSquare} /></button>
      </div></td>
            </tr>
          ))}
        </tbody>
      </table>
      
      

      {/* Modal for adding data */}
      {isModal3Open && <Modal3 onClose={closeModal3} />}
      
      {/* Modal for editing data */}
      {isModal2Open && <Modal2 onClose={closeModal2} />}
      <button className='bg-amber-700 p-3 rounded-lg text-white font-bold fixed right-8 top-52' onClick={openModal3}><FontAwesomeIcon icon={faSquarePlus} />   Thêm</button>

    </div>
  );
}

export default Nhahang;
