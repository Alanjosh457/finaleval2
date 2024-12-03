import React, { useState } from "react";
import styles from "./register.module.css";
import { register } from "./index";
import toast from "react-hot-toast";
import logo from "../images/logo.png";
import final from "../images/final.png";
import { useNavigate } from "react-router-dom";

const Register = ({ setUserName }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: null,
    name: null,
    phone: null,
    password: null,
  });

  const navigate = useNavigate();



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
        case "name":
          updatedErrors.name = !value.trim() ? "Name is required" : null;
          break;
        case "phone":
          updatedErrors.phone =
            !value || value.length < 10 ? "Phone number is invalid" : null;
          break;
        case "password":
          updatedErrors.password = !value
            ? "Password is required"
            : null;
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
      name: null,
      phone: null,
      password: null,
    });

    // Check for any errors
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "email" && (!value || !value.includes("@") || !value.includes("."))) {
        setFormErrors((prev) => ({ ...prev, email: "Email is invalid" }));
        errors = true;
      } else if (key === "name" && !value.trim()) {
        setFormErrors((prev) => ({ ...prev, name: "Name is required" }));
        errors = true;
      } else if (key === "phone" && (!value || value.length < 10)) {
        setFormErrors((prev) => ({ ...prev, phone: "Phone number is invalid" }));
        errors = true;
      } else if (key === "password" && !value) {
        setFormErrors((prev) => ({ ...prev, password: "Password is required" }));
        errors = true;
      }
    });

    if (errors) return;

    try {
      setLoading(true);
      const response = await register(formData);
      console.log("Register response:", response); // Debug response

      if (response && response.message === "User created successfully") {
        toast.success("User registered successfully");


        const previousUserId = localStorage.getItem("userId");
        if (previousUserId && previousUserId !== response.id) {
          localStorage.removeItem(`cartItems_${previousUserId}`);
          localStorage.removeItem(`addresses_${previousUserId}`);
          localStorage.removeItem(`cards_${previousUserId}`);
        }
        // Store token and user info in localStorage
        console.log("Registration successful:", response);
        localStorage.setItem("username", response.name);
        localStorage.setItem("token", response.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.id,
            name: response.name,
            email: formData.email,
          })
        );

       
        if (response.country) {
          localStorage.setItem(`country_${response.id}`, response.country);
        }
        if (response.gender) {
          localStorage.setItem(`gender_${response.id}`, response.gender);
        }
        // Initialize empty cart
        const userCartKey = `cartItems_${response.id}`;
        localStorage.setItem(userCartKey, JSON.stringify([]));
        const userAddressesKey = `addresses_${response.id}`;
        localStorage.setItem(userAddressesKey, JSON.stringify([]));
        const userCardsKey = `cards_${response.id}`;
        localStorage.setItem(userCardsKey, JSON.stringify([]));
        
        
        setUserName(response.name);
        // Delay before navigating
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(response.message || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Registration failed.");
    } finally {
      setLoading(false);
    }
  };
  const logger=()=>{
     navigate('./login')
  }


  const art =
    "http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732387428/kxvg1bu3kuhzwje2ltch.png";
  const into =
    "http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732389285/admjomtig3yl5amkdmky.png";
  const wel =
    "http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732390128/p8bp60bnohmpcrsf457b.png";
  return (
    <>
      <div className={styles.arts}>
        <img src={art} alt="art" className={styles.art1} />
      </div>
      <div className={styles.forms2}>
        {/* Name Field */}
        <div className={styles.inputContainer}>
          <p className={styles.nam}>Name</p>
          <input
            value={formData.name}
            type="text"
            placeholder="e.g. John A"
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={`${styles.namefield} ${formErrors.name ? styles.hasError : ""}`}
          />
          {formErrors.name && <p className={styles.error}>{formErrors.name}</p>}
        </div>

        {/* Phone Field */}
        <div className={styles.inputContainer}>
          <p className={styles.phone}>Phone</p>
          <input
            value={formData.phone}
            type="text"
            placeholder="Enter your 10 digit mobile number"
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className={`${styles.namefield} ${formErrors.phone ? styles.hasError : ""}`}
          />
          {formErrors.phone && <p className={styles.error}>{formErrors.phone}</p>}
        </div>

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

      <div className={`${styles.logs} ${Object.values(formErrors).some((error) => error) ? styles.errorActive : ""}`}>
        <img src={logo} alt="log" className={styles.log1} />
      </div>
      <div className={`${styles.intro} ${Object.values(formErrors).some((error) => error) ? styles.errorActive : ""}`}>
        <img src={into} alt="intro" className={styles.intro1} />
      </div>
      <div className={`${styles.final4} ${Object.values(formErrors).some((error) => error) ? styles.errorActive : ""}`}>
        <img src={final} alt="intro" className={styles.final6} />
      </div>
      < div className={styles.act}>Already have an account?<button className={styles.signup8} onClick={logger}>Sign in</button></div>
    </>
  );
};

export default Register;
