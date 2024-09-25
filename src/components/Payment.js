import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { loadCartFromUser, saveOrderToUser } from '../firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import './Payment.css'; 

function Payment() {
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    contact: '',
    address: '',
    detailAddress: '', 
    deliveryType: '',
    sharedEntrancePassword: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = getAuth().currentUser;
      if (currentUser) {
        const userRef = doc(getFirestore(), 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setShippingInfo(prevInfo => ({
            ...prevInfo,
            name: userData.name || '',
            contact: userData.phone || '', // 연락처 필드
            address: userData.address || '', // 주소 필드
            detailAddress: userData.detailAddress || '', // 상세주소 필드
          }));
        }
      }
    };

    const fetchCartData = async () => {
      const currentUser = getAuth().currentUser;
      if (currentUser) {
        const userCart = await loadCartFromUser(currentUser.uid);
        console.log('Fetched Cart Data:', userCart);
        setCart(userCart);

        const totalQuantity = userCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        const totalPrice = userCart.reduce((sum, item) => sum + (item.price || 17900), 0);

        setTotalQuantity(totalQuantity);
        setTotalPrice(totalPrice);
      }
    };

    fetchUserData();
    fetchCartData();
  }, [location.state]);

  const calculateItemPrice = (item) => {
    const basePrice = 17900;
    const additionalPrice = item.is1_5Applied ? 5000 : 0;
    return (basePrice + additionalPrice) * (item.quantity || 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prevInfo => ({ ...prevInfo, [name]: value }));
  };

  const validateShippingInfo = () => {
    const newErrors = {};
    if (!shippingInfo.name) newErrors.name = '이름은 필수입니다.';
    if (!shippingInfo.contact) newErrors.contact = '연락처는 필수입니다.';
    if (!shippingInfo.address) newErrors.address = '주소는 필수입니다.';
    // 필요한 추가 유효성 검사 추가

    return newErrors;
  };

  const handleOrderSubmit = async () => {
    const validationErrors = validateShippingInfo();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const currentUser = getAuth().currentUser;
    if (currentUser) {
      const order = {
        cart,
        totalQuantity,
        totalPrice,
        shippingInfo
      };
      await saveOrderToUser(currentUser.uid, order);
      navigate('/payment-complete', {
        state: {
          cart,
          totalQuantity,
          totalPrice,
          shippingInfo
        }
      });
    } else {
      console.error('User not logged in');
    }
  };

  const loadPostcode = () => {
    const script = document.createElement('script');
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = handlePostcode;
    document.body.appendChild(script);
  };

  const handlePostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let fullAddress = data.address;
        let extraAddress = '';
  
        if (data.addressType === 'R') {
          if (data.bname !== '') extraAddress += data.bname;
          if (data.buildingName !== '') extraAddress += (extraAddress !== '' ? `, ${extraAddress}` : data.buildingName);
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
  
        const formattedAddress = `(${data.zonecode}) ${fullAddress}`;
  
        setShippingInfo(prevInfo => ({
          ...prevInfo,
          address: formattedAddress
        }));
      }
    }).open();
  };

  const handleCancel = () => {
    navigate('/cart'); // 장바구니 페이지로 이동
  };

  return (
    <div className="payment-container">
      <h1>주문하기</h1>
      <div className="order-summary">
        {cart.length === 0 ? (
          <p>장바구니가 비어 있습니다.</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div key={index} className="order-item">
                <p><strong>상품명:</strong> <span>{item.date}</span></p>
                <p><strong>국:</strong> <span>{item.soup}</span></p>
                <p><strong>메인:</strong> <span>{item.main}</span></p>
                <p><strong>반찬:</strong> <span>{item.sideDishes.join(', ')}</span></p>
                <p><strong>수량:</strong> <span>{item.quantity || 1}</span></p>
                <p><strong>1.5배 적용:</strong> <span>{item.is1_5Applied ? '적용됨' : '적용 안 됨'}</span></p>
                <p><strong>가격:</strong> <span>{calculateItemPrice(item).toLocaleString()}원</span></p>
              </div>
            ))}
            <div className="shipping-details">
              <h2>배송지 정보</h2>
              <label>
                <strong>이름</strong>
                <input 
                  type="text" 
                  name="name" 
                  value={shippingInfo.name} 
                  onChange={handleInputChange} 
                  placeholder="이름을 입력하세요" 
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </label>
              <label>
                <strong>연락처</strong>
                <input 
                  type="text" 
                  name="contact" 
                  value={shippingInfo.contact} 
                  onChange={handleInputChange} 
                  placeholder="연락처를 입력하세요" 
                />
                {errors.contact && <span className="error">{errors.contact}</span>}
              </label>
              <label>
                <strong>주소</strong>
                <div className="address-container">
                  <input 
                    type="text" 
                    name="address" 
                    value={shippingInfo.address} 
                    onChange={handleInputChange} 
                    placeholder="주소를 입력하세요" 
                    readOnly
                  />
                  <button type="button" onClick={loadPostcode}>주소찾기</button>
                </div>
                {errors.address && <span className="error">{errors.address}</span>}
              </label>
              <label>
                <strong>상세주소</strong>
                <input 
                  type="text" 
                  name="detailAddress" 
                  value={shippingInfo.detailAddress} 
                  onChange={handleInputChange} 
                  placeholder="상세주소를 입력하세요" 
                />
              </label>
              <label>
                <strong>배송유형</strong>
                <select 
                  name="deliveryType" 
                  value={shippingInfo.deliveryType} 
                  onChange={handleInputChange}
                >
                  <option value="">선택하세요</option>
                  <option value="일반배송">일반배송</option>
                  <option value="새벽배송">새벽배송</option>
                </select>
              </label>
              <label>
                <strong>공동현관 비밀번호</strong>
                <input 
                  type="text" 
                  name="sharedEntrancePassword" 
                  value={shippingInfo.sharedEntrancePassword} 
                  onChange={handleInputChange} 
                  placeholder="예시)1234* 호출버튼" 
                />
              </label>
              <label>
                <strong>전할 말</strong>
                <textarea 
                  name="message" 
                  value={shippingInfo.message} 
                  onChange={handleInputChange} 
                  placeholder="특정 반찬을 제외하는 것도 가능하니 말씀해주세요 :) 제외하신 반찬 대신 생수를 보내드립니다!" 
                />
              </label>
            </div>
            <div className="order-total">
              <p>
                <span className="label">총수량:</span>
                <span className="value">{totalQuantity}개</span>
              </p>
              <p>
                <span className="label">배송비:</span>
                <span className="value">0원</span> {/* 배송비 설정 가능 */}
              </p>
              <p>
                <span className="label">총금액:</span>
                <span className="value">{totalPrice.toLocaleString()}원</span>
              </p>
            </div>
            <div className="payment-buttons-container">
              <button onClick={handleOrderSubmit} className='payment-buttons'>주문하기</button>
              <button onClick={handleCancel} className='payment-cancel-button'>취소</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Payment;
