import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./checkout.module.css";
import bu from '../images/bu.png';
import pv from '../images/pv.png';
import cc from '../images/cc.png';
import l2 from '../images/liner2.png';
import fn1 from '../images/final.png';

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

  const mc = "http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732168937/f8wzlrbubhdaftfzv6wl.png";
  const pj = "http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732169051/bpbwgyfpqtlj81bgzrfz.png";
  const kf = "http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732169073/vicjxosa0cxwzikn5ehn.png";
  const te = "http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732169127/rdgawyjykuq77jhtlx9p.png";
  const bk = "http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732169162/yaqkuqwnyqq58inqfgfd.png";
  const sh = "http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732169200/xgyshqqj4kou9uek0cdv.png";
  const cps = 'http://res.cloudinary.com/dgkcgjcw5/image/upload/v1733072079/l0vxih4qbimazhoymg3h.png';

  // Handle fetching cart items
  const payment = () => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
        navigate("/login");
    } else {
        console.log("Subtotal being passed:", subtotal); // Log for debugging
        console.log("Cart Items being passed:", cartItems); // Log for debugging
        navigate('/payment', { state: { cartItems, subtotal : subtotal} });
    }
};

  useEffect(() => {
    let cartData;
    let cartSubtotal = 0;

    const parseHashParams = () => {
        const hash = window.location.hash; // e.g., "#/checkout?cartData=...&subtotal=..."
        const queryString = hash.includes("?") ? hash.split("?")[1] : ""; // Extract query string after "?"
        const params = new URLSearchParams(queryString); // Parse the query string

        const encodedCartData = params.get("cartData");
        const subtotal = params.get("subtotal");

        if (encodedCartData) {
            // Decode and parse the cart data from URL parameters
            try {
                cartData = JSON.parse(decodeURIComponent(encodedCartData));
                cartSubtotal = parseFloat(subtotal || 0);
                // Calculate subtotal if subtotal is missing
                if (cartSubtotal === 0) {
                    cartSubtotal = cartData.reduce((total, item) => {
                        if (item.price && item.quantity) {
                            return total + item.price * item.quantity;
                        }
                        return total;
                    }, 0);
                }
            } catch (error) {
                console.error("Error decoding or parsing cart data:", error);
            }
        } else {
            // Fallback: If no cartData in URL, fetch from localStorage (persistent storage)
            const savedCart = localStorage.getItem("cartItems");
            const savedSubtotal = localStorage.getItem("subtotal");
            if (savedCart) {
                cartData = JSON.parse(savedCart);
                cartSubtotal = savedSubtotal ? parseFloat(savedSubtotal) : 0;
            }
        }
    };

    parseHashParams();

    // Update state only if cart data is valid
    if (cartData) {
        setCartItems(cartData);
        setSubtotal(cartSubtotal);
        console.log("Cart data from URL or localStorage:", cartData);
        console.log("Calculated subtotal:", cartSubtotal); // Debugging output
    } else {
        console.warn("No valid cart data found.");
        alert("Cart data is missing. Please check the URL or start a new shopping session.");
        // Optional: Provide a way for users to go back to the homepage or another relevant page
        // window.location.href = "/"; // Uncomment if you want to redirect the user
    }
}, []); // Runs on component mount

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
  
  // Calculate total price and item count dynamically
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Navigate to address page
  const deliver = () => {
    navigate("/address", { state: { cartItems, subtotal } });
  };

  // Payment button click handler


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
<div className={styles.cab}>
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
      <div className={styles.pay}>
        <button onClick={payment}><img src={cps} className={styles.cp1} /></button>
      </div>

      <div>
        <div className={styles.sr}><h1>Similar Restaurants</h1></div>
        <div className={styles.resicons}>
          <div><img src={mc} alt='selec' className={styles.mc1} /></div>
          <div><img src={pj} alt='selec' className={styles.pj1} /></div>
          <div><img src={kf} alt='selec' className={styles.kf1} /></div>
          <div><img src={te} alt='selec' className={styles.te1} /></div>
          <div><img src={bk} alt='selec' className={styles.bk1} /></div>
          <div><img src={sh} alt='selec' className={styles.sh1} /></div>
        </div>
      </div>
      <div className={styles.fns}>
        <img src={fn1} className={styles.frt} />
      </div>
      </div>
    </>
  );
};

export default CheckoutPage;
