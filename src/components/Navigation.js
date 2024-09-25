import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';  
import { signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import './Navigation.css';
import logo from '../assets/images/logowhite.png';



const db = getFirestore();

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          setUserProfile(userSnap.data());
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('User signed out');
      setUser(null);
      setUserProfile(null);
    });
  };

  return (
    <div>
      <div className="navigation-bar">
        <div className="nav-logo">
        
          <Link to="/"><img src={logo} alt="로고" className="logo-image" /> 반찬해결사</Link>
        </div>
        <div className="nav-hamburger" onClick={toggleSidebar}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <span></span>
          <button className="close-btn" onClick={toggleSidebar}>X</button>
        </div>
        <div className="sidebar-content">
        {user ? (
            <>
              <span>반가워요 {userProfile ? userProfile.name : user.name} 님</span>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleSidebar}>Login</Link>
              <Link to="/signup" onClick={toggleSidebar}>Signup</Link>
            </>
          )}
          <Link to="/cart" onClick={toggleSidebar}>장바구니</Link>
          <Link to="/payment" onClick={toggleSidebar}>결제</Link>
          <Link to="/order-history" onClick={toggleSidebar}>주문내역</Link>
          <Link to="/info" onClick={toggleSidebar}>공지사항</Link>
          <Link to="/faq" onClick={toggleSidebar}>FAQ</Link>
          <Link to="/event" onClick={toggleSidebar}>이벤트</Link>
          <Link to="/how-to-use" onClick={toggleSidebar}>이용방법</Link>

        </div>
      </div>
    </div>
  );
}

export default Navigation;
