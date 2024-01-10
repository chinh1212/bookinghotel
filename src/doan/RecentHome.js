import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Card, CardImg } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

function RecentHome() {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/blog")
      .then(res => {
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
    <div className="lg:px-[190px] lg:pb-[90px]">
      <p className="font-serif text-4xl text-center py-12">Recent Blog</p>
      <div>
        <div className="grid grid-cols-4">
          {blog.slice(0, 4).map((blogItem) => (
            <div key={blogItem.id} className="px-2">
              <CardImg src={blogItem.anh} className="mb-3 h-[250px]" />
              <div>
                <Link to={`/blogsinger/${blogItem.id}`} className="text-xl font-serif mb-3 text-decoration-underline">
                  {blogItem.title}
                </Link>
                <p className="text-[#b3b3b3">
                  <FontAwesomeIcon icon={faCalendar} className="mr-3" />
                  {blogItem.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentHome;
