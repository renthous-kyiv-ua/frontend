import React, { useState} from 'react';
import '../styles/WalletFAQ.css';

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

  const handleLanguageChange = (event) => {
      setLanguage(event.target.value);
  };
    
    return (
        <div className='faq-page'>
          <header className="faq-header">
            <button>
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 33C25.8366 33 33 25.8366 33 17C33 8.16344 25.8366 1 17 1C8.16344 1 1 8.16344 1 17C1 25.8366 8.16344 33 17 33Z" stroke="#F4F4F4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15 23L9 17M9 17L15 11M9 17H25" stroke="#F4F4F4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <h6 onClick={() => window.location.href='/loyalty'}>Wallet</h6>
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7.25 7.25L1 13.5" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h6 onClick={() => window.location.href='/faq'}>Wallet FAQs</h6>
          </header>
          <section className='faq-info'>
            
          </section>
        </div>
    );
}

export default MoreDetails;