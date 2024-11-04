import React, { useState, useEffect} from 'react';
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

const WalletFAQ = () => {

  const [language, setLanguage] = useState('en');
  const [openItems, setOpenItems] = useState([]);

  const handleLanguageChange = (event) => {
      setLanguage(event.target.value);
  };

  const handleToggleClick = (index) => {
    setOpenItems(prevOpenItems => {
        if (prevOpenItems.includes(index)) {
            return prevOpenItems.filter(item => item !== index);
        } else {
            return [...prevOpenItems, index];
        }
    });
   };

   const isHighlighted = (index) => {
    const highlightedIndices = [0, 2, 4];
    return highlightedIndices.includes(index);
   };
    
    return (
        <div className='faq-page'>
          <header className="faq-header">
            <button onClick={() => window.location.href='/wallet'}>
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 33C25.8366 33 33 25.8366 33 17C33 8.16344 25.8366 1 17 1C8.16344 1 1 8.16344 1 17C1 25.8366 8.16344 33 17 33Z" stroke="#F4F4F4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15 23L9 17M9 17L15 11M9 17H25" stroke="#F4F4F4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <h6 onClick={() => window.location.href='/wallet'}>Wallet</h6>
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7.25 7.25L1 13.5" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h6 onClick={() => window.location.href='/faq'}>Wallet FAQs</h6>
          </header>
          <section className='faq-info'>
            <div class="faq-category">
              <h2>Wallet overview</h2>
              <div className={`faq-item ${openItems.includes(0) ? 'open' : ''} ${isHighlighted(0) ? 'highlighted' : ''}`}>
                <span>What's the Wallet?</span>
                <button class="faq-toggle" onClick={() => handleToggleClick(0)}>
                  <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 1L7.25 7.25L1 1" stroke="#040606" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className={`faq-item ${openItems.includes(1) ? 'open' : ''}`}>
                <span>How does Wallet help me in my travels?</span>
                <button class="faq-toggle" onClick={() => handleToggleClick(1)}>
                  <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 1L7.25 7.25L1 1" stroke="#040606" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className={`faq-item ${openItems.includes(2) ? 'open' : ''} ${isHighlighted(0) ? 'highlighted' : ''}`}>
                <span>In which countries will I be able to enjoy the benefits of Wallet?</span>
                <button class="faq-toggle" onClick={() => handleToggleClick(2)}>
                  <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 1L7.25 7.25L1 1" stroke="#040606" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className={`faq-item ${openItems.includes(3) ? 'open' : ''}`}>
                <span>Can I change the currency that my Wallet is based in?</span>
                <button class="faq-toggle" onClick={() => handleToggleClick(3)}>
                  <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 1L7.25 7.25L1 1" stroke="#040606" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className={`faq-item ${openItems.includes(4) ? 'open' : ''} ${isHighlighted(0) ? 'highlighted' : ''}`}>
                <span>What is the difference between the Loyalty program and Wallet?</span>
                <button class="faq-toggle" onClick={() => handleToggleClick(4)}>
                  <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 1L7.25 7.25L1 1" stroke="#040606" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="faq-category">
              <h2>Earning Credits</h2>
              <div className={`faq-item ${openItems.includes(5) ? 'open' : ''} ${isHighlighted(0) ? 'highlighted' : ''}`}>
                <span>How do I earn Credits or vouchers?</span>
                <button class="faq-toggle" onClick={() => handleToggleClick(5)}>
                  <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 1L7.25 7.25L1 1" stroke="#040606" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className={`faq-item ${openItems.includes(6) ? 'open' : ''}`}>
                <span>What's the difference between Travel Credits and Cash Credits?</span>
                <button class="faq-toggle" onClick={() => handleToggleClick(6)}>
                  <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 1L7.25 7.25L1 1" stroke="#040606" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="faq-category">
              <h2>Spending Credits (and vouchers)</h2>
              <div className={`faq-item ${openItems.includes(7) ? 'open' : ''} ${isHighlighted(0) ? 'highlighted' : ''}`}>
                <span>What can I spend my Credits and vouchers on?</span>
                <button class="faq-toggle" onClick={() => handleToggleClick(7)}>
                  <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 1L7.25 7.25L1 1" stroke="#040606" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className={`faq-item ${openItems.includes(8) ? 'open' : ''}`}>
                <span>How do I spend my Credits and vouchers?</span>
                <button class="faq-toggle" onClick={() => handleToggleClick(8)}>
                  <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 1L7.25 7.25L1 1" stroke="#040606" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className={`faq-item ${openItems.includes(9) ? 'open' : ''} ${isHighlighted(0) ? 'highlighted' : ''}`}>
                <span>Can I spend my Credits and vouchers in any currency?</span>
                <button class="faq-toggle" onClick={() => handleToggleClick(9)}>
                  <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 1L7.25 7.25L1 1" stroke="#040606" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className={`faq-item ${openItems.includes(10) ? 'open' : ''}`}>
                <span>What if I cancel a booking paid with Credits or vouchers? Will I get them back?</span>
                <button class="faq-toggle" onClick={() => handleToggleClick(10)}>
                  <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 1L7.25 7.25L1 1" stroke="#040606" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className={`faq-item ${openItems.includes(11) ? 'open' : ''} ${isHighlighted(0) ? 'highlighted' : ''}`}>
                <span>Can I apply Credits or vouchers on an existing booking I've already confirmed?</span>
                <button class="faq-toggle" onClick={() => handleToggleClick(11)}>
                  <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 1L7.25 7.25L1 1" stroke="#040606" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className={`faq-item ${openItems.includes(12) ? 'open' : ''}`}>
                <span>What are vouchers and how do I spend them?</span>
                <button class="faq-toggle" onClick={() => handleToggleClick(12)}>
                  <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 1L7.25 7.25L1 1" stroke="#040606" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </section>
        </div>
    );
}

export default WalletFAQ;