import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal5 from './Themtintuc';
import Modal4 from './Suatintuc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSquarePlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
function Tintuc() {
    const [isModal5Open, setModal5Open] = useState(false);
    const [blog, setBlog] = useState([]);
    const openModal5 = () => {
        setModal5Open(true);
    };

    const closeModal5 = () => {
        setModal5Open(false);
    };
    const [isModal4Open, setModal4Open] = useState(false);

    const openModal4 = () => {
        setModal4Open(true);
    };

    const closeModal4 = () => {
        setModal4Open(false);
    };
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/blog")
            .then(res => {
                console.log(res.data); // Check the structure of the data

                // Check if res.data.blogs is an array
                if (Array.isArray(res.data.blogs)) {
                    setBlog(res.data.blogs);
                } else {
                    console.error("Dữ liệu từ API không phải là mảng.");
                }
            })
            .catch(err => {
                console.error("Lỗi khi lấy dữ liệu blog:", err);
            });
    }, []);
    return (
        <div className="px-8 gap-2 " style={{ display: "flex" }}>
            <table style={{ width: "100%" }}>
                <tr className="text-center">
                    <th className="text-xl font-bold lg:w-60">Tên </th>
                    <th className="text-xl font-bold lg:w-[580px] ">Mô tả</th>
                    <th className="text-xl font-bold ">Ngày</th>
                    <th className="text-xl font-bold w-80">Ảnh</th>
                    <th className="border-none"></th>
                </tr>
                {blog.map((blog) => (
                    <tr key={blog.id}>
                        <td className="text-lg  ">{blog.title}</td>
                        <td className="text-lg  ">{blog.content}</td>
                        <td className="text-lg  ">{blog.date}</td>
                        <td><img src={blog.anh} ></img></td>
                      <td > <div className='space-x-1 flex justify-center items-center '>
                            <button className='bg-amber-700 p-3 rounded-lg text-white font-bold'><FontAwesomeIcon icon={faTrashCan} /></button>
                            <button className='bg-amber-700 p-3 rounded-lg text-white font-bold' onClick={openModal4}><FontAwesomeIcon icon={faPenToSquare} /></button>
                        </div></td> 
                    </tr>

                ))}
            </table>


            {/* Modal */}
            {isModal5Open && <Modal5 onClose={closeModal5} />}
            {/* Modal1 */}
            {isModal4Open && <Modal4 onClose={closeModal4} />}

            <button className='bg-amber-700 p-3 rounded-lg text-white font-bold fixed right-8 top-52' onClick={openModal5}><FontAwesomeIcon icon={faSquarePlus} />   Thêm</button>

        </div>
    )

}

export default Tintuc;