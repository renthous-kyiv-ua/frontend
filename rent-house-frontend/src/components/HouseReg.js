import React, { useState} from 'react';
import '../styles/HouseReg.css';

const translations = {
  en: {
    home: "Home",
    about: "About Us",
    tenant: "Tenant",
    landlord: "Landlord",
    forLandlord: "For the Landlord",
    regLog: "Registration / Login",
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

const HouseReg = () => {

  const [language, setLanguage] = useState('en');
  
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="property-page">
      <header className="property-header">
        <nav className="navigation">
          <ul className="nav-list">
            <li className="active"><a href='/'>{translations[language].home}</a></li>
            <li><a href='/about'>{translations[language].about}</a></li>
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
              <select className="select-dropdown">
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="eur">UAH</option>
              </select>
              <select className="select-dropdown" value={language} onChange={handleLanguageChange}>
                <option value="en">EN</option>
                <option value="ua">UA</option>
              </select>
            </div>
            <button onClick={() => window.location.href='/signin'} className="login">{translations[language].regLog}</button>
          </div>
        </nav>
        <div className="white-strip"></div>
      </header>
      <section className='property-panel'>
        <h1>Referral link</h1>
        <p>Send a link and Get 100 EUR for each invited friend!</p>
        
      </section>
    </div>
  );
}

export default HouseReg;