import React, { useState, useEffect } from "react";
import { Carousel, Card } from "react-bootstrap";
import axios from "axios";

function CommHome() {
    const [danhgia, setDanhgia] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/danhgia")
          .then(res => {
            console.log(res.data); // Kiểm tra nội dung của res.data
            // Adjust the following line based on the structure of your API response
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

    return (
        <div className="lg:px-[380px] py-11 bg-[#f8f9fa]">
            <Carousel className="py-24">
                {danhgia.map(item => (
                    <Carousel.Item key={item.id} interval={2000} className="">
                        <div className="text-center">
                            <div className="flex justify-center text-center align-items-center mb-2">
                                <div className="bg-[#f6f2ea] rounded-full w-16 h-16 p-3 flex justify-center text-center align-items-center">
                                    <Card.Img src="/anh/user.png" className="" />
                                </div>
                            </div>
                            <div className="pt-3">
                                <div >
                                    <div>
                                        <div>
                                            <h4 className="text-base font-medium">{item.name}</h4>
                                            {/* <h4 className="text-base font-medium">loại phòng</h4> */}
                                        </div>
                                        <p>"{item.title}"</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default CommHome;
