import React from 'react'
import styles from './rest.module.css'
import { useState,useEffect,useRef } from 'react';
import plus from '../images/Plus.png';
import track2 from '../images/track2.png';
import id from '../images/id.png';
import clock2 from '../images/clock2.png';
import leaflet from "leaflet";
import eli from '../images/eli.png';
import marker from '../images/marker.png';
import selec1 from '../images/selec1.png';
import selec2 from '../images/selec2.png';
import trev from '../images/trev.png'
import final from '../images/final.png'
import rec5 from '../images/recplus.png'
import chose from '../images/choose.png'
import cpn from '../images/coupon.png'
import scd from '../images/scd.png'
import store from '../images/store.png'
import line from '../images/line9.png'
import checker from '../images/checker.png'
import fulcart from '../images/fulcart.png'
import { useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';


const Rest = () => {

  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();
  

  const menuItems = {
    bur1: { name: "Royal pack", price: "Rs 120" },
    bur2: { name: "Chicken", price: "Rs 150" },
    bur3: { name: "Veggie", price: "Rs 100" },
    bur4: { name: "DoubleBurger", price: "Rs 180" },
    fri1: { name: "Large French Fries", price: "Rs 60" },
    fri2: { name: "Cheese Fries", price: "Rs 80" },
    fri3: { name: "Spicy Curly Fries", price: "Rs 70" },
    fri4: { name: "Garlic Parmesan Fries", price: "Rs 90" },
    dri1: { name: "Coca Cola (500ml)", price: "Rs 50" },
    dri2: { name: "Lemonade", price: "Rs 40" },
    dri3: { name: "Iced Tea", price: "Rs 60" },
    dri4: { name: "Mango Smoothie", price: "Rs 90" },
  };

  // Initialize Leaflet map
  useEffect(() => {
    mapRef.current = leaflet.map(mapContainerRef.current).setView([51.505, -0.09], 13);

    leaflet
      .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      })
      .addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  // Retrieve saved cart items from local storage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart items to local storage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (id, name, price, classtype) => {
    const numericPrice = parseInt(price.replace("Rs ", ""), 10);
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === id);

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { id, name, price: numericPrice, quantity: 1, classtype }];
      }
    });
  };

  // Handle item click
  const handleImageClick = (id, name, price, classtype) => {
    if (!isCartVisible) {
      setIsCartVisible(true); // Show the cart on the first click
    }
    addToCart(id, name, price, classtype); // Add item to the cart
  };

  // Hide cart
  const hideCart = () => {
    setIsCartVisible(false);
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Handle checkout
  const handleCheckout = () => {
    const totalAmount = calculateTotal();
    const subtotal = totalAmount + 10; // Add Rs 10 to the total
    navigate("/checkout", { state: { cartItems, subtotal, totalAmount } });
  };
  useEffect(() => {
    if (userId) {
      const savedCart = localStorage.getItem(`cartItems_${userId}`);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const userCartKey = `cartItems_${userId}`;
      const savedCart = localStorage.getItem(userCartKey);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        setCartItems([]); 
      }
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      // If a user is logged in, retrieve cart items specific to that user
      const savedCart = localStorage.getItem(`cartItems_${userId}`);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        setCartItems([]); // Ensure empty cart if no saved items
      }
    } else {
      // If no user is logged in, use the general cart items (if any)
      const savedCart = localStorage.getItem("cartItems");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        setCartItems([]); // Ensure empty cart if no saved items
      }
    }
  }, [userId]);
  
  

  const toggleCart=()=>{

  }

  const mcdb='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732215057/p0mot6xlf3kqbsyv7uds.png'
  const mbr='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732259934/cozk0xicybqdwmcgqzjt.png'
  const rate='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732260170/ygspbwv1up5lrvbix66t.png'
  const r1='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732260406/yauytanfobjtz07bkepb.png'
  const notes='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732261771/y9ag7whkpjqvc8ggdvau.png'
  const bike='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732261895/elbyg6wmwxbwz74hdpne.png'
  const clock='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732262611/eetjixhacs4dotyheoi9.png'
  const sm='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732264431/a6dnkwyx74gviqdbli7l.png'
  const fod='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732269986/vh6gu8orq4lqn5gjepyp.png'
  const vd='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732270056/n6mk2bowij9cocvurytz.png'
  const ice='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732270086/ev6bypck3ouccszmuliy.png'
  const bg1="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732973902/qdo5vdfqhiuh4bt6tw4t.png"
  const bclass1='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732274841/j2jwagfqpgrodnyaztgb.png'
  const bclass2='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732274904/ckqug27w6saznikt2u3t.png'
  const bclass3='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732274927/hmzy80qxr3ixavevjvze.png'
  const fg='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732274968/okai2l6xk3c1qy85uxza.png'
  const fclass1='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732275034/qpdbgtsg3pfy4ymrk1nm.png'
  const fclass2='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732275060/twd7zejo3tkxonvfetb0.png'
  const fclass3='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732275083/b0vebambtjwyns2nbodk.png'
  const dg1='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732275229/tptxqyeibkrz6g1xp5ps.png'
  const dclass1='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732275267/j89spg12qv6yvwgdjnth.png'
  const dclass2="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732275392/t88fp7odcmlawagywfee.png"
  const dclass3="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732275414/q5u1yqnh5mznpqnytve8.png"
  const rev='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732361304/th7w7u7cdl2nzeypj52c.png'
  const mc="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732168937/f8wzlrbubhdaftfzv6wl.png"
  const pj="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732169051/bpbwgyfpqtlj81bgzrfz.png"
  const kf="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732169073/vicjxosa0cxwzikn5ehn.png"
  const te="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732169127/rdgawyjykuq77jhtlx9p.png"
  const bk="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732169162/yaqkuqwnyqq58inqfgfd.png"
  const sh="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732169200/xgyshqqj4kou9uek0cdv.png"
  const shcrt='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732958686/fwkhxmavayhh1i0dcnxf.png'


  
  const handleShare = () => {
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const subtotal = totalAmount + 10;  // Adding tax or additional charges
  
    // Serialize the cartItems array into a JSON string, then encode it for safe use in the URL
    const cartData = JSON.stringify(cartItems);
    const encodedCartData = encodeURIComponent(cartData);
  
    // Create the checkout URL with the encoded cart data and subtotal
    const checkoutUrl = `${window.location.origin}/#/checkout?cartData=${encodedCartData}&subtotal=${subtotal}`;
  
    // Store cart data in localStorage (for persistent storage across devices)
    localStorage.setItem("cartData", cartData);
  
    // Optionally, store it in sessionStorage for the current session
    sessionStorage.setItem("cartData", cartData);
  
    // Share URL using Web Share API or fallback method
    if (navigator.share) {
      navigator
        .share({
          title: "Checkout - My Order",
          url: checkoutUrl,
        })
        .then(() => console.log("Shared successfully!"))
        .catch((error) => console.error("Error sharing", error));
    } else {
      // Fallback for unsupported browsers (like Firefox desktop)
      const fallbackModal = document.createElement("div");
      fallbackModal.style.position = "fixed";
      fallbackModal.style.top = "50%";
      fallbackModal.style.left = "50%";
      fallbackModal.style.transform = "translate(-50%, -50%)";
      fallbackModal.style.padding = "20px";
      fallbackModal.style.backgroundColor = "#fff";
      fallbackModal.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
      fallbackModal.style.zIndex = "1000";
      fallbackModal.innerHTML = `
        <p>Copy the link below to share:</p>
        <input type="text" value="${checkoutUrl}" readonly style="width: 100%; margin-bottom: 10px;" />
        <button id="closeModal" style="margin-top: 10px;">Close</button>
      `;
  
      document.body.appendChild(fallbackModal);
  
      const closeModal = document.getElementById("closeModal");
      closeModal.addEventListener("click", () => {
        document.body.removeChild(fallbackModal);
      });
  
      // Automatically select the text in the input field for easy copying
      const inputField = fallbackModal.querySelector("input");
      inputField.focus();
      inputField.select();
    }
  };
  
  // Call this function when you want to trigger the sharing action

  
   
  

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  
  const getHiddenClass = (name) => {
    return searchTerm && name.toLowerCase().includes(searchTerm)
    ? styles.highlight
    : "";
    
  };
  const getHighlightClass = (key, name) => {
    return searchTerm && name.toLowerCase().includes(searchTerm)
      ? styles.highlight
      : "";
  };

  return (
    <>
    <div><img src={mcdb} alt="mcdb" className={styles.mcdb} /></div>
    <div><p className={styles.mcp}>I'm lovin' it!</p></div>
    <div><p className={styles.mcd1}>McDonald’s East London</p></div>
    <div><img src={mbr} alt="mbr" className={styles.mbr} /></div>
    <div><img src={rate} alt="rate" className={styles.rate} /></div>
    <div className={styles.min}><img src={notes} alt="notes" className={styles.notes} /><p className={styles.mo}>Minimum Order: 12 GBP</p></div>
    <div className={styles.min2}><img src={bike} alt="bike" className={styles.notes} /><p  className={styles.mo}>Delivery in 20-25 Minutes</p></div>
    <div className={styles.opens}><img src={clock} alt="clock" className={styles.clock} /><p className={styles.op}>Open until 3:00 AM</p></div>
    <div><p className={styles.ao}>All Offers from McDonald’s East London</p></div>
  
    <div className={styles.searchContainer}>
  <img src={sm} alt="sm" className={styles.sm} />
  <input
    type="text"
    className={styles.sem}
    placeholder="Search from menu..."
    onChange={handleSearchChange}
    value={searchTerm}
 
  />
</div>


<div className={styles.cl}>

  <ul className={styles.cl2}>
    <li className={styles.cl3}>Offers</li>
    <li  className={styles.cl3}>Burgers</li>
    <li  className={styles.cl3}>Fries</li>
    <li  className={styles.cl3}>Snacks</li>
    <li className={styles.cl3}>Salads</li>
    <li  className={styles.cl3}>Cold drinks</li>
    <li  className={styles.cl3}>Happy Meal®</li>
    <li  className={styles.cl3}>Deserts</li>
    <li  className={styles.cl3}>Hot drinks</li>
    <li  className={styles.cl3}>Sauces</li>
    <li  className={styles.cl3}>Orbit®</li>
  </ul>
</div>
<div className={`${styles.promo} ${isCartVisible ? styles['cart-active'] : ''}`}>
<div><img src={fod} alt="fod" className={styles.fod} /></div>
  <div><img src={vd} alt="vd" className={styles.vd} /></div>
   <div><img src={ice} alt="ice" className={styles.ice} /></div>
</div>

<div className={`${styles.share} ${isCartVisible ? styles['cart-active'] : ''}`}><button className={styles.sbtn} onClick={handleShare}>
  <img src={shcrt} alt='shr' className={styles.shr}></img>
  </button></div>


      <div className={`${styles['cart-box']} ${isCartVisible ? styles.active : ''}`}>
      <img src={fulcart} alt="mbr" className={styles.carter} />
    <div className={styles.itemsc}>
      {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className={styles.cartItem}>
             
              <p className={styles.cartPrice}>₹ {item.price}</p>
              <button onClick={() => removeFromCart(item.id)} className={styles.delbtn}><FontAwesomeIcon icon={faTrashCan} style={{color: "#fa0000",}} /></button>
               <p className={styles.cartele}>{item.name}</p>

            <div className={styles.qty}> <div className={styles.qty2}> <p className={styles.cartQuantity}>{item.quantity}x</p></div> {/* Display quantity */}</div>


            </div>
         
          ))

        ) : 
        
        (
          <p>No items in the cart yet.</p>
        )}
        
        <div></div>
<div className={styles.subTotal}>

                  <p className={styles.subAmount1}>Sub Total: <p className={styles.sa1}>₹{calculateTotal()}</p></p>
                  <p className={styles.subAmount2}>Discounts <p className={styles.sa2}>-₹3</p></p>
                  <p className={styles.subAmount3}>Delivery fee  <p className={styles.sa3}>₹3</p></p>
                </div>
<div className={styles.lastbox}>
<div className={styles.cartTotal}>
                  <p className={styles.totalAmount}>Total to pay : </p><p className={styles.amount2}>₹{calculateTotal()}.00</p>
                 <div><img src={chose} alt="mcdb" className={styles.chose1} /></div>
                 <div><img src={cpn} alt="mcdb" className={styles.cpn2} /></div>
                 <div><img src={scd} alt="mcdb" className={styles.scd2} /></div>
                 <div><img src={scd} alt="mcdb" className={styles.scd2} /></div>
                 <div><img src={store} alt="mcdb" className={styles.store2} /></div>
                 <div className={styles.stor}>
                 <p className={styles.coll}>Collection </p>
                 <p className={styles.tl}>starts at 16:50</p>
                 <div><img src={line} alt="mcdb" className={styles.line2} /></div>
                 </div>
                 <div className={styles.check}><img src={checker} alt="checker" className={styles.ch} /><button  onClick={handleCheckout}  className={styles.check1}>Checkout!</button></div>
                 


                </div>
                </div>
      </div>
      </div>
      
      
      
       
<div className={styles.bugs2}>Burgers
<div className={`${styles.adbtn} ${isCartVisible ? styles['cart-active'] : ''}`}>
    <div className={styles.a1}><img src={rec5} alt="notes" className={styles.adder1} onClick={() => handleImageClick("bur1", menuItems.bur1.name, menuItems.bur1.price,"burgers")} /></div>
     <div className={styles.a2}><img src={rec5} alt="notes" className={styles.adder2} onClick={() => handleImageClick("bur2", menuItems.bur2.name, menuItems.bur2.price,"burgers")}/></div>
     <div className={styles.a3}><img src={rec5} alt="notes" className={styles.adder3} onClick={() => handleImageClick("bur3", menuItems.bur3.name, menuItems.bur3.price,"burgers")}/></div>  
      <div className={styles.a4}> <img src={rec5} alt="notes" className={styles.adder4} onClick={() => handleImageClick("bur4", menuItems.bur4.name, menuItems.bur4.price,"burgers")}/></div>
      </div>
</div>
<div


  className={`${styles.burges} ${isCartVisible ? styles['cart-active'] : ''}`}
>
<div  >
<img src={bg1}
          alt="Royal Cheese Burger"
          className={`${styles.bur1} ${getHiddenClass(menuItems.bur1.name)}`} 
          onClick={() => handleImageClick("bur1", menuItems.bur1.name, menuItems.bur1.price,"burgers")}/>


  <div className={styles.plus2}><img src={plus} alt="vd" className={styles.plus} onClick={toggleCart}/> <div> <img src={rec5} alt="notes" className={styles.adder1} /></div></div></div>

<div ><img src={bclass1} alt="bclass1" onClick={() => handleImageClick("bur2", menuItems.bur2.name, menuItems.bur2.price,"burgers")} className={`${styles.bur2} ${getHiddenClass(menuItems.bur2.name)}`}  /></div>
<div  > <img src={bclass2}   onClick={() => handleImageClick("bur3", menuItems.bur3.name, menuItems.bur3.price,"burgers")} alt="bclass2" className={`${styles.bur3} ${getHiddenClass(menuItems.bur3.name)}`}  /></div>
<div ><img src={bclass3}   onClick={() => handleImageClick("bur4", menuItems.bur4.name, menuItems.bur4.price,"burgers")} alt="bclass3" className={`${styles.bur4} ${getHiddenClass(menuItems.bur4.name)}`}  /></div>
<div className={styles.bugs1}>Burgers</div>
</div>


<div
  className={`${styles.fries} ${isCartVisible ? styles['cart-active'] : ''}`}
>
<div className={styles.fries2}><p className={styles.fr2}>Fries</p></div>

  <div><img src={fg} alt="bg1" className={styles.fri1}    /></div>

<div><img src={fclass1} alt="bclass1" className={styles.fri2} /></div>
<div><img src={fclass2} alt="bclass2" className={styles.fri3} /></div>
<div ><img src={fclass3} alt="bclass3" className={styles.fri4} /></div>
<div className={styles.fries1}>Fries</div>
<div className={`${styles.fdbtn} ${isCartVisible ? styles['cart-active'] : ''}`}>
    <div className={styles.b1}><img src={rec5} alt="notes" className={styles.bdder1}  onClick={() => handleImageClick("fri1", menuItems.fri1.name, menuItems.fri1.price,"fries")}/></div>
     <div className={styles.b2}><img src={rec5} alt="notes" className={styles.bdder2}  onClick={() => handleImageClick("fri2", menuItems.fri2.name, menuItems.fri2.price,"fries")}/></div>
     <div className={styles.b3}><img src={rec5} alt="notes" className={styles.bdder3}  onClick={() => handleImageClick("fri3", menuItems.fri3.name, menuItems.fri3.price,"fries")}/></div>  
      <div className={styles.b4}> <img src={rec5} alt="notes" className={styles.bdder4}  onClick={() => handleImageClick("fri4", menuItems.fri4.name, menuItems.fri4.price,"fries")}/></div>
      </div>
</div>


<div
  className={`${styles.drinks} ${isCartVisible ? styles['cart-active'] : ''}`}
>
<div className={styles.drinks2}><p className={styles.dr2}>Cold </p><p className={styles.dr3}>Drinks</p></div>
<div className={`${styles.cdbtn} ${isCartVisible ? styles['cart-active'] : ''}`}>
    <div className={styles.b1}><img src={rec5} alt="notes" className={styles.cdder1}  onClick={() => handleImageClick("dri1", menuItems.dri1.name, menuItems.dri1.price,"drinks")}/></div>
     <div className={styles.b2}><img src={rec5} alt="notes" className={styles.cdder2}  onClick={() => handleImageClick("dri2", menuItems.dri2.name, menuItems.dri2.price,"drinks")}/></div>
     <div className={styles.b3}><img src={rec5} alt="notes" className={styles.cdder3}  onClick={() => handleImageClick("dri3", menuItems.dri3.name, menuItems.dri3.price,"drinks")}/></div>  
      <div className={styles.b4}> <img src={rec5} alt="notes" className={styles.cdder4}  onClick={() => handleImageClick("dri4", menuItems.dri4.name, menuItems.dri4.price,"drinks")}/></div>
      </div>
  <div ><img src={dg1} alt="bg1" className={styles.dri1}  /></div>

<div ><img src={dclass1} alt="bclass1" className={styles.dri2}  /></div>
<div ><img src={dclass2} alt="bclass2" className={styles.dri3}  /></div>
<div><img src={dclass3} alt="bclass3" className={styles.dri4}/></div>
<div className={styles.drinks1}>Cold Drinks</div>
</div>

<div className={`${styles.wb} ${isCartVisible ? styles['cart-active'] : ''}`}>

  <div className={styles.heds}>
    <p className={styles.di}>Delivery Information</p>
    <p className={styles.ci}>Contact Information</p>
    <p className={styles.ot}>Operational Times</p>
 </div>

 <div className={styles.pi}>
  <img src={track2} alt='track' className={styles.track}></img>
  <img src={id} alt='id' className={styles.id5}></img>
  <img src={clock2} alt='clock' className={styles.clock}></img>
 </div>

<div className={styles.days}>
<p>Monday:</p>
<p>Tuesday:</p>
<p>Wednesday:</p>
<p>Thursday:</p>
<p>Friday:</p>
<p>Saturday:</p>
<p>Sunday:</p>
<p>Estimated time until delivery:</p>
</div>


<div className={styles.time}>
<p className={styles.time1}> 12:00 AM–3:00 AM, 8:00 AM–3:00 AM</p>
<p className={styles.time2}> 8:00 AM–3:00 AM</p>
<p className={styles.time3}>8:00 AM–3:00 AM</p>
<p className={styles.time4}>8:00 AM–3:00 AM</p>
<p className={styles.time5}>8:00 AM–3:00 AM</p>
<p className={styles.time6}>8:00 AM–3:00 AM</p>
<p className={styles.time7}>8:00 AM–12:00 AM</p>
<p className={styles.time8}>20 min</p>
</div>

<div className={styles.infor}>
<p>If you have allergies or dietary </p>
<p>restriction,please contact the restaurant. The</p>
<p>restaurant will provide food-specific</p>
<p>information upon request</p>
<p className={styles.ph1}>Phone number</p>
<p className={styles.ph2}>+934443-43</p>
<p className={styles.web}>Website</p>
<p className={styles.li}>http://mcdonalds.uk/</p>

</div>
<div className={styles.clc}>
<p>Monday:</p>
<p>Tuesday:</p>
<p>Wednesday:</p>
<p>Thursday:</p>
<p>Friday:</p>
<p>Saturday:</p>
<p>Sunday:</p>
</div>

<div className={styles.clc1}>
<p className={styles.cl2}> 8:00 AM–3:00 AM</p>
<p className={styles.cl8}>8:00 AM–3:00 AM</p>
<p className={styles.cl4}>8:00 AM–3:00 AM</p>
<p className={styles.cl5}>8:00 AM–3:00 AM</p>
<p className={styles.cl6}>8:00 AM–3:00 AM</p>
<p className={styles.cl7}>8:00 AM–3:00 AM</p>
<p className={styles.cl9}>8:00 AM–3:00 AM</p>
</div>

<div className ={styles.maps}  id="map" ref={mapContainerRef} style={{ height: '990px', width: '100%' }}>


</div>
<div className={styles.mbox}>

  
  <div className={styles.pel}>
<p className={styles.dol}>McDonald's</p>
<p className={styles.city}>South London</p>
<p className={styles.add}>Tooley St, London Bridge, London SE1 2TF,</p>
<p className={styles.add2}>United Kingdom</p>
<p className={styles.num1}>Phone number</p>
<p className={styles.num2}>+934443-43</p>
<p className={styles.we1}>Website</p>
<p className={styles.we2}>http://mcdonalds.uk/</p>

</div>
<div className={styles.icons1}>
  
  <p className={styles.im}>McDonald's</p>
  <p className={styles.sl}>South London</p>


  
</div>
<div className={styles.eli2}><img src={eli} alt='eli' className={styles.eli1}></img></div>
  <div className={styles.marker2}><img src={marker} alt='mark' className={styles.mark}></img></div>
</div>
      </div>

      <div className={`${styles.re1}  ${isCartVisible ? styles['cart-active'] : ''}`}>


        <div className={styles.cr1}> <p className={styles.cr2}>Customer Reviews</p></div>
        <div className={styles.selectors}>
        <div className={styles.selc}><img src={selec1} alt='selec' className={styles.sel1}></img></div>
        <div className={styles.selc2}><img src={selec2} alt='selec2' className={styles.sel2}></img></div>
        </div>

        <div className={styles.rev1}>
          <div className={styles.revbox}>
          <div className={styles.revs}><img src={rev} alt='selec' className={styles.revi1}></img></div>
          <div className={styles.revs}><img src={rev} alt='selec' className={styles.revi2}></img></div>
          <div className={styles.revs}><img src={rev} alt='selec' className={styles.revi3}></img></div>
          </div>
        </div>
       </div>
<div><img src={trev} alt='selec' className={styles.tr}></img></div>

<div className={styles.res1}><p>Similar Restaurants</p></div>

<div className={styles.resicons}>
<div><img src={mc} alt='selec' className={styles.mc1}></img></div>
<div><img src={pj} alt='selec' className={styles.pj1}></img></div>
<div><img src={kf} alt='selec' className={styles.kf1}></img></div>
<div><img src={te} alt='selec' className={styles.te1}></img></div>
<div><img src={bk} alt='selec' className={styles.bk1}></img></div>
<div><img src={sh} alt='selec' className={styles.sh1}></img></div>

</div>
<div>
<img src={final} alt='final' className={styles.final2}></img>
</div>
    </>
    

  )
}

export default Rest
