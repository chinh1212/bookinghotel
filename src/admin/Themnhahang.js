import React from 'react';
import "../doan/style.css";
import Form from 'react-bootstrap/Form';

function Modal3({ onClose }) {
    return (
        <div className="modal-overlay">
            <div className=" bg-white grid grid-cols-2 p-4 gap-3">

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file" />
                </Form.Group>
                <Form.Control type="text" placeholder="Tên" />
                <Form.Control type="text" placeholder="Giá " />
                <Form.Control as="textarea" placeholder="Mô tả " />
                <button onClick={onClose} className='bg-amber-600 rounded-2xl text-white'>Thêm</button>
                <button onClick={onClose} className='bg-amber-600 rounded-2xl text-white'>Đóng</button>
            </div>
        </div >
    );
}

export default Modal3;
