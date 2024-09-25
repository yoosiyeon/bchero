import React, { useState, useEffect } from 'react';
import { db, saveCartToUser, loadCartFromUser, removeItemFromUserCart } from '../firebase';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import './Cart.css'; 
import arrowLeft from '../assets/images/arrow-left.png'; 

function Cart() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [highlightedItems, setHighlightedItems] = useState({});
  const auth = getAuth();
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUser = () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
        loadCartFromUser(currentUser.uid).then(setCart);
      }
    };

    fetchUser();
  }, [auth]);

  const handleQuantityChange = (index, delta) => {
    const newCart = [...cart];
    newCart[index].quantity = (newCart[index].quantity || 1) + delta;
    if (newCart[index].quantity < 1) newCart[index].quantity = 1; // 수량이 1보다 작지 않도록

    // 가격 업데이트 (기본 가격 + 수량에 따라 변경)
    newCart[index].price = calculateItemPrice(newCart[index]);

    setCart(newCart);
    if (user) saveCartToUser(user.uid, newCart);
  };

  const apply1_5x = (index) => {
    const newCart = [...cart];
    const item = newCart[index];

    item.is1_5Applied = !item.is1_5Applied; // 1.5배 적용 토글
    item.price = calculateItemPrice(item); // 가격 재계산

    setCart(newCart);
    setHighlightedItems({
      ...highlightedItems,
      [index]: item.is1_5Applied // 버튼 색상 상태 변경
    });

    if (user) saveCartToUser(user.uid, newCart);
  };

  // 각 항목의 가격 계산 함수
  const calculateItemPrice = (item) => {
    const basePrice = 17900;
    const additionalPrice = item.is1_5Applied ? 5000 : 0; // 1.5배 적용 여부에 따른 추가 가격
    return (basePrice + additionalPrice) * (item.quantity || 1); // 숫자로 반환
  };

  const handleDelete = async (index) => {
    if (user) {
      const updatedCart = cart[index];
      try {
        await removeItemFromUserCart(user.uid, updatedCart); // Firebase에서 항목 삭제
        setCart(cart.filter((_, i) => i !== index)); // 로컬 상태 업데이트
      } catch (error) {
        console.error('Error removing item from user cart: ', error);
      }
    }
  };

  // 총 가격 계산
  const calculateTotalPrice = () => {
    const totalPrice = cart.reduce((total, item) => total + (item.price || 17900), 0);
    return totalPrice; 
  };

  // 총수량 계산
  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  // 주문하기 버튼 클릭 시 호출되는 함수
  const handleOrderNow = () => {
    navigate('/payment', {
      state: {
        cart,
        totalQuantity: calculateTotalQuantity(),
        totalPrice: calculateTotalPrice()
      }
    }); 
  };

  return (
    <div className="cart-container">
            <button className="goback-button-cart" onClick={() => navigate('/')}>
        <img src={arrowLeft} alt="Back" />
      </button>
      <h1>장바구니</h1>
      {cart.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="item-details">
              <span className='datedate'><p className="date">{item.date}</p></span>
              <hr className="item-divider" />
              <p>국: {item.soup}</p>
              <p>메인: {item.main}</p>
              <p>반찬: {item.sideDishes.join(', ')}</p>
              <p>가격: {(item.price || 17900).toLocaleString()}원</p>
              <div className="quantity-container">
                <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                {item.quantity || 1}
                <button onClick={() => handleQuantityChange(index, 1)}>+</button>
              </div>
              <button 
                onClick={() => apply1_5x(index)} 
                className={`apply-1-5x-button ${highlightedItems[index] ? 'highlighted' : ''}`}
              >
                1.5배 적용
              </button>
              <button onClick={() => handleDelete(index)} className="delete-button">
                삭제
              </button>
            </div>
          </div>
        ))
      )}
      <div className="order-summary">
        <p className="delivery-cost">배송비: 무료</p>
        <p className="total-price">
          총 가격: <span>{calculateTotalPrice().toLocaleString()}원</span>
        </p>
      </div>
      <div className="order-button-container">
        <button onClick={handleOrderNow} className="order-now-button">
          주문하기
        </button>
      </div>
    </div>
  );
}

export default Cart;
