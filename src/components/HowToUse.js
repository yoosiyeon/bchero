import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HowToUse.css'; 
import use01 from '../assets/images/use01.jpg'; 
import use02 from '../assets/images/use02.jpg'; 

function HowToUse() {
  const navigate = useNavigate();


  return (
    <div className="how-to-use-container">


      <h1 className="how-to-use-title">이용 방법</h1>

      <div className="image-container">
        <img src={use01} alt="사용 방법 1" className="how-to-use-image" />
      </div>

      <div className="image-container">
        <img src={use02} alt="사용 방법 2" className="how-to-use-image" />
        <button className="how-to-use-button" onClick={() => navigate('/order')}>주문하러 가기</button>
      </div>
    </div>
  );
}

export default HowToUse;
