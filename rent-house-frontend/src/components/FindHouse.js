import React, { useState, useEffect, useRef } from 'react';
import '../styles/FindHouse.css';

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

const FindHouse = () => {

    const [language, setLanguage] = useState('en');
    const [isAccountComboboxOpen, setIsAccountComboboxOpen] = useState(false);
    const accountButtonRef = useRef(null);
    const accountComboboxRef = useRef(null);

    const [houses, setHouses] = useState([]);

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

    useEffect(() => {
        fetch('https://localhost:7074/api/Properties')
          .then(response => response.json())
          .then(data => setHouses(data))
          .catch(error => console.error('Ошибка при загрузке данных:', error));
      }, []);

    return (
        <div className='find'>
          <header className="find-header">
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
                      <div className='settings'>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 37.8V35.5C12.5 32.45 13.7116 29.5249 15.8683 27.3683C18.0249 25.2116 20.95 24 24 24C27.05 24 29.9751 25.2116 32.1317 27.3683C34.2884 29.5249 35.5 32.45 35.5 35.5V37.8" stroke="#F4F4F4" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M23.9996 24.0002C25.8296 24.0002 27.5846 23.2732 28.8786 21.9792C30.1726 20.6852 30.8996 18.9302 30.8996 17.1002C30.8996 15.2702 30.1726 13.5152 28.8786 12.2212C27.5846 10.9272 25.8296 10.2002 23.9996 10.2002C22.1696 10.2002 20.4146 10.9272 19.1206 12.2212C17.8266 13.5152 17.0996 15.2702 17.0996 17.1002C17.0996 18.9302 17.8266 20.6852 19.1206 21.9792C20.4146 23.2732 22.1696 24.0002 23.9996 24.0002Z" stroke="#F4F4F4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z" stroke="#F4F4F4" stroke-width="1.5"/>
                        </svg>
                        <li><a href='/tenant'>Account Settings</a></li>
                      </div>
                      <div className='white-line'></div>
                      <div className='settings'>
                        <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1337 1.25479C15.6618 0.915069 16.3382 0.915069 16.8663 1.25479L30.259 9.87018C31.0066 10.3511 31.2248 11.3501 30.7463 12.1015C30.2679 12.853 29.2739 13.0723 28.5264 12.5914L27.2499 11.7702V24.6923C27.2499 27.0714 25.3311 29 22.9642 29H9.0358C6.6689 29 4.75015 27.0714 4.75015 24.6923V11.7702L3.47365 12.5914C2.72605 13.0723 1.73215 12.853 1.25369 12.1015C0.77523 11.3501 0.993405 10.3511 1.741 9.87018L15.1337 1.25479ZM10.3751 12.8462C10.3751 12.2514 10.8548 11.7692 11.4465 11.7692H14.6607C15.2525 11.7692 15.7321 12.2514 15.7321 12.8462V16.0769C15.7321 16.6717 15.2525 17.1538 14.6607 17.1538H11.4465C10.8548 17.1538 10.3751 16.6717 10.3751 16.0769V12.8462ZM11.4465 19.8462C11.4465 19.2514 11.9262 18.7692 12.5179 18.7692H14.6607C15.2525 18.7692 15.7321 19.2514 15.7321 19.8462V22C15.7321 22.5948 15.2525 23.0769 14.6607 23.0769H12.5179C11.9262 23.0769 11.4465 22.5948 11.4465 22V19.8462ZM17.3393 13.9231C17.3393 13.3283 17.819 12.8462 18.4107 12.8462H20.5535C21.1452 12.8462 21.6249 13.3283 21.6249 13.9231V16.0769C21.6249 16.6717 21.1452 17.1538 20.5535 17.1538H18.4107C17.819 17.1538 17.3393 16.6717 17.3393 16.0769V13.9231ZM17.3393 19.8462C17.3393 19.2514 17.819 18.7692 18.4107 18.7692H20.5535C21.1452 18.7692 21.6249 19.2514 21.6249 19.8462V22C21.6249 22.5948 21.1452 23.0769 20.5535 23.0769H18.4107C17.819 23.0769 17.3393 22.5948 17.3393 22V19.8462Z" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <li><a href='/reservations'>My reservations</a></li>
                      </div>
                      <div className='settings'>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.089 13.3299L12.5106 24L2.93227 13.3299C2.30049 12.6384 1.80284 11.8072 1.47067 10.8888C1.1385 9.97031 0.979002 8.98445 1.00221 7.99325C1.02543 7.00206 1.23085 6.02701 1.60555 5.1295C1.98025 4.23199 2.51611 3.43147 3.17938 2.77834C3.84265 2.12521 4.61897 1.63362 5.45944 1.33454C6.29992 1.03545 7.18635 0.935346 8.06292 1.04052C8.93948 1.1457 9.78719 1.45388 10.5527 1.94565C11.3181 2.43743 11.9848 3.10215 12.5106 3.89796C13.0388 3.10793 13.7062 2.44901 14.4711 1.96246C15.2361 1.4759 16.0821 1.17217 16.9562 1.07028C17.8303 0.968394 18.7137 1.07054 19.5511 1.37032C20.3885 1.67011 21.1619 2.16108 21.8228 2.8125C22.4837 3.46393 23.018 4.26179 23.3922 5.15616C23.7664 6.05052 23.9724 7.02212 23.9974 8.01017C24.0224 8.99821 23.8658 9.98142 23.5374 10.8983C23.2091 11.8151 22.716 12.6458 22.089 13.3385" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.5101 3.88916L8.30459 8.61948C8.06516 8.88885 7.93066 9.25416 7.93066 9.63506C7.93066 10.016 8.06516 10.3813 8.30459 10.6507L8.99806 11.4307C9.87927 12.4218 11.3096 12.4218 12.1909 11.4307L13.468 9.99418C13.8452 9.5694 14.2931 9.23242 14.7861 9.0025C15.2792 8.77258 15.8077 8.65424 16.3415 8.65424C16.8752 8.65424 17.4038 8.77258 17.8968 9.0025C18.3899 9.23242 18.8378 9.5694 19.215 9.99418L22.0885 13.2263M13.1487 17.5357L15.7029 20.4086M16.3415 13.9445L18.8957 16.8174" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <li><a href='/loyalty'>Loyalty programme</a></li>
                      </div>
                      <div className='settings'>
                        <svg width="28" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27.0007 11.2231V21.0187C27.0007 21.8095 26.7321 22.5678 26.2541 23.127C25.776 23.6861 25.1277 24.0002 24.4516 24.0002H7.883C7.20696 24.0002 6.55861 23.6861 6.08057 23.127C5.60254 22.5678 5.33398 21.8095 5.33398 21.0187V18.7826M27.0007 11.2231V9.09281C27.0007 8.30207 26.7321 7.54372 26.2541 6.98458C25.776 6.42545 25.1277 6.11133 24.4516 6.11133H23.1771M27.0007 11.2231H23.1771" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M23.75 6.21759V15.9074C23.75 16.6981 23.468 17.4565 22.9661 18.0156C22.4641 18.5748 21.7834 18.8889 21.0735 18.8889H3.67647C2.96663 18.8889 2.28586 18.5748 1.78392 18.0156C1.28198 17.4565 1 16.6981 1 15.9074V3.98148C1 3.19074 1.28198 2.43239 1.78392 1.87326C2.28586 1.31412 2.96663 1 3.67647 1H21.0735C21.7834 1 22.4641 1.31412 22.9661 1.87326C23.468 2.43239 23.75 3.19074 23.75 3.98148V6.21759ZM23.75 6.21759H5.68382" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <li><a href='/wallet'>Wallet</a></li>
                      </div>
                      <div className='settings'>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.875 7.8125H14.0625V6.25H21.875V7.8125ZM14.0625 9.375H20.3125V10.9375H14.0625V9.375ZM21.8262 17.2607C22.2819 17.3503 22.7051 17.509 23.0957 17.7368C23.4863 17.9647 23.82 18.2536 24.0967 18.6035C24.3734 18.9534 24.5931 19.3359 24.7559 19.751C24.9186 20.166 25 20.6136 25 21.0938C25 21.6309 24.8983 22.1354 24.6948 22.6074C24.4914 23.0794 24.2106 23.4945 23.8525 23.8525C23.4945 24.2106 23.0794 24.4914 22.6074 24.6948C22.1354 24.8983 21.6309 25 21.0938 25H17.9688C17.4316 25 16.9271 24.8983 16.4551 24.6948C15.9831 24.4914 15.568 24.2147 15.21 23.8647C14.8519 23.5148 14.5711 23.0998 14.3677 22.6196C14.1642 22.1395 14.0625 21.6309 14.0625 21.0938C14.0625 20.6299 14.1398 20.1864 14.2944 19.7632C14.4491 19.34 14.6647 18.9616 14.9414 18.6279C15.2181 18.2943 15.5477 18.0054 15.9302 17.7612C16.3127 17.5171 16.7318 17.3503 17.1875 17.2607V18.8843C16.9515 18.9657 16.7399 19.0796 16.5527 19.2261C16.3656 19.3726 16.1987 19.5435 16.0522 19.7388C15.9058 19.9341 15.8 20.1457 15.7349 20.3735C15.6698 20.6014 15.6331 20.8415 15.625 21.0938C15.625 21.4193 15.686 21.7244 15.8081 22.0093C15.9302 22.2941 16.097 22.5423 16.3086 22.7539C16.5202 22.9655 16.7684 23.1323 17.0532 23.2544C17.3381 23.3765 17.6432 23.4375 17.9688 23.4375H21.0938C21.4193 23.4375 21.7244 23.3765 22.0093 23.2544C22.2941 23.1323 22.5423 22.9655 22.7539 22.7539C22.9655 22.5423 23.1323 22.2941 23.2544 22.0093C23.3765 21.7244 23.4375 21.4193 23.4375 21.0938C23.4375 20.8415 23.4009 20.5973 23.3276 20.3613C23.2544 20.1253 23.1405 19.9097 22.9858 19.7144C22.8312 19.519 22.6603 19.3481 22.4731 19.2017C22.286 19.0552 22.0622 18.9412 21.8018 18.8599C21.8506 18.5669 21.875 18.2699 21.875 17.9688C21.875 17.8548 21.8709 17.7368 21.8628 17.6147C21.8547 17.4927 21.8424 17.3747 21.8262 17.2607ZM13.2812 15.625C12.9557 15.625 12.6506 15.686 12.3657 15.8081C12.0809 15.9302 11.8327 16.097 11.6211 16.3086C11.4095 16.5202 11.2427 16.7684 11.1206 17.0532C10.9985 17.3381 10.9375 17.6432 10.9375 17.9688C10.9375 18.2292 10.9741 18.4733 11.0474 18.7012C11.1206 18.929 11.2345 19.1447 11.3892 19.3481C11.5438 19.5516 11.7147 19.7225 11.9019 19.8608C12.089 19.9992 12.3128 20.1131 12.5732 20.2026C12.5244 20.4956 12.5 20.7926 12.5 21.0938C12.5 21.2077 12.5041 21.3257 12.5122 21.4478C12.5203 21.5698 12.5326 21.6878 12.5488 21.8018C12.0931 21.7204 11.6699 21.5617 11.2793 21.3257C10.8887 21.0897 10.555 20.8008 10.2783 20.459C10.0016 20.1172 9.7819 19.7347 9.61914 19.3115C9.45638 18.8883 9.375 18.4408 9.375 17.9688C9.375 17.4316 9.47672 16.9271 9.68018 16.4551C9.88363 15.9831 10.1603 15.5721 10.5103 15.2222C10.8602 14.8722 11.2752 14.5915 11.7554 14.3799C12.2355 14.1683 12.7441 14.0625 13.2812 14.0625H16.4062C16.9434 14.0625 17.4479 14.1642 17.9199 14.3677C18.3919 14.5711 18.8029 14.8519 19.1528 15.21C19.5028 15.568 19.7835 15.9831 19.9951 16.4551C20.2067 16.9271 20.3125 17.4316 20.3125 17.9688C20.3125 18.4082 20.2311 18.8354 20.0684 19.2505C19.9056 19.6655 19.6777 20.048 19.3848 20.3979C19.0918 20.7479 18.7622 21.0409 18.396 21.2769C18.0298 21.5129 17.627 21.6878 17.1875 21.8018V20.1782C17.5374 20.105 17.8141 20.0114 18.0176 19.8975C18.221 19.7835 18.3757 19.633 18.4814 19.4458C18.5872 19.2586 18.6605 19.047 18.7012 18.811C18.7419 18.575 18.7581 18.2943 18.75 17.9688C18.75 17.6432 18.689 17.3381 18.5669 17.0532C18.4448 16.7684 18.278 16.5202 18.0664 16.3086C17.8548 16.097 17.6066 15.9302 17.3218 15.8081C17.0369 15.686 16.7318 15.625 16.4062 15.625H13.2812ZM25 0V16.7358C24.5361 16.3208 24.0153 15.9912 23.4375 15.7471V1.5625H1.5625V17.1875H7.50732C7.49105 17.3177 7.47477 17.4438 7.4585 17.5659C7.44222 17.688 7.43001 17.8223 7.42188 17.9688C7.42188 18.099 7.43001 18.2292 7.44629 18.3594C7.46256 18.4896 7.47884 18.6198 7.49512 18.75H0V0H25ZM3.125 14.0625C3.125 13.6393 3.18197 13.2284 3.2959 12.8296C3.40983 12.4308 3.57259 12.0524 3.78418 11.6943C3.99577 11.3363 4.25212 11.0107 4.55322 10.7178C4.85433 10.4248 5.19206 10.1766 5.56641 9.97314C5.28971 9.68831 5.07406 9.35872 4.91943 8.98438C4.76481 8.61003 4.6875 8.2194 4.6875 7.8125C4.6875 7.38118 4.76888 6.97835 4.93164 6.604C5.0944 6.22965 5.3182 5.896 5.60303 5.60303C5.88786 5.31006 6.21745 5.08626 6.5918 4.93164C6.96615 4.77702 7.37305 4.69564 7.8125 4.6875C8.24381 4.6875 8.64665 4.76888 9.021 4.93164C9.39534 5.0944 9.729 5.3182 10.022 5.60303C10.3149 5.88786 10.5387 6.21745 10.6934 6.5918C10.848 6.96615 10.9294 7.37305 10.9375 7.8125C10.9375 8.2194 10.8602 8.61003 10.7056 8.98438C10.5509 9.35872 10.3353 9.68831 10.0586 9.97314C10.5713 10.258 11.0148 10.6242 11.3892 11.0718C11.7635 11.5194 12.0524 12.0239 12.2559 12.5854C11.735 12.6668 11.2305 12.8133 10.7422 13.0249C10.6283 12.7157 10.4736 12.4349 10.2783 12.1826C10.083 11.9303 9.85921 11.7106 9.60693 11.5234C9.35465 11.3363 9.07389 11.1938 8.76465 11.0962C8.4554 10.9985 8.13802 10.9456 7.8125 10.9375C7.38118 10.9375 6.97835 11.0189 6.604 11.1816C6.22965 11.3444 5.896 11.5682 5.60303 11.853C5.31006 12.1379 5.08626 12.4674 4.93164 12.8418C4.77702 13.2161 4.69564 13.623 4.6875 14.0625H3.125ZM7.8125 6.25C7.59277 6.25 7.38932 6.29069 7.20215 6.37207C7.01497 6.45345 6.85221 6.56331 6.71387 6.70166C6.57552 6.84001 6.46159 7.00684 6.37207 7.20215C6.28255 7.39746 6.24186 7.60091 6.25 7.8125C6.25 8.03223 6.29069 8.23568 6.37207 8.42285C6.45345 8.61003 6.56331 8.77279 6.70166 8.91113C6.84001 9.04948 7.00684 9.16341 7.20215 9.25293C7.39746 9.34245 7.60091 9.38314 7.8125 9.375C8.03223 9.375 8.23568 9.33431 8.42285 9.25293C8.61003 9.17155 8.77279 9.06169 8.91113 8.92334C9.04948 8.78499 9.16341 8.61816 9.25293 8.42285C9.34245 8.22754 9.38314 8.02409 9.375 7.8125C9.375 7.59277 9.33431 7.38932 9.25293 7.20215C9.17155 7.01497 9.06169 6.85221 8.92334 6.71387C8.78499 6.57552 8.61816 6.46159 8.42285 6.37207C8.22754 6.28255 8.02409 6.24186 7.8125 6.25Z" fill="#F4F4F4"/>
                        </svg>
                        <li><a href='/referral'>Referral link</a></li>
                      </div>
                      <div className='settings'>
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0945 19.9428C11.7687 20.0578 11.232 20.0578 10.9062 19.9428C8.12699 18.994 1.91699 15.0361 1.91699 8.32779C1.91699 5.36654 4.30324 2.9707 7.24533 2.9707C8.98949 2.9707 10.5324 3.81404 11.5003 5.11737C12.4682 3.81404 14.0207 2.9707 15.7553 2.9707C18.6974 2.9707 21.0837 5.36654 21.0837 8.32779C21.0837 15.0361 14.8737 18.994 12.0945 19.9428Z" stroke="#F4F4F4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <li><a href='/saved'>Saved</a></li>
                      </div>
                      <div className='white-line-2'></div>
                      <div className='settings'>
                        <svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 23C16.55 23 17.0207 22.75 17.412 22.2499C17.8033 21.7499 17.9993 21.1481 18 20.4444V15.3333H16V20.4444H2V2.55556H16V7.66667H18V2.55556C18 1.85278 17.804 1.25137 17.412 0.751333C17.02 0.251296 16.5493 0.000851852 16 0H2C1.45 0 0.979 0.250445 0.587 0.751333C0.195 1.25222 -0.000667572 1.85363 0 2.55556V20.4444C0 21.1472 0.195667 21.7491 0.587 22.2499C0.978333 22.7508 1.44933 23.0009 2 23H16ZM10.5 17.8889L11.9 16.0361L9.35 12.7778H18V10.2222H9.35L11.9 6.96389L10.5 5.11111L5.5 11.5L10.5 17.8889Z" fill="#F4F4F4"/>
                        </svg>
                        <li><a>Logout</a></li>
                      </div>
                    </ul>
                  </div>
                )}
              </div>
            </nav>
            <div className="white-strip"></div>
          </header>
          <section className='house'>
            <div className='marshrut-2'>
              <h6 onClick={() => window.location.href='/find_house'}>House</h6>
              <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L7.25 7.25L1 13.5" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <h6 onClick={() => window.location.href='/'}>Home</h6>
            </div>
            <h1>House</h1>
            <p>We will help you find the home of your dreams, long-term or<br/>short-term... You only need to complete three steps...</p>
            <div className='find-house-describe'>
              <svg width="1103" height="110" viewBox="0 0 1103 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M474.621 19.3962C475.441 19.5138 476.201 18.9444 476.318 18.1244C476.436 17.3043 475.866 16.5442 475.046 16.4266L474.621 19.3962ZM119.981 93.8585C162.184 101.249 192.274 98.3632 217.006 90.2828C241.686 82.2191 260.949 68.9972 281.385 55.9764C301.849 42.9381 323.598 30.0203 353.476 22.2347C383.355 14.4489 421.464 11.7726 474.621 19.3962L475.046 16.4266C421.587 8.75956 383.065 11.4243 352.719 19.3317C322.373 27.2393 300.302 40.3668 279.773 53.4463C259.217 66.5433 240.313 79.5117 216.074 87.4311C191.886 95.3338 162.303 98.2241 120.499 90.9034L119.981 93.8585Z" fill="#F4F4F4"/>
              <path d="M971.996 19.3962C972.816 19.5138 973.576 18.9444 973.693 18.1244C973.811 17.3043 973.241 16.5442 972.421 16.4266L971.996 19.3962ZM617.356 93.8585C659.559 101.249 689.649 98.3632 714.381 90.2828C739.061 82.2191 758.324 68.9972 778.76 55.9764C799.224 42.9381 820.973 30.0203 850.851 22.2347C880.73 14.4489 918.839 11.7726 971.996 19.3962L972.421 16.4266C918.962 8.75956 880.44 11.4243 850.094 19.3317C819.748 27.2393 797.677 40.3668 777.148 53.4463C756.592 66.5433 737.688 79.5117 713.449 87.4311C689.261 95.3338 659.678 98.2241 617.874 90.9034L617.356 93.8585Z" fill="#F4F4F4"/>
              <g filter="url(#filter0_b_1163_3145)">
              <rect width="110" height="110" rx="30" fill="#F0F4F7" fill-opacity="0.15"/>
              <rect x="0.5" y="0.5" width="109" height="109" rx="29.5" stroke="#F4F4F4"/>
              </g>
              <path d="M54.5231 80.2122C51.0004 77.2073 47.7352 73.9132 44.7616 70.3641C40.2991 65.0343 35 57.0968 35 49.5329C34.9981 45.67 36.1421 41.8934 38.2874 38.6809C40.4327 35.4685 43.4827 32.9646 47.0515 31.4863C50.6204 30.0079 54.5475 29.6215 58.3361 30.376C62.1246 31.1304 65.6041 32.9918 68.3344 35.7245C70.1521 37.5342 71.5929 39.6864 72.5734 42.0566C73.5538 44.4268 74.0545 46.968 74.0463 49.5329C74.0463 57.0968 68.7471 65.0343 64.2847 70.3641C61.3111 73.9132 58.0458 77.2073 54.5231 80.2122ZM54.5231 41.1659C52.3041 41.1659 50.1759 42.0474 48.6067 43.6165C47.0376 45.1857 46.1561 47.3138 46.1561 49.5329C46.1561 51.752 47.0376 53.8802 48.6067 55.4493C50.1759 57.0185 52.3041 57.9 54.5231 57.9C56.7422 57.9 58.8704 57.0185 60.4396 55.4493C62.0087 53.8802 62.8902 51.752 62.8902 49.5329C62.8902 47.3138 62.0087 45.1857 60.4396 43.6165C58.8704 42.0474 56.7422 41.1659 54.5231 41.1659Z" fill="#F4F4F4"/>
              <g filter="url(#filter1_b_1163_3145)">
              <rect x="491" width="110" height="110" rx="30" fill="#F0F4F7" fill-opacity="0.15"/>
              <rect x="491.5" y="0.5" width="109" height="109" rx="29.5" stroke="#F4F4F4"/>
              </g>
              <path d="M569 75.24C569 76.2135 568.196 77 567.2 77H525.8C524.804 77 524 76.2135 524 75.24V52.14H569V75.24ZM525.8 36.96H535.25V33.44C535.25 33.198 535.452 33 535.7 33H538.85C539.097 33 539.3 33.198 539.3 33.44V36.96H553.7V33.44C553.7 33.198 553.903 33 554.15 33H557.3C557.548 33 557.75 33.198 557.75 33.44V36.96H567.2C568.196 36.96 569 37.7465 569 38.72V48.4H524V38.72C524 37.7465 524.804 36.96 525.8 36.96Z" fill="#F4F4F4"/>
              <g filter="url(#filter2_b_1163_3145)">
              <rect x="993" width="110" height="110" rx="30" fill="#F0F4F7" fill-opacity="0.15"/>
              <rect x="993.5" y="0.5" width="109" height="109" rx="29.5" stroke="#F4F4F4"/>
              </g>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M1046.03 31.4368C1046.93 30.8544 1048.07 30.8544 1048.97 31.4368L1071.74 46.206C1073.01 47.0305 1073.38 48.7431 1072.57 50.0312C1071.76 51.3194 1070.07 51.6953 1068.79 50.8709L1066.62 49.4632V71.6154C1066.62 75.6938 1063.36 79 1059.34 79H1035.66C1031.64 79 1028.38 75.6938 1028.38 71.6154V49.4632L1026.21 50.8709C1024.93 51.6953 1023.24 51.3194 1022.43 50.0312C1021.62 48.7431 1021.99 47.0305 1023.26 46.206L1046.03 31.4368ZM1037.94 51.3077C1037.94 50.2881 1038.75 49.4615 1039.76 49.4615H1045.22C1046.23 49.4615 1047.04 50.2881 1047.04 51.3077V56.8462C1047.04 57.8658 1046.23 58.6923 1045.22 58.6923H1039.76C1038.75 58.6923 1037.94 57.8658 1037.94 56.8462V51.3077ZM1039.76 63.3077C1039.76 62.2881 1040.57 61.4615 1041.58 61.4615H1045.22C1046.23 61.4615 1047.04 62.2881 1047.04 63.3077V67C1047.04 68.0196 1046.23 68.8462 1045.22 68.8462H1041.58C1040.57 68.8462 1039.76 68.0196 1039.76 67V63.3077ZM1049.78 53.1538C1049.78 52.1342 1050.59 51.3077 1051.6 51.3077H1055.24C1056.25 51.3077 1057.06 52.1342 1057.06 53.1538V56.8462C1057.06 57.8658 1056.25 58.6923 1055.24 58.6923H1051.6C1050.59 58.6923 1049.78 57.8658 1049.78 56.8462V53.1538ZM1049.78 63.3077C1049.78 62.2881 1050.59 61.4615 1051.6 61.4615H1055.24C1056.25 61.4615 1057.06 62.2881 1057.06 63.3077V67C1057.06 68.0196 1056.25 68.8462 1055.24 68.8462H1051.6C1050.59 68.8462 1049.78 68.0196 1049.78 67V63.3077Z" fill="#F4F4F4"/>
              <defs>
              <filter id="filter0_b_1163_3145" x="-50" y="-50" width="210" height="210" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="25"/>
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1163_3145"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1163_3145" result="shape"/>
              </filter>
              <filter id="filter1_b_1163_3145" x="441" y="-50" width="210" height="210" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="25"/>
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1163_3145"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1163_3145" result="shape"/>
              </filter>
              <filter id="filter2_b_1163_3145" x="943" y="-50" width="210" height="210" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="25"/>
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1163_3145"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1163_3145" result="shape"/>
              </filter>
              </defs>
              </svg>
              <div className='find-describe'>
                <label>Choose location</label>
                <p>You need to select the region you<br/>plan to travel to. For greater comfort,<br/>please provide as accurate<br/>information as possible.</p>
                <label>Pick-up Date</label>
                <p>Specify the date or period of stay.<br/>This will help us find and reserve<br/>lodging for you. By the time you<br/>arrive, they will already be waiting<br/>for you.</p>
                <label>Book your apartment</label>
                <p>From thousands of results, choose<br/>the one that suits you best. Please<br/>note that when booking<br/>accommodation through our<br/>website, special prices apply.</p>
              </div>
            </div>
          </section>
          <section className='house-spisok'>
            {houses.map(house => (
              <div key={house.id} className="house-card">
                <img src={house.imageUrl} alt={`House in ${house.city}`} />
                <div className="card-content">
                  <h3>{house.city}, {house.zipCode}</h3>
                  <p>{house.description}</p>
                  <p>Рейтинг: {house.rating}/5</p>
                  <p>{house.discount ? `Скидка: ${house.discount}%` : 'Без скидки'}</p>
                  <p>Цена: ${house.price}/мес</p>
                  <button>Подробнее</button>
                </div>
              </div>
            ))}
          </section>
        </div>
    );
}

export default FindHouse;