import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import  { useEffect, useState } from "react";
function Header() {
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className={scrolling ? 'navbar scrolled' : 'navbar'}>
            <div class="grid lg:grid-cols-8 md:grid-cols-6 ">
                <div class="lg:pl-28 md:pl-20">
                    <Nav.Link><Link class="text-white font-bold text-3xl"><span class="text-yellow-500">CT</span>HOTEL. </Link></Nav.Link>
                </div>
                <div class="flex space-x-6 font-bold  my-auto text-white lg:col-start-5 lg:col-end-8 md:col-start-3">
                    <Nav.Link><Link to="/" class="text-white font-medium ">Trang chủ</Link></Nav.Link>
                    <Nav.Link><Link to="/about" class="text-white font-medium">Giới thiệu</Link></Nav.Link>
                    <Nav.Link><Link to="/room" class="text-white font-medium">Phòng</Link></Nav.Link>
                    <Nav.Link><Link to="/res" class="text-white font-medium">Nhà hàng</Link></Nav.Link>
                    <Nav.Link><Link to="/blog" class="text-white font-medium">Tin tức</Link></Nav.Link>
                    <Nav.Link><Link to="/contact" class="text-white font-medium">Liên hệ</Link></Nav.Link>

                </div>
            </div>
        </div>


    )
}
export default Header