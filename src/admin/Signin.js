import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import "../doan/style.css";

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:5000/admin')
      .then(response => response.json())
      .then(data => {
        console.log('Phản hồi API:', data);
        setUserData(data.admin); // Lấy mảng người dùng từ key "admin"
        setLoading(false);
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
        setError('Lỗi khi lấy dữ liệu người dùng');
        setLoading(false);
      });
  }, []);


  const handleLogin = () => {
    if (!userData) {
      setError('Dữ liệu chưa được tải');
      return;
    }

    const user = userData.find(user => user.gmail === email);

    if (user && user.password === password) {
      setError('');
      alert('Đăng nhập thành công!');
      navigate('/quanly');
    } else {
      setError('Email hoặc mật khẩu không đúng');
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <div className='flex justify-center quay'> 
          <img src="/anh/logo2.png" className="img-fluid" alt="Sample image" />
        </div>
        <div className='grid grid-cols-3' >
          <form className='col-start-2'>
            <p>Email address</p>
            <MDBInput
              wrapperClass="mb-4"

              id="formControlLg"
              type="email"

              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p>Password</p>
            <MDBInput
              wrapperClass="mb-4"

              id="formControlLg"
              type="password"

              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            {error && <p className="text-danger">{error}</p>}
            <div className="text-center text-md-start mt-4 pt-2">
              <button
                // Change type to "button" to prevent form submission
                className="mb-0 p-3 rounded-xl font-bold bg-[#b13333]"
                onClick={handleLogin}
              >
                Login
              </button>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account? <Link to="/registration" className="link-danger">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signin;