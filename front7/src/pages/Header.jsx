import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Home from './Home';
import Rest from './Rest';
import Register from './Register';
import Login from './Login';
import star from '../images/star.png';
import loc from '../images/loc.png';
import logo from '../images/logo.png';
import cartbutton from '../images/cartbutton.png';
import profile from '../images/profile.png';
import { Toaster } from 'react-hot-toast';
import styles from './header.module.css';
import Checkout from './Checkout';
import Profile from './Profile';
import Address from './Address';
import Payment from './Payment';
import Success from './Success';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/register' || location.pathname === '/login';

  const [userName, setUserName] = useState(localStorage.getItem('username')); // Initialize username from localStorage
  const [userAddress, setUserAddress] = useState({ state: '', city: '' });

  // Watch for changes in localStorage for username and address updates
  useEffect(() => {
    const storedUserName = localStorage.getItem('username');
    setUserName(storedUserName); // Update userName state when it changes in localStorage

    // Fetch the address from localStorage whenever username or userId changes
    const userID = localStorage.getItem('userId');
    if (userID) {
      const savedAddresses = localStorage.getItem(`addresses_${userID}`);
      if (savedAddresses) {
        const parsedAddresses = JSON.parse(savedAddresses);
        const firstAddress = parsedAddresses[0]; // Get the first address (assuming user has at least one address)
        if (firstAddress) {
          setUserAddress({ state: firstAddress.state, city: firstAddress.city });
        }
      }
    }
  }, [userName]); // Trigger effect whenever userName changes

  // Function to update the address in the Header component
  const updateUserAddress = (newAddress) => {
    setUserAddress(newAddress);
  };

const toCart=()=>{
  navigate('/restaurants',{ state: { toggleCart: true } })
}

  const handleLogout = () => {
    // Add logout logic here (e.g., clearing localStorage, redirecting to login page)
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    setUserName(null);
    setUserAddress({ state: '', city: '' });
    navigate('/login');
  };

  return (
    <>
      {!isAuthPage && (
        <div className={styles.headerdiv}>
          <div className={styles.headcon}>
            <div className={styles.offer}>
              <img src={cartbutton} alt="cart" className={styles.cartIcon} onClick={toCart}/>
              <img src={star} alt="Star Icon" className={styles.icon} />
              <div className={styles.getord}> Get 5% Off your first order,</div>
            </div>
            <div className={styles.promo}>Promo: ORDER5</div>
            <div className={styles.secondcon}>
              <img src={loc} alt="loc" className={styles.icon2} />
              {/* Position the address here */}
              <div className={styles.address2}>
                {userAddress.state && userAddress.city ? (
                  <p>{userAddress.state}, {userAddress.city}</p>
                ) : (
                  <p>Regent Street, A4, A4201, London</p>
                )}
              </div>
              <div className={styles.promo2}>
                <Link to="/address" className={styles.ltion}>Change Location</Link>
              </div>
            </div>
          </div>
          <div>
            <img src={logo} alt="Logo" className={styles.logo} onClick={handleLogout} />
          </div>
        </div>
      )}

      {!isAuthPage && (
        <div className={styles.navbar}>
          <ul className={styles.navbarList}>
            <li className={styles.navLink}><Link to="/">Home</Link></li>
            <li className={styles.navLink}><Link to="/browsemenu">Browse Menu</Link></li>
            <li className={styles.navLink}><Link to="/specialoffers">Special Offers</Link></li>
            <li className={styles.navLink}><Link to="/restaurants">Restaurants</Link></li>
            <li className={styles.navLink}><Link to="/trackorder">Track Order</Link></li>
          </ul>
        </div>
      )}

      {/* User Authentication Check */}
      {!isAuthPage && (
        <div className={styles.profileInfo}>
          {userName ? (
            <button className={styles.signup2} onClick={() => navigate('/profile')}>
              <img src={profile} alt="Profile" className={styles.profile2} />
              <div className={styles.tx2}>Hi ,{userName}</div>
            </button>
          ) : (
            <button className={styles.signup} onClick={() => navigate('/login')}>
              <img src={profile} alt="Profile" className={styles.profile} />
              <div className={styles.tx1}>Login/Sign up</div>
            </button>
          )}
        </div>
      )}
       {!isAuthPage && (
         <div className={styles.Addressinfo2}>
          <div className={styles.adrn}>
 {userAddress.state && userAddress.city ? (
                  <p>{userAddress.state}, {userAddress.city}</p>
                ) : (
                  <p>Regent Street, A4, A4201, London</p>
                )}

</div>
         </div>

)}




      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<Rest />} />
          <Route path="/register" element={<Register setUserName={(name) => setUserName(name)} />} />
          <Route path="/login" element={<Login setUserName={(name) => setUserName(name)} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/address" element={<Address updateUserAddress={updateUserAddress} />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<Success />} />
        </Routes>
        <Toaster />
      </div>
      
<div className={styles.carts2}> <img src={cartbutton} alt="cart" className={styles.cartIcon2} onClick={toCart}/></div>


    </>
  );
};

export default Header;
