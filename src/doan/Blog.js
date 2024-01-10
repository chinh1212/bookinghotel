import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CardImg } from 'react-bootstrap';
import Header from "./Header";
import Nav from 'react-bootstrap/Nav';
import { Carousel } from "react-bootstrap";
import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBell, faCalendar, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import OutHome from "./Outroomhome";
import Footer from "./Footer";
import SearchHome from "./SearchHome";
import Statictial from "./Statictial";
import CommHome from "./Commenthome";
import RecentHome from "./RecentHome";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import ScrollToTopButton from "./ScrollToTopButton";

function Blog() {
  const [basicActive, setBasicActive] = useState('tab1');

  const handleBasicClick = (value: string) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/blog")
        .then(res => {
            console.log(res.data); // Check the structure of the data

            // Check if res.data.blogs is an array
            if (Array.isArray(res.data.blogs)) {
                setBlog(res.data.blogs);
            } else {
                console.error("Dữ liệu từ API không phải là mảng.");
            }
        })
        .catch(err => {
            console.error("Lỗi khi lấy dữ liệu blog:", err);
        });
}, []);

  return (
    <>
      <div className="headblog relative">
        <Header className="navblog" />
        <div className="absolute bottom-0 lg:left-[45%] md:left-[40%]">
          <div class="flex space-x-2 font-bold text-center justify-center  align-items-center text-white mb-4">
            <Nav.Link><Link class="text-slate-200 font-normal ">Trang chủ</Link></Nav.Link>
          </div>
          <p className="font-serif font-thin text-center mb-6 text-white text-6xl ">Tin tức</p>
        </div>
      </div>
      <MDBTabs className='mb-3 flex justify-center align-items-center '>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
            Trang 1
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
            Trang 2
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
            Trang 3
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane open={basicActive === 'tab1'}>
          <div className="lg:px-[190px] lg:pb-[90px]">
            <p className="font-serif lg:text-5xl md:text-3xl text-center lg:py-12 md:py-4">Bản tin</p>
            <div >
              <div className="grid grid-cols-4">
                {blog.slice(0, 8).map((blog) => (
                 <div key={blog.id} className="p-2">
                   <Link to={`/blogsinger/${blog.id}`}>
                   <div style={{overflow:"hidden"}} className="overflow-hidden h-[250px]"><CardImg src={blog.anh} className="mb-3 h-[250px] hover:scale-125 transition " /></div> 
                    <div >
                      <p className="text-xl font-serif mb-1 text-decoration-underline ">{blog.title}</p>
                      <p className="text-[#b3b3b3]"><FontAwesomeIcon icon={faCalendar} className="mr-3" />{blog.date}</p>
                      
                    </div>
                    </Link>
                  </div>
                  
                ))}
              </div>
            </div>
          </div>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab2'}>
        <div className="lg:px-[190px] lg:pb-[90px]">
          <p className="font-serif lg:text-5xl md:text-3xl text-center lg:py-12 md:py-4">Bản tin</p>
            <div >
              <div className="grid grid-cols-4">
                {blog.slice(8, 16).map((blog) => (
                  <div key={blog.id} className="p-2">
                    <Link to={`/blogsinger/${blog.id}`}>
                    <CardImg src={blog.anh} className="mb-3 h-[250px]" />
                    <div >
                      <p className="text-xl font-serif mb-1 text-decoration-underline ">{blog.title}</p>
                      <p className="text-[#b3b3b3]"><FontAwesomeIcon icon={faCalendar} className="mr-3" />{blog.date}</p>
                    </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div></MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab3'}>
        <div className="lg:px-[190px] lg:pb-[90px]">
        <p className="font-serif lg:text-5xl md:text-3xl text-center lg:py-12 md:py-4">Bản tin</p>
          <div >
            <div className="grid grid-cols-4">
              {blog.slice(16, 24).map((blog) => (
                <div key={blog.id} className="p-2">
                  <Link to={`/blogsinger/${blog.id}`}>
                  <CardImg src={blog.anh} className="mb-3 h-[250px]" />
                  <div >
                    <p className="text-xl font-serif mb-1 text-decoration-underline ">{blog.title}</p>
                    <p className="text-[#b3b3b3]"><FontAwesomeIcon icon={faCalendar} className="mr-3" />{blog.date}</p>
                  </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div></MDBTabsPane>
      </MDBTabsContent>
      <Footer />
      <ScrollToTopButton/>
    </>
  );
}
export default Blog;
