import React, { useState, useEffect, useRef } from 'react';
import shadowImage from '../images/shadow.png';
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
        fetch('http://localhost:5206/api/Properties')
          .then(response => response.json())
          .then(data => setHouses(data.$values))
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
                    <path d="M12.5 37.8V35.5C12.5 32.45 13.7116 29.5249 15.8683 27.3683C18.0249 25.2116 20.95 24 24 24C27.05 24 29.9751 25.2116 32.1317 27.3683C34.2884 29.5249 35.5 32.45 35.5 35.5V37.8" stroke="#F4F4F4" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M23.9996 24.0002C25.8296 24.0002 27.5846 23.2732 28.8786 21.9792C30.1726 20.6852 30.8996 18.9302 30.8996 17.1002C30.8996 15.2702 30.1726 13.5152 28.8786 12.2212C27.5846 10.9272 25.8296 10.2002 23.9996 10.2002C22.1696 10.2002 20.4146 10.9272 19.1206 12.2212C17.8266 13.5152 17.0996 15.2702 17.0996 17.1002C17.0996 18.9302 17.8266 20.6852 19.1206 21.9792C20.4146 23.2732 22.1696 24.0002 23.9996 24.0002Z" stroke="#F4F4F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z" stroke="#F4F4F4" strokeWidth="1.5"/>
                  </svg>
                </button>
                {isAccountComboboxOpen && (
                  <div className="account-combobox" ref={accountComboboxRef}>
                    <ul>
                      <div className='settings'>
                        {/* Ваш SVG и остальные пункты */}
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.5 37.8V35.5C12.5 32.45 13.7116 29.5249 15.8683 27.3683C18.0249 25.2116 20.95 24 24 24C27.05 24 29.9751 25.2116 32.1317 27.3683C34.2884 29.5249 35.5 32.45 35.5 35.5V37.8" stroke="#F4F4F4" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M23.9996 24.0002C25.8296 24.0002 27.5846 23.2732 28.8786 21.9792C30.1726 20.6852 30.8996 18.9302 30.8996 17.1002C30.8996 15.2702 30.1726 13.5152 28.8786 12.2212C27.5846 10.9272 25.8296 10.2002 23.9996 10.2002C22.1696 10.2002 20.4146 10.9272 19.1206 12.2212C17.8266 13.5152 17.0996 15.2702 17.0996 17.1002C17.0996 18.9302 17.8266 20.6852 19.1206 21.9792C20.4146 23.2732 22.1696 24.0002 23.9996 24.0002Z" stroke="#F4F4F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z" stroke="#F4F4F4" strokeWidth="1.5"/>
                        </svg>
                        <li><a href='/tenant'>Account Settings</a></li>
                      </div>
                      {/* Остальные пункты меню */}
                    </ul>
                  </div>
                )}
              </div>
            </nav>
            <div className="white-strip"></div>
          </header>

          <section className="house">
          <img src={shadowImage} alt="Shadow" className="shadow-find" />
            <div className="breadcrumbs">
                <h6 onClick={() => window.location.href = '/'}>Home</h6>
                <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7.25 7.25L1 13.5" stroke="#F4F4F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h6 onClick={() => window.location.href = '/find_house'}>House</h6>
            </div>
            <h1>House</h1>
            <p>We will help you find the home of your dreams, long-term or<br />short-term... You only need to complete three steps...</p>
            <div className="find-house-describe">
                {/* Ваш существующий SVG и описания шагов */}
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
                <path fillRule="evenodd" clipRule="evenodd" d="M1046.03 31.4368C1046.93 30.8544 1048.07 30.8544 1048.97 31.4368L1071.74 46.206C1073.01 47.0305 1073.38 48.7431 1072.57 50.0312C1071.76 51.3194 1070.07 51.6953 1068.79 50.8709L1066.62 49.4632V71.6154C1066.62 75.6938 1063.36 79 1059.34 79H1035.66C1031.64 79 1028.38 75.6938 1028.38 71.6154V49.4632L1026.21 50.8709C1024.93 51.6953 1023.24 51.3194 1022.43 50.0312C1021.62 48.7431 1021.99 47.0305 1023.26 46.206L1046.03 31.4368ZM1037.94 51.3077C1037.94 50.2881 1038.75 49.4615 1039.76 49.4615H1045.22C1046.23 49.4615 1047.04 50.2881 1047.04 51.3077V56.8462C1047.04 57.8658 1046.23 58.6923 1045.22 58.6923H1039.76C1038.75 58.6923 1037.94 57.8658 1037.94 56.8462V51.3077ZM1039.76 63.3077C1039.76 62.2881 1040.57 61.4615 1041.58 61.4615H1045.22C1046.23 61.4615 1047.04 62.2881 1047.04 63.3077V67C1047.04 68.0196 1046.23 68.8462 1045.22 68.8462H1041.58C1040.57 68.8462 1039.76 68.0196 1039.76 67V63.3077ZM1049.78 53.1538C1049.78 52.1342 1050.59 51.3077 1051.6 51.3077H1055.24C1056.25 51.3077 1057.06 52.1342 1057.06 53.1538V56.8462C1057.06 57.8658 1056.25 58.6923 1055.24 58.6923H1051.6C1050.59 58.6923 1049.78 57.8658 1049.78 56.8462V53.1538ZM1049.78 63.3077C1049.78 62.2881 1050.59 61.4615 1051.6 61.4615H1055.24C1056.25 61.4615 1057.06 62.2881 1057.06 63.3077V67C1057.06 68.0196 1056.25 68.8462 1055.24 68.8462H1051.6C1050.59 68.8462 1049.78 68.0196 1049.78 67V63.3077Z" fill="#F4F4F4"/>
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
                <div className="find-describe">
                <div className="step">
                    <label>Choose Location</label>
                    <p>You need to select the region you<br />plan to travel to. For greater comfort,<br />please provide as accurate<br />information as possible.</p>
                </div>
                <div className="step">
                    <label>Pick-up Date</label>
                    <p>Specify the date or period of stay.<br />This will help us find and reserve<br />lodging for you. By the time you<br />arrive, they will already be waiting<br />for you.</p>
                </div>
                <div className="step">
                    <label>Book your apartment</label>
                    <p>From thousands of results, choose<br />the one that suits you best. Please<br />note that when booking<br />accommodation through our<br />website, special prices apply.</p>
                </div>
                </div>
            </div>
            </section>
            <section className='house-spisok'>
              {houses.map(house => (
                <div key={house.propertyId} className="house-cards">
                  <img src={`data:image/jpeg;base64,${house.photos.$values[0]?.photo}`} alt={`House in ${house.city}`} />
                  <div className="card-content">
                    <h3>{house.city}, {house.address}</h3>
                    <p>{house.description}</p>
                    <p>Рейтинг: {house.propertyDetails.starRating}/5</p>
                    <p>Цена: ${house.price}</p>
                    <button>Подробнее</button>
                  </div>
                </div>
              ))}
            </section>
        </div>
    );
}

export default FindHouse;