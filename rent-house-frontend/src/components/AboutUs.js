import React, { useState, useEffect, useRef } from 'react';
import globeImage from '../images/globe_map.jpg';
import '../styles/AboutUs.css';

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

const AboutUs = () => {

  const [language, setLanguage] = useState('en');
  const [isAccountComboboxOpen, setIsAccountComboboxOpen] = useState(false);
  const accountButtonRef = useRef(null);
  const accountComboboxRef = useRef(null);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleAccountButtonClick = () => {
    setIsAccountComboboxOpen(!isAccountComboboxOpen);
  };

  const handleClickOutside = (event) => {
    if (accountComboboxRef.current && !accountComboboxRef.current.contains(event.target) &&
        accountButtonRef.current && !accountButtonRef.current.contains(event.target)) {
      setIsAccountComboboxOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='about'>
      <header className="about-header">
        <nav className="navigation">
          <ul className="nav-list">
            <li><a href='/'>{translations[language].home}</a></li>
            <li className='active'><a href='/about'>{translations[language].about}</a></li>
            <li><a href='/tenant'>{translations[language].tenant}</a></li>
            <li><a href='/landlord'>{translations[language].landlord}</a></li>
            <li><a href='/for-landlord'>{translations[language].forLandlord}</a></li>
          </ul>
          <div className="logo">
            <svg width="81" height="51" viewBox="0 0 81 51" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M61.0675 3.457V0.192383H0V50.3138H32.8382L30.9178 46.8572H2.88054V3.457H61.0675Z" fill="#F4F4F4"/>
              <path d="M74.1264 3.26482V0.384277H80.8477V49.5455H47.2414L45.7051 46.857H77.9672V3.26482H74.1264Z" fill="#F4F4F4"/>
              <path d="M71.2448 0H63.9474V21.7001H49.3527V9.21774H41.8633V41.2878H49.3527V27.8452H63.9474V41.2878H71.2448V0Z" fill="#F4F4F4"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M17.4757 41.288H9.41016V9.02588H27.4616C31.4943 9.40995 37.4474 12.4825 37.4474 20.548C37.4474 28.6136 31.1102 30.726 31.1102 30.726L43.7846 49.7375H35.7191L24.0049 32.2623H17.4757V41.288ZM17.0918 14.9789V26.3091H25.7334C28.614 25.733 29.7662 23.7742 29.7662 20.548C29.7662 16.1312 27.0777 15.171 25.3494 14.9789H17.0918Z" fill="#F4F4F4"/>
            </svg>
          </div>
          <div className="nav-right">
            <div className="currency-lang">
              <select className="select-dropdown" value={language} onChange={handleLanguageChange}>
                <option value="en">EN</option>
                <option value="ua">UA</option>
              </select>
            </div>
            <button className="account" onClick={handleAccountButtonClick} ref={accountButtonRef}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 37.8V35.5C12.5 32.45 13.7116 29.5249 15.8683 27.3683C18.0249 25.2116 20.95 24 24 24C27.05 24 29.9751 25.2116 32.1317 27.3683C34.2884 29.5249 35.5 32.45 35.5 35.5V37.8" stroke="#F4F4F4" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M23.9996 24.0002C25.8296 24.0002 27.5846 23.2732 28.8786 21.9792C30.1726 20.6852 30.8996 18.9302 30.8996 17.1002C30.8996 15.2702 30.1726 13.5152 28.8786 12.2212C27.5846 10.9272 25.8296 10.2002 23.9996 10.2002C22.1696 10.2002 20.4146 10.9272 19.1206 12.2212C17.8266 13.5152 17.0996 15.2702 17.0996 17.1002C17.0996 18.9302 17.8266 20.6852 19.1206 21.9792C20.4146 23.2732 22.1696 24.0002 23.9996 24.0002Z" stroke="#F4F4F4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z" stroke="#F4F4F4" stroke-width="1.5"/>
              </svg>
            </button>
            {isAccountComboboxOpen && (
              <div className="account-combobox" ref={accountComboboxRef}>
                <ul>
                  <li>Account Settings</li>
                  <li>My reservations</li>
                  <li>Loyalty programme</li>
                  <li>Wallet</li>
                  <li>Referral link</li>
                  <li>Saved</li>
                  <li>Logout</li>
                </ul>
              </div>
            )}
          </div>
        </nav>
        <div className="white-strip"></div>
      </header>
      <section className='about-description'>
        <div className='description'>
          <h1>About US</h1>
          <p>Welcome to our housing search site! We offer<br/>thousands of vetted listings, easy searching, and full<br/>support every step of the way to help you find your<br/>ideal home quickly and easily.</p>
        </div>
      </section>
      <section className="long-description">
        <h1>Welcome to Rent House!</h1>
        <div className='content-part content-part-1'>
          <p>At <strong>Rent House,</strong> we understand that finding the perfect accommodation for your travels can be a daunting task. That's why we've made it our mission to simplify the booking process and provide a wide range of options to suit every traveler's needs.</p>
          <img src={globeImage} alt="globe-map"/>
        </div>
        <div className='content-part'>
          <img src={globeImage} alt="globe-map"/>
          <p>We believe that everyone deserves a comfortable and memorable stay, whether you're traveling for business, leisure, or anything in between. Our user-friendly platform allows you to browse and book accommodations with ease, ensuring that your travel experience is stress-free and enjoyable from start to finish.</p>
        </div>
        <div className='content-part content-part-1'>
          <p>Thank you for choosing <strong>Rent House</strong>. We're excited to be a part of your journey and look forward to helping you find the perfect place to stay!</p>
          <img src={globeImage} alt="globe-map"/>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;