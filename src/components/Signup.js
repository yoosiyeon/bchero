import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './Signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrors({});

    let validationErrors = {};

    // 필수 입력 필드 확인
    if (!name) validationErrors.name = '이름을 입력하세요!';
    if (!username) validationErrors.username = '아이디를 입력하세요!';
    if (!email) validationErrors.email = '이메일을 입력하세요!';
    if (!phone) validationErrors.phone = '전화번호를 입력하세요!';
    if (!birthdate) validationErrors.birthdate = '생년월일을 입력하세요!';
    if (!address) validationErrors.address = '기본 주소를 입력하세요!';
    if (!detailAddress) validationErrors.detailAddress = '상세 주소를 입력하세요!';
    if (!password) validationErrors.password = '비밀번호를 입력하세요!';
    if (!confirmPassword) validationErrors.confirmPassword = '비밀번호 확인을 입력하세요!';

    // 비밀번호와 비밀번호 확인이 일치하는지 검사
    if (password && confirmPassword && password !== confirmPassword) {
      validationErrors.passwordMatch = '비밀번호가 일치하지 않습니다.';
    }

    // 비밀번호의 최소 길이 검증
    if (password && password.length < 6) {
      validationErrors.passwordLength = '비밀번호는 최소 6자 이상이어야 합니다.';
    }

    // 이메일 형식 검증
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailPattern.test(email)) {
      validationErrors.emailFormat = '유효한 이메일 주소를 입력하세요.';
    }

    // 생년월일 형식 검증 (예: YYYYMMDD)
    const birthdatePattern = /^\d{6}$/;
    if (birthdate && !birthdatePattern.test(birthdate)) {
      validationErrors.birthdateFormat = '생년월일은 6자리 숫자로 입력하세요 (예: 970101).';
    }

    if (!termsAccepted) validationErrors.terms = '약관 동의를 체크하세요!';

    // 유효성 검사 실패 시 오류 메시지 설정
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, 'users', user.uid), {
        name,
        username,
        email,
        phone,
        birthdate,
        address: `${address} ${detailAddress}`
      });

      navigate('/');
    } catch (err) {
      setErrors({ general: err.message });
    }
  };

  const handleBack = () => {
    navigate('/'); // 홈으로 변경완
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

        // 우편번호 추가
        const postcode = data.zonecode; // 우편번호 가져오기
        const addressWithPostcode = `(${postcode}) ${fullAddress}`;

        setAddress(addressWithPostcode);
      }
    }).open();
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      {errors.general && <p className="error-message">{errors.general}</p>}
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">이름</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="username">아이디</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
          {errors.passwordLength && <p className="error-message">{errors.passwordLength}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          {errors.passwordMatch && <p className="error-message">{errors.passwordMatch}</p>}
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
          {errors.emailFormat && <p className="error-message">{errors.emailFormat}</p>}
        </div>
        <div>
          <label htmlFor="phone">전화번호</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="birthdate">생년월일</label>
          <input
            id="birthdate"
            type="text"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            placeholder="예: 970101"
            required
          />
          {errors.birthdate && <p className="error-message">{errors.birthdate}</p>}
          {errors.birthdateFormat && <p className="error-message">{errors.birthdateFormat}</p>}
        </div>

        <div>
          <label htmlFor="address">주소</label>
          <div className="address-container">
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="기본 주소"
              required
            />
            <button type="button" onClick={loadPostcode}>주소찾기</button>
          </div>
          {errors.address && <p className="error-message">{errors.address}</p>}
          <input
            type="text"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
            placeholder="상세 주소를 입력하세요"
            required
          />
          {errors.detailAddress && <p className="error-message">{errors.detailAddress}</p>}
        </div>
        <div>
          <label htmlFor="terms">
            <input
              id="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            약관 동의
          </label>
          {errors.terms && <p className="error-message">{errors.terms}</p>}
        </div>
        <button type="submit">회원가입</button>
        <button className="signup-back-button"type="button" onClick={handleBack}>뒤로가기</button>
      </form>
    </div>
  );
}

export default Signup;
