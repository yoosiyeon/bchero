import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Event.css'; 
import event01 from '../assets/images/event01.jpg';
import event02 from '../assets/images/event02.jpg';
import event03 from '../assets/images/event03.jpg';
import event04 from '../assets/images/event04.jpg';

const images = [event01, event02, event03, event04, event04, event03, event02, event01];
const imageCaptions = [
  '추석 특가 세일 할까말까!!',
  '잡채를 말도 안되는 가격으로 드립니다!',
  '추석 선물세트 단번에 고민해결',
  '든든한 순댓국밥 먹고말지',
  '든든한 순댓국밥 먹고말지',
  '추석 선물세트 단번에 고민해결',
  '잡채를 말도 안되는 가격으로 드립니다!',
  '추석 특가 세일 할까말까!!',
];

function Event() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4; // 한 페이지에 보여줄 이미지 개수

  // 검색어에 따라 필터링된 이미지 및 캡션
  const filteredImages = images.filter((_, index) =>
    imageCaptions[index].includes(searchTerm)
  );
  const filteredCaptions = imageCaptions.filter((caption) =>
    caption.includes(searchTerm)
  );

  // 필터링된 이미지에 대한 페이지 수 계산
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);

  // 현재 페이지에 따라 이미지 슬라이스
  const currentImages = filteredImages.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const currentCaptions = filteredCaptions.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div className="event-container">
      <h1 className="event-title">이벤트</h1>

      <div className="event-search-container">
        <input
          type="text"
          className="event-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색어를 입력하세요..."
        />
        <button className="event-search-button" onClick={() => {}}>
          검색
        </button>
      </div>

      <div className="image-grid">
        {currentImages.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image} alt={`Event ${index + 1}`} className="event-image" />
            <p className="image-caption">{currentCaptions[index]}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`pagination-button ${currentPage === index ? 'active' : ''}`}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Event;
