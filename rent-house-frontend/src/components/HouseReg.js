import React, { useState} from 'react';
import cooperImage from '../images/cooper.png';
import shadowImage from '../images/shadow.png';
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
    <div className="house-reg-page">
      <header className="house-reg-header">
        <nav className="navigation">
          <ul className="nav-list">
            <li><a href='/'>{translations[language].home}</a></li>
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
      <section className='house-reg-panel'>
        <img src={shadowImage} alt="Shadow" className="shadow" />
        <div className='house-reg-content'>
          <h1>Cooperation</h1>
          <p>Welcome to our home rental website! We are pleased to offer<br/>you a unique opportunity to become part of our community and<br/>get the most out of working with us.</p>
          <img src={cooperImage} alt="Advantages" className="advantages" />
        </div>
        <div className="category-panel">
          <div className="categories">
            <span className="category active">Housing information</span>
            <span className="category">Additional Information</span>
            <span className="category">Posting an ad</span>
          </div>
          <div className="progress-bar">
            <div className="progress"></div>
          </div>
        </div>
      </section>
      <section className="housing-info">
        <div className="info-fields">
          <div className="phone-field">
            <label>Telephone</label>
            <input type="text" placeholder="(000)-000-00-00" />
          </div>
          <div className="field-group">
            <div className="field">
              <label>Category</label>
              <select>
                <option>Apartment</option>
              </select>
            </div>
            <div className="field">
              <label>&nbsp;</label>
              <select>
                <option>Room</option>
              </select>
            </div>
            <div className="field">
              <label>&nbsp;</label>
              <select>
                <option>Long term rental</option>
              </select>
            </div>
          </div>
          <div className="field-group">
            <div className="field">
              <label>Location</label>
              <select>
                <option>Region</option>
              </select>
            </div>
            <div className="field">
              <label>&nbsp;</label>
              <select>
                <option>City</option>
              </select>
            </div>
            <div className="field">
              <label>&nbsp;</label>
              <select>
                <option>Address</option>
              </select>
            </div>
          </div>
        </div>
        <div className="map-wrapper">
          <iframe 
            title="Map"
            src="https://www.google.com/maps/embed"
            width="600" 
            height="450" 
            style={{border:0}} 
            allowFullScreen=""
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
        <div className="progress-indicator">
          <div className="circle-progress">
            <div className="percentage">70%</div>
          </div>
          <ul className="progress-list">
            <li className="completed">General information</li>
            <li className="completed">Main settings</li>
            <li className="completed">Price</li>
            <li className="completed">Photo and video</li>
            <li>Description</li>
          </ul>
        </div>
      </section>
      <section className="additional-info">
        <div className="tabs">
          <span className="tab">Housing information</span>
          <span className="tab active">Additional Information</span>
          <span className="tab">Posting an ad</span>
        </div>
        <div className="field-group">
          <div className="field">
            <label>Type</label>
            <div className="btn-group">
              <button className="btn">Primary housing</button>
              <button className="btn active">Secondary housing</button>
            </div>
          </div>
          {/* <div className="field">
            <label>Rooms</label>
            <div className="btn-group">
              <button className="btn">1</button>
              <button className="btn active">2</button>
              <button className="btn">3</button>
              <button className="btn">4</button>
              <button className="btn">5</button>
              <button className="btn">6</button>
              <button className="btn">7+</button>
            </div>
          </div>
          <div className="field">
            <label>Wall material</label>
            <div className="btn-group">
              <button className="btn">Ceramic brick</button>
              <button className="btn">Ceramic hollow brick</button>
              <button className="btn active">Ceramic block</button>
              <button className="btn">Sand-lime brick</button>
              <button className="btn">Foam block</button>
              <button className="btn">Reinforced concrete panel</button>
            </div>
          </div>
        </div>
        <div className="field-group">
          <div className="field">
            <label>Total area, m²</label>
            <input type="text" value="100" />
          </div>
          <div className="field">
            <label>Living space, m²</label>
            <input type="text" value="100" />
          </div>
          <div className="field">
            <label>Kitchen, m²</label>
            <input type="text" value="10" />
          </div>
          <div className="field">
            <label>Total floors</label>
            <input type="text" value="1,2,3..." />
          </div>
          <div className="field">
            <label>Barh Parking</label>
            <input type="text" value="1,2,3..." />
          </div>
        </div>
        <div className="field-group">
          <div className="field">
            <label>Heating</label>
            <div className="btn-group">
              <button className="btn active">Centralized</button>
              <button className="btn">Individual</button>
              <button className="btn">Combined</button>
            </div>
          </div>
          <div className="field">
            <label>Year of constr.</label>
            <input type="text" value="2020" />
          </div>
          <div className="field">
            <label>Finishing</label>
            <div className="btn-group">
              <button className="btn">Without finishing</button>
              <button className="btn">Rough finish</button>
              <button className="btn active">Modern renovation</button>
              <button className="btn">Designer renovation</button>
              <button className="btn">Repair 80-90 x</button>
              <button className="btn">Renovation 2000's</button>
              <button className="btn">Renovation 2010's</button>
            </div>
          </div>*/}
        </div>
        <button className="show-all-btn">Show all</button>
      </section>
    </div>
  );
}

export default HouseReg;