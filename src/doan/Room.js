import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Header from "./Header";
import { Link } from "react-router-dom";
import SearchSidebar from "./SearchSidebar";
import { faArrowRight, faBell, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";
function Room() {
    const [phong, setPhong] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>

            <div className="headblog relative">
                <Header className="navblog" />
                <div className="absolute bottom-0 lg:left-[42%] md:left-[40%]">
                    <div class="flex space-x-2 font-bold text-center justify-center  align-items-center text-white mb-4">
                        <Nav.Link><Link class="text-slate-200 font-normal ">Trang chủ</Link></Nav.Link>
                        <Nav.Link><Link class="text-slate-200 font-normal">Phòng</Link></Nav.Link>
                    </div>
                    <p className="font-serif font-thin text-center mb-6 text-white text-6xl ">Danh sách</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-4  lg:px-[190px] lg:py-[90px] md:py-10">
                <div className="col-span-4 order-2" >
                    <div className="grid grid-cols-4">
                        {phong.slice(0, 8).map(item => (
                            <div key={item.id} className="p-2 mb-2">
                                <Card className="hover:shadow-2xl">

                                    <Card.Img variant="top" src={item.anh} className="lg:h-[250px] md:h-[200px]" />
                                    <Card.Body className="text-center">
                                        <h4 className="font-bold max-lg:text-lg">{item.tenphong}</h4>
                                        <h5 className="lg:my-3 md:my-1"><span className="border-b-2 border-solid border-[#565656] md:text-2xl ">${item.giatien}</span>
                                            <span style={{ marginLeft: "10px", color: "#b3b3b3" }}>mỗi đêm</span></h5>
                                        <p><span className="text-[#8d703b] max-lg:text-sm">Tối đa:</span> {item.max} Persons</p>
                                        <p><span className="text-[#8d703b] max-lg:text-sm">Kích thuớc:</span> {item.size}</p>
                                        <p><span className="text-[#8d703b] max-lg:text-sm">Tầm nhìn:</span> {item.view}</p>
                                        <p className="mb-3"><span className="text-[#8d703b] ">Giường:</span> {item.bed}</p>
                                        <hr></hr>
                                        <button variant="primary" style={{ backgroundColor: "white", border: 0, marginTop: "8px" }}>
                                <Link to={`/booknow/${item.id}`} style={{ textDecoration: "none", color: "#000000" }}>
                                    Book Now<FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                                </Link>
                            </button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="order-1 col-span-full flex float-right">

                    <SearchSidebar />

                </div>

            </div>
            <Footer />
            <ScrollToTopButton/>
        </>
    );
}

export default Room;
