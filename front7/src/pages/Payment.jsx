import React, { useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import styles from "./payment.module.css";
import fnl from '../images/final.png';

const Payment = () => {
  const [showDebitCardPopup, setShowDebitCardPopup] = useState(false); 
  const [debitCardName, setDebitCardName] = useState(""); 
  const [savedDebitCards, setSavedDebitCards] = useState([]); 
  const userId = localStorage.getItem("userId");

  const wallet = "http://res.cloudinary.com/dgkcgjcw5/image/upload/v1733054890/ihruvbysp5gqcpavkows.png";
  const chp = "http://res.cloudinary.com/dgkcgjcw5/image/upload/v1733055042/oqex2yciqrclq4ppfoxn.png";
  const php = "http://res.cloudinary.com/dgkcgjcw5/image/upload/v1733057836/xk4cbxiopnpicbf5or7s.png";
  const menu = 'http://res.cloudinary.com/dgkcgjcw5/image/upload/v1733064193/zfl2hedebo6flcwrrlrx.png';
  

  const navigate=useNavigate()

  // Get subtotal passed from CheckoutPage via navigation state
  const location = useLocation();
  const [subtotal, setSubtotal] = useState(0);

const payer=()=>{
  if (location.state && location.state.cartItems && location.state.subtotal) {
    navigate('/success', { state: { cartItems: location.state.cartItems, subtotal: location.state.subtotal } });
  } else {
    console.error("Cart items or subtotal not found in location.state");
    // Optionally, navigate to an error page or show a warning
  }
}

  useEffect(() => {
    if (location.state?.subtotal) {
      setSubtotal(location.state.subtotal);
    }
  }, [location.state]);

  useEffect(() => {
    if (userId) {
      const storedDebitCards = localStorage.getItem(`cards_${userId}`);
      if (storedDebitCards) {
        setSavedDebitCards(JSON.parse(storedDebitCards));
      }
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem(`cards_${userId}`, JSON.stringify(savedDebitCards));
    }
  }, [savedDebitCards, userId]);

  const toggleDebitCardPopup = () => {
    setShowDebitCardPopup(!showDebitCardPopup);
    setDebitCardName(""); 
  };

  const saveDebitCard = () => {
    if (debitCardName.trim()) {
      setSavedDebitCards([...savedDebitCards, debitCardName.trim()]);
      toggleDebitCardPopup();
    } else {
      alert("Card name cannot be empty!");
    }
  };

  return (
    <div className={styles.paymentContainer}>
      <div className={styles.wall5}>
        <img src={wallet} className={styles.dcs} alt="Wallet Icon" />
      </div>
      <div>
        <img src={chp} className={styles.ck} alt="Other Icon" />
      </div>
      <div className={styles.pop1}>
        <img src={php} className={styles.co} alt="Payment Icon" onClick={payer}/>
      </div>
      <div className={styles.amount}></div>
      <div className={styles.amt}>Amount to be paid <div className={styles.amtcon}>₹{subtotal}</div></div>

      {/* Display subtotal near Amount to be paid */}
      <div className={styles.subtotal}>

      </div>

      {/* Button to open debit card popup */}
      <button className={styles.addCardButton} onClick={toggleDebitCardPopup}>
        <img src={menu} className={styles.mnu} />
      </button>

      <div className={styles.savedCards}>
        {savedDebitCards.length > 0 ? (
          savedDebitCards.map((card, index) => (
            <div key={index} className={styles.cardDisplay}>
              <div className={styles.cardCircle}>
                {card[0]?.toUpperCase() || "?"}
              </div>
              <div className={styles.cardName}>{card}</div>
            </div>
          ))
        ) : (
          <p className={styles.noCardsMessage}>No cards added yet.</p>
        )}
      </div>

      {showDebitCardPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2 className={styles.popupTitle}>Add Debit Card</h2>
            <input
              type="text"
              placeholder="Enter Card Name"
              value={debitCardName}
              onChange={(e) => setDebitCardName(e.target.value)}
              className={styles.cardInput}
            />
            <div className={styles.popupButtons}>
              <button onClick={saveDebitCard} className={styles.saveButton}>
                Save
              </button>
              <button onClick={toggleDebitCardPopup} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.fnal}>
        <img src={fnl} className={styles.frd} alt="Final" />
      </div>
    </div>
  );
};

export default Payment;
