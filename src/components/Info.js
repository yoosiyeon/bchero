import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Info.css'; 

function Info() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndexes, setOpenIndexes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const itemsPerPage = 4; // 한 페이지에 보여줄 항목 수
  const navigate = useNavigate(); 

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handleSearchClick = () => {
    console.log('Search term:', searchTerm);
  };

  const toggleQuestion = (index) => {
    setOpenIndexes(prevIndexes =>
      prevIndexes.includes(index)
        ? prevIndexes.filter(i => i !== index)
        : [...prevIndexes, index]
    );
  };

  const infoData = [
    { question: '주소 오기재로 인한 배송 안내(새벽배송의 경우)', answer: '카카오 또는 네이버 연동시 간편하게 회원가입이 되다보니,\n간혹 일부 고객님께서 주소지 및 연락처가 등록이 되어 있지 않는 분들이 계십니다. \n새벽배송 특성상 비대면 배송이기 때문에\n기본주소지는 적어주셨으나 상세주소지에 동,호수를 적어주시지 않으시면\n배송이 되지 않고, 자동으로 반송처리가 됩니다.\n꼭! 주문시에는 기본주소+상세주소지 확인 부탁드립니다. \n감사합니다.' },

    { question: '[반찬해결사] 아이스팩 변경 안내 ( 아이스젤팩 - > 친환경 아이스팩 )', answer: '안녕하세요. 반찬해결사입니다. \n저희 반찬해결사 아이스팩이 기존 아이스젤팩 -> 친환경 아이스팩으로 변경되었습니다.\n워터팩 보다는 더 신선함을 오래 보존할 수 있는 미세플라스틱이 없는 친환경 젤팩입니다.\n하수구에 버려도 잘 녹지만, 적당량씩 하수구에 배출 부탁드립니다^^' },
    { question: '※ 11+1 이벤트시 12회 무료식단은 일반식단으로 출고가 됩니다.', answer: '안녕하세요. 반찬해결사입니다.\n앞서 항상 반찬해결사를 이용해 주시는 고객님들께 죄송하다는 말씀 먼저 올립니다.\n이전에는 11+1 이벤트 이용시 11회 식단 모두 1.5배 더담기를 하실 경우 \n무료식단에도 1.5배 식단으로 보내드렸습니다.\n새롭게 바뀐 반찬해결사에서는\n11+1 전체식단 1.5배 하였을 경우 무료식단은 일반으로 출고가 되는 점 양해 부탁드립니다.\n앞으로 더 나은 반찬해결사가 될 수 있도록 노력하겠습니다.\n감사합니다.' },
    
    { question: 'Q [아이스팩] 아이스팩은 어떻게 버려야 하나요?', answer: '※ 젤팩을 받으셨을경우\n1) 지자체에서 설치한 "아이스팩 전용 수거함"이 근처에 있는지 찾아 보세요\n2) 팩을 개봉해 소금을 넣어 용해시킨 후 하수도에 버려주세요\n3) 팩을 개봉해 내용물을 건조시켜 부피를 확 줄인 후 종량제 봉투에 넣어 버려주세요.\n4) 화분위에 뿌려주시면 흙을 촉촉하게 유지시킵니다.\n5) 개봉하여 내용물을 빈용기에 담아 냉장고 탈취제로 사용할 수 있어요.\n6) 개봉하여 내용물에 아로마 오일이나 향수를 넣으면 방향제로 쓸수 있어요.\n(모기가 기피하는 아로마오일류를 넣어 유산지로 감싸 실로 묶어 놓으면 천연 모기향이 될 수 있어요)\n7) 여름 캠핑이나 물놀이 가실때 냉기 보존용으로 사용하세요.\n※저희도 회수를 하여 재활용 하고싶으나 회수비용과  위생상의 문제로 수거하지 못하는점 양해 부탁드립니다.' },
    { question: '[반찬해결사] 맛있게 이용할 수 있는 팁을 알려드려요♡', answer: '안녕하세요 반찬해결사입니다! \n성분표시 방법이 변경 되었습니다.\n기존 송장 전체 기입 -> 송장 QR코드로 대체 됩니다.\nQR코드를 찍어 보시면 당일 식단 성분표와 실제 배송 사진 표기 됩니다.\n요리에 서투르신 분들도 잘 활용할 수 있도록 조리방법 꿀팁도 있으니 많은 이용 부탁 드립니다. ' },
    { question: '※ 11+1 이벤트시 12회 무료식단은 일반식단으로 출고가 됩니다.', answer: '안녕하세요. 반찬해결사입니다.\n앞서 항상 반찬해결사를 이용해 주시는 고객님들께 죄송하다는 말씀 먼저 올립니다.\n이전에는 11+1 이벤트 이용시 11회 식단 모두 1.5배 더담기를 하실 경우 \n무료식단에도 1.5배 식단으로 보내드렸습니다.\n새롭게 바뀐 반찬해결사에서는\n11+1 전체식단 1.5배 하였을 경우 무료식단은 일반으로 출고가 되는 점 양해 부탁드립니다.\n앞으로 더 나은 반찬해결사가 될 수 있도록 노력하겠습니다.\n감사합니다.' },
    { question: '주소 오기재로 인한 배송 안내(새벽배송의 경우)', answer: '카카오 또는 네이버 연동시 간편하게 회원가입이 되다보니,\n간혹 일부 고객님께서 주소지 및 연락처가 등록이 되어 있지 않는 분들이 계십니다. \n새벽배송 특성상 비대면 배송이기 때문에\n기본주소지는 적어주셨으나 상세주소지에 동,호수를 적어주시지 않으시면\n배송이 되지 않고, 자동으로 반송처리가 됩니다.\n꼭! 주문시에는 기본주소+상세주소지 확인 부탁드립니다. \n감사합니다.' },

    { question: '[반찬해결사] 아이스팩 변경 안내 ( 아이스젤팩 - > 친환경 아이스팩 )', answer: '안녕하세요. 반찬해결사입니다. \n저희 반찬해결사 아이스팩이 기존 아이스젤팩 -> 친환경 아이스팩으로 변경되었습니다.\n워터팩 보다는 더 신선함을 오래 보존할 수 있는 미세플라스틱이 없는 친환경 젤팩입니다.\n하수구에 버려도 잘 녹지만, 적당량씩 하수구에 배출 부탁드립니다^^' },



  ];

  // 페이지에 맞춰 항목을 잘라내는 함수
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = infoData
    .filter(info => info.question.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="info-container">
      <h1 className="info-title">공지사항</h1> 
      <div className="search-container">
        <input
          type="text"
          className="info-search"  
          placeholder="질문을 검색하세요..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="search-button" onClick={handleSearchClick}>검색</button>
      </div>

      <div className="info-list"> 
        {currentItems.map((info, index) => (
          <div key={index} className="info-item"> 
            <div
              className="info-question" 
              onClick={() => toggleQuestion(index)}
            >
              {info.question}
              <span className={`arrow ${openIndexes.includes(index) ? 'open' : ''}`}>▼</span>
            </div>
            <div
              className={`info-answer ${openIndexes.includes(index) ? 'open' : ''}`} 
            >
              {info.answer.split('\n').map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="info-pagination">
        {Array.from({ length: Math.ceil(infoData.length / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Info;
