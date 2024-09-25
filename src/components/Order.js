import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, saveCartToUser } from '../firebase';
import { getAuth } from 'firebase/auth';  // Firebase Authentication 가져오기
import './Order.css';  // CSS 파일 import

function Order() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [activeButtons, setActiveButtons] = useState({}); // 각 버튼의 활성화 상태를 관리

  const auth = getAuth();  // Firebase Authentication 객체 가져오기
  const user = auth.currentUser;  // 현재 로그인한 사용자 정보 가져오기

  // 초기 메뉴 데이터
  const sampleMenu = [
    {
      date: '09/20(금)',
      soup: '남도식청국장',
      main: '고추장불고기',
      sideDishes: ['감자채카레볶음', '미역줄기볶음', '어묵삼색전']
    },
    {
      date: '09/21(토)',
      soup: '교동짬뽕탕',
      main: '돼지불백',
      sideDishes: ['도라지초무침', '어묵야채볶음', '깻잎지무침']
    },
    {
      date: '09/23(월)',
      soup: '햄김치찌개',
      main: '새우까스와생선까스',
      sideDishes: ['매콤순대볶음', '버터간장진미채', '맥앤치즈', '타르타르소스']
    },
    {
      date: '09/24(화)',
      soup: '감자고추장찌개',
      main: '팔보채',
      sideDishes: ['너비아니구이', '고구마순볶음', '오이지무침']
    },
    {
      date: '09/25(수)',
      soup: '사골배추국',
      main: '통보쌈',
      sideDishes: ['간고기버섯볶음', '보쌈용무김치', '새우젓소스']
    },
    {
      date: '09/26(목)',
      soup: '소고기무국',
      main: '김치제육볶음',
      sideDishes: ['떡베이컨간장볶음', '오징어젓갈무침', '토마토푸실리스파게티']
    },
    {
      date: '09/27(금)',
      soup: '가정식된장찌개',
      main: '우삼겹숙주볶음',
      sideDishes: ['청양고추동그랑땡', '견과멸치볶음', '무말랭이무침']
    },
    {
      date: '09/28(토)',
      soup: '들깨버섯탕',
      main: '안동순살찜닭(타이고추)',
      sideDishes: ['소세지찹조림', '고추장어묵볶음', '꼬들배기김치']
    },
    {
      date: '09/30(월)',
      soup: '도토리묵사발',
      main: '(육수+도토리묵채+고명)',
      sideDishes: ['숯불구이돼지고기', '감자전', '열무김치']
    },
    {
      date: '10/01(화)',
      soup: '- 국군의 날 -',
      main: '임시공휴일',
      sideDishes: ['입니다^^ -']
    },
    {
      date: '10/02(수)',
      soup: '- 식단 없는 날 -',
      main: '식단 없는 날',
      sideDishes: ['입니다^^ -']
    },
    {
      date: '10/03(목)',
      soup: '참치김치찌개',
      main: '순살등심돈까스',
      sideDishes: ['고추장떡볶이', '건새우마늘쫑볶음', '된장깻잎지', '돈까스소스']
    },
    {
      date: '10/04(금)',
      soup: '들깨무채국',
      main: '돼지갈비',
      sideDishes: ['비엔나야채볶음', '오이무침', '도시락김']
    },
  ];

  // 컴포넌트가 렌더링될 때 초기 메뉴 데이터를 필터링된 메뉴 상태에 설정
  useEffect(() => {
    setFilteredMenu(sampleMenu);
  }, []);

  // 검색 처리 함수
  const handleSearch = () => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = sampleMenu.filter(menu => 
      menu.soup.toLowerCase().includes(lowercasedTerm) ||
      menu.main.toLowerCase().includes(lowercasedTerm) ||
      menu.sideDishes.some(dish => dish.toLowerCase().includes(lowercasedTerm))
    );
    setFilteredMenu(filtered);
  };

  // 검색어 하이라이트 함수
  const highlightText = (text) => {
    if (!searchTerm.trim()) return text;

    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase()
        ? <span key={index} className="order-highlight">{part}</span>
        : part
    );
  };

  // 장바구니에 아이템 추가 함수
  const addToCart = async (menu, index) => {
    if (user) {
      // 장바구니에 아이템 추가
      const updatedCart = [...cart, menu];
      setCart(updatedCart);

      // Firebase에 저장
      await saveCartToUser(user.uid, updatedCart);
      // alert(`${menu.date} 식단이 장바구니에 추가되었습니다.`);

      // 클릭된 버튼의 상태를 업데이트
      setActiveButtons(prevState => ({
        ...prevState,
        [index]: !prevState[index] // 버튼 클릭 시 상태 반전
      }));
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  return (
    <div className="order-container">
      <h1>식단 주문</h1>
      <div className="order-order-search-container">
        <input 
          type="text" 
          placeholder="메뉴 검색" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      <div className="order-menu-list">
        {filteredMenu.map((menu, index) => (
          <div key={index} className="order-menu-item">
          <div className="order-menu-date">{menu.date}</div>
          <div className="order-menu-content">
            <div className="order-menu-details">
              <p>국: {highlightText(menu.soup)}</p>
              <p>메인: {highlightText(menu.main)}</p>
              <p>반찬: {menu.sideDishes.map(dish => highlightText(dish)).reduce((prev, curr) => [prev, ', ', curr])}</p>
            </div>
            <button 
              className={`order-add-to-cart ${activeButtons[index] ? 'active' : ''}`} 
              onClick={() => addToCart(menu, index)}
            >
              장바구니 담기
            </button>
          </div>
        </div>
        
        ))}
      </div>
      <div className="order-link-button">
        <Link to="/cart">
          <button>장바구니 보러가기</button>
        </Link>
      </div>
    </div>
  );
}

export default Order;
