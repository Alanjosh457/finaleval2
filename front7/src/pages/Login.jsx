import React, { useState } from "react";
import styles from "./register.module.css";
import { login } from "./index";
import toast from "react-hot-toast";
import logo from "../images/logo.png";
import final from "../images/final.png";
import { useNavigate } from "react-router-dom";

const Login = ({ setUserName }) => { // Added setUserName prop
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formErrors, setFormErrors] = useState({
    email: null,
    password: null,
  });

  const art =
    "http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732387428/kxvg1bu3kuhzwje2ltch.png";
  const into =
    "http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732389285/admjomtig3yl5amkdmky.png";

  // Real-time validation
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    setFormErrors((prevErrors) => {
      let updatedErrors = { ...prevErrors };
      switch (field) {
        case "email":
          updatedErrors.email =
            !value || !value.includes("@") || !value.includes(".")
              ? "Email is invalid"
              : null;
          break;
        case "password":
          updatedErrors.password = !value ? "Password is required" : null;
          break;
        default:
          break;
      }
      return updatedErrors;
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    let errors = false;

    // Reset all errors before validation
    setFormErrors({
      email: null,
      password: null,
    });

    // Validation
    if (!formData.email || !formData.email.includes("@") || !formData.email.includes(".")) {
      setFormErrors((prev) => ({ ...prev, email: "Email is invalid" }));
      errors = true;
    }

    if (!formData.password) {
      setFormErrors((prev) => ({ ...prev, password: "Password is required" }));
      errors = true;
    }

    if (errors) return;

    try {
      setLoading(true);
      const response = await login(formData);

      if (response.token) {
        toast.success(response.message);

        const currentUserId = localStorage.getItem("userId");

        if (currentUserId && currentUserId !== response.id) {
          // Only clear data if a different user is logging in
          localStorage.removeItem(`cartItems_${currentUserId}`);
          localStorage.removeItem(`addresses_${currentUserId}`);
          localStorage.removeItem(`cards_${currentUserId}`);
        }
        else {
          // If the same user logs in, restore previous data (if any)
          const previousCart = localStorage.getItem(`cartItems_${response.id}`);
          const previousAddresses = localStorage.getItem(`addresses_${response.id}`);
          const previousCards = localStorage.getItem(`cards_${response.id}`);
          
          // Restore previous data into state if it exists
          if (previousCart) {
            setCartItems(JSON.parse(previousCart));
          }
          if (previousAddresses) {
            setAddresses(JSON.parse(previousAddresses));
          }
          if (previousCards) {
            setCards(JSON.parse(previousCards));
          }
        }
    
        console.log(response);


        // Store username and token in localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.id);
        localStorage.setItem("username", response.name);
        localStorage.setItem("email", response.email);
        localStorage.setItem(`country_${response.id}`, response.country || ""); // Save country
        localStorage.setItem(`gender_${response.id}`, response.gender || ""); // Save gender
        localStorage.setItem(`cards_${response.id}`, JSON.stringify(response.cards) || []);
        localStorage.setItem("state", response.state || "");
      localStorage.setItem("city", response.city || ""); // Save cards

        console.log(response.email)  // Save username
        setUserName(response.name); // Update username in Header

        const userCartKey = `cartItems_${response.id}`;
        const existingCart = localStorage.getItem(userCartKey);
        if (!existingCart) {
          localStorage.setItem(userCartKey, JSON.stringify([])); // Initialize empty cart for this user if not present
        }
        const userAddressesKey = `addresses_${response.id}`;
        const savedAddresses = localStorage.getItem(userAddressesKey);
        if (!savedAddresses) {
          localStorage.setItem(userAddressesKey,JSON.stringify([]))
        } 

        const userCardsKey = `cards_${response.id}`;
        const existingCards = localStorage.getItem(userCardsKey);
        console.log({userCardsKey})
        if (!existingCards) {
          localStorage.setItem(userCardsKey, JSON.stringify([]));
          console.log("existing cards:" ,existingCards) // Initialize empty cards if not present
        }
   
        // Navigate to the home page after successful login
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const hasErrors = Object.values(formErrors).some((error) => error);

  return (
    <>
      <div className={styles.arts}>
        <img src={art} alt="art" className={styles.art1} />
      </div>

      <div className={`${styles.forms2} ${hasErrors ? styles.errorActive : ""}`}>
        {/* Email Field */}
        <div className={styles.inputContainer}>
          <p className={styles.email}>Email</p>
          <input
            value={formData.email}
            type="text"
            placeholder="Example@email.com"
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`${styles.namefield} ${formErrors.email ? styles.hasError : ""}`}
          />
          {formErrors.email && <p className={styles.error}>{formErrors.email}</p>}
        </div>

        {/* Password Field */}
        <div className={styles.inputContainer}>
          <p className={styles.pass}>Password</p>
          <input
            value={formData.password}
            type="password"
            placeholder="At least 8 characters"
            onChange={(e) => handleInputChange("password", e.target.value)}
            className={`${styles.namefield} ${formErrors.password ? styles.hasError : ""}`}
          />
          {formErrors.password && <p className={styles.error}>{formErrors.password}</p>}
        </div>

        {/* Submit Button */}
        <div className={styles.btn}>
          <button
            disabled={loading}
            type="submit"
            onClick={handleClick}
            className={styles.btn2}
          >
            {loading ? "Loading..." : "Continue"}
          </button>
        </div>
      </div>

      <div className={`${styles.logs} ${hasErrors ? styles.errorActive : ""}`}>
        <img src={logo} alt="logo" className={styles.log1} />
      </div>

      <div className={`${styles.intro} ${hasErrors ? styles.errorActive : ""}`}>
        <img src={into} alt="intro" className={styles.intro1} />
      </div>

      <div className={`${styles.final4} ${hasErrors ? styles.errorActive : ""}`}>
        <img src={final} alt="final" className={styles.final6} />
      </div>
    </>
  );
};

export default Login;
