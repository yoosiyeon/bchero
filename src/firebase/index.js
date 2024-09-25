// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, getDocs, collection, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase 설정 정보
const firebaseConfig = {
  apiKey: "AIzaSyBAay9py108UDekSmLA5BtAPROO1Zb1Efc",
  authDomain: "bchero-951a3.firebaseapp.com",
  projectId: "bchero-951a3",
  storageBucket: "bchero-951a3.appspot.com",
  messagingSenderId: "924372886498",
  appId: "1:924372886498:web:40a44d1e237e10b1c9cfbb"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firestore와 Firebase Auth 가져오기
export const db = getFirestore(app);
export const auth = getAuth(app);

// 장바구니를 Firestore 사용자 문서에 저장하는 함수
export const saveCartToUser = async (userId, cart) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { cart }, { merge: true });
    console.log('Cart saved to user document');
  } catch (error) {
    console.error('Error saving cart to user document: ', error);
  }
};

// Firestore 사용자 문서에서 장바구니를 불러오는 함수
export const loadCartFromUser = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data().cart || [];
    } else {
      console.log('No such document!');
      return [];
    }
  } catch (error) {
    console.error('Error loading cart from user document: ', error);
    return [];
  }
};

// 장바구니 항목을 Firestore 사용자 문서에서 제거하는 함수
export const removeItemFromUserCart = async (userId, item) => {
  const userRef = doc(db, 'users', userId);
  try {
    await updateDoc(userRef, {
      cart: arrayRemove(item)
    });
    console.log('Item removed from user cart');
  } catch (error) {
    console.error('Error removing item from user cart: ', error);
  }
};

// 주문을 Firestore 사용자 문서에 저장하는 함수
export const saveOrderToUser = async (userId, order) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { orders: arrayUnion(order) }, { merge: true });
    console.log('Order saved to user document');
  } catch (error) {
    console.error('Error saving order to user document: ', error);
  }
};

// 사용자의 모든 주문을 불러오는 함수
export const loadOrdersFromUser = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data().orders || [];
    } else {
      console.log('No such document!');
      return [];
    }
  } catch (error) {
    console.error('Error loading orders from user document: ', error);
    return [];
  }
};

// 배송 세부 정보를 Firestore 사용자 문서에 저장하는 함수
export const saveShippingDetailsToUser = async (userId, shippingDetails) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { shippingDetails }, { merge: true });
    console.log('Shipping details saved to user document');
  } catch (error) {
    console.error('Error saving shipping details to user document: ', error);
  }
};

// Firestore 사용자 문서에서 배송 세부 정보를 불러오는 함수
export const loadShippingDetailsFromUser = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data().shippingDetails || {};
    } else {
      console.log('No such document!');
      return {};
    }
  } catch (error) {
    console.error('Error loading shipping details from user document: ', error);
    return {};
  }
};
