import React, { useState, useEffect, useRef } from 'react';
import expertHome from '../images/experthome.png';
import '../styles/MoreDetails.css';

const translations = {
  en: {
    home: "Home",
    about: "About Us",
    tenant: "Tenant",
    landlord: "Landlord",
    forLandlord: "For the Landlord",
  },
  ua: {
    home: "Головна",
    about: "Про нас",
    tenant: "Орендар",
    landlord: "Орендодавець",
    forLandlord: "Для орендодавця",
    regLog: "Реєстрація / Авторизація",
  }
};

const MoreDetails = () => {

  const [language, setLanguage] = useState('en');
  const [isAccountComboboxOpen, setIsAccountComboboxOpen] = useState(false);
  const accountButtonRef = useRef(null);
  const accountComboboxRef = useRef(null);

  const handleLanguageChange = (event) => {
      setLanguage(event.target.value);
  };
    
    return (
        <div className='details-page'>
          <header className="details-header">
            <button>
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 33C25.8366 33 33 25.8366 33 17C33 8.16344 25.8366 1 17 1C8.16344 1 1 8.16344 1 17C1 25.8366 8.16344 33 17 33Z" stroke="#F4F4F4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15 23L9 17M9 17L15 11M9 17H25" stroke="#F4F4F4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </header>
          <section className='details-info'>
            <h2>How can I get a discount for the Expert program?</h2>
            <p>In order to become an expert and receive a discount from the owners, it is enough for you to have 5 confirmed orders in our system and book an<br/>apartment of an experienced* owner. More about it:</p>
            <br/>
            <ul>
                <li>You placed all orders through your personal account on Rent House, or they were linked to it. Read more about how to add past orders to your personal account;</li>
                <li>All orders are confirmed. This means that you lived in apartments for all five orders;</li>
                <li>All orders were made in the past (if you have a confirmed prepayment order, it will not be credited until you live in the apartment).</li>
                <li>You can get a discount only from an experienced, which means the best and proven owner. The Experienced Owner emblem can be seen on the photo<br/>of the apartment in the catalog:</li>
            </ul>
            <div className='more-details'>
              <div className='expert-example'>
                <img src={expertHome} alt="Offer" />
                <div className='rating-expert'>
                  <p>8.3 ☆</p>
                </div>
                <div className='discount-expert'>
                  <p>27% off until September 16</p>
                </div>
                <div className='details-expert'>
                  <p>11101, New York</p>
                </div>
                <div className='price-expert'>
                  $425/night
                </div>
              </div>
              <div className='expert-info'>
                <p>Please note that if the photo of the apartment does<br/>not have the Expert owner emblem, then you<br/>CANNOT get a 10% discount from him, since he is<br/>NOT a member of the Expert program. Please keep<br/>this in mind when booking.</p>
                <p>However, according to Rent House's loyalty policy, you can get a discount of up to 5% from our company, regardless of whether you book an apartment owned by an expert or not.</p>
              </div>
            </div>
          </section>
        </div>
    );
}

export default MoreDetails;