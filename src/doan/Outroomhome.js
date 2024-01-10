import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Header from "./Header";
import { Link } from "react-router-dom";
import SearchSidebar from "./SearchSidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBell, faCoffee } from '@fortawesome/free-solid-svg-icons';

function OutHome() {
    const [phong, setPhong] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/phong")
          .then(res => {
            setPhong(res.data.phong); // Corrected the state name
            setLoading(false); // Set loading to false on success
          })
          .catch(err => {
            console.error("Error fetching room data:", err);
            setError("Error fetching room data");
            setLoading(false); // Set loading to false on error
          });
    }, []);

    if (!Array.isArray(phong)) {
        // Xử lý trường hợp phong không phải là mảng (ví dụ: hiển thị thông báo đang tải)
        return <p>Đang tải...</p>;
    }

    return (
        <>
            <div className="lg:px-[190px] bg-[#f8f9fa] lg:pb-[90px] md:py-12" >
                <p className="font-serif text-4xl text-center pb-12">Căn Phòng</p>

                <div className="grid grid-cols-4" >
                    {phong.slice(0, 4).map(item => (
                        <div key={item.id} className=" px-3 mb-4 ">
                            <Card className="hover:shadow-2xl" >

                                <Card.Img variant="top" src={item.anh} className="h-[250px]" />
                                <Card.Body className="text-center">
                                    <h4 className="font-serif text-2xl text-center mb-2">{item.tenphong}</h4>
                                    <h5 className="mb-4"><span className="border-b-2 border-solid border-[#565656] text-2xl ">${item.giatien}</span>
                                    <span style={{ marginLeft: "10px", color:"#b3b3b3" }}>mỗi đêm</span></h5>
                                 
                                    <hr></hr>
                                    <button variant="primary" style={{ background: "#ffffff", border: 0, marginTop:"8px" }}>
                                        <Link to={`/roomsign/${item.id}`} style={{ textDecoration: "none", color: "#000000", fontWeight:"bold" }}>
                                        Chi tiết phòng <FontAwesomeIcon icon={faArrowRight} className="ml-2"/>
                                        </Link>
                                    </button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
                
            </div>
        </>
    );
}

export default OutHome;
