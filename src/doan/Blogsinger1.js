import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Nav, CardImg } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function BlogSinger1() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook to get the navigate function

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/blog")
            .then(res => {
                console.log("API Response:", res.data);

                // Check if res.data.blogs is an array
                if (Array.isArray(res.data.blogs)) {
                    setBlogs(res.data.blogs);
                } else {
                    console.error("Dữ liệu từ API không phải là mảng.");
                    setError("Dữ liệu từ API không phải là mảng.");
                }
            })
            .catch(err => {
                console.error("Lỗi khi lấy dữ liệu blog:", err);
                setError("Lỗi khi lấy dữ liệu blog.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            <div className="">
                {blogs.slice(0, 6).map((blog) => (
                    <div key={blog.id} className="grid grid-cols-3 space-x-2">
                        <Nav.Link as={Link} to={`/blogsinger/${blog.id}`} className="" onClick={() => navigate(`/blogsinger/${blog.id}`)}>
                            <CardImg src={blog.anh} className="h-[100px] " />
                        </Nav.Link>
                        <Nav.Link as={Link} to={`/blogsinger/${blog.id}`} className="col-span-2" onClick={() => navigate(`/blogsinger/${blog.id}`)}>
                            <p className="font-serif text-lg hover:text-yellow-500 hover:underline ">{blog.title}</p>
                        <br/>
                        <p className=" text-[#808080] text-xs">
                            <FontAwesomeIcon icon={faCalendar} />
                            <span className="">{blog.date}</span>
                        </p></Nav.Link>
                        <hr className='col-start-1 col-end-4 my-3'></hr>
                    </div>
                ))}
            </div>
        </>
    );
}

export default BlogSinger1;
