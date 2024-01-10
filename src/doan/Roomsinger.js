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

function RoomSinger() {
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

            <div className="lg:py-6 md:py-2">
              <h1 className="lg:text-3xl md:text-xl lg:mb-4 md:mb-1 font-serif">Thăm quan</h1>
              <div>
                <div className="ratio ratio-16x9">
                  <iframe
                    src="https://www.youtube.com/embed/vlDzYIIOYmM"
                    title="YouTube video"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>

            <div>
              <h1 className="mb-4 lg:text-3xl md:text-xl font-serif">Bình luận</h1>
              {danhgia
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5)
                .map(item => (
                  <div key={item.id} className="grid grid-cols-12 mb-4">
                    <FontAwesomeIcon icon={faUser} className='bg-amber-400 rounded-full text-2xl text-white p-2' />
                    <h1 className="col-span-11 text-lg">
                      {item.name}
                      <br />
                      <p className="text-xs text-[#cccccc]">
                        <FontAwesomeIcon icon={faCalendar} />
                        {item.date}
                      </p>
                    </h1>
                    <p className="col-span-full text-[#808080] text-base my-2">{item.title}</p>
                    <hr className="col-span-full" />
                  </div>
                ))}
            </div>

            <div className="py-4">
              <h1 className="mb-4 lg:text-3xl md:text-xl font-serif">Bình luận</h1>
              <div className="p-12 bg-[#f8f9fa] text-[#808080]">
                <form onSubmit={handleSubmit}>
                  <p className="my-4">Tên*</p>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full py-3"
                    required
                  />
                  <p className="my-4">Email*</p>
                  <input
                    type="text"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full py-3"
                    required
                  />
                  <p className="my-4">Đánh giá</p>
                  <textarea
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full py-3"
                  />
                  <button type="submit" className=" my-3 text-white rounded-2xl font-bold p-3 bg-black">
                   Gửi
                  </button>
                </form>
              </div>
            </div>

            {/* <div className="py-4">
              <h1 className="mb-4 text-3xl font-serif">Leave a comment</h1>
              <div className="grid grid-cols-2">
                {phong.slice(0, 4).map(item => (
                  <div key={item.id} className=" px-2 my-4">
                    <Card.Img variant="center" src={item.anh} />
                    <div className="text-center p-3 bg-slate-100">
                      <h1 className="font-serif text-2xl mb-2">{item.tenphong}</h1>
                      <p className="text-2xl mb-4"><span className="border-b-[3px] border-solid border-[#8d703b]">{item.giatien}$</span> <span className="text-[#b3b3b3] text-lg">per night</span></p>
                      <hr />
                      <Button variant="primary" className="border-0 py-3">
                        <Link to={`/detail`} className="text-decoration-none text-black ">
                          View Room Details <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                      </Button>
                    </div>
                  </div>a
                ))}
              </div>
            </div> */}
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

export default RoomSinger;
