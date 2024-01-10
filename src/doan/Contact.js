
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
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sub: '',
    mess: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/lienhe', formData);
      console.log(response.data); // Log phản hồi từ API
  
      // Hiển thị thông báo khi thêm thành công
      alert('Thêm thành công!');
  
      // Reload trang sau khi gửi thành công
      // window.location.reload();
    } catch (error) {
      console.error('Error sending message:', error);
      // Xử lý lỗi ở đây nếu cần
    }
  };
  
    return (
        <div>
            <div className="headblog relative">
                <Header className="navblog" />
                <div className="absolute bottom-0 lg:left-[45%] md:left-[40%]">
                    <div class="flex space-x-2 font-bold text-center justify-center  align-items-center text-white mb-4">
                        <Nav.Link><Link class="text-slate-200 font-normal ">Trang chủ</Link></Nav.Link>
                        <Nav.Link><Link class="text-slate-200 font-normal">Liên hệ</Link></Nav.Link>
                    </div>
                    <p className="font-serif font-thin text-center mb-6 text-white text-6xl ">Liên hệ</p>
                </div>
            </div>
            <div className='bg-[#eaeced]'>
                <div className="lg:pt-20   max-lg:pt-3 lg:text-3xl md:text-xl font-serif text-center mb-2">
                    <h2>Thông tin liên hệ</h2>
                </div>
                <div className="grid md:grid-cols-4 md:px-9 md:space-x-2 md:mb-10 lg:px-[204px] md:px-9 ">
                    <div className=" text-[#808080] max-lg:text-sm md:p-3  bg-white">
                        <p >Địa chỉ: 198 West 21th Street, Suite 721 New York NY 10016

                        </p>
                    </div>

                    <div className=" text-[#808080] max-lg:text-sm md:p-3 bg-white ">
                        <p>Số điẹn thoại: + 1235 2355 98

                        </p>
                    </div >

                    <div className=" text-[#808080] max-lg:text-sm md:p-3 bg-white ">
                        <p>Email: info@yoursite.com

                        </p>
                    </div>

                    <div className=" text-[#808080] max-lg:text-sm md:p-3 bg-white ">
                        <p>Website: yoursite.com

                        </p>
                    </div>
                </div>


                <div className="lg:px-[204px] md:px-9 grid grid-cols-2">
                    <div className="map-container" >
                        <div className="lg:h-[500px] md:h-[320px]" >
                            <iframe
                                width="100%"
                                height="100%"
                                frameborder="0"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.3326105649467!2d105.774319!3d21.037928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac2cf7113321%3A0x7df3f42653851ef1!2sYour%20Location!5e0!3m2!1sen!2sus"
                                allowfullscreen
                            ></iframe>

                        </div>
                    </div>

                    <div className="w-full p-8 bg-white">
        <form onSubmit={handleSubmit}>
  <div className="mb-2 border-2 border-solid border-gray-500 lg:p-3 md:p-1 rounded-lg">
    <input
      type="text"
      id="name"
      placeholder="Tên"
      required
      className="w-full"
      value={formData.name}
      onChange={handleChange}
    />
  </div>
  <div className="mb-2 border-2 border-solid border-gray-500 lg:p-3 md:p-1 rounded-lg">
    <input
      type="text"
      id="email"
      placeholder=" Email"
      required
      className="w-full"
      value={formData.email}
      onChange={handleChange}
    />
  </div>
  
  <div className="mb-2 border-2 border-solid border-gray-500 lg:p-3 md:p-1 rounded-lg">
    <textarea
      id="mess" 
      placeholder="Nội dung"
      required
      className="w-full"
      value={formData.mess}
      onChange={handleChange}
    ></textarea>
  </div>
  <div className="bg-[#8d703b] inline-block lg:p-3 md:p-2 rounded-xl">
    <button type="submit" className="lg:text-xl md:text-base text-white">
      Gửi
    </button>
  </div>
</form>

      </div>


                </div>
                <Footer />
                <ScrollToTopButton/>
            </div>
        </div>
    );
}
export default Contact;