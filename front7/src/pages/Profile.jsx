import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styles from './profile.module.css'; // Ensure your styles are correct
import paym from '../images/payad.png'; // Import the image for the "Add Payment" button
import fnl from '../images/final.png'

// Decode token function

const pencil='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732999079/dyckjwngoatyktg0wqd0.png'
const ccard='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732999815/ygx04jbbzxo1ynjewbfy.png'


const decodeToken = (token) => {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length === 3) {
    const payload = JSON.parse(atob(parts[1])); // Decode the base64 payload
    return {
      email: payload.email,
      country: payload.country,
      gender: payload.gender,
    };
  }
  return null;
};

const Profile = () => {
  const [formData, setFormData] = useState({
    name: localStorage.getItem("username") || "",
    email: "",
    country: "",
    gender: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiration: "",
    cvc: "",
    cardName: "",
  });
  const [cards, setCards] = useState([]);
  const [editingCardIndex, setEditingCardIndex] = useState(null);

  // Fetch user data and cards from localStorage when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token) {
      const userDetails = decodeToken(token);
      if (userDetails) {
        setFormData((prev) => ({
          ...prev,
          email: userDetails.email,
          country: userDetails.country || prev.country,
          gender: userDetails.gender || prev.gender,
        }));
      } else {
        toast.error("Unable to decode token or user details not found");
      }
    }

    if (userId) {
      const storedCards = localStorage.getItem(`cards_${userId}`);
      if (storedCards) {
        try {
          setCards(JSON.parse(storedCards));
        } catch (error) {
          toast.error("Error loading saved cards.");
          console.error("Error parsing cards:", error);
        }
      }
    }
  }, []);

  // Save card details in localStorage
  const saveCard = (updatedCards) => {
    const userId = localStorage.getItem("userId");
    localStorage.setItem(`cards_${userId}`, JSON.stringify(updatedCards));
    setCards(updatedCards);
  };

  // Handle input changes for card details
  const handleCardInputChange = (field, value) => {
    setCardDetails((prev) => ({ ...prev, [field]: value }));
  };

  // Add or edit card details
  const handleAddOrEditCard = () => {
    if (
      cardDetails.cardNumber &&
      cardDetails.expiration &&
      cardDetails.cvc &&
      cardDetails.cardName
    ) {
      let updatedCards;
      if (editingCardIndex !== null) {
        updatedCards = [...cards];
        updatedCards[editingCardIndex] = cardDetails;
        toast.success("Card updated successfully!");
      } else {
        updatedCards = [...cards, cardDetails];
        toast.success("Card added successfully!");
      }

      saveCard(updatedCards);
      setIsModalOpen(false);
      setCardDetails({ cardNumber: "", expiration: "", cvc: "", cardName: "" });
      setEditingCardIndex(null);
    } else {
      toast.error("Please fill in all card details");
    }
  };

  // Edit existing card
  const handleEditCard = (index) => {
    setEditingCardIndex(index);
    setCardDetails(cards[index]);
    setIsModalOpen(true);
  };

  // Remove card
  const handleRemoveCard = () => {
    if (editingCardIndex !== null) {
      const updatedCards = cards.filter((_, index) => index !== editingCardIndex);
      saveCard(updatedCards);
      toast.success("Card removed successfully!");
      setIsModalOpen(false);
      setCardDetails({ cardNumber: "", expiration: "", cvc: "", cardName: "" });
      setEditingCardIndex(null);
    }
  };

  // Save updated profile data to localStorage
  const handleSaveProfile = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    localStorage.setItem(`country_${userId}`, formData.country);
    localStorage.setItem(`gender_${userId}`, formData.gender);
    localStorage.setItem("username", formData.name); // Update the name in localStorage

    toast.success("Profile updated successfully!");
    setEditMode(false);
  };

const propic='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732994262/gcjohu9prvqr9krmhapj.png'
const mypro='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732994532/ajd7qofuiytgum7aykgs.png'

  return (
   <>
      <div className={styles.prof}>
        <div className={styles.profileContainer}>
        <div className={styles.prip}><img src={mypro} className={styles.propic4}/></div>
        <div className={styles.propic1}><img src={propic} className={styles.propic3}/></div>
        <div className={styles.username5}>{formData.name}</div>

          <div>
            <label className={styles.fn}>Full Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={!editMode}
              className={styles.names}
            />
          </div>
          <div>
            <label className={styles.ea}>Email Address:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={!editMode}
              className={styles.email}
            />
          </div>
          <div>
            <label className={styles.cy}>Country:</label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              disabled={!editMode}
              className={styles.country}
            />
          </div>
          <div>
            <label className={styles.gen}>Gender:</label>
            <input
              type="text"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              disabled={!editMode}
              className={styles.gend}
            />
          </div>
          <button onClick={() => (editMode ? handleSaveProfile() : setEditMode(!editMode))} className={styles.savebtn}>
            {editMode ? "Save" : "Edit"}
          </button>
        </div>
      </div>

<div className={styles.paved}>
      <h2 className={styles.svmp}>Saved Payment Methods</h2>
      <div className={styles.cardsContainer}>
     
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <div key={index} className={styles.card}>
                 <div className={styles.credcard}><img src ={ccard} className={styles.card1}/></div>
              <p className={styles.cardnum}>
       xxxx xxxx xxxx{" "}
                {card.cardNumber && card.cardNumber.length >= 4
                  ? card.cardNumber.slice(-4)
                  : "****"}
              </p>
              <p className={styles.cardnam}>{card.cardName}</p>
              <button onClick={() => handleEditCard(index)}><img src={pencil} className={styles.pencil1}/></button>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>

      <div>
        <button className={styles.pym} onClick={() => setIsModalOpen(true)}>
          <img src={paym} alt="Add Payment" className={styles.pmt} />
          <p className={styles.adc}>Add New Card </p>
        </button>
      </div>
<div></div>
      {isModalOpen && (
  <div className={styles.modalOverlay}>
    <div className={styles.smallModal}>
      <h3>{editingCardIndex !== null ? "Edit Payment Method" : "Add New Card"}</h3>
      
      <div className={styles.modalInputGroup}>
        <label>Card Number</label>
        <input
          type="text"
          placeholder="Card Number"
          value={cardDetails.cardNumber}
          onChange={(e) => handleCardInputChange("cardNumber", e.target.value)}
        />
      </div>

      <div className={styles.modalInputGroup}>
        <label>Expiration</label>
        <input
          type="text"
          placeholder="Expiration (MM/YY)"
          value={cardDetails.expiration}
          onChange={(e) => handleCardInputChange("expiration", e.target.value)}
        />
      </div>

      <div className={styles.modalInputGroup}>
        <label>CVC:</label>
        <input
          type="text"
          placeholder="CVC"
          value={cardDetails.cvc}
          onChange={(e) => handleCardInputChange("cvc", e.target.value)}
        />
      </div>

      <div className={styles.modalInputGroup}>
        <label>Card Name</label>
        <input
          type="text"
          placeholder="Card Name"
          value={cardDetails.cardName}
          onChange={(e) => handleCardInputChange("cardName", e.target.value)}
        />
      </div>

      <div className={styles.modalButtons}>
        <button onClick={handleAddOrEditCard}>Save changes</button>
        {editingCardIndex !== null && (
          <button onClick={handleRemoveCard}>
            Remove 
          </button>
        )}
        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}
    </div>
    <div className={styles.fl}><img src={fnl} className={styles.final}/></div>
    </>
  );
};

export default Profile;