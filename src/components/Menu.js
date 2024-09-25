import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';

import menuImage from '../assets/images/menu_02.jpg';
import containerImage from '../assets/images/menu_03.jpg'; 

function Menu() {
  const navigate = useNavigate(); 

  const handleOrderClick = () => {
    navigate('/order'); 
  };

  return (
    <div className="menu-container">
      <h1 className="menu-title">식단표</h1>
      <h2 className="menu-subtitle">한달 식단표입니다</h2>
      <div className="menu-image-container">
        <img src={menuImage} alt="식단표" className="menu-image" />
      </div>
      <button className="menu-button" onClick={handleOrderClick}>
        식단 주문하러 GO
      </button>

      <div className="description">
        <h3 className="description-title">담정원</h3>
        <p className="description-text">정원을 담는다는 뜻으로 제공될 용기 이미지입니다.</p>
        <img src={containerImage} alt="용기 이미지" className="container-image" />
      </div>
    </div>
  );
}

export default Menu;
