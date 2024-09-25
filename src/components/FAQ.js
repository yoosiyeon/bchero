import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FAQ.css';

function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndexes, setOpenIndexes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [faqsPerPage] = useState(4); // 페이지 당 3개의 FAQ 표시
  const navigate = useNavigate(); 

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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

  const faqData = [
    { question: 'Q  반찬 중량은 어떻게 되나요?', answer: '저의 반찬해결사의 기본 식단은 2.5인분에서 3인분량 정도 입니다.\n기본중량은 국 800g이상, 메인찬 300g~ 400g, 보조찬 100g~150g으로 제공됩니다. \n단, 홈페이지와 성분표시 용지에 보시면 부피에 비해 중량이 현저히 낮은 음식[튀김류(돈까스,생선까스,너비아니 등) 마른반찬(어채등)류, 기타]인 경우 당일 성분표시에 제공되는 반찬의 갯수 또는 조정된 중량표시를 해드리고 있습니다. \n해당 부분 참고해 주시면 감사하겠습니다. 감사합니다.' },
    { question: 'Q  주문 & 변경 & 취소', answer: '주문하신 상품은 고객님의 배송요청일 2일전(주말 및 공휴일 제외)까지 고객센터 & 1:1채팅문 & 게시글을 통하여 변경, 취소가 가능합니다. \n변경, 취소의 도움이 필요하실 경우 고객센터 070-4786-0030 으로 전화 주시기 바랍니다.\n 고객님의 배송요청일 1일전 이른 아침에 조리하여 오후에 출고합니다. \n식품의 특성상 배송일 전에 조리해야 하고, 조리한 식품이 배송되지 못하면 폐기해야 하는 특성이 있습니다. \n갑작스런 고객님의 사정 (배송지에 받을 분이 안계시는 등)이 있을 수 있지만 저희 어려움을 이해해 주셨으면 합니다.' },
    { question: 'Q 미배송&배송지연&파손문의', answer: '※ 미배송 & 배송지연 &파손\n 미배송& 배송지연 & 파손경우 고객센터 & 1:1채팅문의 & 게시글에 \n*필수입력 사항(주문해주신고객님)\n-성함:\n-핸드폰번호:\n-주문번호: \n-문의 유형:  \n▶필수기입란 입력해주시면 확인 후 순차적으로 연락드리고 있습니다. ' },
    { question: 'Q [아이스팩] 아이스팩은 어떻게 버려야 하나요?', answer: '※ 젤팩을 받으셨을경우\n1) 지자체에서 설치한 "아이스팩 전용 수거함"이 근처에 있는지 찾아 보세요\n2) 팩을 개봉해 소금을 넣어 용해시킨 후 하수도에 버려주세요\n3) 팩을 개봉해 내용물을 건조시켜 부피를 확 줄인 후 종량제 봉투에 넣어 버려주세요.\n4) 화분위에 뿌려주시면 흙을 촉촉하게 유지시킵니다.\n5) 개봉하여 내용물을 빈용기에 담아 냉장고 탈취제로 사용할 수 있어요.\n6) 개봉하여 내용물에 아로마 오일이나 향수를 넣으면 방향제로 쓸수 있어요.\n(모기가 기피하는 아로마오일류를 넣어 유산지로 감싸 실로 묶어 놓으면 천연 모기향이 될 수 있어요)\n7) 여름 캠핑이나 물놀이 가실때 냉기 보존용으로 사용하세요.\n※저희도 회수를 하여 재활용 하고싶으나 회수비용과  위생상의 문제로 수거하지 못하는점 양해 부탁드립니다.' },
    { question: 'Q 정말 3인분이 맞나요?', answer: '네 3인분이 맞습니다.\n편의점 도시락을 드시면 반찬이 조금 부족하다고 느끼실때가 있으시죠?\n도시락 제조업체에서는 1인분에 대한 기준이 집에서 드시는것과 조금 다르기 때문입니다.\n도시락 제조업체는 주찬 150g, 보조찬 50g이 보통의 1인분으로 기준을 잡습니다.\n이 기준에 맞춰 따라 반찬해결사의 기본 중량이 3인분이라고 말씀드리는 것입니다.\n감사합니다.' },
    { question: 'Q 미배송&배송지연&파손문의', answer: '※ 미배송 & 배송지연 &파손\n 미배송& 배송지연 & 파손경우 고객센터 & 1:1채팅문의 & 게시글에 \n*필수입력 사항(주문해주신고객님)\n-성함:\n-핸드폰번호:\n-주문번호: \n-문의 유형:  \n▶필수기입란 입력해주시면 확인 후 순차적으로 연락드리고 있습니다. ' },
    { question: 'Q [아이스팩] 아이스팩은 어떻게 버려야 하나요?', answer: '※ 젤팩을 받으셨을경우\n1) 지자체에서 설치한 "아이스팩 전용 수거함"이 근처에 있는지 찾아 보세요\n2) 팩을 개봉해 소금을 넣어 용해시킨 후 하수도에 버려주세요\n3) 팩을 개봉해 내용물을 건조시켜 부피를 확 줄인 후 종량제 봉투에 넣어 버려주세요.\n4) 화분위에 뿌려주시면 흙을 촉촉하게 유지시킵니다.\n5) 개봉하여 내용물을 빈용기에 담아 냉장고 탈취제로 사용할 수 있어요.\n6) 개봉하여 내용물에 아로마 오일이나 향수를 넣으면 방향제로 쓸수 있어요.\n(모기가 기피하는 아로마오일류를 넣어 유산지로 감싸 실로 묶어 놓으면 천연 모기향이 될 수 있어요)\n7) 여름 캠핑이나 물놀이 가실때 냉기 보존용으로 사용하세요.\n※저희도 회수를 하여 재활용 하고싶으나 회수비용과  위생상의 문제로 수거하지 못하는점 양해 부탁드립니다.' },
    { question: 'Q  반찬 중량은 어떻게 되나요?', answer: '저의 반찬해결사의 기본 식단은 2.5인분에서 3인분량 정도 입니다.\n기본중량은 국 800g이상, 메인찬 300g~ 400g, 보조찬 100g~150g으로 제공됩니다. \n단, 홈페이지와 성분표시 용지에 보시면 부피에 비해 중량이 현저히 낮은 음식[튀김류(돈까스,생선까스,너비아니 등) 마른반찬(어채등)류, 기타]인 경우 당일 성분표시에 제공되는 반찬의 갯수 또는 조정된 중량표시를 해드리고 있습니다. \n해당 부분 참고해 주시면 감사하겠습니다. 감사합니다.' },
  ];

  // 현재 페이지에 표시할 FAQ 데이터 계산
  const indexOfLastFaq = currentPage * faqsPerPage;
  const indexOfFirstFaq = indexOfLastFaq - faqsPerPage;
  const currentFaqs = faqData.slice(indexOfFirstFaq, indexOfLastFaq);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(faqData.length / faqsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="faq-container">
      <h1 className="faq-title">FAQ</h1>

      <div className="search-container">
        <input
          type="text"
          className="faq-search"
          placeholder="질문을 검색하세요..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="search-button" onClick={handleSearchClick}>검색</button>
      </div>

      <div className="faq-list">
        {currentFaqs
          .filter(faq => faq.question.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((faq, index) => (
            <div key={index} className="faq-item">
              <div
                className="faq-question"
                onClick={() => toggleQuestion(index)}
              >
                {faq.question}
                <span className={`arrow ${openIndexes.includes(index) ? 'open' : ''}`}>
                  {openIndexes.includes(index) ? '▲' : '▼'}
                </span>
              </div>
              <div className={`faq-answer ${openIndexes.includes(index) ? 'open' : ''}`}>
                {faq.answer.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
      </div>

      <div className="faq-pagination">
  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      className={currentPage === index + 1 ? 'active' : ''}
      onClick={() => paginate(index + 1)}
    >
      {index + 1}
    </button>
  ))}
</div>

    </div>
  );
}

export default FAQ;
