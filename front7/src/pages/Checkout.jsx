import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./checkout.module.css";
import bu from '../images/bu.png';
import pv from '../images/pv.png';
import cc from '../images/cc.png';
import l2 from '../images/liner2.png';
import fn1 from '../images/final.png'

const CheckoutPage = () => {
    
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const classImages = {
    burgers: bu,
    fries: pv,
    drinks: cc,
  };
  const mc="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732168937/f8wzlrbubhdaftfzv6wl.png"
  const pj="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732169051/bpbwgyfpqtlj81bgzrfz.png"
  const kf="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732169073/vicjxosa0cxwzikn5ehn.png"
  const te="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732169127/rdgawyjykuq77jhtlx9p.png"
  const bk="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732169162/yaqkuqwnyqq58inqfgfd.png"
  const sh="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732169200/xgyshqqj4kou9uek0cdv.png"
  const cps='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1733072079/l0vxih4qbimazhoymg3h.png'
  // Handle fetching cart items
  useEffect(() => {
    if (location.state?.cartItems) {
      // Cart items passed via navigation state

      
      setCartItems(location.state.cartItems);
      setSubtotal(location.state.subtotal || 0);
    } else {
      // Fallback: Get cart data from localStorage
      const savedCart = localStorage.getItem("cartItems");
      const savedSubtotal = localStorage.getItem("subtotal");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
        setSubtotal(savedSubtotal ? parseFloat(savedSubtotal) : 0);
      }
    }
  }, [location.state]);

  // Calculate total price and item count
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cartId = urlParams.get("cartId");
    console.log("Cart ID:", cartId);
  
    if (cartId) {
      const sharedCart = localStorage.getItem(`cart_${cartId}`);
  
      if (sharedCart) {
        setCartItems(JSON.parse(sharedCart));
        setSubtotal(
          JSON.parse(sharedCart).reduce(
            (total, item) => total + item.price * item.quantity,
            0
          )
        );
      } else {
        console.warn("Cart not found for the shared cart ID.");
        alert('Cart not found. Please make sure the cart ID is correct.');
        window.location.href = '/'; 
      }
    }
  }, []);

  // Navigate to address page
  const deliver = () => {
    navigate("/address", { state: { cartItems, subtotal } });
  };

  // Payment button click handler
  const payment = () => {
    const isLoggedIn = localStorage.getItem("token");
    console.log('islogged?' ,isLoggedIn) // Check if user is logged in
    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      navigate("/#/login");
    } else {
      // Navigate to payment page if logged in
      navigate('/#/payment' ,{ state:  { cartItems, subtotal: subtotal } });
    }
  };

  const yord = "http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732650313/edmgcbwaxxx0ks2bffdv.png";
  const de2 = "http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732730768/hssadolzpisq0lg0knw9.png";

  return (
    <>
      <div className={styles.hed}>
        <img src={yord} className={styles.hd2} alt="Header" />
      </div>

      <div className={styles.checkbox}>
        <ul className={styles.chec}>
          {cartItems.map((item) => (
            <li key={item.id} className={styles.item}>
              <img
                src={classImages[item.classtype]}
                alt={item.classtype}
                className={item.classtype === "drinks" ? styles.drk : styles.classImage}
              />
              <div className={styles.clm}>
              <div className={styles.itemname}>{item.name}</div>
              <div className={styles.itemprice}>₹{item.price}</div>
              <div className={styles.itemQuantity}>x {item.quantity} item</div>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.notescon}>Notes</div>
        <div className={styles.osc}>
          <input
            type="text"
            placeholder="Add order notes"
            className={styles.pl}
          />
        </div>
      </div>

      <div className={styles.delebtn} onClick={deliver}>
        <img src={de2} alt="Deliver" className={styles.de2} />
      </div>

      <div className={styles.sales}>
        <div className={styles.check1}>Items</div>
        <div className={styles.check2}>₹{totalAmount}</div>
        <div className={styles.check3}>Sales</div>
        <div className={styles.check4}>Tax</div>
        <div className={styles.check5}>₹10</div>
        <div className={styles.check6}>Subtotal ({totalItems} items)</div>
        <div className={styles.check7}>₹{subtotal}</div>
      </div>

      <div className={styles.liners}>
        <div className={styles.l3}>
          <img src={l2} alt="Line" className={styles.le2} />
        </div>
        <div className={styles.l3}>
          <img src={l2} alt="Line" className={styles.le3} />
        </div>
      </div>
      <div className={styles.pay}><button onClick={payment}><img src={cps} className={styles.cp1} /></button></div>

      <div>

        <div className={styles.sr}><h1>Similar Restaurants</h1></div>
      <div className={styles.resicons}>
<div><img src={mc} alt='selec' className={styles.mc1}></img></div>
<div><img src={pj} alt='selec' className={styles.pj1}></img></div>
<div><img src={kf} alt='selec' className={styles.kf1}></img></div>
<div><img src={te} alt='selec' className={styles.te1}></img></div>
<div><img src={bk} alt='selec' className={styles.bk1}></img></div>
<div><img src={sh} alt='selec' className={styles.sh1}></img></div>

</div>
      </div>
      <div className={styles.fns}>
        <img src={fn1} className={styles.frt} />

      </div>
    </>
  );
};

export default CheckoutPage;
