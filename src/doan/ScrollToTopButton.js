import React, { useState, useEffect } from 'react';
import '../doan/style.css'; // Import file CSS để định dạng nút
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowUp, faBell, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Thêm sự kiện lắng nghe khi cuộn trang
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Xác định khi nào nút sẽ hiển thị
      setIsVisible(scrollTop > 100);
    };

    // Đăng ký sự kiện lắng nghe cuộn trang khi component được mount
    window.addEventListener('scroll', handleScroll);

    // Hủy đăng ký sự kiện khi component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  );
};

export default ScrollToTopButton;
