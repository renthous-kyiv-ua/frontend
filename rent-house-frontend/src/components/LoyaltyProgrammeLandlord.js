import React, { useState, useEffect, useRef } from 'react';
import '../styles/LoyaltyProgrammeLandlord.css';

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

const LoyaltyProgrammeLandlord = () => {

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
        <div className='lan-loyalty'>
          <header className="lan-loyalty-header">
            <nav className="navigation">
              <ul className="nav-list">
                <li><a href='/'>{translations[language].home}</a></li>
                <li><a href='/about'>{translations[language].about}</a></li>
                <li><a href='/tenant'>{translations[language].tenant}</a></li>
                <li className='active'><a href='/landlord'>{translations[language].landlord}</a></li>
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
                <button className="lan-account" onClick={handleAccountButtonClick} ref={accountButtonRef}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 37.8V35.5C12.5 32.45 13.7116 29.5249 15.8683 27.3683C18.0249 25.2116 20.95 24 24 24C27.05 24 29.9751 25.2116 32.1317 27.3683C34.2884 29.5249 35.5 32.45 35.5 35.5V37.8" stroke="#F4F4F4" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M23.9996 24.0002C25.8296 24.0002 27.5846 23.2732 28.8786 21.9792C30.1726 20.6852 30.8996 18.9302 30.8996 17.1002C30.8996 15.2702 30.1726 13.5152 28.8786 12.2212C27.5846 10.9272 25.8296 10.2002 23.9996 10.2002C22.1696 10.2002 20.4146 10.9272 19.1206 12.2212C17.8266 13.5152 17.0996 15.2702 17.0996 17.1002C17.0996 18.9302 17.8266 20.6852 19.1206 21.9792C20.4146 23.2732 22.1696 24.0002 23.9996 24.0002Z" stroke="#F4F4F4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z" stroke="#F4F4F4" stroke-width="1.5"/>
                  </svg>
                </button>
                {isAccountComboboxOpen && (
                  <div className="landlord-account-combobox" ref={accountComboboxRef}>
                    <ul>
                      <div className='settings'>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 37.8V35.5C12.5 32.45 13.7116 29.5249 15.8683 27.3683C18.0249 25.2116 20.95 24 24 24C27.05 24 29.9751 25.2116 32.1317 27.3683C34.2884 29.5249 35.5 32.45 35.5 35.5V37.8" stroke="#F4F4F4" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M23.9996 24.0002C25.8296 24.0002 27.5846 23.2732 28.8786 21.9792C30.1726 20.6852 30.8996 18.9302 30.8996 17.1002C30.8996 15.2702 30.1726 13.5152 28.8786 12.2212C27.5846 10.9272 25.8296 10.2002 23.9996 10.2002C22.1696 10.2002 20.4146 10.9272 19.1206 12.2212C17.8266 13.5152 17.0996 15.2702 17.0996 17.1002C17.0996 18.9302 17.8266 20.6852 19.1206 21.9792C20.4146 23.2732 22.1696 24.0002 23.9996 24.0002Z" stroke="#F4F4F4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z" stroke="#F4F4F4" stroke-width="1.5"/>
                        </svg>
                        <li><a href='/landlord'>Account Settings</a></li>
                      </div>
                      <div className='white-line'></div>
                      <div className='settings'>
                        <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1337 1.25479C15.6618 0.915069 16.3382 0.915069 16.8663 1.25479L30.259 9.87018C31.0066 10.3511 31.2248 11.3501 30.7463 12.1015C30.2679 12.853 29.2739 13.0723 28.5264 12.5914L27.2499 11.7702V24.6923C27.2499 27.0714 25.3311 29 22.9642 29H9.0358C6.6689 29 4.75015 27.0714 4.75015 24.6923V11.7702L3.47365 12.5914C2.72605 13.0723 1.73215 12.853 1.25369 12.1015C0.77523 11.3501 0.993405 10.3511 1.741 9.87018L15.1337 1.25479ZM10.3751 12.8462C10.3751 12.2514 10.8548 11.7692 11.4465 11.7692H14.6607C15.2525 11.7692 15.7321 12.2514 15.7321 12.8462V16.0769C15.7321 16.6717 15.2525 17.1538 14.6607 17.1538H11.4465C10.8548 17.1538 10.3751 16.6717 10.3751 16.0769V12.8462ZM11.4465 19.8462C11.4465 19.2514 11.9262 18.7692 12.5179 18.7692H14.6607C15.2525 18.7692 15.7321 19.2514 15.7321 19.8462V22C15.7321 22.5948 15.2525 23.0769 14.6607 23.0769H12.5179C11.9262 23.0769 11.4465 22.5948 11.4465 22V19.8462ZM17.3393 13.9231C17.3393 13.3283 17.819 12.8462 18.4107 12.8462H20.5535C21.1452 12.8462 21.6249 13.3283 21.6249 13.9231V16.0769C21.6249 16.6717 21.1452 17.1538 20.5535 17.1538H18.4107C17.819 17.1538 17.3393 16.6717 17.3393 16.0769V13.9231ZM17.3393 19.8462C17.3393 19.2514 17.819 18.7692 18.4107 18.7692H20.5535C21.1452 18.7692 21.6249 19.2514 21.6249 19.8462V22C21.6249 22.5948 21.1452 23.0769 20.5535 23.0769H18.4107C17.819 23.0769 17.3393 22.5948 17.3393 22V19.8462Z" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <li><a href='/myProperties'>My properties</a></li>
                      </div>
                      <div className='settings'>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.089 13.3299L12.5106 24L2.93227 13.3299C2.30049 12.6384 1.80284 11.8072 1.47067 10.8888C1.1385 9.97031 0.979002 8.98445 1.00221 7.99325C1.02543 7.00206 1.23085 6.02701 1.60555 5.1295C1.98025 4.23199 2.51611 3.43147 3.17938 2.77834C3.84265 2.12521 4.61897 1.63362 5.45944 1.33454C6.29992 1.03545 7.18635 0.935346 8.06292 1.04052C8.93948 1.1457 9.78719 1.45388 10.5527 1.94565C11.3181 2.43743 11.9848 3.10215 12.5106 3.89796C13.0388 3.10793 13.7062 2.44901 14.4711 1.96246C15.2361 1.4759 16.0821 1.17217 16.9562 1.07028C17.8303 0.968394 18.7137 1.07054 19.5511 1.37032C20.3885 1.67011 21.1619 2.16108 21.8228 2.8125C22.4837 3.46393 23.018 4.26179 23.3922 5.15616C23.7664 6.05052 23.9724 7.02212 23.9974 8.01017C24.0224 8.99821 23.8658 9.98142 23.5374 10.8983C23.2091 11.8151 22.716 12.6458 22.089 13.3385" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.5101 3.88916L8.30459 8.61948C8.06516 8.88885 7.93066 9.25416 7.93066 9.63506C7.93066 10.016 8.06516 10.3813 8.30459 10.6507L8.99806 11.4307C9.87927 12.4218 11.3096 12.4218 12.1909 11.4307L13.468 9.99418C13.8452 9.5694 14.2931 9.23242 14.7861 9.0025C15.2792 8.77258 15.8077 8.65424 16.3415 8.65424C16.8752 8.65424 17.4038 8.77258 17.8968 9.0025C18.3899 9.23242 18.8378 9.5694 19.215 9.99418L22.0885 13.2263M13.1487 17.5357L15.7029 20.4086M16.3415 13.9445L18.8957 16.8174" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <li><a href='/lanLoyalty'>Loyalty programme</a></li>
                      </div>
                      <div className='settings'>
                        <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.84567 22.6471H3.53333C2.86145 22.6471 2.21709 22.362 1.742 21.8545C1.2669 21.3471 1 20.6588 1 19.9412V3.70588C1 2.98824 1.2669 2.29999 1.742 1.79253C2.21709 1.28508 2.86145 1 3.53333 1H13.6667C14.3385 1 14.9829 1.28508 15.458 1.79253C15.9331 2.29999 16.2 2.98824 16.2 3.70588V14.5294M12.4 21.2941L14.9333 24L20 18.5882M6.06667 6.41176H11.1333M6.06667 11.8235H8.6" stroke="#040606" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <li><a href='/rules'>My rules</a></li>
                      </div>
                      <div className='settings'>
                        <svg width="25" height="19" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.98438 12.2344H7.10938V14.1875H3.98438V12.2344Z" fill="black"/>
                        <path d="M23.938 0.90625H1.06296C0.920026 0.908261 0.778923 0.938675 0.647856 0.995723C0.516789 1.05277 0.398375 1.13531 0.299503 1.23855C0.200631 1.34178 0.123275 1.46365 0.0719358 1.59705C0.0205964 1.73046 -0.00370133 1.87274 0.000456121 2.01562V16.9844C-0.00370133 17.1273 0.0205964 17.2695 0.0719358 17.4029C0.123275 17.5364 0.200631 17.6582 0.299503 17.7615C0.398375 17.8647 0.516789 17.9472 0.647856 18.0043C0.778923 18.0613 0.920026 18.0917 1.06296 18.0938H23.938C24.0809 18.0917 24.222 18.0613 24.3531 18.0043C24.4841 17.9472 24.6025 17.8647 24.7014 17.7615C24.8003 17.6582 24.8776 17.5364 24.929 17.4029C24.9803 17.2695 25.0046 17.1273 25.0005 16.9844V2.01562C25.0046 1.87274 24.9803 1.73046 24.929 1.59705C24.8776 1.46365 24.8003 1.34178 24.7014 1.23855C24.6025 1.13531 24.4841 1.05277 24.3531 0.995723C24.222 0.938675 24.0809 0.908261 23.938 0.90625ZM23.0473 2.85938V4.8125H1.95358V2.85938H23.0473ZM1.95358 16.1406V8.71875H23.0473V16.1406H1.95358Z" fill="#040606"/>
                        </svg>
                        <li><a href='/analytics'>Analytics</a></li>
                      </div>
                      <div className='settings'>
                        <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.55469 13.0742H20.4436M6.55469 7.70801H14.888" stroke="#040606" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1 24.1954V3.6831C1 2.97149 1.29266 2.28904 1.81359 1.78586C2.33453 1.28268 3.04107 1 3.77778 1H23.2222C23.9589 1 24.6655 1.28268 25.1864 1.78586C25.7073 2.28904 26 2.97149 26 3.6831V17.0986C26 17.8102 25.7073 18.4926 25.1864 18.9958C24.6655 19.499 23.9589 19.7817 23.2222 19.7817H7.89028C7.47394 19.7817 7.06293 19.8722 6.68766 20.0463C6.31238 20.2205 5.98244 20.4739 5.72222 20.7878L2.48472 24.6971C2.37698 24.8275 2.22994 24.9224 2.06394 24.9686C1.89795 25.0147 1.72119 25.0099 1.55814 24.9548C1.39509 24.8997 1.25379 24.7971 1.1538 24.661C1.05381 24.5249 1.00006 24.3622 1 24.1954Z" stroke="#040606" stroke-width="1.5"/>
                        </svg>
                        <li><a href='/messages'>Incoming messages</a></li>
                      </div>
                      <div className='white-line-2'></div>
                      <div className='settings'>
                        <svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 23C16.55 23 17.0207 22.75 17.412 22.2499C17.8033 21.7499 17.9993 21.1481 18 20.4444V15.3333H16V20.4444H2V2.55556H16V7.66667H18V2.55556C18 1.85278 17.804 1.25137 17.412 0.751333C17.02 0.251296 16.5493 0.000851852 16 0H2C1.45 0 0.979 0.250445 0.587 0.751333C0.195 1.25222 -0.000667572 1.85363 0 2.55556V20.4444C0 21.1472 0.195667 21.7491 0.587 22.2499C0.978333 22.7508 1.44933 23.0009 2 23H16ZM10.5 17.8889L11.9 16.0361L9.35 12.7778H18V10.2222H9.35L11.9 6.96389L10.5 5.11111L5.5 11.5L10.5 17.8889Z" fill="#F4F4F4"/>
                        </svg>
                        <li>Logout</li>
                      </div>
                    </ul>
                  </div>
                )}
              </div>
            </nav>
            <div className="white-strip"></div>
          </header>
          <section className='lan-panel'>
            <h1>Loyalty programme</h1><br/><br/>
            <p>We will take care of your peace of mind and comfort. Trust is<br/>our motto...</p>
            <div className='edit-account-2'>
              <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7952 5.33333L11.7127 6.16889L2.85008 14.2222H1.95211V13.4044L10.7952 5.33333ZM14.309 0C14.065 0 13.8112 0.0888889 13.6257 0.257778L11.8395 1.88444L15.4998 5.21778L17.2859 3.59111C17.6666 3.24444 17.6666 2.66667 17.2859 2.33778L15.002 0.257778C14.8068 0.08 14.5627 0 14.309 0ZM10.7952 2.83556L0 12.6667V16H3.66021L14.4554 6.16889L10.7952 2.83556Z" fill="#F4F4F4"/>
              </svg>
              <p>Edit title</p>
            </div>
            <div className='lan-panel-settings-3'>
              <button onClick={() => window.location.href='/landlord'}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 37.8V35.5C12.5 32.45 13.7116 29.5249 15.8683 27.3683C18.0249 25.2116 20.95 24 24 24C27.05 24 29.9751 25.2116 32.1317 27.3683C34.2884 29.5249 35.5 32.45 35.5 35.5V37.8" stroke="#F4F4F4" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M23.9996 24.0002C25.8296 24.0002 27.5846 23.2732 28.8786 21.9792C30.1726 20.6852 30.8996 18.9302 30.8996 17.1002C30.8996 15.2702 30.1726 13.5152 28.8786 12.2212C27.5846 10.9272 25.8296 10.2002 23.9996 10.2002C22.1696 10.2002 20.4146 10.9272 19.1206 12.2212C17.8266 13.5152 17.0996 15.2702 17.0996 17.1002C17.0996 18.9302 17.8266 20.6852 19.1206 21.9792C20.4146 23.2732 22.1696 24.0002 23.9996 24.0002Z" stroke="#F4F4F4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z" stroke="#F4F4F4" stroke-width="1.5"/>
                  </svg>
                  &nbsp;&nbsp;Account Settings
              </button>
              <button onClick={() => window.location.href='/myProperties'}>
                  <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1337 1.25479C15.6618 0.915069 16.3382 0.915069 16.8663 1.25479L30.259 9.87018C31.0066 10.3511 31.2248 11.3501 30.7463 12.1015C30.2679 12.853 29.2739 13.0723 28.5264 12.5914L27.2499 11.7702V24.6923C27.2499 27.0714 25.3311 29 22.9642 29H9.0358C6.6689 29 4.75015 27.0714 4.75015 24.6923V11.7702L3.47365 12.5914C2.72605 13.0723 1.73215 12.853 1.25369 12.1015C0.77523 11.3501 0.993405 10.3511 1.741 9.87018L15.1337 1.25479ZM10.3751 12.8462C10.3751 12.2514 10.8548 11.7692 11.4465 11.7692H14.6607C15.2525 11.7692 15.7321 12.2514 15.7321 12.8462V16.0769C15.7321 16.6717 15.2525 17.1538 14.6607 17.1538H11.4465C10.8548 17.1538 10.3751 16.6717 10.3751 16.0769V12.8462ZM11.4465 19.8462C11.4465 19.2514 11.9262 18.7692 12.5179 18.7692H14.6607C15.2525 18.7692 15.7321 19.2514 15.7321 19.8462V22C15.7321 22.5948 15.2525 23.0769 14.6607 23.0769H12.5179C11.9262 23.0769 11.4465 22.5948 11.4465 22V19.8462ZM17.3393 13.9231C17.3393 13.3283 17.819 12.8462 18.4107 12.8462H20.5535C21.1452 12.8462 21.6249 13.3283 21.6249 13.9231V16.0769C21.6249 16.6717 21.1452 17.1538 20.5535 17.1538H18.4107C17.819 17.1538 17.3393 16.6717 17.3393 16.0769V13.9231ZM17.3393 19.8462C17.3393 19.2514 17.819 18.7692 18.4107 18.7692H20.5535C21.1452 18.7692 21.6249 19.2514 21.6249 19.8462V22C21.6249 22.5948 21.1452 23.0769 20.5535 23.0769H18.4107C17.819 23.0769 17.3393 22.5948 17.3393 22V19.8462Z" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  &nbsp;&nbsp;My properties
              </button>
              <button className='active-button' onClick={() => window.location.href='/lanLoyalty'}>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.089 13.3299L12.5106 24L2.93227 13.3299C2.30049 12.6384 1.80284 11.8072 1.47067 10.8888C1.1385 9.97031 0.979002 8.98445 1.00221 7.99325C1.02543 7.00206 1.23085 6.02701 1.60555 5.1295C1.98025 4.23199 2.51611 3.43147 3.17938 2.77834C3.84265 2.12521 4.61897 1.63362 5.45944 1.33454C6.29992 1.03545 7.18635 0.935346 8.06292 1.04052C8.93948 1.1457 9.78719 1.45388 10.5527 1.94565C11.3181 2.43743 11.9848 3.10215 12.5106 3.89796C13.0388 3.10793 13.7062 2.44901 14.4711 1.96246C15.2361 1.4759 16.0821 1.17217 16.9562 1.07028C17.8303 0.968394 18.7137 1.07054 19.5511 1.37032C20.3885 1.67011 21.1619 2.16108 21.8228 2.8125C22.4837 3.46393 23.018 4.26179 23.3922 5.15616C23.7664 6.05052 23.9724 7.02212 23.9974 8.01017C24.0224 8.99821 23.8658 9.98142 23.5374 10.8983C23.2091 11.8151 22.716 12.6458 22.089 13.3385" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.5101 3.88916L8.30459 8.61948C8.06516 8.88885 7.93066 9.25416 7.93066 9.63506C7.93066 10.016 8.06516 10.3813 8.30459 10.6507L8.99806 11.4307C9.87927 12.4218 11.3096 12.4218 12.1909 11.4307L13.468 9.99418C13.8452 9.5694 14.2931 9.23242 14.7861 9.0025C15.2792 8.77258 15.8077 8.65424 16.3415 8.65424C16.8752 8.65424 17.4038 8.77258 17.8968 9.0025C18.3899 9.23242 18.8378 9.5694 19.215 9.99418L22.0885 13.2263M13.1487 17.5357L15.7029 20.4086M16.3415 13.9445L18.8957 16.8174" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                &nbsp;&nbsp;Loyalty programme
              </button>
              <button onClick={() => window.location.href='/rules'}>
                <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.84567 22.6471H3.53333C2.86145 22.6471 2.21709 22.362 1.742 21.8545C1.2669 21.3471 1 20.6588 1 19.9412V3.70588C1 2.98824 1.2669 2.29999 1.742 1.79253C2.21709 1.28508 2.86145 1 3.53333 1H13.6667C14.3385 1 14.9829 1.28508 15.458 1.79253C15.9331 2.29999 16.2 2.98824 16.2 3.70588V14.5294M12.4 21.2941L14.9333 24L20 18.5882M6.06667 6.41176H11.1333M6.06667 11.8235H8.6" stroke="#040606" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                &nbsp;&nbsp;My rules
              </button>
              <button onClick={() => window.location.href='/analytics'}>
                <svg width="25" height="19" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.98438 12.2344H7.10938V14.1875H3.98438V12.2344Z" fill="black"/>
                <path d="M23.938 0.90625H1.06296C0.920026 0.908261 0.778923 0.938675 0.647856 0.995723C0.516789 1.05277 0.398375 1.13531 0.299503 1.23855C0.200631 1.34178 0.123275 1.46365 0.0719358 1.59705C0.0205964 1.73046 -0.00370133 1.87274 0.000456121 2.01562V16.9844C-0.00370133 17.1273 0.0205964 17.2695 0.0719358 17.4029C0.123275 17.5364 0.200631 17.6582 0.299503 17.7615C0.398375 17.8647 0.516789 17.9472 0.647856 18.0043C0.778923 18.0613 0.920026 18.0917 1.06296 18.0938H23.938C24.0809 18.0917 24.222 18.0613 24.3531 18.0043C24.4841 17.9472 24.6025 17.8647 24.7014 17.7615C24.8003 17.6582 24.8776 17.5364 24.929 17.4029C24.9803 17.2695 25.0046 17.1273 25.0005 16.9844V2.01562C25.0046 1.87274 24.9803 1.73046 24.929 1.59705C24.8776 1.46365 24.8003 1.34178 24.7014 1.23855C24.6025 1.13531 24.4841 1.05277 24.3531 0.995723C24.222 0.938675 24.0809 0.908261 23.938 0.90625ZM23.0473 2.85938V4.8125H1.95358V2.85938H23.0473ZM1.95358 16.1406V8.71875H23.0473V16.1406H1.95358Z" fill="#040606"/>
                </svg>
                &nbsp;&nbsp;Analytics
              </button>
              <button onClick={() => window.location.href='/messages'}>
                <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.55469 13.0742H20.4436M6.55469 7.70801H14.888" stroke="#040606" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 24.1954V3.6831C1 2.97149 1.29266 2.28904 1.81359 1.78586C2.33453 1.28268 3.04107 1 3.77778 1H23.2222C23.9589 1 24.6655 1.28268 25.1864 1.78586C25.7073 2.28904 26 2.97149 26 3.6831V17.0986C26 17.8102 25.7073 18.4926 25.1864 18.9958C24.6655 19.499 23.9589 19.7817 23.2222 19.7817H7.89028C7.47394 19.7817 7.06293 19.8722 6.68766 20.0463C6.31238 20.2205 5.98244 20.4739 5.72222 20.7878L2.48472 24.6971C2.37698 24.8275 2.22994 24.9224 2.06394 24.9686C1.89795 25.0147 1.72119 25.0099 1.55814 24.9548C1.39509 24.8997 1.25379 24.7971 1.1538 24.661C1.05381 24.5249 1.00006 24.3622 1 24.1954Z" stroke="#040606" stroke-width="1.5"/>
                </svg>
                &nbsp;&nbsp;Incoming messages
              </button>
            </div>
            <div className="lan-category-panel">
              <div className="lan-categories">
                <span className="category active">Partnership</span>
                <span className="category">Discount</span>
                <span className="category">Seasonal</span>
              </div>
              <div className="progress-bar">
                <div className="progress"></div>
              </div>
            </div>
          </section>
          <section className="lan-loyalty-programme">
            <div className="lan-discount-plan">
                <div className="plan-item">
                <label>A basic level of</label>
                <div className="plan-details">
                    <h3>1%</h3>
                    <p>Registration on the platform</p>
                    <p>Placement of at least one object</p>
                </div>
                </div>
                <div className="plan-item active-plan">
                <label>Silver level</label>
                <div className="plan-details">
                    <h3>5%</h3>
                    <p>Placement of at least 5 objects</p>
                    <p>Minimum 10 successful reservations</p>
                </div>
                </div>
                <div className="plan-item">
                <label>Gold level</label>
                <div className="plan-details">
                    <h3>10%</h3>
                    <p>Placement of at least 10 objects</p>
                    <p>Minimum 50 successful registrations</p>
                    <p>The average rating of objects is not lower than 4.5</p>
                </div>
                </div>
                <div className="plan-item">
                <label>Platinum level</label>
                <div className="plan-details">
                    <h3>20%</h3>
                    <p>Placement of at least 20 objects</p>
                    <p>Minimum 100 successful registrations</p>
                    <p>The average rating of objects is not lower than 4.8</p>
                </div>
                </div>
            </div>
            <div className="current-plan">Your current discount</div><br/>
            <div className="advantages">
                <div className="advantage">
                <h6>Advantages:</h6>
                <p>
                    Access to a database of potential tenants.<br />
                    Basic analytics on views and bookings of properties.<br />
                    Support 24/7.
                </p>
                </div>
                <div className="advantage">
                <h6>Advantages:</h6>
                <p>
                    Increased visibility of objects in search (by 5%).<br />
                    5% discount on professional photography services.<br />
                    Access to advanced analytics and reports.
                </p>
                </div>
                <div className="advantage">
                <h6>Advantages:</h6>
                <p>
                    Increased visibility of objects in search (by 10%).<br />
                    Free professional photography of one object per year.<br />
                    Access to a personal manager.<br />
                    15% discount on advertising promotion services.
                </p>
                </div>
                <div className="advantage">
                <h6>Advantages:</h6>
                <p>
                    Increased visibility of objects in search (by 30%).<br />
                    Free professional photography of two objects per year.<br />
                    Access to a personal manager and support team.<br />
                    20% discount on advertising promotion services.<br />
                    Opportunity to participate in closed events and trainings for landlords.
                </p>
                </div>
            </div>
            <div className="bonuses">
                <div className="additional">
                Additional bonuses and promotions:
                </div>
                <div className="example-bonuses">
                Examples of bonuses:
                </div>
            </div>
            <div className="additional-describ">
                “Refer a Friend” program: For attracting a new landlord, you receive a 5% discount on platform services.<br />
                Seasonal promotions: Special offers and discounts on services during certain periods of the year.<br /><br />
                Training programs and webinars: Regular training events to improve the quality of services provided.
                <div className="divider-describ"></div>
                Free promotion of the property during the week upon reaching a certain number of bookings per month.<br />
                Placement on the main page of the site for properties with high ratings and positive reviews.<br /><br />
                This loyalty program is aimed at supporting landlords, increasing their satisfaction and motivating them to provide quality services.
            </div><br/><br/>
            <div className='make-quesrtion'>
              If you have any questions, you can ask them to the<a href="/question"> site administration</a>
            </div>
            </section>
            <footer className="lan-loyalty-footer">
              <div className="footer-content">
                <div className="logo-footer">
                    <svg width="81" height="51" viewBox="0 0 81 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M61.0675 3.457V0.192383H0V50.3138H32.8382L30.9178 46.8572H2.88054V3.457H61.0675Z" fill="#F4F4F4"/>
                    <path d="M74.1264 3.26482V0.384277H80.8477V49.5455H47.2414L45.7051 46.857H77.9672V3.26482H74.1264Z" fill="#F4F4F4"/>
                    <path d="M71.2448 0H63.9474V21.7001H49.3527V9.21774H41.8633V41.2878H49.3527V27.8452H63.9474V41.2878H71.2448V0Z" fill="#F4F4F4"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.4757 41.288H9.41016V9.02588H27.4616C31.4943 9.40995 37.4474 12.4825 37.4474 20.548C37.4474 28.6136 31.1102 30.726 31.1102 30.726L43.7846 49.7375H35.7191L24.0049 32.2623H17.4757V41.288ZM17.0918 14.9789V26.3091H25.7334C28.614 25.733 29.7662 23.7742 29.7662 20.548C29.7662 16.1312 27.0777 15.171 25.3494 14.9789H17.0918Z" fill="#F4F4F4"/>
                    </svg>
                    <p><strong>Rent House</strong></p>
                </div>
                <div className="white-strip-footer"></div>
                <div className="footer-sections">
                    <div className="footer-column">
                    <p>Countries</p>
                    <p>Regions</p>
                    <p>Cities</p>
                    <p>Districts</p>
                    <p>Airports</p>
                    <p>Hotels</p>
                    <p>Landmarks</p>
                    </div>
                    <div className="footer-column">
                    <p>Houses and apartments</p>
                    <p>Apartments</p>
                    <p>Resort hotels</p>
                    <p>Villas</p>
                    <p>Hostels</p>
                    <p>Guest houses</p>
                    </div>
                    <div className="footer-column">
                    <p>VIP Guests</p>
                    <p>Apartments</p>
                    <p>Resort hotels</p>
                    <p>Villas</p>
                    <p>Hostels</p>
                    <p>Guest houses</p>
                    </div>
                    <div className="footer-column">
                    <p>Press Center</p>
                    <p>New Features</p>
                    <p>Career in RH</p>
                    <p>For Investors</p>
                    </div>
                    <div className="register-property-container">
                    <div className="register-property">
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;By listing your accommodation on Rent House, you gain access to a vast audience of travelers seeking unique and reliable places to stay. Our user-friendly platform makes it easy to showcase your property and manage bookings seamlessly.</p>
                    </div>
                    <button className="reg-prop" onClick={() => window.location.href='/property'}>Register your property</button>
                    </div>
                </div>
                <div className="white-strip-footer-2"></div>
                <div className="footer-bottom">
                    <div className="footer-payments">
                    <svg width="65" height="37" viewBox="0 0 65 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M45.2378 36.8624C56.1131 36.8624 64.9292 28.6209 64.9292 18.4545C64.9292 8.28803 56.1131 0.0465088 45.2378 0.0465088C40.3637 0.0465088 35.9032 1.70197 32.4646 4.44424C29.026 1.70202 24.5655 0.0465957 19.6915 0.0465957C8.81616 0.0465957 0 8.28812 0 18.4546C0 28.621 8.81616 36.8625 19.6915 36.8625C24.5656 36.8625 29.0261 35.2071 32.4647 32.4648C35.9033 35.207 40.3637 36.8624 45.2378 36.8624Z" fill="#ED0006"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M32.4639 32.4656C36.6984 29.0893 39.3835 24.0649 39.3835 18.4543C39.3835 12.8437 36.6984 7.8193 32.4639 4.44294C35.9023 1.70134 40.3622 0.0463257 45.2357 0.0463257C56.111 0.0463257 64.9271 8.28785 64.9271 18.4543C64.9271 28.6207 56.111 36.8622 45.2357 36.8622C40.3622 36.8622 35.9023 35.2072 32.4639 32.4656Z" fill="#F9A000"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M32.4652 32.4648C36.699 29.0884 39.3835 24.0645 39.3835 18.4545C39.3835 12.8444 36.699 7.82051 32.4652 4.44415C28.2315 7.82051 25.5469 12.8444 25.5469 18.4545C25.5469 24.0645 28.2315 29.0884 32.4652 32.4648Z" fill="#FF5E00"/>
                    </svg>&nbsp;&nbsp;
                    <svg width="46" height="43" viewBox="0 0 46 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.929199 19.1407C0.929199 29.6274 9.95134 38.1796 21.1216 38.1796C22.4926 38.1796 23.8637 38.0658 25.439 37.9351C27.1957 37.7893 29.2066 37.6224 31.7548 37.5688C35.6215 37.5688 39.8103 38.8923 44.4288 42.7612C44.8584 43.1684 45.5029 42.6594 45.0732 42.1503C40.4548 36.7543 36.2659 35.7361 32.0771 34.8198C26.9215 33.6999 24.2364 31.0528 22.4105 27.9984C22.0883 27.3875 21.8734 27.4893 21.8734 28.3038C21.766 29.5256 21.8734 30.6455 22.0883 31.7655H21.4438C14.1402 31.7655 8.12543 26.064 8.12543 19.1407C8.12543 12.2175 14.1402 6.51599 21.4438 6.51599C28.7475 6.51599 34.7622 12.2175 34.7622 19.1407C34.7622 19.548 34.7622 20.057 34.6548 20.5661C33.5807 20.3625 31.7548 20.3625 30.3586 20.4643C29.8215 20.4643 29.8215 20.6679 30.2511 20.7697C34.5474 21.5842 37.5548 24.1295 38.3066 28.8129C38.3066 29.0165 38.414 29.0165 38.5214 28.9147C40.2399 26.064 41.314 22.7042 41.314 19.1407C41.314 8.55224 32.2919 0 21.1216 0C9.95134 0 0.929199 8.65405 0.929199 19.1407ZM35.73 26.9802C36.4819 27.2856 36.8041 28.3037 36.8041 28.8128C36.9115 29.6273 36.6967 30.0345 36.3744 30.0345C36.0522 30.0345 35.6226 29.7291 35.193 29.0164C34.7633 28.3037 34.5485 27.591 34.7633 27.1838C35.0856 26.9802 35.4078 26.8783 35.73 26.9802ZM31.3249 30.1364C31.7546 30.1364 32.2916 30.34 32.8286 30.7473C33.6879 31.46 34.0101 32.2745 33.5805 32.8853C33.3657 33.1908 32.8286 33.3944 32.399 33.3944C31.862 33.3944 31.3249 33.1908 31.0027 32.8853C30.1435 32.1726 29.9286 31.1545 30.4657 30.5437C30.5731 30.34 30.8953 30.1364 31.3249 30.1364Z" fill="#F28A1A"/>
                    </svg>&nbsp;&nbsp;
                    <svg width="71" height="21" viewBox="0 0 71 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.8906 20.7177H11.7719L7.18371 4.54204C6.96593 3.79796 6.50353 3.14015 5.82335 2.83012C4.12588 2.05099 2.25539 1.43092 0.214844 1.1182V0.495433H10.0715C11.4319 0.495433 12.4521 1.43092 12.6222 2.51739L15.0028 14.1854L21.1185 0.495433H27.0671L17.8906 20.7177ZM30.4668 20.7177H24.6882L29.4465 0.495433H35.2251L30.4668 20.7177ZM42.702 6.09762C42.872 5.00846 43.8923 4.3857 45.0826 4.3857C46.9531 4.22933 48.9906 4.54206 50.6911 5.3185L51.7114 0.964545C50.0109 0.341782 48.1404 0.0290527 46.4429 0.0290527C40.8344 0.0290527 36.7534 2.83014 36.7534 6.71769C36.7534 9.67514 39.6441 11.228 41.6847 12.1635C43.8923 13.0963 44.7425 13.7191 44.5724 14.6519C44.5724 16.051 42.872 16.6738 41.1745 16.6738C39.134 16.6738 37.0934 16.2074 35.2259 15.4283L34.2057 19.7849C36.2462 20.5614 38.4538 20.8741 40.4944 20.8741C46.783 21.0278 50.6911 18.2294 50.6911 14.0291C50.6911 8.73965 42.702 8.42962 42.702 6.09762ZM70.9147 20.7177L66.3265 0.495433H61.3982C60.3779 0.495433 59.3576 1.1182 59.0175 2.05099L50.5213 20.7177H56.4699L57.6572 17.7629H64.9661L65.6463 20.7177H70.9147ZM62.2487 5.94148L63.9462 13.5629H59.1879L62.2487 5.94148Z" fill="#172B85"/>
                    </svg>
                    </div>
                    <p className='download-app'>Download the application to your phone</p>
                    <div className="footer-apps">
                    <svg width="138" height="47" viewBox="0 0 138 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M51.5363 34.7982H53.1719L48.8567 22.3746H46.2119L41.9141 34.7982H43.5149L44.8025 30.9876H50.2487L51.5363 34.7982ZM47.1689 23.9754H47.8649L49.7615 29.5608H45.2723L47.1689 23.9754ZM56.4173 38.2782V33.8412H56.7654C57.2526 34.4676 58.053 35.0244 59.4276 35.0244C61.8636 35.0244 63.3251 33.0408 63.3251 30.4134C63.3251 27.8034 61.8636 25.8024 59.4276 25.8024C58.053 25.8024 57.2003 26.3766 56.7131 26.9856H56.3651V26.0286H54.9384V38.2782H56.4173ZM59.1492 27.09C60.924 27.09 61.8462 28.4646 61.8462 30.4134C61.8462 32.3622 60.924 33.7368 59.1492 33.7368C57.2003 33.7368 56.4 32.136 56.4 30.4134C56.4 28.7082 57.2003 27.09 59.1492 27.09ZM67.1224 38.2782V33.8412H67.4704C67.9576 34.4676 68.758 35.0244 70.1326 35.0244C72.5686 35.0244 74.0302 33.0408 74.0302 30.4134C74.0302 27.8034 72.5686 25.8024 70.1326 25.8024C68.758 25.8024 67.9054 26.3766 67.4182 26.9856H67.0702V26.0286H65.6434V38.2782H67.1224ZM69.8542 27.09C71.629 27.09 72.5512 28.4646 72.5512 30.4134C72.5512 32.3622 71.629 33.7368 69.8542 33.7368C67.9054 33.7368 67.105 32.136 67.105 30.4134C67.105 28.7082 67.9054 27.09 69.8542 27.09ZM84.8279 27.3684C83.7665 27.1422 82.7225 26.7594 82.7225 25.5588C82.7225 24.2538 83.9753 23.5752 85.4717 23.5752C87.2639 23.5752 88.1339 24.2712 88.4297 25.5066H90.0131C89.7347 23.5056 88.0817 22.1484 85.5065 22.1484C82.7051 22.1484 81.1391 23.6622 81.1391 25.5936C81.1391 27.4032 82.3571 28.3776 84.1493 28.743C84.7583 28.8648 85.9937 29.1084 86.6027 29.2476C87.8207 29.5086 88.7081 30.048 88.7081 31.3704C88.7081 32.7972 87.3857 33.5976 85.6631 33.5976C83.9405 33.5976 82.4789 33.0234 82.1831 31.3356H80.5997C80.8085 33.4932 82.6877 35.0244 85.5935 35.0244C88.7429 35.0244 90.2915 33.2844 90.2915 31.3356C90.2915 29.2128 89.0213 28.2558 87.1769 27.8382C86.5331 27.699 85.3673 27.4728 84.8279 27.3684ZM95.0428 26.0286V23.3838H93.5638V26.0286H91.789V27.3162H93.5638V32.4666C93.5638 34.311 94.573 34.7982 96.487 34.7982H97.4094V33.4758H96.5914C95.4256 33.4758 95.0428 33.0408 95.0428 32.1708V27.3162H97.4094V26.0286H95.0428ZM103.404 25.8024C100.655 25.8024 99.0885 27.8034 99.0885 30.4134C99.0885 33.0234 100.655 35.0244 103.404 35.0244C106.136 35.0244 107.719 33.0234 107.719 30.4134C107.719 27.8034 106.136 25.8024 103.404 25.8024ZM103.404 33.7368C101.455 33.7368 100.568 32.136 100.568 30.4134C100.568 28.7082 101.455 27.09 103.404 27.09C105.335 27.09 106.24 28.7082 106.24 30.4134C106.24 32.136 105.335 33.7368 103.404 33.7368ZM114.952 26.0286H114.343C113.072 26.0286 112.237 26.5506 111.802 27.09H111.454V26.0286H110.027V34.7982H111.506V30.4134C111.506 28.4994 112.55 27.4206 114.273 27.4206H114.952V26.0286ZM124.479 29.8914C124.444 27.7338 123.157 25.8024 120.564 25.8024C117.902 25.8024 116.336 27.6294 116.336 30.3264C116.336 33.006 117.867 35.0244 120.599 35.0244C122.774 35.0244 124.027 33.876 124.322 32.3796H122.826C122.565 33.2148 121.817 33.7368 120.599 33.7368C118.789 33.7368 117.832 32.4666 117.797 30.396H124.479V29.8914ZM120.529 27.09C122.026 27.09 122.843 28.0644 122.948 29.1606H117.884C118.093 28.047 118.928 27.09 120.529 27.09Z" fill="#F4F4F4"/>
                    <path d="M45.0302 9.53192H42.4492V16.4339H45.0302C47.1472 16.4339 48.2202 15.0516 48.2202 12.9829C48.2202 10.9046 47.1472 9.53192 45.0302 9.53192ZM45.0302 15.6413H43.3192V10.3246H45.0302C46.7122 10.3246 47.3406 11.5329 47.3406 12.9829C47.3406 14.4233 46.7122 15.6413 45.0302 15.6413ZM51.6438 11.4363C50.1164 11.4363 49.2464 12.5479 49.2464 13.9979C49.2464 15.4479 50.1164 16.5596 51.6438 16.5596C53.1614 16.5596 54.0411 15.4479 54.0411 13.9979C54.0411 12.5479 53.1614 11.4363 51.6438 11.4363ZM51.6438 15.8442C50.5611 15.8442 50.0681 14.9549 50.0681 13.9979C50.0681 13.0506 50.5611 12.1516 51.6438 12.1516C52.7168 12.1516 53.2194 13.0506 53.2194 13.9979C53.2194 14.9549 52.7168 15.8442 51.6438 15.8442ZM57.3631 13.0603L56.5318 15.5639H56.3385L55.7488 11.5619H54.9561L55.6618 16.4339H56.9378L57.7885 13.8723H57.9721L58.8228 16.4339H60.0795L60.7948 11.5619H60.0021L59.4318 15.5639H59.2385L58.4265 13.0603H57.3631ZM64.4238 11.4363C63.7568 11.4363 63.2348 11.7263 62.9834 12.0936H62.7998V11.5619H62.0071V16.4339H62.8288V13.7853C62.8288 12.9346 63.3991 12.1709 64.2691 12.1709C65.0908 12.1709 65.5161 12.6252 65.5161 13.5146V16.4339H66.3378V13.3696C66.3378 12.1999 65.6418 11.4363 64.4238 11.4363ZM67.841 9.40625V16.4339H68.6627V9.40625H67.841ZM72.346 11.4363C70.8187 11.4363 69.9487 12.5479 69.9487 13.9979C69.9487 15.4479 70.8187 16.5596 72.346 16.5596C73.8637 16.5596 74.7433 15.4479 74.7433 13.9979C74.7433 12.5479 73.8637 11.4363 72.346 11.4363ZM72.346 15.8442C71.2633 15.8442 70.7703 14.9549 70.7703 13.9979C70.7703 13.0506 71.2633 12.1516 72.346 12.1516C73.419 12.1516 73.9217 13.0506 73.9217 13.9979C73.9217 14.9549 73.419 15.8442 72.346 15.8442ZM79.1286 16.4339H79.9019V13.1183C79.9019 12.0259 79.1093 11.4363 77.8913 11.4363C76.799 11.4363 76.0159 11.9583 75.958 12.8573H76.7796C76.8183 12.4319 77.1953 12.1516 77.9106 12.1516C78.7516 12.1516 79.0996 12.5769 79.0996 13.1666V13.3599H77.5143C76.1513 13.3599 75.6486 14.1912 75.6486 14.9742C75.6486 15.8056 76.277 16.5596 77.408 16.5596C78.104 16.5596 78.6356 16.2889 78.9353 15.9119H79.1286V16.4339ZM77.6013 15.8442C76.8859 15.8442 76.4703 15.5059 76.4703 14.9549C76.4703 14.3846 76.8473 14.0462 77.6399 14.0462H79.0996V14.4812C79.0996 15.2449 78.4229 15.8442 77.6013 15.8442ZM84.9445 9.40625V12.0936H84.7511C84.4805 11.7456 84.0358 11.4363 83.2721 11.4363C81.9188 11.4363 81.1068 12.5382 81.1068 13.9979C81.1068 15.4479 81.9188 16.5596 83.2721 16.5596C84.0358 16.5596 84.5095 16.2406 84.7801 15.9023H84.9735V16.4339H85.7661V9.40625H84.9445ZM83.4268 15.8442C82.4408 15.8442 81.9285 15.0806 81.9285 13.9979C81.9285 12.9153 82.4408 12.1516 83.4268 12.1516C84.5095 12.1516 84.9541 13.0409 84.9541 13.9979C84.9541 14.9453 84.5095 15.8442 83.4268 15.8442ZM92.1419 11.4363C90.6145 11.4363 89.7445 12.5479 89.7445 13.9979C89.7445 15.4479 90.6145 16.5596 92.1419 16.5596C93.6595 16.5596 94.5392 15.4479 94.5392 13.9979C94.5392 12.5479 93.6595 11.4363 92.1419 11.4363ZM92.1419 15.8442C91.0592 15.8442 90.5662 14.9549 90.5662 13.9979C90.5662 13.0506 91.0592 12.1516 92.1419 12.1516C93.2149 12.1516 93.7175 13.0506 93.7175 13.9979C93.7175 14.9549 93.2149 15.8442 92.1419 15.8442ZM98.2385 11.4363C97.5715 11.4363 97.0495 11.7263 96.7981 12.0936H96.6142V11.5619H95.8215V16.4339H96.6432V13.7853C96.6432 12.9346 97.2138 12.1709 98.0838 12.1709C98.9055 12.1709 99.3308 12.6252 99.3308 13.5146V16.4339H100.152V13.3696C100.152 12.1999 99.4565 11.4363 98.2385 11.4363ZM105.622 11.5619V10.0926H104.8V11.5619H103.814V12.2773H104.8V15.1386C104.8 16.1632 105.361 16.4339 106.424 16.4339H106.937V15.6993H106.482C105.835 15.6993 105.622 15.4576 105.622 14.9742V12.2773H106.937V11.5619H105.622ZM110.708 11.4363C110.041 11.4363 109.539 11.7263 109.297 12.0936H109.113V9.40625H108.292V16.4339H109.113V13.7853C109.113 12.9346 109.684 12.1709 110.554 12.1709C111.375 12.1709 111.801 12.6252 111.801 13.5146V16.4339H112.622V13.3696C112.622 12.1999 111.926 11.4363 110.708 11.4363ZM118.35 13.7079C118.331 12.5093 117.615 11.4363 116.175 11.4363C114.696 11.4363 113.826 12.4513 113.826 13.9496C113.826 15.4383 114.677 16.5596 116.194 16.5596C117.403 16.5596 118.099 15.9216 118.263 15.0903H117.432C117.287 15.5542 116.871 15.8442 116.194 15.8442C115.189 15.8442 114.657 15.1386 114.638 13.9883H118.35V13.7079ZM116.156 12.1516C116.987 12.1516 117.441 12.6929 117.499 13.3019H114.686C114.802 12.6833 115.266 12.1516 116.156 12.1516Z" fill="#E6D0C4"/>
                    <path d="M28.8157 22.972C28.8272 22.0827 29.0634 21.2108 29.5024 20.4374C29.9413 19.6639 30.5688 19.0141 31.3264 18.5484C30.8452 17.861 30.2103 17.2954 29.4721 16.8964C28.734 16.4972 27.913 16.2759 27.0743 16.2496C25.2852 16.0618 23.5508 17.3201 22.6391 17.3201C21.7098 17.3201 20.3062 16.2682 18.7946 16.2993C17.8169 16.331 16.8642 16.6153 16.029 17.1246C15.1939 17.6338 14.5049 18.3508 14.0292 19.2056C11.9688 22.773 13.5057 28.0158 15.4794 30.8995C16.467 32.3115 17.6211 33.8887 19.1312 33.8328C20.6089 33.7715 21.1609 32.8904 22.9447 32.8904C24.712 32.8904 25.2297 33.8328 26.7705 33.7973C28.3562 33.7715 29.3553 32.379 30.3082 30.9535C31.0177 29.9474 31.5637 28.8355 31.9259 27.6588C31.0047 27.2692 30.2185 26.617 29.6653 25.7835C29.1123 24.95 28.8168 23.9723 28.8157 22.972Z" fill="#F4F4F4"/>
                    <path d="M25.9042 14.3517C26.7688 13.3138 27.1947 11.9798 27.0916 10.6328C25.7707 10.7715 24.5505 11.4029 23.6742 12.4009C23.2458 12.8885 22.9177 13.4558 22.7086 14.0703C22.4995 14.6848 22.4136 15.3345 22.4557 15.9822C23.1165 15.9889 23.7701 15.8458 24.3674 15.5633C24.9647 15.2809 25.4902 14.8666 25.9042 14.3517Z" fill="#F4F4F4"/>
                    <path d="M7.73437 0.984375H129.534C133.262 0.984375 136.284 4.00645 136.284 7.73438V38.6677C136.284 42.3956 133.262 45.4177 129.534 45.4177H7.73437C4.00645 45.4177 0.984375 42.3956 0.984375 38.6677V7.73438C0.984375 4.00645 4.00645 0.984375 7.73437 0.984375Z" stroke="#F4F4F4"/>
                    </svg>
                    <svg width="154" height="47" viewBox="0 0 154 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_981_2095)">
                    <path d="M49.0234 28.2036V29.5956H52.8688V29.8218C52.8688 31.8228 51.8422 33.5976 49.267 33.5976C46.3264 33.5976 45.0736 31.2312 45.0736 28.5864C45.0736 25.9068 46.3612 23.5752 49.2844 23.5752C51.0766 23.5752 52.0684 24.3582 52.4512 25.611H54.0868C53.5996 23.4882 51.8596 22.1484 49.2844 22.1484C45.526 22.1484 43.4902 24.9324 43.4902 28.5864C43.4902 32.2056 45.4912 35.0244 49.2496 35.0244C53.0254 35.0244 54.4696 32.31 54.4696 29.4564V28.2036H49.0234ZM60.6838 25.8024C57.9346 25.8024 56.3686 27.8034 56.3686 30.4134C56.3686 33.0234 57.9346 35.0244 60.6838 35.0244C63.4156 35.0244 64.9991 33.0234 64.9991 30.4134C64.9991 27.8034 63.4156 25.8024 60.6838 25.8024ZM60.6838 33.7368C58.735 33.7368 57.8476 32.136 57.8476 30.4134C57.8476 28.7082 58.735 27.09 60.6838 27.09C62.6152 27.09 63.5201 28.7082 63.5201 30.4134C63.5201 32.136 62.6152 33.7368 60.6838 33.7368ZM71.0831 25.8024C68.3339 25.8024 66.7679 27.8034 66.7679 30.4134C66.7679 33.0234 68.3339 35.0244 71.0831 35.0244C73.8149 35.0244 75.3983 33.0234 75.3983 30.4134C75.3983 27.8034 73.8149 25.8024 71.0831 25.8024ZM71.0831 33.7368C69.1343 33.7368 68.2469 32.136 68.2469 30.4134C68.2469 28.7082 69.1343 27.09 71.0831 27.09C73.0145 27.09 73.9193 28.7082 73.9193 30.4134C73.9193 32.136 73.0145 33.7368 71.0831 33.7368ZM84.1272 26.0286V26.9856H83.7792C83.3268 26.394 82.4742 25.8024 81.117 25.8024C78.6984 25.8024 77.1672 27.7164 77.1672 30.2916C77.1672 32.8494 78.6984 34.7634 81.117 34.7634C82.4394 34.7634 83.2746 34.1892 83.727 33.5802H84.075V34.2936C84.075 36.051 83.2572 37.1472 81.4476 37.1472C80.1252 37.1472 79.203 36.7644 78.9594 35.7204H77.4978C77.7588 37.443 79.2378 38.4 81.465 38.4C84.0054 38.4 85.554 36.834 85.554 34.3632V26.0286H84.1272ZM81.3432 33.4758C79.638 33.4758 78.6462 32.1882 78.6462 30.2916C78.6462 28.3776 79.638 27.09 81.3432 27.09C83.2224 27.09 84.1098 28.6038 84.1098 30.2916C84.1098 31.962 83.2224 33.4758 81.3432 33.4758ZM88.4116 22.1484V34.7982H89.8906V22.1484H88.4116ZM100.349 29.8914C100.314 27.7338 99.0262 25.8024 96.4334 25.8024C93.7712 25.8024 92.2052 27.6294 92.2052 30.3264C92.2052 33.006 93.7364 35.0244 96.4682 35.0244C98.6434 35.0244 99.8962 33.876 100.192 32.3796H98.6956C98.4346 33.2148 97.6864 33.7368 96.4682 33.7368C94.6586 33.7368 93.7016 32.4666 93.6668 30.396H100.349V29.8914ZM96.3986 27.09C97.8952 27.09 98.713 28.0644 98.8174 29.1606H93.7538C93.9626 28.047 94.7978 27.09 96.3986 27.09ZM112.906 22.3746H107.651V34.7982H109.217V29.8218H112.906C115.603 29.8218 117.116 28.4124 117.116 26.0808C117.116 23.784 115.603 22.3746 112.906 22.3746ZM112.645 28.4298H109.217V23.7666H112.645C114.767 23.7666 115.533 24.654 115.533 26.0982C115.533 27.5424 114.767 28.4298 112.645 28.4298ZM119.439 22.1484V34.7982H120.918V22.1484H119.439ZM129.357 34.7982H130.749V28.83C130.749 26.8638 129.323 25.8024 127.13 25.8024C125.164 25.8024 123.754 26.742 123.65 28.3602H125.129C125.199 27.5946 125.877 27.09 127.165 27.09C128.679 27.09 129.305 27.8556 129.305 28.917V29.265H126.451C123.998 29.265 123.093 30.7614 123.093 32.1708C123.093 33.6672 124.224 35.0244 126.26 35.0244C127.513 35.0244 128.47 34.5372 129.009 33.8586H129.357V34.7982ZM126.608 33.7368C125.32 33.7368 124.572 33.1278 124.572 32.136C124.572 31.1094 125.251 30.5004 126.678 30.5004H129.305V31.2834C129.305 32.658 128.087 33.7368 126.608 33.7368ZM135.824 38.2782L141.114 26.0286H139.53L137.094 31.8054H136.659L134.015 26.0286H132.414L136.103 34.0152L134.31 38.2782H135.824Z" fill="#F4F4F4"/>
                    <path d="M46.1404 12.7703V13.5436H48.2767V13.6693C48.2767 14.7809 47.7064 15.7669 46.2757 15.7669C44.6421 15.7669 43.9461 14.4523 43.9461 12.9829C43.9461 11.4943 44.6614 10.1989 46.2854 10.1989C47.2811 10.1989 47.8321 10.6339 48.0447 11.3299H48.9534C48.6827 10.1506 47.7161 9.40625 46.2854 9.40625C44.1974 9.40625 43.0664 10.9529 43.0664 12.9829C43.0664 14.9936 44.1781 16.5596 46.2661 16.5596C48.3637 16.5596 49.1661 15.0516 49.1661 13.4663V12.7703H46.1404ZM54.7451 13.7079C54.7258 12.5093 54.0104 11.4363 52.5701 11.4363C51.0911 11.4363 50.2211 12.4513 50.2211 13.9496C50.2211 15.4383 51.0718 16.5596 52.5894 16.5596C53.7978 16.5596 54.4938 15.9216 54.6581 15.0903H53.8268C53.6818 15.5542 53.2661 15.8442 52.5894 15.8442C51.5841 15.8442 51.0524 15.1386 51.0331 13.9883H54.7451V13.7079ZM52.5508 12.1516C53.3821 12.1516 53.8364 12.6929 53.8944 13.3019H51.0814C51.1974 12.6833 51.6614 12.1516 52.5508 12.1516ZM57.3004 11.5619V10.0926H56.4787V11.5619H55.4927V12.2773H56.4787V15.1386C56.4787 16.1632 57.0394 16.4339 58.1027 16.4339H58.615V15.6993H58.1607C57.513 15.6993 57.3004 15.4576 57.3004 14.9742V12.2773H58.615V11.5619H57.3004ZM63.5694 10.3729V9.40625H62.6221V10.3729H63.5694ZM63.5017 11.5619H62.6801V16.4339H63.5017V11.5619ZM67.5319 11.4363C66.8649 11.4363 66.3429 11.7263 66.0915 12.0936H65.9079V11.5619H65.1152V16.4339H65.9369V13.7853C65.9369 12.9346 66.5072 12.1709 67.3772 12.1709C68.1989 12.1709 68.6242 12.6252 68.6242 13.5146V16.4339H69.4459V13.3696C69.4459 12.1999 68.7499 11.4363 67.5319 11.4363ZM75.7372 11.4363C74.2099 11.4363 73.3399 12.5479 73.3399 13.9979C73.3399 15.4479 74.2099 16.5596 75.7372 16.5596C77.2549 16.5596 78.1346 15.4479 78.1346 13.9979C78.1346 12.5479 77.2549 11.4363 75.7372 11.4363ZM75.7372 15.8442C74.6546 15.8442 74.1616 14.9549 74.1616 13.9979C74.1616 13.0506 74.6546 12.1516 75.7372 12.1516C76.8102 12.1516 77.3129 13.0506 77.3129 13.9979C77.3129 14.9549 76.8102 15.8442 75.7372 15.8442ZM81.8336 11.4363C81.1666 11.4363 80.6446 11.7263 80.3933 12.0936H80.2096V11.5619H79.4169V16.4339H80.2386V13.7853C80.2386 12.9346 80.8089 12.1709 81.6789 12.1709C82.5006 12.1709 82.9259 12.6252 82.9259 13.5146V16.4339H83.7476V13.3696C83.7476 12.1999 83.0516 11.4363 81.8336 11.4363Z" fill="#E6D0C4"/>
                    <path d="M13.5314 34.3733L13.4643 34.3092C13.2018 34.0314 13.0469 33.6002 13.0469 33.0418V33.1732V13.2246C13.0469 13.2228 13.0469 13.2214 13.0469 13.2201C13.0469 13.2217 13.0469 13.2232 13.0469 13.225V13.3568C13.0469 12.7521 13.2275 12.2965 13.5302 12.0234L24.7058 23.1987L13.5314 34.3733ZM13.0469 13.2189C13.0469 13.1692 13.0482 13.121 13.0507 13.0734C13.0482 13.1206 13.0469 13.1692 13.0469 13.2189ZM13.0507 13.0713C13.0507 13.0706 13.0507 13.07 13.051 13.0692C13.0507 13.07 13.0507 13.0706 13.0507 13.0713ZM13.051 13.065C13.051 13.0646 13.051 13.0642 13.051 13.0639C13.051 13.0642 13.051 13.0646 13.051 13.065Z" fill="url(#paint0_linear_981_2095)"/>
                    <path d="M28.4297 27.0549L28.5147 27.0066L32.9281 24.499C33.3489 24.2598 33.6293 23.9698 33.7692 23.6629C33.6296 23.9698 33.3491 24.2602 32.9281 24.4994L28.5147 27.007L28.4297 27.0549ZM28.4308 26.9227L24.7051 23.1964L28.4304 19.4707L32.9281 22.0259C33.4992 22.3504 33.8199 22.7687 33.8734 23.196C33.8734 23.1964 33.8734 23.1971 33.8734 23.1978C33.8199 23.6242 33.4992 24.0427 32.9281 24.3673L28.4308 26.9227Z" fill="url(#paint1_linear_981_2095)"/>
                    <path d="M14.3268 34.7993C14.0145 34.7993 13.7421 34.6978 13.5297 34.5061L13.5301 34.5058C13.7425 34.6975 14.0153 34.7993 14.3274 34.7993C14.3545 34.7993 14.3821 34.7986 14.4099 34.7973C14.3817 34.7986 14.3538 34.7993 14.3268 34.7993ZM14.3271 34.6672C14.0149 34.6676 13.7425 34.5657 13.5301 34.374V34.3738L24.7046 23.1992L28.4302 26.9255L15.3376 34.3645C14.9754 34.5699 14.6321 34.6672 14.3271 34.6672ZM13.5269 34.5037C13.5072 34.4858 13.4878 34.4668 13.4688 34.447L13.5269 34.5037Z" fill="url(#paint2_linear_981_2095)"/>
                    <path d="M24.7068 23.1976L13.5312 12.0223C13.7436 11.8309 14.0157 11.7295 14.3275 11.7295C14.6334 11.7295 14.9769 11.827 15.3399 12.0328L28.4321 19.4718L24.7068 23.1976ZM28.5164 19.3877L15.3399 11.9011C14.9769 11.6953 14.6334 11.5977 14.3275 11.5977C14.326 11.5977 14.3251 11.5977 14.3236 11.5977C14.3255 11.5977 14.3268 11.5977 14.3289 11.5977C14.6341 11.5977 14.9773 11.6949 15.3399 11.9008L28.5164 19.3877Z" fill="url(#paint3_linear_981_2095)"/>
                    <path d="M14.4097 34.7981C14.6934 34.782 15.0073 34.6843 15.3375 34.4973L28.429 27.0586L15.3375 34.4973C15.0076 34.6847 14.6934 34.782 14.4097 34.7981ZM13.5296 34.507L13.5268 34.5046C13.5278 34.5054 13.5289 34.5064 13.5296 34.507ZM13.4686 34.4479L13.4629 34.4423V34.442C13.4651 34.444 13.4669 34.4462 13.4686 34.4479Z" fill="#244D4D"/>
                    <path d="M28.4297 27.0561L28.5148 27.0078L28.4297 27.0561Z" fill="url(#paint4_linear_981_2095)"/>
                    <path d="M14.3273 34.7996C14.0151 34.7996 13.7424 34.6978 13.53 34.5061L13.5296 34.5064C13.5289 34.5057 13.5278 34.5047 13.5268 34.504L13.4686 34.4472C13.4669 34.4455 13.4651 34.4434 13.4629 34.4413L13.53 34.3742C13.7424 34.5659 14.0148 34.6678 14.327 34.6674C14.632 34.6674 14.9752 34.5702 15.3375 34.3648L28.4301 26.9258L28.514 27.0097L28.429 27.0579L15.3375 34.4966C15.0073 34.6837 14.6934 34.7813 14.4097 34.7975C14.3819 34.7989 14.3544 34.7996 14.3273 34.7996Z" fill="url(#paint5_linear_981_2095)"/>
                    <path d="M13.4643 34.4416C13.2018 34.1639 13.0469 33.7327 13.0469 33.1742V33.1738C13.0469 33.7327 13.2018 34.1635 13.4643 34.4412V34.4416Z" fill="#244D4D"/>
                    <path d="M13.4643 34.4418C13.2018 34.1641 13.0469 33.7332 13.0469 33.1744V33.043C13.0469 33.6014 13.2018 34.0326 13.4643 34.3104L13.5314 34.3746L13.4643 34.4418Z" fill="url(#paint6_linear_981_2095)"/>
                    <path d="M13.4629 34.4402L13.5298 34.373V34.3733L13.4629 34.4402Z" fill="url(#paint7_linear_981_2095)"/>
                    <path d="M33.7695 23.665C33.8389 23.5127 33.8738 23.3563 33.8738 23.1998C33.8738 23.1995 33.8738 23.1992 33.8738 23.1992C33.8738 23.3559 33.8389 23.5123 33.7695 23.665Z" fill="#244D4D"/>
                    <path d="M28.5155 27.01L28.4316 26.9261L32.929 24.3706C33.5001 24.0461 33.8207 23.6276 33.8743 23.2012C33.8743 23.3577 33.8394 23.5141 33.7701 23.6663C33.6302 23.9732 33.3498 24.2632 32.929 24.5024L28.5155 27.01Z" fill="url(#paint8_linear_981_2095)"/>
                    <path d="M33.8728 23.1965V23.1962C33.8724 22.7243 33.5571 22.2526 32.9274 21.8946L28.514 19.387H28.5137L28.514 19.3867L32.9274 21.8943C33.5577 22.2522 33.8734 22.7247 33.8728 23.1965Z" fill="#404040"/>
                    <path d="M33.8727 23.196C33.8191 22.7686 33.4985 22.3503 32.9274 22.0258L28.4297 19.4706L28.5136 19.3867H28.514L32.9274 21.8943C33.5571 22.2524 33.8724 22.7241 33.8727 23.196Z" fill="url(#paint9_linear_981_2095)"/>
                    <path d="M13.0469 13.2189C13.0469 13.2185 13.0469 13.2181 13.0469 13.2177C13.0469 13.2181 13.0469 13.2185 13.0469 13.2189ZM13.0507 13.0722C13.0507 13.0715 13.0507 13.0708 13.0507 13.0701C13.0507 13.0708 13.0507 13.0715 13.0507 13.0722ZM13.051 13.068C13.051 13.0666 13.051 13.0653 13.051 13.0638C13.051 13.0653 13.051 13.0666 13.051 13.068ZM13.051 13.0626C13.1032 12.1361 13.6071 11.6008 14.3199 11.5977C14.0108 11.5995 13.7417 11.7009 13.531 11.8908V11.8905L13.5285 11.893C13.5062 11.913 13.4852 11.9342 13.4643 11.956C13.2275 12.2065 13.0782 12.5817 13.051 13.0626Z" fill="#404040"/>
                    <path d="M13.0469 13.3538V13.222C13.0469 13.2203 13.0469 13.2188 13.0469 13.2171C13.0469 13.2167 13.0469 13.2164 13.0469 13.216C13.0469 13.1663 13.0482 13.1177 13.0507 13.0705C13.0507 13.0697 13.0507 13.0691 13.0507 13.0683C13.0507 13.0677 13.0507 13.0669 13.051 13.0663C13.051 13.0648 13.051 13.0635 13.051 13.062C13.051 13.0616 13.051 13.0613 13.051 13.0609C13.0782 12.58 13.2275 12.2048 13.4643 11.9543L13.5302 12.0205C13.2275 12.2936 13.0469 12.7491 13.0469 13.3538ZM13.5285 11.8912L13.531 11.8887C13.5302 11.8897 13.5291 11.8905 13.5285 11.8912Z" fill="url(#paint10_linear_981_2095)"/>
                    <path d="M28.4298 19.4718L15.3375 12.0328C14.9745 11.827 14.631 11.7294 14.3252 11.7294C14.0133 11.7294 13.7413 11.8309 13.5289 12.0222L13.4629 11.956C13.4838 11.9342 13.5048 11.913 13.5271 11.893C13.5278 11.8923 13.5289 11.8915 13.5296 11.8908C13.7403 11.701 14.0094 11.5995 14.3185 11.5977C14.3192 11.5977 14.3202 11.5977 14.3213 11.5977C14.3227 11.5977 14.3237 11.5977 14.3252 11.5977C14.631 11.5977 14.9745 11.6953 15.3375 11.9011L28.514 19.3876L28.5136 19.3879L28.4298 19.4718Z" fill="url(#paint11_linear_981_2095)"/>
                    <path d="M7.73438 0.984375H145.968C149.696 0.984375 152.718 4.00645 152.718 7.73438V38.6677C152.718 42.3956 149.696 45.4177 145.968 45.4177H7.73438C4.00645 45.4177 0.984375 42.3956 0.984375 38.6677V7.73438C0.984375 4.00645 4.00645 0.984375 7.73438 0.984375Z" stroke="#F4F4F4"/>
                    </g>
                    <defs>
                    <linearGradient id="paint0_linear_981_2095" x1="23.7149" y1="13.0142" x2="8.57712" y2="28.152" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#00A0FF"/>
                    <stop offset="0.00657445" stop-color="#00A1FF"/>
                    <stop offset="0.2601" stop-color="#00BEFF"/>
                    <stop offset="0.5122" stop-color="#00D2FF"/>
                    <stop offset="0.7604" stop-color="#00DFFF"/>
                    <stop offset="1" stop-color="#00E3FF"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_981_2095" x1="34.5693" y1="23.1969" x2="12.7437" y2="23.1969" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FFE000"/>
                    <stop offset="0.4087" stop-color="#FFBD00"/>
                    <stop offset="0.7754" stop-color="#FFA500"/>
                    <stop offset="1" stop-color="#FF9C00"/>
                    </linearGradient>
                    <linearGradient id="paint2_linear_981_2095" x1="26.4441" y1="25.2695" x2="5.91624" y2="45.7975" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FF3A44"/>
                    <stop offset="1" stop-color="#C31162"/>
                    </linearGradient>
                    <linearGradient id="paint3_linear_981_2095" x1="10.6346" y1="5.31584" x2="19.8012" y2="14.4824" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#32A071"/>
                    <stop offset="0.0685" stop-color="#2DA771"/>
                    <stop offset="0.4762" stop-color="#15CF74"/>
                    <stop offset="0.8009" stop-color="#06E775"/>
                    <stop offset="1" stop-color="#00F076"/>
                    </linearGradient>
                    <linearGradient id="paint4_linear_981_2095" x1="34.5793" y1="23.1918" x2="12.7181" y2="23.1918" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#CCB300"/>
                    <stop offset="0.4087" stop-color="#CC9700"/>
                    <stop offset="0.7754" stop-color="#CC8400"/>
                    <stop offset="1" stop-color="#CC7D00"/>
                    </linearGradient>
                    <linearGradient id="paint5_linear_981_2095" x1="26.444" y1="25.2698" x2="5.9161" y2="45.7977" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#CC2E36"/>
                    <stop offset="1" stop-color="#9C0E4E"/>
                    </linearGradient>
                    <linearGradient id="paint6_linear_981_2095" x1="23.7149" y1="13.0154" x2="8.57709" y2="28.1531" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#008DE0"/>
                    <stop offset="0.00657445" stop-color="#008DE0"/>
                    <stop offset="0.2601" stop-color="#00A7E0"/>
                    <stop offset="0.5122" stop-color="#00B8E0"/>
                    <stop offset="0.7604" stop-color="#00C4E0"/>
                    <stop offset="1" stop-color="#00C7E0"/>
                    </linearGradient>
                    <linearGradient id="paint7_linear_981_2095" x1="26.4108" y1="25.2919" x2="5.93503" y2="45.7673" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#E0333C"/>
                    <stop offset="1" stop-color="#AB0F56"/>
                    </linearGradient>
                    <linearGradient id="paint8_linear_981_2095" x1="34.5702" y1="23.2004" x2="12.7446" y2="23.2004" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#E0C500"/>
                    <stop offset="0.4087" stop-color="#E0A600"/>
                    <stop offset="0.7754" stop-color="#E09100"/>
                    <stop offset="1" stop-color="#E08900"/>
                    </linearGradient>
                    <linearGradient id="paint9_linear_981_2095" x1="34.5686" y1="23.1968" x2="12.743" y2="23.1968" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FFE840"/>
                    <stop offset="0.4087" stop-color="#FFCE40"/>
                    <stop offset="0.7754" stop-color="#FFBC40"/>
                    <stop offset="1" stop-color="#FFB540"/>
                    </linearGradient>
                    <linearGradient id="paint10_linear_981_2095" x1="23.7148" y1="13.0113" x2="8.57711" y2="28.149" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#40B8FF"/>
                    <stop offset="0.00657445" stop-color="#40B9FF"/>
                    <stop offset="0.2601" stop-color="#40CEFF"/>
                    <stop offset="0.5122" stop-color="#40DDFF"/>
                    <stop offset="0.7604" stop-color="#40E7FF"/>
                    <stop offset="1" stop-color="#40EAFF"/>
                    </linearGradient>
                    <linearGradient id="paint11_linear_981_2095" x1="10.6323" y1="5.31581" x2="19.7988" y2="14.4824" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#65B895"/>
                    <stop offset="0.0685" stop-color="#62BD95"/>
                    <stop offset="0.4762" stop-color="#50DB97"/>
                    <stop offset="0.8009" stop-color="#44ED98"/>
                    <stop offset="1" stop-color="#40F498"/>
                    </linearGradient>
                    <clipPath id="clip0_981_2095">
                    <rect width="153.7" height="46.4" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                    </div>
                    <div className="footer-copy">
                    <p>&copy;2024. Rent House. All rights reserved</p>
                    </div>
                </div>
                </div>
            </footer>
        </div>
    );
}

export default LoyaltyProgrammeLandlord;