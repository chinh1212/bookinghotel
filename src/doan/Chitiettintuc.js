import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Card, CardImg } from 'react-bootstrap';
import Header from "./Header";
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalendar, faUser } from '@fortawesome/free-solid-svg-icons';
import { MDBContainer, MDBCarouselItem, MDBCarousel } from "mdb-react-ui-kit";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";
import { useParams } from "react-router-dom";

function BlogSinger() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        title: '',
    });

    const [blog, setBlog] = useState([]);
    const [phong, setPhong] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [danhgia, setDanhgia] = useState([]);
    const [successNotification, setSuccessNotification] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/blog")
            .then(res => {
                console.log(res.data);
                if (Array.isArray(res.data.blogs)) {
                    setBlog(res.data.blogs);
                } else {
                    console.error("Dữ liệu từ API không phải là mảng.");
                }
            })
            .catch(err => {
                console.error("Lỗi khi lấy dữ liệu blog:", err);
            });

        axios.get("http://127.0.0.1:5000/danhgia")
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
    }, []);
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/phong/${id}`)
            .then(res => {
                if (res.data.phong && typeof res.data.phong === 'object') {
                    setPhong([res.data.phong]); // Convert the object to an array
                } else {
                    console.error("Dữ liệu từ API không phải là mảng:", res.data.phong);
                    setError("Dữ liệu từ API không phải là mảng.");
                }
            })
            .catch(err => {
                console.error("Lỗi khi lấy dữ liệu phòng:", err);
                setError("Lỗi khi lấy dữ liệu phòng");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);





    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:5000/danhgia", formData);
            console.log(response.data);

            setDanhgia([...danhgia, response.data.comment]);

            setFormData({
                name: "",
                email: "",
                title: "",
            });

            setSuccessNotification(true);
            alert('Thêm thành công !!');
            setTimeout(() => {
                window.location.reload();
                setSuccessNotification(false);
            }, 0);
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    return (
        <div>
            <div className="headblog relative">
                <Header className="navblog" />
                <div className="absolute bottom-0 lg:left-[40%] md:left-[30%]">
                    <div className="flex space-x-2 font-bold text-center justify-center  text-white mb-4">
                        <Nav.Link><Link className="text-slate-200 font-normal ">Trang chủ</Link></Nav.Link>
                        <Nav.Link><Link className="text-slate-200 font-normal">Phòng</Link></Nav.Link>
                    </div>
                    <p className="font-normal text-center mb-6 text-white text-6xl ">Chi tiết phòng</p>
                </div>
            </div>

            <div className="lg:py-[90px] lg:px-[205px] md:py-4">
                <div className="grid grid-cols-3 ">
                    <div className="col-span-2 px-4">
                        {loading ? (
                            <p>Loading...</p>
                        ) : phong.length > 0 ? (
                            <div>
                                <h1 className="lg:text-3xl md:text-xl mb-4 font-serif">{phong[0].tenphong}</h1>
                                <MDBCarousel showControls fade>
                                    <MDBCarouselItem itemId={1}>
                                        <CardImg src={phong[0].anh} className='d-block w-100' alt='...' />
                                    </MDBCarouselItem>
                                    {/* Add additional carousel items if needed based on your data */}
                                </MDBCarousel>
                                <p className="text-base font-medium text-[#808080] my-4">{phong[0].mota}</p>
                                <p className="text-base font-medium text-[#808080] mb-2">Tối đa: <span>{phong[0].max}</span></p>
                                <p className="text-base font-medium text-[#808080] mb-2">Kích thước: <span>{phong[0].size}</span></p>
                                <p className="text-base font-medium text-[#808080] mb-2">Giường: <span>{phong[0].bed}</span></p>
                            </div>
                        ) : (
                            <p>No data available.</p>
                        )}








                    </div>

                    <div className=" lg:p-4 border-solid border-[#808080]">
                        <h1 className="mb-1 text-lg font-serif">Tin tức</h1>
                        <div className="">
                            {blog.slice(8, 15).map((blog) => (
                                <div key={blog.id} className="p-2">
                                    <Nav.Link className="w-full "><Link ><CardImg src={blog.anh} className="h-[300px]" /> </Link></Nav.Link>
                                    <Nav.Link className="col-span-3 px-2"><Link ><p className="font-serif text-base">{blog.title}</p> </Link>
                                        <p className="col-start-2 text-[#808080] text-xs"><FontAwesomeIcon icon={faCalendar} className="mr-3" /><span className="">{blog.date}</span></p></Nav.Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            <ScrollToTopButton />

            {successNotification && (
                <div className="bg-green-500 text-white p-3 mb-4">
                    Bình luận đã được gửi thành công!
                </div>
            )}
        </div>
    );
}

export default BlogSinger;
