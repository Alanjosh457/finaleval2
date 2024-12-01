import React, { useState, useEffect } from 'react';
import styles from './address.module.css';
import fnl from '../images/final.png'

const Address = ({ updateUserAddress }) => {
  const userID = localStorage.getItem('userId'); // Get current logged-in user ID
  const [showPopup, setShowPopup] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); 
  const [formData, setFormData] = useState({
    state: '',
    city: '',
    pinCode: '',
    phoneNumber: '',
    fullAddress: '',
  });

  const loca='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1733042707/vbbqa3kd0ezqwfwmvsoy.png'
  const adrs='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1733044038/w2sjzlvg03d3kkdgbiie.png'

  // Load addresses from localStorage on mount
  useEffect(() => {
    if (userID) {
      const savedAddresses = localStorage.getItem(`addresses_${userID}`);
      if (savedAddresses) {
        const parsedAddresses = JSON.parse(savedAddresses);
        setAddresses(parsedAddresses); // Set addresses to state
      }
    }
  }, [userID]);

  // Save addresses to localStorage whenever they change
  useEffect(() => {
    if (userID) {
      localStorage.setItem(`addresses_${userID}`, JSON.stringify(addresses));
    }
  }, [addresses, userID]);

  // Toggle popup visibility
  const togglePopup = () => setShowPopup(!showPopup);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save or edit address
  const saveAddress = () => {
    if (editingIndex !== null) {
      // Update existing address
      const updatedAddresses = [...addresses];
      updatedAddresses[editingIndex] = formData;
      setAddresses(updatedAddresses);
      setEditingIndex(null); // Reset editing index
    } else {
      // Add new address
      setAddresses([...addresses, formData]);
    }

    // Update the address in the header
    updateUserAddress(formData); // Pass updated address to Header component

    setFormData({ state: '', city: '', pinCode: '', phoneNumber: '', fullAddress: '' }); // Reset form
    togglePopup(); // Close popup
  };

  // Edit address
  const editAddress = (index) => {
    setEditingIndex(index);
    setFormData(addresses[index]); 
    togglePopup();
  };

  // Remove address
  const removeAddress = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  // Handle address selection
  const selectAddress = (address) => {
    updateUserAddress(address); // Pass the selected address to Header component
  };

  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);


  return (
    <div>
      <div className={styles.adrs}>
        <h1 className={styles.hdm}>Your Addresses</h1>
      </div>
      <div className={styles.addressbox}>
        <button className={styles.adress} onClick={togglePopup}>
          <img src={adrs} className={styles.addrs2}></img>
        </button>
      </div>
      <div className={styles.addressList}>
        {addresses.length === 0 ? (
          <p>No addresses added yet.</p>
        ) : (
          addresses.map((address, index) => (
            <div 
              key={index} 
              className={`${styles.addressCard} ${styles.clickable}`}
              onClick={() => selectAddress(address)}  // Make the address clickable
            >
              <div className={styles.username}>{username}</div>

              <div className={styles.adele2}>
              <p> {address.fullAddress}</p>
              <p>{address.state}, {address.city}, {address.pinCode}</p>
              
             
              <p>Phone Number:{address.phoneNumber}</p>
             </div>


              <div >
                <button onClick={() => editAddress(index)} className={styles.edt}>Edit</button>
                <button onClick={() => removeAddress(index)} className={styles.rmv}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      {showPopup && (
      <div className={styles.overlay}>
       <div className={styles.popup}>
       <div className={styles.popupContent}>
        <div><img src={loca} className={styles.lc}/></div>
         <h2 className={styles.addr}>{editingIndex !== null ? 'Edit Address' : 'Add Address'}</h2>
     
         {/* Row with all fields on the same line */}
         <div className="form-row">
           <select name="state" value={formData.state} onChange={handleChange}>
             <option value="">Select State</option>
             <option value="California">California</option>
             <option value="Texas">Texas</option>
             <option value="New York">New York</option>
             {/* Add more states */}
           </select>
           <input
             type="text"
             name="city"
             value={formData.city}
             onChange={handleChange}
             placeholder="Enter City/District"
             className={styles.city1}
           />
           <input
             type="text"
             name="pinCode"
             value={formData.pinCode}
             onChange={handleChange}
             placeholder="Enter Pin Code"
             className={styles.pinCode1}

           />
           <input
             type="text"
             name="phoneNumber"
             value={formData.phoneNumber}
             onChange={handleChange}
             placeholder="Enter Phone Number"
             className={styles.phn}
           />
         </div>
     
         {/* Full Address on the next line */}
         <div>
           <textarea
             name="fullAddress"
             value={formData.fullAddress}
             onChange={handleChange}
             placeholder="Enter Full Address"
           ></textarea>
         </div>
     
         {/* Action Buttons */}
         <div>
           <button onClick={saveAddress}>Save</button>
           <button onClick={togglePopup}>Cancel</button>
         </div>
       </div>
     </div>
     </div>
      )}

      <div className={styles.fl}><img src={fnl} className={styles.ff} /></div>
    </div>
    
  );
};

export default Address;
