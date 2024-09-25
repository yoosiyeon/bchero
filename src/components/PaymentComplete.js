import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentComplete.css'; // 스타일 파일 임포트

const calculateItemPrice = (item) => {
  const basePrice = 17900;
  const additionalPrice = item.is1_5Applied ? 5000 : 0;
  return (basePrice + additionalPrice) * (item.quantity || 1);
};

function PaymentComplete() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalQuantity, totalPrice, shippingInfo } = location.state || {};

  useEffect(() => {
    if (!cart) {
      navigate('/'); 
    }
  }, [cart, navigate]);

  useEffect(() => {
    if (cart) {
      // 데이터 저장
      localStorage.setItem('orderData', JSON.stringify({ cart, totalQuantity, totalPrice, shippingInfo }));
    }
  }, [cart, totalQuantity, totalPrice, shippingInfo]);

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleOrderHistoryClick = () => {
    navigate('/order-history');
  };

  return (
    <div className="payment-complete-container">
      <h1>주문 완료</h1>
      <div className="order-summary">
        {cart && cart.length > 0 ? (
          <>
            {cart.map((item, index) => (
              <div key={index} className="payment-complete-order-item">
                <p>상품명: <span>{item.date}</span></p>
                <p>국: <span>{item.soup}</span></p>
                <p>메인: <span>{item.main}</span></p>
                <p>반찬: <span>{item.sideDishes.join(', ')}</span></p>
                <p>수량: <span>{item.quantity || 1}</span></p>
                <p>1.5배 적용: <span>{item.is1_5Applied ? '적용됨' : '적용 안 됨'}</span></p>
                <p>가격: <span>{calculateItemPrice(item).toLocaleString()}원</span></p>
              </div>
            ))}
            <div className="payment-complete-order-total">
              <p><strong>총수량:</strong> {totalQuantity}개</p>
              <p><strong>배송비:</strong> 0원</p>
              <p><strong>총금액:</strong> {totalPrice.toLocaleString()}원</p>
            </div>
            
            <div className="payment-complete-shipping-info">
  <h2>배송지 정보</h2>
  <p>
    <span className="label">이름:</span> 
    <span className="data">{shippingInfo.name}</span>
  </p>
  <p>
    <span className="label">연락처:</span> 
    <span className="data">{shippingInfo.contact}</span>
  </p>
  <p>
    <span className="label">주소:</span> 
    <span className="data">{shippingInfo.address}</span>
  </p>
  <p>
    <span className="label">상세주소:</span> 
    <span className="data">{shippingInfo.detailAddress}</span>
  </p>
  <p>
    <span className="label">배송유형:</span> 
    <span className="data">{shippingInfo.deliveryType}</span>
  </p>
  <p>
    <span className="label">공동현관 비밀번호:</span> 
    <span className="data">{shippingInfo.sharedEntrancePassword}</span>
  </p>
  <p>
    <span className="label">전할 말:</span> 
    <span className="data">{shippingInfo.message}</span>
  </p>
</div>

            <div className="payment-complete-buttons-container">
              <button onClick={handleHomeClick} className='payment-complete-button-home-button'>홈으로 가기</button>
              <button onClick={handleOrderHistoryClick} className='payment-complete-order-history-button'>주문 내역 확인하기</button>
            </div>
          </>
        ) : (
          <p>장바구니가 비어 있습니다.</p>
        )}
      </div>
    </div>
  );
}

export default PaymentComplete;
