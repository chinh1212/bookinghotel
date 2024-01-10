import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Header from "./Header";
import Nav from 'react-bootstrap/Nav';
import { Carousel } from "react-bootstrap";
import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBell, faCalendar, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Card, CardImg } from 'react-bootstrap';
import ScrollToTopButton from "./ScrollToTopButton";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import BlogSinger1 from "./Blogsinger1";
function BlogSinger() {
    const [blog, setBlog] = useState([]);

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/blog/${id}`)
            .then(res => {
                if (res.data.blog && typeof res.data.blog === 'object') {
                    setBlog([res.data.blog]); // Convert the object to an array
                } else {
                    console.error("Dữ liệu từ API không phải là mảng:", res.data.blog);
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





    return (
        <div>
            <div className="headblog relative">
                <Header className="navblog" />
                <div className="absolute bottom-0 lg:left-[38%]">
                    <div class="flex space-x-2 font-bold text-center justify-center  text-white mb-4">
                        <Nav.Link><Link class="text-slate-200 font-normal ">Trang chủ</Link></Nav.Link>
                        <Nav.Link><Link class="text-slate-200 font-normal">Tin tức</Link></Nav.Link>
                    </div>
                    <p className="font-normal text-center mb-6 text-white text-6xl ">Chi tiết tin tức</p>
                </div>
            </div>
            <div className="py-[90px] px-[205px]">
                <div className="grid grid-cols-3 mb-6">
                    <div className="">
                        <h4 className="mb-4 text-lg font-serif">Tin khác</h4>
                        <BlogSinger1 />
                    </div>

                    {loading ? (
                        <p>Loading...</p>
                    ) : blog.length > 0 ? (
                        <div className="col-span-2 px-4">
                            <h1 className="text-3xl mb-4 font-serif">{blog[0].title}</h1>
                            <p className="text-base text-[#808080] mb-4">{blog[0].content}</p>
                            <CardImg src={blog[0].anh} className="mb-4" />
                            <p className="text-base text-[#808080] mb-4"></p>
                        </div>
                    ) : (
                        <p>No data available.</p>
                    )}

                </div>



            </div>
            <Footer />
            <ScrollToTopButton />

        </div>

    );
}
export default BlogSinger