import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';  
import Main from './components/Main';  
import Order from './components/Order';
import Cart from './components/Cart';
import Payment from './components/Payment';
import PaymentComplete from './components/PaymentComplete';
import OrderHistory from './components/OrderHistory';
import Menu from './components/Menu';
import MenuDetail from './components/MenuDetail';
import FAQ from './components/FAQ';
import Info from './components/Info';
import Event from './components/Event';
import HowToUse from './components/HowToUse';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';  


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();  // Clean up the listener
  }, []);

  return (
    <Router>
      <div>
        <Navigation user={user} />
        <main>
          <Routes>
            <Route path="/" element={<Main />} /> 
            <Route path="/order" element={<Order />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment-complete" element={<PaymentComplete />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu-detail/:id" element={<MenuDetail />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/info" element={<Info />} />
            <Route path="/event" element={<Event />} />
            <Route path="/how-to-use" element={<HowToUse />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <footer>
        <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
