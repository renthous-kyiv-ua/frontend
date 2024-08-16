import React, { useState, useEffect, useRef } from 'react';
import '../styles/AccountSettingsLandlord.css';

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

const AccountSettingsLandlord = () => {

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
        <div className='landlord-account-settings'>
          <header className="landlord-account-header">
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
            <h1>Landlord<br/>Account Settings</h1>
            <p>We will take care of your peace of mind and comfort. Trust is<br/>our motto...</p>
            <button className='avatar'>
              <svg width="36" height="34" viewBox="0 0 36 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.1456 28.7795H5.1758C4.26878 28.7795 3.3989 28.4144 2.75754 27.7645C2.11617 27.1146 1.75586 26.2331 1.75586 25.314V9.71903C1.75586 8.79991 2.11617 7.91844 2.75754 7.26852C3.3989 6.61861 4.26878 6.25349 5.1758 6.25349H6.88577C7.7928 6.25349 8.66267 5.88837 9.30404 5.23845C9.9454 4.58854 10.3057 3.70707 10.3057 2.78795C10.3057 2.32839 10.4859 1.88765 10.8066 1.56269C11.1272 1.23774 11.5622 1.05518 12.0157 1.05518H22.2755C22.729 1.05518 23.164 1.23774 23.4846 1.56269C23.8053 1.88765 23.9855 2.32839 23.9855 2.78795C23.9855 3.70707 24.3458 4.58854 24.9872 5.23845C25.6285 5.88837 26.4984 6.25349 27.4054 6.25349H29.1154C30.0224 6.25349 30.8923 6.61861 31.5337 7.26852C32.175 7.91844 32.5353 8.79991 32.5353 9.71903V15.7837M23.9855 27.0467H34.2453H23.9855ZM29.1154 21.8484V32.245V21.8484Z" fill="#8A9084"/>
              <path d="M17.1456 28.7795H5.1758C4.26878 28.7795 3.3989 28.4144 2.75754 27.7645C2.11617 27.1146 1.75586 26.2331 1.75586 25.314V9.71903C1.75586 8.79991 2.11617 7.91844 2.75754 7.26852C3.3989 6.61861 4.26878 6.25349 5.1758 6.25349H6.88577C7.7928 6.25349 8.66267 5.88837 9.30404 5.23845C9.9454 4.58854 10.3057 3.70707 10.3057 2.78795C10.3057 2.32839 10.4859 1.88765 10.8066 1.56269C11.1272 1.23774 11.5622 1.05518 12.0157 1.05518H22.2755C22.729 1.05518 23.164 1.23774 23.4846 1.56269C23.8053 1.88765 23.9855 2.32839 23.9855 2.78795C23.9855 3.70707 24.3458 4.58854 24.9872 5.23845C25.6285 5.88837 26.4984 6.25349 27.4054 6.25349H29.1154C30.0224 6.25349 30.8923 6.61861 31.5337 7.26852C32.175 7.91844 32.5353 8.79991 32.5353 9.71903V15.7837M23.9855 27.0467H34.2453M29.1154 21.8484V32.245" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.0156 16.6495C12.0156 18.0282 12.5561 19.3504 13.5181 20.3252C14.4802 21.3001 15.785 21.8478 17.1455 21.8478C18.5061 21.8478 19.8109 21.3001 20.7729 20.3252C21.735 19.3504 22.2755 18.0282 22.2755 16.6495C22.2755 15.2708 21.735 13.9486 20.7729 12.9737C19.8109 11.9988 18.5061 11.4512 17.1455 11.4512C15.785 11.4512 14.4802 11.9988 13.5181 12.9737C12.5561 13.9486 12.0156 15.2708 12.0156 16.6495Z" fill="#8A9084" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div className='edit-account'>
              <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7952 5.33333L11.7127 6.16889L2.85008 14.2222H1.95211V13.4044L10.7952 5.33333ZM14.309 0C14.065 0 13.8112 0.0888889 13.6257 0.257778L11.8395 1.88444L15.4998 5.21778L17.2859 3.59111C17.6666 3.24444 17.6666 2.66667 17.2859 2.33778L15.002 0.257778C14.8068 0.08 14.5627 0 14.309 0ZM10.7952 2.83556L0 12.6667V16H3.66021L14.4554 6.16889L10.7952 2.83556Z" fill="#F4F4F4"/>
              </svg>
              <p>Edit title</p>
            </div>
            <div className='panel-settings'>
              <button className='active-button' onClick={() => window.location.href='/landlord'}>
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
              <button onClick={() => window.location.href='/lanLoyalty'}>
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
          </section>
          <section className='edit-info'>
            <div className='edit-person'>
              <div className='user-fullname'>
                <p>Name</p>
                <div className='fullname'>
                  <label>First name(s)<span class="necessarily">*</span></label>
                  <br/>
                  <input placeholder='Enter First Name'/><br/>
                  <label>Last name(s)<span class="necessarily">*</span></label>
                  <br/>
                  <input placeholder='Enter Last Name'/>
                </div>
              </div>
              <br/>
              <div className='display-name'>
                <p>Display name</p>
                <input placeholder='Choose a display name'/>
              </div>
              <div className='birth-date'>
                <p>Birth date</p>
                <input placeholder='YYYY/DD/MM'/>
                <label className='note'>We will congratulate you with your birthday and give you a gift certificate</label>
              </div>
              <div className='phone-number'>
                <p>Phone number</p>
                <input type='number' placeholder='+38(0__)___ __ __'/>
                <label className='note'>Phone not displayed on this site</label>
              </div>
              <div className='about-me'>
                <p>About me</p>
                <textarea placeholder='Leave a few words about yourself'/>
              </div>
              <div className='confirm-data'>
                <input type='checkbox'/>
                <p>I consent to Renthouse.com storing my passport information in accordance with the privacy statement</p>
              </div>
            </div>
            <div className='update-info'>
              <button>Save</button>
              <button>Cancel</button>
            </div>
            <div className='edit-data'>
              <div className='email-address'>
                <p>Email address</p>
                <input type='email' placeholder='anna.romanova@gmail.com'/>
                <p className='note2'>Email (not displayed on the site)</p>
              </div>
              <div className='country'>
                <p>Country</p>
                <select>
                  <option>Choose the country</option>
                  <option>Ukraine</option>
                  <option>Poland</option>
                  <option>England</option>
                  <option>Spain</option>
                </select>
              </div>
              <div className='address'>
                <p>Address</p>
                <input type='address' placeholder='Add your town, street name and house/apartment numder, postcode'/>
              </div>
              <div className='passport-details'>
                <p>Passport details</p>
                <p>Save your passport details to use when reservation your next stay, transfer or attraction.</p>
                <div className='passport-fullname'>
                  <label>First name(s)<span class="necessarily">*</span></label>
                  <input placeholder='Enter First Name'/><br/>
                  <label>Last name(s)<span class="necessarily">*</span></label>
                  <input placeholder='Enter Last Name'/>
                  <p>Please enter the name exactly as written on the passport or other official travel document.</p>
                </div>
                <div className='passport-country'>
                  <label>Issuing country<span class="necessarily">*</span></label>
                  <select>
                    <option>Select issuing country</option>
                    <option>Ukraine</option>
                    <option>Poland</option>
                    <option>England</option>
                    <option>Spain</option>
                  </select>
                  <label>Passport number<span class="necessarily">*</span></label>
                  <input placeholder='Enter document number'/>
                  <label>Expiry date<span class="necessarily">*</span></label>
                  <input placeholder='YYYY/DD/MM'/>
                  <p>We’ll safely store this data and remove it after two years of inactivity.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
    );
}

export default AccountSettingsLandlord;