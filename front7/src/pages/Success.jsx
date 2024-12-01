import { useLocation, useNavigate } from "react-router-dom";
import styles from './Success.module.css';
import fl from '../images/final.png'

const Success = () => {
    const location = useLocation();
    const { cartItems = [], subtotal = 0 } = location.state || {};

    if (cartItems.length === 0) {
      return <p>No items in your cart!</p>;
    }

    const navigate = useNavigate();
    const tck = 'http://res.cloudinary.com/dgkcgjcw5/image/upload/v1733079814/tsheh2duztyk90cpy1cy.png';
    const b7 = 'http://res.cloudinary.com/dgkcgjcw5/image/upload/v1733083700/zrcpp6kdlyrjiblhbeg3.png';

    const gohome = () => {
        navigate('/');
    };
  
    return (
        <> 
          <div>
            <div className={styles.bor}>
              <ul className={styles.carti}>
                {cartItems.map((item, index) => (
                  <li key={index} className={styles.lct}>
                    <p className={styles.itn}>{item.name}</p>
                  </li>
                ))}
                {/* Back to Home Button as the last item in the list */}
                <li className={styles.lct}>
                 <img src={b7} className={styles.b8}  onClick={gohome} />
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.scs}>
         <img src={tck} className={styles.scs1}/>
          </div>
          <div><img src={fl} className={styles.fl3}/></div>
        </>
    );
};

export default Success;
