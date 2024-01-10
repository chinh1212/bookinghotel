import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import "./style.css";
import { SlideshowLightbox } from 'lightbox.js-react';
import 'lightbox.js-react/dist/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBell, faCoffee, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { MDBFooter, MDBRow, MDBContainer, MDBCol } from "mdbreact";
function Footer() {
    return (
        <>
            <p className="font-serif lg:text-4xl md:text-2xl text-center md:py-6 lg:py-12">Nổi bật</p>
            <SlideshowLightbox className=' grid grid-cols-5    ' showThumbnails={true}>
                <img className="w-full lg:h-[280px] md:h-[150px] hover:cursor-zoom-in " src="/anh/a1.png" />
                <img className="w-full lg:h-[280px] md:h-[150px] hover:cursor-zoom-in " src='/anh/a2.png' />
                <img className="w-full lg:h-[280px] md:h-[150px] hover:cursor-zoom-in  " src='/anh/a3.png' />
                <img className="w-full lg:h-[280px] md:h-[150px] hover:cursor-zoom-in " src='/anh/a4.png' />
                <img className="w-full lg:h-[280px] md:h-[150px] hover:cursor-zoom-in  " src='/anh/a5.png' />
            </SlideshowLightbox>
            <MDBFooter className=" text-lg-start text-muted bg-[#232323] ">
                <section className="flex justify-between align-items-center lg:pl-48 lg:pr-96 md:px-14 py-4   text-white  border-bottom">
                    <div className=''>
                        <span className="font-medium text-base">Hãy kết nối với chúng tôi:</span>
                    </div>
                    <div className="text-white flex space-x-3">
                        
                        <a className="text-[#8d703b] text-2xl font-medium" href="https://x.com/tvinh251118109?t=u570OaQCechHuZ_3C9nX6w&s=09"><FontAwesomeIcon icon={faTwitter} /></a>
                        <a className="text-[#8d703b] text-2xl font-medium" href="https://www.facebook.com/tran.ak.1612"><FontAwesomeIcon icon={faFacebook} /></a>
                        <a className="text-[#8d703b] text-2xl font-medium" href="https://t.me/+84981127256"><FontAwesomeIcon icon={faTelegram} /></a>
                    </div>
                </section>

                <section className="text-white lg:px-48 ">
                    <div className='md:px-14 lg:px-0 mt-5'>
                        <MDBRow className='mt-3 grid grid-cols-3'>
                            <MDBCol className='mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>
                                    CT Hotel
                                </h6>
                                <p className="font-mono">
                                "CTHotel - Nơi Hòa Quyện Sang Trọng và Chăm Sóc Tận Tâm."
                                </p>
                            </MDBCol>

                            <MDBCol className=" mb-4  ">
                                <div className="lg:pl-[170px]">
                                    <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
    
                                    <p>
                                        <Link to="/abot" className="text-reset">
                                            Giới thiệu
                                        </Link>
                                    </p>
                                    <p>
                                        <Link to="/room" className="text-reset">
                                            Phòng
                                        </Link>
                                    </p>
                                    <p>
                                        <Link to="/res" className='text-reset'>
                                            Nhà hàng
                                        </Link>
                                    </p>
                                    <p>
                                        <Link to="/blog" className='text-reset'>
                                            Tin tức
                                        </Link>
                                    </p>
                                    <p>
                                        <Link to="/contact" className='text-reset'>
                                            Liên hệ
                                        </Link>
                                    </p>
                                </div>

                            </MDBCol>

                            <MDBCol className=' mb-4 lg:pl-5'>
                                <div className="lg:pl-20">
                                    <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                                    <p><FontAwesomeIcon icon={faLocationDot} className="mr-2"/>Mai dịch-Cầu Giấy-Hà Nội.
                                    </p>
                                    <p><FontAwesomeIcon icon={faEnvelope} className="mr-2"/>chinh280820003@gmail.com
                                    </p>
                                    <p><FontAwesomeIcon icon={faPhone}  className="mr-2"/>+84 981 127 256
                                    </p>
                                </div>

                            </MDBCol>
                        </MDBRow>
                    </div>
                </section>

                <div className="text-center p-4 text-white">
                    © 2024 Copyright:
                    <a className='text-reset fw-bold'>
                        CTH0TEL
                    </a>
                </div>
            </MDBFooter>
        </>
    );
}

export default Footer