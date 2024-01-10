import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Hoadon from "./Hoadon";
import Nav from "react-bootstrap/Nav";
import Header from "./Header";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
function Details() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const { id } = useParams(); // Access 'id' from the URL
  const [hoadon, setHoaDon] = useState([]);
  const [phong, setPhong] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [newCustomer, setNewCustomer] = useState({
    firstname: "",
    lastname: "",
    sdt: "",
    gmail: "",
    subscribeToNewsletter: false,
     // Thêm trường nghi chú
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Lấy dữ liệu khách hàng từ máy chủ
    axios.get("http://127.0.0.1:5000/khachhang")
      .then(res => {
        setCustomers(res.data);
      })
      .catch(err => {
        console.error("Lỗi khi lấy dữ liệu khách hàng:", err);
        setError("Lỗi khi lấy dữ liệu khách hàng");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    
      // Lấy dữ liệu cho hóa đơn
      axios.get("http://127.0.0.1:5000/hoadon")
        .then(res => {
          setHoaDon(res.data.Hoadon);
        })
        .catch(err => {
          console.error("Lỗi khi lấy dữ liệu hóa đơn:", err);
          setError("Lỗi khi lấy dữ liệu hóa đơn");
        })
        .finally(() => {
          setLoading(false);
        });
  axios.get(`http://127.0.0.1:5000/phong/${id}`)
      .then(res => {
        setPhong(res.data.phong);
      })
      .catch(err => {
        console.error("Lỗi khi lấy dữ liệu phòng:", err);
        setError("Lỗi khi lấy dữ liệu phòng");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setNewCustomer(prevState => ({
      ...prevState,
      [name]: inputValue,
    }));
  };

  const showBrowserNotification = (message) => {
    alert(message);
  };

  const handleAddCustomer = () => {
    setSubmitting(true);
    if (!newCustomer.firstname || !newCustomer.lastname || !newCustomer.sdt || !newCustomer.gmail) {
      setSubmitting(false);
      setNotification("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    axios.post("http://127.0.0.1:5000/khachhang", newCustomer)
      .then(res => {
        setCustomers([...customers, res.data]);
        setNewCustomer({
          firstname: "",
          lastname: "",
          sdt: "",
          gmail: "",
          subscribeToNewsletter: false,
          note: "",
        });

        // Hiển thị thông báo trình duyệt
        showBrowserNotification('Thêm khách hàng thành công!');
        
        // Hiển thị thông báo trên giao diện
        setNotification('Thêm khách hàng thành công!');
        
        // Chuyển hướng về trang chủ sau khi thêm thành công
        navigate('/');
      })
      .catch(err => {
        console.error("Lỗi khi thêm khách hàng mới:", err);
        setError(`Lỗi: ${err.message}`);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  useEffect(() => {
    // Tính toán tổng giá khi startDate hoặc endDate thay đổi
    if (startDate && endDate && phong.giatien) {
      const daysDifference = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      const roomPrice = parseFloat(phong.giatien) || 0;
      const totalPrice = daysDifference * roomPrice;
      setTotalPrice(totalPrice);
    }
  }, [startDate, endDate, phong]);
  
  if (loading) {
    return <p>Đang tải...</p>;
  }
  
  if (error) {
    return <p>{error}</p>;
  }
  
  

  return (
    
    <div>
      <div className="headblog relative">
                <Header className="navblog" />
                <div className="absolute bottom-0 lg:left-[43%] md:left-[36%]">
                    <div class="flex space-x-2 font-bold text-center justify-center  align-items-center text-white mb-4">
                        <Nav.Link><Link class="text-slate-200 font-normal ">Home</Link></Nav.Link>
                        <Nav.Link><Link class="text-slate-200 font-normal">Room</Link></Nav.Link>
                    </div>
                    <p className="font-serif font-thin text-center mb-6 text-white text-6xl ">Book now</p>
                </div>
            </div>
      <div className="flex md:px-5 md:py-11 lg:px-[190px] lg:py-20">
        <div style={{ backgroundColor: "#f8f9fa", width: "50%" }}>
          <h1 className="text-center font-serif text-xl my-3">Information</h1>
          
          <Form style={{ display: "flex", flexDirection: "column", margin: "30px" }}>
            <div style={{ display: "flex", margin: "15px 0" }}>
              <Form.Group controlId="firstname" style={{ marginRight: "15px" }}>
                <Form.Control
                  type="text"
                  placeholder="First name"
                  name="firstname"
                  value={newCustomer.firstname}
                  onChange={handleInputChange}
                />
              </Form.Group>
  
              <Form.Group controlId="lastname">
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  name="lastname"
                  value={newCustomer.lastname}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </div>
  
            <div style={{ display: "flex", margin: "15px 0" }}>
              <Form.Group controlId="sdt" style={{ marginRight: "15px" }}>
                <Form.Control
                  type="text"
                  placeholder="Number phone"
                  name="sdt"
                  value={newCustomer.sdt}
                  onChange={handleInputChange}
                />
              </Form.Group>
  
              <Form.Group controlId="gmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="gmail"
                  value={newCustomer.gmail}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </div>
  
            <Form.Group controlId="subscribeToNewsletter" style={{ margin: "15px 0" }}>
              <Form.Check
                type="checkbox"
                label="Receive news"
                name="subscribeToNewsletter"
                checked={newCustomer.subscribeToNewsletter}
                onChange={handleInputChange}
              />
            </Form.Group>
  
            <Form.Group controlId="note" style={{ margin: "15px 0", width: "100%" }}>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Note"
                name="note"
                value={newCustomer.note}
                onChange={handleInputChange}
              />
            </Form.Group>
  
            <Button
              variant="primary"
              onClick={handleAddCustomer}
              disabled={submitting}
              style={{ marginTop: "15px" }}
            >
              {submitting ? 'Đang lưu...' : 'Confirm'}
            </Button>
  
            {/* Hiển thị thông báo thành công */}
            {notification && (
              <Alert variant="success" onClose={() => setNotification(null)} dismissible>
                {notification}
              </Alert>
            )}
          </Form>
        </div>
  
        <div style={{ width: "50%" }}>
        
      <>
        <div style={{ display: "flex" }}>
          <div className="row" style={{ display: "flex" }}>
            <div>
              <Card border="primary">
                <Card.Img variant="top" src={phong.anh} height="200px" />
                <Card.Body>
                  <div className="space-y-1 mb-2">
                    <h4 className="font-serif text-xl ">{phong.tenphong}</h4>

                    <h5>${phong.giatien}
                      <span style={{ marginLeft: "10px" }}>mỗi đêm</span></h5>

                    <p>Max: {phong.max} Người</p>
                    <p>Size: {phong.size}</p>
                    <p>View: {phong.view}</p>
                    <p>Bed: {phong.bed}</p>
                  </div>
                  <hr></hr>

                  <div className="grid grid-cols-2 ">
                    <div>
                      <label>Ngày đặt:</label>
                      <DatePicker className="border-2 border-solid border-black mt-2"
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>

                    <div>
                      <label>Ngày trả:</label>
                      <DatePicker className="border-2 border-solid border-black mt-2"
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                  </div>

                  <div>
                    {startDate && endDate && (
                      <span>Giá:{totalPrice || '0'}</span>
                    )}

                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </>
    
        </div>
      </div>
      <Footer/>
      <ScrollToTopButton/>
    </div>
   
  );
}

export default Details;
