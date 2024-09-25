import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 이 부분을 확인하세요.
import './OrderHistory.css'; // 스타일 파일 임포트

function OrderHistory() {
  const [orderData, setOrderData] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    // 로컬 스토리지에서 데이터 읽기
    const data = localStorage.getItem('orderData');
    if (data) {
      setOrderData(JSON.parse(data));
    }
  }, []);

  const calculateItemPrice = (item) => {
    const basePrice = 17900;
    const additionalPrice = item.is1_5Applied ? 5000 : 0;
    return (basePrice + additionalPrice) * (item.quantity || 1);
  };

  return (
    <div className="order-history-container">
      <h1>주문 내역</h1>
      {orderData && orderData.cart && orderData.cart.length > 0 ? (
        <>
          {orderData.cart.map((item, index) => (
            <div key={index} className="order-history-order-item">
              <p><strong>상품명:</strong> <span>{item.date}</span></p>
              <p><strong>국:</strong> <span>{item.soup}</span></p>
              <p><strong>메인:</strong> <span>{item.main}</span></p>
              <p><strong>반찬:</strong> <span>{item.sideDishes.join(', ')}</span></p>
              <p><strong>수량:</strong> <span>{item.quantity || 1}</span></p>
              <p><strong>1.5배 적용:</strong> <span>{item.is1_5Applied ? '적용됨' : '적용 안 됨'}</span></p>
              <p><strong>가격:</strong> <span>{calculateItemPrice(item).toLocaleString()}원</span></p>
            </div>
          ))}

          <div className="order-history-shipping-info">
            <h2>배송지 정보</h2>
            <p><strong>이름:</strong> {orderData.shippingInfo.name}</p>
            <p><strong>연락처:</strong> {orderData.shippingInfo.contact}</p>
            <p><strong>주소:</strong> {orderData.shippingInfo.address}</p>
            <p><strong>상세주소:</strong> {orderData.shippingInfo.detailAddress}</p>
            <p><strong>배송유형:</strong> {orderData.shippingInfo.deliveryType}</p>
            <p><strong>공동현관 비밀번호:</strong> {orderData.shippingInfo.sharedEntrancePassword}</p>
            <p><strong>전할 말:</strong> {orderData.shippingInfo.message}</p>
          </div>

          <div className="order-history-order-total">
            <p><strong>총수량:</strong> {orderData.totalQuantity}개</p>
            <p><strong>배송비:</strong> 0원</p>
            <p><strong>총금액:</strong> {orderData.totalPrice.toLocaleString()}원</p>
          </div>

          <button 
            className="order-history-home-button" 
            onClick={() => navigate('/')} // 홈으로 이동
          >
            홈으로 가기
          </button>

        </>
      ) : (
        <p>주문 내역이 없습니다.</p>
      )}
    </div>
  );
}

export default OrderHistory;
