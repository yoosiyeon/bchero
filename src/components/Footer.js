import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
      <img 
          src={require('../assets/images/logogray.png')} 
          alt="Company Logo" 
          style={styles.logo}
        />

        <div style={styles.companyInfo}>
          <p>회사명: 주식회사 디디에프앤씨</p>
          <p>대표: 김재범</p>
          <p>사업장 주소: 경기도 광주시 광남안로 104-20</p>
          <p>TEL: 070-4786-0030</p>
          <p>개인정보책임관리자: 이가희</p>
          <p>사업자등록번호: 456-85-01601</p>
          <p>COPYRIGHT ⓒ 2024. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    padding: '20px 0',
    textAlign: 'center',
    color: '#A6A6A6'
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  logo: {
    width: '40px',
  },
  companyInfo: {
    lineHeight: '0.5',
    fontSize: '14px',
    color: '#A6A6A6'
  }
};

export default Footer;
