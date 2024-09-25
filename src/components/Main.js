import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Main.css'; 
import event01 from '../assets/images/main02.jpg';
import event02 from '../assets/images/main01.jpg';
import event03 from '../assets/images/main3.jpg';
import event04 from '../assets/images/main04.jpg';
import event05 from '../assets/images/event05.jpg';

const images = [event01, event02, event03, event04, event05];

function Main() {
  // const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true); 

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => (prevPage === 0 ? images.length - 1 : prevPage - 1));
    setAutoSlide(false); // 수동 조작 시 자동 슬라이드 멈추기
  };

  // Handle next page button click
  const handleNextPage = () => {
    setCurrentPage(prevPage => (prevPage === images.length - 1 ? 0 : prevPage + 1));
    setAutoSlide(false); // 수동 조작 시 자동 슬라이드 멈추기
  };

  // Automatically go to the next slide every 5 seconds
  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(() => {
        handleNextPage();
      }, 5000); 

      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }
  }, [autoSlide]);

  return (
    <div className="main-container">
      <div className="slider-container">
        <button className="slider-btn prev" onClick={handlePreviousPage}>◀</button>
        <div className="image-wrapper">
          <div className="slider-wrapper" style={{ transform: `translateX(-${currentPage * 100}%)` }}>
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Event ${index + 1}`} className="main-image" />
            ))}
          </div>
        </div>
        <button className="slider-btn next" onClick={handleNextPage}>▶</button>
      </div>

      <div className="pagination-wrapper">
        {images.map((_, index) => (
          <span
            key={index}
            className={`pagination-dot ${index === currentPage ? 'active' : ''}`}
            onClick={() => setCurrentPage(index)}
          />
        ))}
      </div>

      <div className="main-text">
        <p>“<span className="main-text-span">반찬해결사</span>로 간편하게 식사 준비하고, <br/>
        여유로운 일상을 즐기세요.”</p>
      </div>

      <div className="main-bottom-container">
        <Link to="/menu" className="main-bottom button1">
          <span className="button-text">
            <span className="small-text">전문 영양사의</span><br />
            <span className="large-text">이달의 식단</span>
          </span>
          <img src={require('../assets/images/button_01.png')} alt="아이콘 1" className="button-icon" />
        </Link>

        <Link to="/menu-detail/1" className="main-bottom button2">
          <span className="button-text">
            <span className="small-text">매일 달라 새로운</span><br />
            <span className="large-text">식단 사진 및 정보</span>
          </span>
          <img src={require('../assets/images/button_02.png')} alt="아이콘 2" className="button-icon" />
        </Link>
      </div>

      {/* 식단 */}
      <div className="menu-section">
        <div className="menu-header">
          <img src={require('../assets/images/menu_01.png')} alt="식단 아이콘" className="menu-icon" />
          <div className="menu-text">
            <h3>이번주 식단</h3>
            <p>내 입맛에 꼭 맞는 식단을 추천해드려요</p>
          </div>
        </div>

        <div className="menu-table">
          <div className="menu-item">
            <span className="menu-date">09/21(토)</span>
            <div className="menu-divider"></div>
            <ul className="menu-food-list">
              <li>국: 교동짬뽕탕</li>
              <li>메인: 돼지불백</li>
              <li>도라지초무침</li>
              <li>어묵야채볶음</li>
              <li>깻잎지무침</li>
            </ul>
          </div>

          <div className="menu-item">
            <span className="menu-date">09/23(월)</span>
            <div className="menu-divider"></div>
            <ul className="menu-food-list">
              <li>국: 햄김치찌개</li>
              <li>메인: 새우까스와생선까스</li>
              <li>매콤순대볶음</li>
              <li>버터간장진미채</li>
              <li>맥앤치즈</li>
              <li>타르타르소스</li>
            </ul>
          </div>

          <div className="menu-item">
            <span className="menu-date">09/24(화)</span>
            <div className="menu-divider"></div>
            <ul className="menu-food-list">
              <li>국: 감자고추장찌개</li>
              <li>메인: 팔보채</li>
              <li>너비아니구이</li>
              <li>고구마순볶음</li>
              <li>오이지무침</li>
            </ul>
          </div>

          <div className="menu-item">
            <span className="menu-date">09/25(수)</span>
            <div className="menu-divider"></div>
            <ul className="menu-food-list">
              <li>국: 사골배추국</li>
              <li>메인: 통보쌈</li>
              <li>간고기버섯볶음</li>
              <li>보쌈용무김치</li>
              <li>새우젓소스</li>
            </ul>
          </div>

          <div className="menu-item">
            <span className="menu-date">09/26(목)</span>
            <div className="menu-divider"></div>
            <ul className="menu-food-list">
              <li>국: 소고기무국</li>
              <li>메인: 김치제육볶음</li>
              <li>떡베이컨간장볶음</li>
              <li>오징어젓갈무침</li>
              <li>토마토푸실리스파게티</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="main-goto-order-button-container">
        <Link to="/order" className="main-goto-order-button">
          식단 주문하러가기
        </Link>
      </div>

      <div className='eventinfo-container'>
      <div className='main-event'>
      <h3>
      <Link to="/event" className="event-link">이벤트</Link>
      </h3>
      <p className="event-description">이번 달의 특별한 이벤트를 확인하세요!</p>
    
      <div className="event-image-gallery">
      <div className="event-image-wrapper">
        <img src={require('../assets/images/event01.jpg')} alt="이벤트 1" className="event-image" />
        <span className="event-image-caption">다채로운 요리 강좌 안내</span>
      </div>
      <div className="event-image-wrapper">
        <img src={require('../assets/images/event02.jpg')} alt="이벤트 2" className="event-image" />
        <span className="event-image-caption">새로운 메뉴 출시 기념 할인</span>
      </div>
      <div className="event-image-wrapper">
        <img src={require('../assets/images/event03.jpg')} alt="이벤트 3" className="event-image" />
        <span className="event-image-caption">SNS 인증 이벤트 참여 방법</span>
      </div>
      </div>
    </div>

    <div div className='main_notice'>
    <h3>
      <Link to="/info" className="notice-link">공지사항</Link>
    </h3>
    <p className="notice-description">최신 소식을 확인하세요!</p>
    
    <ul className="notice-list">
      <li>09/21: 가을 맞이 특별 할인 이벤트!</li>
      <li>09/23: 새로운 메뉴 출시 안내</li>
      <li>09/25: 회원가입 이벤트 진행 중</li>
    </ul>
    </div>
    </div>


    <div>

    </div>
    </div>
  );
}

export default Main;
