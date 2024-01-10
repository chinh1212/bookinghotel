import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CardImg } from 'react-bootstrap';
import Header from "./Header";
import Nav from 'react-bootstrap/Nav';
import { Carousel } from "react-bootstrap";
import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBell, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import OutHome from "./Outroomhome";
import Footer from "./Footer";
import SearchHome from "./SearchHome";
import Statictial from "./Statictial";
import CommHome from "./Commenthome";
import RecentHome from "./RecentHome";
import ScrollToTopButton from "./ScrollToTopButton";

function About() {
    return (
        <>
            <div className="headblog relative">
                <Header className="navblog" />
                <div className="absolute bottom-0 lg:left-[40%] md:left-[35%]">
                    <div class="flex space-x-2 font-bold text-center justify-center  align-items-center text-white mb-4">
                        <Nav.Link><Link class="text-slate-200 font-normal ">Trang chủ</Link></Nav.Link>
                        <Nav.Link><Link class="text-slate-200 font-normal">Giới thiệu</Link></Nav.Link>
                    </div>
                    <p className="font-normal text-center mb-6 text-white text-6xl ">Về chúng tôi</p>
                </div>
            </div>
            <Statictial />
            <div className=" grid  grid-cols-2 lg:px-48 md:px-3 " >
                <div >
                    <CardImg src="/anh/bgr1.png" className="lg:h-[706px] md:h-[500px]" />
                </div>
                <div className="lg:py-12 md:py-3 lg:pl-20 md:pl-2 pr-4 ">
                    <h5 className="text-[#808080] lg:text-sm md:text-xs font-bold mb-4  lg:pl-4">Chào mừng tới CT Hotel</h5>
                    <h1 className="font-serif lg:text-3xl md:text-xl mb-6 pl-4">Chào mừng bạn tới CT Hotel</h1>
                    <p className="lg:text-base md:text-sm   text-[#808080] font-semibold space-y-11 lg:mb-3">Tọa lạc ngay trung tâm thành phố Hà Nội, CT Hotel được đầu tư hệ thống phòng có diện tích khác nhau từ 27- 37 m2 phù hợp với nhiều nhu cầu của khách hàng. Hệ thống trang thiết bị hiện đại, điều hòa, tivi màn hình led, sofa sang trọng, wifi tiện ích và các các dịch vụ đưa đón khách tham quan các điểm du lịch. Được thiết kế và trang trí theo kiến trúc Pháp sang trọng và ấm cúng luôn mang lại sự hài lòng và thoải mái cho khách hàng trong suốt thời gian lưu trú tại CT Hotel. Với chất lượng đạt chuẩn Quốc tế 4 sao,  Khách sạn CT Hotel  không chỉ đáp ứng hoàn hảo nhu cầu nghỉ ngơi của Quý khách mà còn mang đến những giây phút thư giãn giải trí tuyệt vời và để lại dư vị ấn tượng trong văn hóa ẩm thực nơi đây.
                        <br />
                        <br className="md:hidden lg:block" />
                        Khách sạn là sự kết hợp hài hòa của phong cách mang màu sắc sang trọng, hiện đại và cổ kính bao gồm cả quần thể nhà hàng, bể bơi, các khu vui chơi giải trí khác được quy tụ trong một khuôn viên rộng lớn gần 15.000 m2 .

                    </p>
                    <div class="flex space-x-2 font-bold  my-auto  text-white ">
                        <a className="text-[#8d703b] text-xl font-medium" href="https://x.com/tvinh251118109?t=u570OaQCechHuZ_3C9nX6w&s=09"><FontAwesomeIcon icon={faTwitter} /></a>
                        <a className="text-[#8d703b] text-xl font-medium" href="https://www.facebook.com/tran.ak.1612"><FontAwesomeIcon icon={faFacebook} /></a>
                        <a className="text-[#8d703b] text-xl font-medium" href="https://t.me/+84981127256"><FontAwesomeIcon icon={faTelegram} /></a>
                    </div>
                </div>
            </div>
            <div className="w-full py-8 mt-4   lg:px-[190px] ">
                <div className="grid grid-cols-4 ">
                    <div className="text-center  lg:p-4 md:p-2">
                        <p className="flex justify-center align-items-center  text-center rounded-full h-28 w-28 p-4 bg-[#f6f2ea] mx-auto">
                            <CardImg src="/anh/reception-bell.png" />

                        </p>
                        <p className="font-serif lg:text-2xl md:text-lg">25/7 Lễ tân</p>
                        <p className="text-base text-[#808080] ">Chào đón tận tâm, nụ cười là lễ tân của chúng tôi!.</p>

                    </div>
                    <div className="text-center  lg:p-4 md:p-2">
                        <p className="flex justify-center align-items-center  text-center rounded-full h-28 w-28 p-4 bg-[#f6f2ea] mx-auto">
                            <CardImg src="/anh/serving-dish.png" />

                        </p>
                        <p className="font-serif lg:text-2xl md:text-lg"> Bar & Nhà hàng</p>
                        <p className="text-base text-[#808080] ">Mang đến du khách một trải nghiệm ẩm thực tinh tuý..</p>

                    </div>
                    <div className="text-center  lg:p-4 md:p-2">
                        <p className="flex justify-center align-items-center  text-center rounded-full h-28 w-28 p-4 bg-[#f6f2ea] mx-auto">
                            <CardImg src="/anh/car.png" />

                        </p>
                        <p className="font-serif lg:text-2xl md:text-lg">Dịch vụ di chuyển</p>
                        <p className="text-base text-[#808080] ">Dịch vụ tốt, chất lượng, tận hưởng sự thoải mái tối đa .</p>

                    </div>
                    <div className="text-center  lg:p-4 md:p-2">
                        <p className="flex justify-center align-items-center  text-center rounded-full h-28 w-28 p-4 bg-[#f6f2ea] mx-auto">
                            <CardImg src="/anh/spa.png" />

                        </p>
                        <p className="font-serif lg:text-2xl md:text-lg">Spa thư giãn</p>
                        <p className="text-base text-[#808080] ">Hòa mình vào không gian xanh, tìm lại sức sống cho làn da của bạn.</p>
                    </div>
                </div>
            </div>
            <Footer />
            <ScrollToTopButton/>
        </>
    );
}
export default About;