import React, { useState } from 'react';
import './MenuDetail.css'; 
import menudetail01 from '../assets/images/menudetail01.jpg';
import menudetail02 from '../assets/images/menudetail02.jpg';
import menudetail03 from '../assets/images/menudetail03.jpg';
import menudetail04 from '../assets/images/menudetail04.jpg';
import menudetail05 from '../assets/images/menudetail05.jpg';
import menudetail06 from '../assets/images/menudetail06.jpg';
import menudetail07 from '../assets/images/menudetail07.jpg';
import instagramIcon from '../assets/images/instagram.png'; 

const menuImages = [menudetail01, menudetail02, menudetail03, menudetail04, menudetail05, menudetail06, menudetail07];
const dates = ['09/21', '09/22', '09/23', '09/24', '09/25', '09/26', '09/27'];

const menuDetails = [
  [
    { name: '짜장면', weight: '500g', ingredients: '면(국내산), 돼지고기(국내산), 양파(국내산), 춘장' },
    { name: '짬뽕', weight: '600g', ingredients: '면(국내산), 해물믹스(수입산), 야채류(국내산)' },
    { name: '유린기', weight: '300g', ingredients: '닭고기(국내산), 소스, 양파' },
    { name: '양배추 샐러드', weight: '150g', ingredients: '양배추(국내산), 드레싱' },
    { name: '피클', weight: '100g', ingredients: '오이(국내산), 소금, 식초' },
  ],
  [
    { name: '비빔밥', weight: '400g', ingredients: '쌀(국내산), 고사리(국내산), 당근(국내산)' },
    { name: '김치찌개', weight: '350g', ingredients: '김치(국내산), 두부(국내산), 돼지고기(국내산)' },
    { name: '계란찜', weight: '200g', ingredients: '계란(국내산), 대파(국내산)' },
    { name: '오이무침', weight: '150g', ingredients: '오이(국내산), 고춧가루, 마늘' },
    { name: '단무지', weight: '100g', ingredients: '단무지' },
  ],
  [
    { name: '불고기', weight: '450g', ingredients: '소고기(호주산), 양파(국내산), 마늘' },
    { name: '미역국', weight: '350g', ingredients: '미역(국내산), 소고기(국내산)' },
    { name: '브로콜리 무침', weight: '150g', ingredients: '브로콜리(국내산), 간장, 참기름' },
    { name: '김치', weight: '100g', ingredients: '김치(국내산)' },
    { name: '참치 샐러드', weight: '200g', ingredients: '참치(수입산), 채소류(국내산)' },
  ],
  [
    { name: '순댓국', weight: '500g', ingredients: '순대(국내산), 대파(국내산)' },
    { name: '콩나물국', weight: '400g', ingredients: '콩나물(국내산), 육수(소고기)' },
    { name: '김치전', weight: '300g', ingredients: '김치(국내산), 밀가루' },
    { name: '계란후라이', weight: '100g', ingredients: '계란(국내산)' },
    { name: '무생채', weight: '150g', ingredients: '무(국내산), 고춧가루' },
  ],
  [
    { name: '해물파전', weight: '400g', ingredients: '해물믹스(수입산), 파(국내산)' },
    { name: '된장찌개', weight: '350g', ingredients: '된장(국내산), 두부(국내산)' },
    { name: '상추 겉절이', weight: '150g', ingredients: '상추(국내산), 고춧가루, 마늘' },
    { name: '계란찜', weight: '200g', ingredients: '계란(국내산)' },
    { name: '김치', weight: '100g', ingredients: '김치(국내산)' },
  ],
  [
    { name: '순댓국', weight: '500g', ingredients: '순대(국내산), 대파(국내산), 양념장(국내산)' },
    { name: '김치볶음밥', weight: '350g', ingredients: '김치(국내산), 쌀(국내산), 양파(국내산)' },
  ],
  [
    { name: '갈비찜', weight: '600g', ingredients: '소갈비(국내산), 당근(국내산)' },
    { name: '북어국', weight: '400g', ingredients: '북어(수입산), 대파(국내산)' },
    { name: '시금치 나물', weight: '150g', ingredients: '시금치(국내산), 간장' },
    { name: '단무지', weight: '100g', ingredients: '단무지' },
    { name: '부추전', weight: '300g', ingredients: '부추(국내산), 밀가루' },
  ],
];

function MenuDetail() {
  const [activeTab, setActiveTab] = useState(dates.length - 1); // 마지막 날짜로 초기화

  return (
    <div className="menu-detail-container">
      <h1>식단 정보</h1>

      {/* 탭 버튼 */}
      <div className="tab-buttons">
        {dates.map((date, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {date}
          </button>
        ))}
      </div>

      {/* 탭 내용 */}
      <div className="tab-content">
        <img src={menuImages[activeTab]} alt={`Menu for ${dates[activeTab]}`} className="menu-detail-image" />
        <table className="menu-detail-table">
          <thead>
            <tr>
              <th>메뉴명</th>
              <th>중량</th>
              <th>성분 및 원산지</th>
            </tr>
          </thead>
          <tbody>
            {menuDetails[activeTab].map((detail, index) => (
              <tr key={index}>
                <td>{detail.name}</td>
                <td>{detail.weight}</td>
                <td>{detail.ingredients}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="footer-info">
        <div className="instagram-link">
          <a 
            href="https://www.instagram.com/banchanhero/reels/?locale=ko-KR" 
            target="_blank" 
            rel="noopener noreferrer"
            className="instagram-link-text"
          >
            메뉴 더 보러가기
          </a>
          <a 
            href="https://www.instagram.com/banchanhero/reels/?locale=ko-KR" 
            target="_blank" 
            rel="noopener noreferrer"
            className="instagram-link-icon"
          >
            <img src={instagramIcon} alt="Instagram" />
          </a>
        </div>
        <p><span className='headline-text'>소비자주의사항 본 제품은</span><br/> 알류, 우유, 메밀, 땅콩, 고등어, 게, 새우, 돼지고기, 복숭아, 토마토, 아황산류, 호두, 닭고기, 오징어, 조개류(굴, 전복, 홍합 포함), 잣을 사용한 제품과 같은 제조시설에서 제조하고 있습니다.</p>
        <p><span className='headline-text'>맛있게 드시는 법</span><br/> 반찬해결사 메뉴는 조리상태이므로 가열이 필요없습니다. 따라서 드시기 전 따뜻하게 데워서 드시면 더욱 맛있게 드실 수 있습니다.</p>
        <p>*무생채무침 맛있게 드시는 방법 계란후라이에 참기름만 넣어 비빔밥으로 드셔도 좋습니다 ^^</p>
        <a href="/menu" className="menudetail-order-button">메뉴 더 보러가기</a>
      </div>
    </div>
  );
}

export default MenuDetail;
