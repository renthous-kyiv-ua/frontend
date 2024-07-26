import React, { useState } from 'react';
import globeImage from '../images/globe_map.jpg';
import '../styles/AboutUs.css';

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

const AboutUs = () => {

    const [language, setLanguage] = useState('en');

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

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
                <button onClick={() => window.location.href='/signin'} className="login">{translations[language].regLog}</button>
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
          <section class="long-description">
            <h1>Welcome to Rent House!</h1>
            <div className='content-part content-part-1'>
              <p>At <strong>Rent House,</strong> we understand that finding the perfect accommodation for your travels can be a daunting task. That's why we've made it our mission to simplify the booking process and provide a wide range of options to suit every need and budget. Our platform offers a diverse selection of properties worldwide, from cozy apartments and luxurious villas to charming cottages and modern urban residences.</p>
              <p>The Problem:<br />Travelers often face challenges such as limited accommodation options, complicated booking processes, and concerns about security and reliability.</p>
              <p>Our Solution:<br />Rent House addresses these issues by offering a user-friendly website with secure booking features, a vast inventory of properties, and a dedicated customer support team available 24/7. We carefully vet each listing to ensure quality and reliability, giving you peace of mind when you book with us. Discover a world of possibilities and enjoy a seamless, stress-free booking experience with Rent House!</p>
            </div>
            <div className='content-part content-part-2'>
              <p>At Rent House, we specialize in providing top-notch accommodation booking services worldwide. Whether you're planning a vacation, a business trip, or a long-term stay, our platform offers a diverse range of properties to suit your needs. From cozy apartments and luxurious villas to charming cottages and modern urban residences, we ensure a seamless booking experience with secure and user-friendly features. Our dedicated team is committed to helping you find the perfect home away from home, wherever your travels take you. Explore our website and discover a world of possibilities with Rent House!</p>
            </div>
            <div className='content-part content-part-3'>
              <p>Advantages of the Rent House company:</p>
              <ol>
                <li>Experience and reliability: More than two decades of successful work in the rental housing market.</li>
                <li>Wide selection of properties: Large catalog of real estate, including various options for all needs and budgets.</li>
                <li>Professionalism: Qualified specialists ready to help you at all stages of the rental.</li>
                <li>Individual approach: We take into account all the wishes and requirements of clients in order to find the ideal housing.</li>
                <li>Legal support: We provide full legal support for transactions, guaranteeing the safety and transparency of the lease.</li>
                <li>Convenience and comfort: We offer additional services for the arrangement and maintenance of housing.</li>
              </ol>
            </div>
            <div className='content-part content-part-4'>
              <p>Our agents focus on the customer experience and strive to connect hearts and homes. Rent House agents are truly committed to their communities and often show their community spirit by contributing to local events and causes. You probably already know one of us!</p>
            </div>
            <img src={globeImage} alt="Globe with plane" class="globe-map"/>
          </section>
        </div>
    );
}

export default AboutUs;