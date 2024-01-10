import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YourComponent = () => {
  const [customerCount, setCustomerCount] = useState(0);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/khachhang")
      .then(res => {
        console.log("API response:", res.data);

        if (Array.isArray(res.data?.khachhang)) {
          const numberOfCustomers = res.data.khachhang.length;
          setCustomerCount(numberOfCustomers);
        } else {
          console.error("Invalid API response format. Expected an array.");
        }
      })
      .catch(err => {
        console.error("Error fetching customer data:", err);
      });
  }, []);

  return (
    <div>
      <p>Số lượng khách hàng từ API: {customerCount}</p>
    </div>
  );
}

export default YourComponent;
