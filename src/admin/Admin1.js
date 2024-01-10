import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSquarePlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
import "../doan/style.css";
import CardExample from './Plahoderl';
import Bieudo1 from './Bieudo1';
import { faBell, faCalendar, faComment, faComments, faDoorClosed, faHouse, faSearch, faUser, faUsers, faUtensils } from '@fortawesome/free-solid-svg-icons';
import Chart from 'chart.js/auto';
import Col from 'react-bootstrap/Col';
import { useParams } from "react-router-dom";
import axios from "axios";

import {
  BarChart,

  Bar,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import Nhahang from './Nhahang';
import Tintuc from './Tintuc';
export default function App() {
  // 
  const data1 = [
    {
      "name": "18-24",
      "uv": 31.47,
      "pv": 2400,
      "fill": "#8884d8"
    },
    {
      "name": "25-29",
      "uv": 26.69,
      "pv": 4567,
      "fill": "#83a6ed"
    },
    {
      "name": "30-34",
      "uv": -15.69,
      "pv": 1398,
      "fill": "#8dd1e1"
    },
    {
      "name": "35-39",
      "uv": 8.22,
      "pv": 9800,
      "fill": "#82ca9d"
    },
    {
      "name": "40-49",
      "uv": -8.63,
      "pv": 3908,
      "fill": "#a4de6c"
    },
    {
      "name": "50+",
      "uv": -2.63,
      "pv": 4800,
      "fill": "#d0ed57"
    },
    {
      "name": "unknow",
      "uv": 6.67,
      "pv": 4800,
      "fill": "#ffc658"
    }
  ]
  // 
  const chartRef3 = useRef(null);
  useEffect(() => {
    const rawValues = ['24.000', '50.000', '70.000', '180.000', '150.000', '50.000'];
    const numericValues = rawValues.map(value => parseFloat(value.replace('đ', '').replace('.', '').replace(',', '.')));
    const data = {
      labels: ['Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      datasets: [
        {
          label: 'Tổng doanh thu trong tháng là',
          data: numericValues,
          backgroundColor: ['#ff8080', '#ffb3e6', '#ffd480', '#4dff4d', '#1affff', '#6666ff',],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          position: 'right',
        },
      },
    };

    if (chartRef3.current) {
      const ctx = chartRef3.current.getContext('2d');
      const myChart = new Chart(ctx, { type: 'pie', data: data, options: options });
      return () => {
        myChart.destroy();
      };
    }

  }, []);
  // 
  const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300
    }
  ];
  const [basicActive, setBasicActive] = useState('tab1');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const { id } = useParams(); // Access 'id' from the URL
  const [hoadon, setHoaDon] = useState([]);
  const [phong, setPhong] = useState([]);

  const [danhgia, setDanhgia] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [setIdsCount, setSetIdsCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const handleBasicClick = (value: string) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };




  const handleDeleteCustomer = (customerId) => {
    setSubmitting(true);

    axios.delete(`http://127.0.0.1:5000/khachhang/${customerId}`)
      .then(res => {
        console.log("Customer deleted successfully:", res.data);
        setNotification("Customer deleted successfully.");
        // Update the customers state by filtering out the deleted customer
        setCustomers(customers.filter(customer => customer.id !== customerId));
      })
      .catch(err => {
        console.error("Error deleting customer:", err);
        setNotification("Error deleting customer.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  useEffect(() => {
    

  axios.get("http://127.0.0.1:5000/danhgia")
    .then(res => {
      console.log(res.data); // Kiểm tra nội dung của res.data
      // Adjust the following line based on the structure of your API response
      if (Array.isArray(res.data.danhgia)) {
        const numberOfReviews = res.data.danhgia.length;
        setDanhgia(res.data.danhgia);
        setReviewCount(numberOfReviews);
      } else {
        console.error("Dữ liệu từ API không phải là mảng.");
      }
    })
    .catch(err => {
      console.error("Lỗi khi lấy dữ liệu đánh giá:", err);
    });
    
  axios.get("http://127.0.0.1:5000/hoadon")
    .then(res => {
      console.log(res.data); // Kiểm tra nội dung của res.data
      // Adjust the following line based on the structure of your API response
      if (Array.isArray(res.data.hoadon)) {
        setHoaDon(res.data.hoadon);
      } else {
        console.error("Dữ liệu từ API không phải là mảng.");
      }
    })
    .catch(err => {
      console.error("Lỗi khi lấy dữ liệu đánh giá:", err);
    });

  axios.get("http://127.0.0.1:5000/admin")
    .then(res => {
      console.log(res.data); // Kiểm tra nội dung của res.data
      // Adjust the following line based on the structure of your API response
      if (Array.isArray(res.data.admin)) {
        setAdmin(res.data.admin);
      } else {
        console.error("Dữ liệu từ API không phải là mảng.");
      }
    })
    .catch(err => {
      console.error("Lỗi khi lấy dữ liệu đánh giá:", err);
    });

  }, []);
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/khachhang")
      .then(res => {
        console.log("API response:", res.data);

        if (Array.isArray(res.data?.khachhang)) {
          const customersData = res.data.khachhang;
          setCustomers(customersData);  // Update customers state with the customer data
          const numberOfCustomers = customersData.length;
          setCustomerCount(numberOfCustomers);
        } else {
          console.error("Invalid API response format. Expected an array.");
        }
      })
      .catch(err => {
        console.error("Error fetching customer data:", err);
      });
  }, []);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/phong")
      .then(res => {
        console.log("API response:", res.data);

        if (Array.isArray(res.data?.phong)) {
          const numberOfRooms = res.data.phong.length;
          setPhong(numberOfRooms);
        } else {
          console.error("Invalid API response format. Expected an array.");
        }
      })
      .catch(err => {
        console.error("Error fetching room data:", err);
      });
  }, []);



  return (
    <>
      <div className='py-4 pl-4 flex align-items-center justify-between '>

        <img src="/anh/logoadm.png" className='lg:w-72 '></img>

        <div className='relative'>
          <FontAwesomeIcon icon={faSearch} className="translate-x-8 text-xl text-gray-500" />
          <input className='border-2 border-gray-500 border-solid rounded-3xl lg:w-96 py-3 pl-10' type='text' placeholder='Tìm kiếm phòng theo tên,id,...' />
        </div>
        {admin.map(item => (
          <p className='bg-[#dedede] py-2 px-4 flex align-items-center gap-2  rounded-s-full '><FontAwesomeIcon icon={faUser} className='bg-amber-400 rounded-full text-2xl text-white p-2' /><span className='text-lg font-mono'>Admin<br />{item.gmail}</span></p>
        ))}
      </div>


      <MDBTabs className='mb-3 text-amber-500 text-lg '>
        <MDBTabsItem >
          <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'} className="focus:bg-amber-700 focus:text-amber-500 font-bold  hover:text-white bg-amber-700" >
            <FontAwesomeIcon icon={faHouse} />  Chung
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
            <FontAwesomeIcon icon={faUsers} className='' />  Khách hàng
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
            <FontAwesomeIcon icon={faDoorClosed} />  Phòng
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab4')} active={basicActive === 'tab4'}>
            <FontAwesomeIcon icon={faComments} />  Đánh giá
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab5')} active={basicActive === 'tab5'}>
            <FontAwesomeIcon icon={faCalendar} />  Hóa đơn
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab6')} active={basicActive === 'tab6'}>
            <FontAwesomeIcon icon={faUtensils} />  Nhà hàng
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab7')} active={basicActive === 'tab7'}>
            <FontAwesomeIcon icon={faBell} />  Tin tức
          </MDBTabsLink>
        </MDBTabsItem>

      </MDBTabs>

      <MDBTabsContent >
        <MDBTabsPane open={basicActive === 'tab1'} >
          <p className='px-36'>
            <div className=' flex  mb-6 ' >
              <div className='space-x-9 pt-10 '>
                <p className='text-4xl font-serif mb-8'>Tổng quan</p>

                <div className='bg-gradient-to-tr inline-block rounded-lg p-2 from-orange-100 to-orange-400 w-[170px]'>
                  <p className='flex align-items-center gap-2'><FontAwesomeIcon icon={faUsers} className='bg-orange-300 text-white  p-2 text-2xl rounded-full' /><span className='font-serif text-lg'>Khách hàng</span></p>
                  <h1 className='text-center font-semibold text-5xl mb-5 mt-3'>{customerCount}</h1>
                </div>
                <div className='bg-gradient-to-b inline-block rounded-lg p-2 from-orange-200 to-orange-400 w-[170px]'>
                  <p className='flex align-items-center gap-2'><FontAwesomeIcon icon={faDoorClosed} className='bg-orange-300 text-white  p-2 text-2xl rounded-full' /> <span className='font-serif text-lg'>Phòng</span></p>
                  <h1 className='text-center font-semibold text-5xl mb-5 mt-3'>{phong}</h1>
                </div>
                <div className='bg-gradient-to-tr inline-block rounded-lg p-2 from-orange-100 to-orange-400 w-[170px]'>
                  <p className='flex align-items-center gap-2'><FontAwesomeIcon icon={faComments} className='bg-orange-300 text-white  p-2 text-2xl rounded-full' /><span className='font-serif text-lg'>Đánh giá</span></p>
                  <h1 className='text-center font-semibold text-5xl mb-5 mt-3'>{reviewCount}</h1>
                </div>
              </div>
              <p className='mx-auto'>
                {/* Sơ đồ tổng doanh thu */}
                <Col md={8} className=''>
                  <div className='' style={{ width: '350px' }}><canvas ref={chartRef3} ></canvas></div>
                </Col>
                <p className='text-center mt-2'>Số lượng đánh giá theo từng loại phòng(2023)</p>
              </p>
            </div>
            <Bieudo1 />
            <p className='text-center mt-2'>Số lượng đặt phòng tính theo từng tháng(2023)</p>


          </p>



        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab2'} >
          <div className='px-8 gap-2' style={{ display: "flex " }}>
            <table style={{ width: "100%" }}>
              <thead>
                <tr className="text-center">
                  <th className="text-xl font-bold  ">Họ</th>
                  <th className="text-xl font-bold  ">Tên</th>
                  <th className="text-xl font-bold  ">Sdt</th>
                  <th className="text-xl font-bold  ">Email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {customers.map(item => (
                  <tr key={item.id}>
                    <td className="text-lg  ">{item.firstname}</td>
                    <td className="text-lg  ">{item.lastname}</td>
                    <td className="text-lg  ">{item.sdt}</td>
                    <td className="text-lg  ">{item.email}</td>
                    <td className='text-center'>
                      <button
                        className='bg-amber-700 p-3 rounded-lg text-white font-bold'
                        onClick={() => handleDeleteCustomer(item.id)}
                        disabled={submitting}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={data}
                  stackOffset="sign"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine y={0} stroke="#000" />
                  <Bar dataKey="pv" fill="#8884d8" stackId="stack" />
                  <Bar dataKey="uv" fill="#82ca9d" stackId="stack" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab3'} className='px-8 grid gird-cols-3'>
          <CardExample />
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab4'} className='px-8'>
          <table>
            <tr className="text-center">
              <th className="text-xl font-bold ">Tên khách hàng</th>
              <th className="text-xl font-bold ">Đánh giá</th>
              <th className="text-xl font-bold ">Thời Gian</th>
            </tr>
            {danhgia.map(item => (

              <tr key={item.id}>
                <td className="text-lg  ">{item.name}</td>
                <td className="text-lg  ">{item.title}</td>
                <td className="text-lg  ">{item.date}</td>
              </tr>

            ))}
          </table>
        </MDBTabsPane>
       
    <MDBTabsPane open={basicActive === 'tab5'} className='px-8'>
      <table style={{ width: '100%' }}>
        <thead>
          <tr className='text-center'>
            <th className='text-xl font-bold'>Tên khách hàng</th>
            <th className='text-xl font-bold'>Tên phòng</th>
            <th className='text-xl font-bold'>Giờ vào</th>
            <th className='text-xl font-bold'>Giờ ra</th>
            <th className='text-xl font-bold'>Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {hoadon.map((item) => {
            // Tìm khách hàng tương ứng với hóa đơn
            const customer = customers.find((c) => c.id === item.id);

            return (
              <tr key={item.id}>
              {/* Hiển thị thông tin khách hàng hoặc thông báo nếu không tìm thấy */}
              <td className='text-lg '>
                {customer ? `${customer?.firstname} ${customer?.lastname}` : 'Khách hàng không tồn tại'}
              </td>
              {/* Các ô thông tin khác của hóa đơn */}
              <td className='text-lg '>{item.name}</td>
              <td className='text-lg '>{item.checkin}</td>
              <td className='text-lg '>{item.checkout}</td>
              <td className='text-lg '>{item.tongtien}</td>
            </tr>
            );
          })}
        </tbody>
      </table>
    </MDBTabsPane>
  


        <MDBTabsPane open={basicActive === 'tab6'} >
          <Nhahang />
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab7'} ><Tintuc />

        </MDBTabsPane>
      </MDBTabsContent>

    </>
  );
}
