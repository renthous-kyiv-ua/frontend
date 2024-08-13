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
            <h6 onClick={() => window.location.href='/wallet'}>Wallet</h6>
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7.25 7.25L1 13.5" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h6 onClick={() => window.location.href='/details'}>Wallet FAQs</h6>
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
                <div className='details-expert'>
                  <p><strong>11101, New York</strong></p>
                </div>
                <div className='discount-expert'>
                  <p><strong>19% off until October 10</strong></p>
                </div>
                <div className='description-expert'>
                  <p>The hotel was created for those who like to spend time at work. For those who value a place to see, explore and relax and recuperate. The hotel is located in Hudson Yards, New York's newest neighborhood</p>
                </div>
                <div className='price-expert'>
                  $425/night
                </div>
                <div className='saved-expert'>
                  <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0945 19.9428C11.7687 20.0578 11.232 20.0578 10.9062 19.9428C8.12699 18.994 1.91699 15.0361 1.91699 8.32779C1.91699 5.36654 4.30324 2.9707 7.24533 2.9707C8.98949 2.9707 10.5324 3.81404 11.5003 5.11737C12.4682 3.81404 14.0207 2.9707 15.7553 2.9707C18.6974 2.9707 21.0837 5.36654 21.0837 8.32779C21.0837 15.0361 14.8737 18.994 12.0945 19.9428Z" stroke="#F4F4F4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className='verified'>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.2305 1.7821C11.4547 1.53574 11.7279 1.33892 12.0327 1.20424C12.3374 1.06957 12.6669 1 13 1C13.3331 1 13.6626 1.06957 13.9673 1.20424C14.2721 1.33892 14.5453 1.53574 14.7695 1.7821L15.9899 3.12212C16.2269 3.38225 16.5183 3.58692 16.8434 3.72155C17.1685 3.85618 17.5193 3.91745 17.8707 3.90101L19.681 3.81726C20.0136 3.80159 20.3459 3.85552 20.6565 3.97561C20.9671 4.0957 21.2492 4.2793 21.4848 4.51466C21.7204 4.75003 21.9043 5.03198 22.0247 5.34247C22.145 5.65297 22.1993 5.98518 22.1839 6.31784L22.099 8.12926C22.0825 8.48074 22.1438 8.83153 22.2785 9.15663C22.4131 9.48172 22.6178 9.77313 22.8779 10.0101L24.2179 11.2305C24.4643 11.4547 24.6611 11.7279 24.7958 12.0327C24.9304 12.3374 25 12.6669 25 13C25 13.3331 24.9304 13.6626 24.7958 13.9673C24.6611 14.2721 24.4643 14.5453 24.2179 14.7695L22.8779 15.9899C22.6178 16.2269 22.4131 16.5183 22.2785 16.8434C22.1438 17.1685 22.0825 17.5193 22.099 17.8707L22.1827 19.681C22.1984 20.0136 22.1445 20.3459 22.0244 20.6565C21.9043 20.9671 21.7207 21.2492 21.4853 21.4848C21.25 21.7204 20.968 21.9043 20.6575 22.0247C20.347 22.145 20.0148 22.1993 19.6822 22.1839L17.8707 22.099C17.5193 22.0825 17.1685 22.1438 16.8434 22.2785C16.5183 22.4131 16.2269 22.6178 15.9899 22.8779L14.7695 24.2179C14.5453 24.4643 14.2721 24.6611 13.9673 24.7958C13.6626 24.9304 13.3331 25 13 25C12.6669 25 12.3374 24.9304 12.0327 24.7958C11.7279 24.6611 11.4547 24.4643 11.2305 24.2179L10.0101 22.8779C9.77313 22.6178 9.48172 22.4131 9.15663 22.2785C8.83153 22.1438 8.48074 22.0825 8.12926 22.099L6.31903 22.1827C5.98639 22.1984 5.65413 22.1445 5.34352 22.0244C5.03291 21.9043 4.75078 21.7207 4.51519 21.4853C4.2796 21.25 4.09573 20.968 3.97535 20.6575C3.85496 20.347 3.80071 20.0148 3.81606 19.6822L3.90101 17.8707C3.91745 17.5193 3.85618 17.1685 3.72155 16.8434C3.58692 16.5183 3.38225 16.2269 3.12212 15.9899L1.7821 14.7695C1.53574 14.5453 1.33892 14.2721 1.20424 13.9673C1.06957 13.6626 1 13.3331 1 13C1 12.6669 1.06957 12.3374 1.20424 12.0327C1.33892 11.7279 1.53574 11.4547 1.7821 11.2305L3.12212 10.0101C3.38225 9.77313 3.58692 9.48172 3.72155 9.15663C3.85618 8.83153 3.91745 8.48074 3.90101 8.12926L3.81726 6.31903C3.80159 5.98639 3.85552 5.65413 3.97561 5.34352C4.0957 5.03291 4.2793 4.75078 4.51466 4.51519C4.75003 4.2796 5.03198 4.09573 5.34247 3.97535C5.65297 3.85496 5.98518 3.80071 6.31784 3.81606L8.12926 3.90101C8.48074 3.91745 8.83153 3.85618 9.15663 3.72155C9.48172 3.58692 9.77313 3.38225 10.0101 3.12212L11.2305 1.7821Z" fill="#A94802" stroke="#A94802" stroke-width="1.5"/>
                <path d="M9.41016 13.0003L11.8031 15.3932L16.5888 10.6074" stroke="#F4F4F4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p>Verified Landlord</p>
              </div>
              <div className='emblem'>
                <p>Expert owner emblem</p>
                <svg width="94" height="35" viewBox="0 0 94 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.552061 31.7779C0.429374 32.0252 0.530464 32.3252 0.777851 32.4479L4.80931 34.4473C5.0567 34.57 5.35671 34.4689 5.4794 34.2215C5.60209 33.9741 5.501 33.6741 5.25361 33.5514L1.67009 31.7742L3.44728 28.1907C3.56997 27.9433 3.46888 27.6433 3.22149 27.5206C2.9741 27.3979 2.67409 27.499 2.5514 27.7464L0.552061 31.7779ZM92.8403 0.526176L0.840342 31.5262L1.15966 32.4738L93.1597 1.47382L92.8403 0.526176Z" fill="#A94802"/>
                </svg>
                <svg width="177" height="2" viewBox="0 0 177 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 1H177" stroke="#A94802"/>
                </svg> 
              </div>
              <div className='expert-info'>
                <p><strong>Please note that if the photo of the apartment does<br/>not have the Expert owner emblem, then you<br/>CANNOT get a 10% discount from him, since he is<br/>NOT a member of the Expert program. Please keep<br/>this in mind when booking.</strong></p>
                <p>However, according to Rent House's loyalty policy, you<br/>can get a discount of up to 5% from our company,<br/>regardless of whether you book an apartment owned by<br/>an expert or not.</p>
                <p>After you become an expert, and therefore you have 5<br/>confirmed orders in your personal account on Rent<br/>House, we are happy to inform you about it<br/>in a letter.</p>
              </div>
            </div>
          </section>
        </div>
    );
}

export default MoreDetails;