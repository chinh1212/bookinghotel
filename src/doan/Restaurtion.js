import { useState, useEffect } from "react"
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Header from "./Header";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBell, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { CardImg } from "react-bootstrap";
import ScrollToTopButton from "./ScrollToTopButton";
function Res() {
  const [ourmenu, setOurmenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/ourmenu")
      .then(res => {
        setOurmenu(res.data.ourmenu); // Corrected the state name
        setLoading(false); // Set loading to false on success
      })
      .catch(err => {
        console.error("Error fetching ourmenu data:", err);
        setError("Error fetching ourmenu data");
        setLoading(false); // Set loading to false on error
      });
  }, []);


  return (
    <>
      <div className="headblog relative">
        <Header className="navblog" />
        <div className="absolute bottom-0 lg:left-[42%] md:left-[33%]">
          <div class="flex space-x-2 font-bold text-center justify-center align-items-center  text-white mb-4">
            <Nav.Link><Link class="text-slate-200 font-normal ">Trang chủ</Link></Nav.Link>

          </div>
          <p className="font-serif font-thin text-center mb-6 text-white text-6xl ">Nhà hàng</p>
        </div>
      </div>

      <div className=" grid  grid-cols-2 lg:px-48 md:px-4 " >
        <div >
          <CardImg src="/anh/resraurant.png" className="lg:h-[770px] md:h-[520px]" />
        </div>
        <div className="lg:py-12 lg:pl-12 pr-4 md:py-4 md:pl-3 ">
          <h5 className="text-[#808080] md:text-xs lg:text-sm font-bold lg:mb-4 md:mb-2  lg:pl-4">Nhà hàng của chúng tôi</h5>
          <h1 className="font-serif md:text-2xl lg:text-4xl lg:mb-6 md:mb-2 pl-4">Chúng tôi yêu ẩm thực</h1>
          <p className="text-base  text-[#808080] font-normal lg:space-y-11 md:space-y-5 lg:mb-3 md:mb-1">Nhà hàng có vị trí tại tầng 3 của khách sạn CT Hotel. Không gian của nhà hàng được thiết kế mở, thoáng đãng và rộng rãi. Nhà hàng lựa chọn trắng và xanh là tông màu chủ đạo cho không gian. Cảm nhận đầu tiên khi nhìn thấy không gian ở đây đó chính là sự lãng mạn. Trên mỗi bàn đều có hoa trang trí cực kỳ tinh tế. Đồng thời bàn ghế cũng được sắp xếp cạnh những ô cửa kính với một khoảng cách hợp lý. Tất cả tạo nên một không gian vô cùng ấm cúng và sang trọng. Mặt khác, từ vị trí của nhà hàng, bạn dễ dàng nhìn ngắm phong cảnh xung quanh khách sạn.
          </p>

          <p className="text-base  text-[#808080] font-normal lg:space-y-11 md:space-y-5 lg:mb-3 md:mb-1 pl-10">Nhà hàng có vị trí tại tầng 3 của khách sạn CT Hotel. Không gian của nhà hàng được thiết kế mở, thoáng đãng và rộng rãi. Nhà hàng lựa chọn trắng và xanh là tông màu chủ đạo cho không gian. Cảm nhận đầu tiên khi nhìn thấy không gian ở đây đó chính là sự lãng mạn. Trên mỗi bàn đều có hoa trang trí cực kỳ tinh tế. Đồng thời bàn ghế cũng được sắp xếp cạnh những ô cửa kính với một khoảng cách hợp lý. Tất cả tạo nên một không gian vô cùng ấm cúng và sang trọng. Mặt khác, từ vị trí của nhà hàng, bạn dễ dàng nhìn ngắm phong cảnh xung quanh khách sạn..</p>
          <p className="text-base  text-[#808080] font-normal lg:space-y-11 md:space-y-5 lg:mb-3 md:mb-1"> CT Hotel luôn sẵn sàng phục vụ và cố gắng đáp ứng những yêu cầu của khách hàng. Đồng thời với phương châm “Mỗi khách hàng luôn xứng đáng nhận được những dịch vụ cao cấp”. CT Hotel chắc chắn sẽ là nơi phục vụ đồ ăn Hàn Quốc, Á lẫn Âu mang đến cho bạn những cảm xúc chân thật nhất.</p>

          <div class="flex space-x-2 font-bold  my-auto  text-white ">
            <Nav.Link><Link className="text-[#8d703b] text-xl font-medium"><FontAwesomeIcon icon={faTwitter} /></Link></Nav.Link>
            <Nav.Link><Link className="text-[#8d703b] text-xl font-medium"><FontAwesomeIcon icon={faFacebook} /></Link></Nav.Link>
            <Nav.Link><Link className="text-[#8d703b] text-xl font-medium"><FontAwesomeIcon icon={faTelegram} /></Link></Nav.Link>
          </div>
        </div>
      </div>


      <div class="lg:px-48 md:px-4 md:my-10 text-center lg:my-20">
        
          <h2 className="lg:text-4xl md:text-2xl mb-3 font-serif">Thực đơn nổi bật</h2>
          <hr/>
        
      </div>

      <div className="row lg:px-[190px] md:px-5" >
        {ourmenu.map(item => (
          <div key={item.id} className="col-6 mb-4" style={{ display: "flex" }}>
            <Card.Img variant="center" src={item.anh} height="100px" width="100px" />
            <div className="ml-3 pt-3">
              <div style={{ display: "flex" }}>
                <h4>{item.name}</h4>
                <p style={{ marginLeft: "10px", color: "#8d703b" }}>____{item.gia}</p>
              </div>
              <p>{item.mota}</p>



            </div>
          </div>
        ))}
      </div>
      <Footer />
      <ScrollToTopButton/>
    </>
  );
}

export default Res;
