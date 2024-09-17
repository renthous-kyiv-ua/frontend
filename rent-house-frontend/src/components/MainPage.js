import React, { useState, useEffect, useRef, useContext } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import '../styles/MainPage.css';
import mapImage from '../images/world-map.png';
import photo1Image from '../images/photo1.jpg';
import photo2Image from '../images/photo2.jpg';
import photo3Image from '../images/photo3.jpg';
import photo4Image from '../images/photo4.jpg';
import photo5Image from '../images/photo5.jpg';
import photo6Image from '../images/photo6.jpg';
import photo7Image from '../images/photo7.jpg';
import photo8Image from '../images/photo8.jpg';
import photo9Image from '../images/photo9.jpg';
import exampleHome from '../images/example.jpg';
import logo from '../images/logo2.jpg';
import house1Image from '../images/house1.jpg';
import house2Image from '../images/house2.jpg';
import house3Image from '../images/house3.jpg';
import house4Image from '../images/house4.jpg';
import house5Image from '../images/house5.jpg';
import procentImage from '../images/procent.jpg';
import vereinbarungImage from '../images/vereinbarung.jpg';
import planetImage from '../images/planet.jpg';
import messageImage from '../images/message.jpg';

const translations = {
  en: {
    home: "Home",
    about: "About Us",
    tenant: "Tenant",
    landlord: "Landlord",
    forLandlord: "For the Landlord",
    regLog: "Registration / Login",
    lookingFor: "Are you looking\nfor your dream\nhome?",
    findHouse: "Find a House",
    welcome: "Welcome to our housing search site! We offer thousands of vetted\nlistings, easy searching, and full support every step of the way to\nhelp you find your ideal home quickly and easily.",
    where: "Where",
    checkIn: "Check in",
    checkOut: "Check out",
    numberOfPeople: "Number of people",
    search: "Search",
    adults: "Adults",
    children: "Children",
    ageNeeded: "Age needed",
    rooms: "Rooms",
    pets: "Traveling with pets?",
    done: "Done",
  },
  ua: {
    home: "Головна",
    about: "Про нас",
    tenant: "Орендар",
    landlord: "Орендодавець",
    forLandlord: "Для орендодавця",
    regLog: "Реєстрація / Авторизація",
    lookingFor: "Ви шукаєте\nбудинок своєї мрії?",
    findHouse: "Знайти будинок",
    welcome: "Ласкаво просимо на наш сайт пошуку житла! Ми пропонуємо тисячі перевірених\nоголошень, легкий пошук та повну підтримку на кожному кроці, щоб допомогти вам\nшвидко та легко знайти ідеальне житло.",
    where: "Де",
    checkIn: "Заїзд",
    checkOut: "Виїзд",
    numberOfPeople: "Кількість людей",
    search: "Пошук",
    adults: "Дорослі",
    children: "Діти",
    ageNeeded: "Вік необхідний",
    rooms: "Кімнати",
    pets: "Подорожуєте з домашніми тваринами?",
    done: "Готово",
  }
};

const MainPage = () => {
  const { token, user, setUser, userRole, isAuthenticated, setIsAuthenticated, signIn, signOut, authLoading, authError } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPeopleComboboxOpen, setIsPeopleComboboxOpen] = useState(false);
  const peopleButtonRef = useRef(null);
  const peopleComboboxRef = useRef(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [ageNeeded, setAgeNeeded] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [isPets, setIsPets] = useState(false);
  const [isAccountComboboxOpen, setIsAccountComboboxOpen] = useState(false);
  const [parsedUser, setParsedUser] = useState(null);

  const increment = (setter, value) => () => setter(value + 1);
  const decrement = (setter, value) => () => setter(value > 0 ? value - 1 : 0);

  const housesData = [
    {
      image: house1Image,
      rating: "6.8 ☆",
      details: "11104, New York",
      discount: "9% off until November 21",
      description: "This downtown New York hotel is 400 meters from Radio City Music Hall. It features a fitness centre, restaurant and bar.",
      price: "$619/night"
    },
    {
      image: house2Image,
      rating: "8.7 ☆",
      details: "11101, New York",
      discount: "19% off until October 10",
      description: "The hotel was created for those who like to spend time at work. For those who value a place to see, explore and relax and recuperate. The hotel is located in Hudson Yards, New York's newest neighborhood",
      price: "$425/night"
    },
    {
      image: house3Image,
      rating: "7.4 ☆",
      details: "11127, New York",
      discount: "47% off until October 08",
      description: "Featuring a full-service spa and 4 restaurants, this 46-story Manhattan hotel has rooms that offer a minibar and floor-to-ceiling windows.",
      price: "$371/night"
    },
    {
      image: house4Image,
      rating: "8.9 ☆",
      details: "11128, New York",
      discount: "47% off until October 08",
      description: "A seasonal 7th floor outdoor pool overlooks the city and features a connected bar. A fitness center and business services are also available. Complimentary WiFi is offered to all guests.",
      price: "$535/night"
    },
    {
      image: house5Image,
      rating: "7.4 ☆",
      details: "11121, New York",
      discount: "18% off until December 08",
      description: "Featuring a full-service spa and 4 restaurants, this 46-story Manhattan hotel has rooms that offer a minibar and floor-to-ceiling windows.",
      price: "$499/night"
    }
  ];

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    signOut();
    setIsAuthenticated(false);
    setUser(null);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? housesData.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 9);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);


  const getVisibleHouses = () => {
    const visibleHouses = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % housesData.length;
      visibleHouses.push(housesData[index]);
    }
    return visibleHouses;
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  useEffect(() => {
    let currentIndex = 0;

    function showSlide(index) {
      const slides = document.querySelectorAll('.carousel-item');
      const dots = document.querySelectorAll('.dot');
      const totalSlides = slides.length;

      if (index >= totalSlides) {
        currentIndex = 0;
      } else if (index < 0) {
        currentIndex = totalSlides - 1;
      } else {
        currentIndex = index;
      }

      const carouselImages = document.querySelector('.carousel-images');
      carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;

      dots.forEach(dot => dot.classList.remove('active'));
      dots[currentIndex].classList.add('active');
    }

    const nextSlide = () => {
      showSlide(currentIndex + 1);
    };

    const interval = setInterval(nextSlide, 3000);

    showSlide(currentIndex);

    // Очистка таймера при размонтировании компонента
    return () => clearInterval(interval);
  }, []);

  // Перенесенная функция для использования в качестве обработчика событий
  const currentSlide = (index) => {
    const slides = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    if (index >= totalSlides) {
      index = 0;
    } else if (index < 0) {
      index = totalSlides - 1;
    }

    const carouselImages = document.querySelector('.carousel-images');
    carouselImages.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  };

  // useEffect(() => {
  //   axios.get('/api/Reviews')
  //     .then(response => {
  //       setReviews(response.data);
  //     })
  //     .catch(error => {
  //       console.error("There was an error fetching the reviews!", error);
  //     });
  // }, []);

  const handlePeopleButtonClick = () => {
    setIsPeopleComboboxOpen(!isPeopleComboboxOpen);
  };

  const handleLogoutClick = () => {
    signOut();
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleAccountButtonClick = () => {
    setIsAccountComboboxOpen(!isAccountComboboxOpen);
  };

  useEffect(() => { 
    const userData = localStorage.getItem('user');
    
    if (userData) {
      try {
        const user = JSON.parse(userData); // Преобразуем строку в объект
        setParsedUser(user); // Сохраняем пользователя в состоянии
        setUser({
          id: user.id,
          role: user.role,
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
        setIsAuthenticated(false);
        setUser(null);
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const handleClickOutside = (event) => {
    if (peopleComboboxRef.current && !peopleComboboxRef.current.contains(event.target) &&
      peopleButtonRef.current && !peopleButtonRef.current.contains(event.target)) {
      setIsPeopleComboboxOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="home">
      <header className="home-header">
        <nav className="navigation">
          <ul className="nav-list">
            <li className="active"><a href='/'>{translations[language].home}</a></li>
            <li><a href='/about'>{translations[language].about}</a></li>
            <li><a href='/tenant'>{translations[language].tenant}</a></li>
            <li><a href='/landlord'>{translations[language].landlord}</a></li>
            <li><a href='/for-landlord'>{translations[language].forLandlord}</a></li>
            {user?.role === 'Landlord' ? (
              <>
                <li><a href='/tenant'>{translations[language].tenant}</a></li>
              </>
            ) : null}
            {user?.role === 'Tenant' ? (
              <>
                <li><a href='/landlord'>{translations[language].landlord}</a></li>
                <li><a href='/for-landlord'>{translations[language].forLandlord}</a></li>
              </>
            ) : null}
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
            {!isAuthenticated ? (
              <button onClick={() => window.location.href='/signin'} className="login">{translations[language].regLog}</button>
            ) : (
              <div>
                <button className="account" onClick={handleAccountButtonClick}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 37.8V35.5C12.5 32.45 13.7116 29.5249 15.8683 27.3683C18.0249 25.2116 20.95 24 24 24C27.05 24 29.9751 25.2116 32.1317 27.3683C34.2884 29.5249 35.5 32.45 35.5 35.5V37.8" stroke="#F4F4F4" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M23.9996 24.0002C25.8296 24.0002 27.5846 23.2732 28.8786 21.9792C30.1726 20.6852 30.8996 18.9302 30.8996 17.1002C30.8996 15.2702 30.1726 13.5152 28.8786 12.2212C27.5846 10.9272 25.8296 10.2002 23.9996 10.2002C22.1696 10.2002 20.4146 10.9272 19.1206 12.2212C17.8266 13.5152 17.0996 15.2702 17.0996 17.1002C17.0996 18.9302 17.8266 20.6852 19.1206 21.9792C20.4146 23.2732 22.1696 24.0002 23.9996 24.0002Z" stroke="#F4F4F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z" stroke="#F4F4F4" strokeWidth="1.5"/>
                  </svg>
                </button>
                {isAccountComboboxOpen && (
                  <div className="account-combobox">
                    <ul>
                      {user.role === 'Tenant' ? (
                        <>
                          <div className='settings'>
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12.5 37.8V35.5C12.5 32.45 13.7116 29.5249 15.8683 27.3683C18.0249 25.2116 20.95 24 24 24C27.05 24 29.9751 25.2116 32.1317 27.3683C34.2884 29.5249 35.5 32.45 35.5 35.5V37.8" stroke="#F4F4F4" strokeWidth="1.5" strokeLinecap="round"/>
                              <path d="M23.9996 24.0002C25.8296 24.0002 27.5846 23.2732 28.8786 21.9792C30.1726 20.6852 30.8996 18.9302 30.8996 17.1002C30.8996 15.2702 30.1726 13.5152 28.8786 12.2212C27.5846 10.9272 25.8296 10.2002 23.9996 10.2002C22.1696 10.2002 20.4146 10.9272 19.1206 12.2212C17.8266 13.5152 17.0996 15.2702 17.0996 17.1002C17.0996 18.9302 17.8266 20.6852 19.1206 21.9792C20.4146 23.2732 22.1696 24.0002 23.9996 24.0002Z" stroke="#F4F4F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z" stroke="#F4F4F4" strokeWidth="1.5"/>
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
                            <li><a href='/signout' onClick={handleLogoutClick}>Logout</a></li>
                          </div>
                        </>
                      ) : user.role === 'Landlord' ? (
                        <>
                          <div className='settings'>
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15.6 2C15.6 0.896 14.704 0 13.6 0H4.4C3.296 0 2.4 0.896 2.4 2V38C2.4 39.104 3.296 40 4.4 40H13.6C14.704 40 15.6 39.104 15.6 38V2ZM24 14H32C32.552 14 33 14.448 33 15V33C33 33.552 32.552 34 32 34H24C23.448 34 23 33.552 23 33V15C23 14.448 23.448 14 24 14ZM20 16H22V31H20V16ZM16 16H18V31H16V16ZM12 16H14V31H12V16ZM8 16H10V31H8V16ZM4 16H6V31H4V16ZM32 2H24C23.448 2 23 2.448 23 3V13H33V3C33 2.448 32.552 2 32 2ZM4.4 2C3.296 2 2.4 2.896 2.4 4V12H12V4C12 2.896 11.104 2 10 2H4.4Z" fill="#F4F4F4"/>
                            </svg>
                            <li><a href='/landlord/settings'>Landlord Settings</a></li>
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
                            <li><a href='/signout' onClick={handleLogoutClick}>Logout</a></li>
                          </div>
                        </>
                      ) : null}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
        <div className="white-strip"></div>
        <div className="hero-section">
          <h1>Are you looking<br/>for your dream<br/>home?</h1>
          <div className="carousel">
            <div class="carousel-images">
              <div class="carousel-item">
                <img src={photo1Image} alt="Map of locations" className="map-image" />
                <p>Lesi Ukrainki Street (Chaiki, Kyiv region)<br/>08135 Ukraine</p>
              </div>
              <div class="carousel-item">
                <img src={photo2Image} alt="Map of locations" className="map-image" />
                <p>Saksagansky Street (Holosiivskyj, Kyiv region)<br/>08135 Ukraine</p>
              </div>
              <div class="carousel-item">
                <img src={photo3Image} alt="Map of locations" className="map-image" />
                <p>Sicheslavska Street (Solomjanskyj, Kyiv region)<br/>08135 Ukraine</p>
              </div>
              <div class="carousel-item">
                <img src={photo4Image} alt="Map of locations" className="map-image" />
                <p>Zolotoustivska Street (Shevchenko, Kyiv region)<br/>08135 Ukraine</p>
              </div>
              <div class="carousel-item">
                <img src={photo5Image} alt="Map of locations" className="map-image" />
                <p>Kharkovskoe Shosse (Darnyckyj, Kyiv region)<br/>08135 Ukraine</p>
              </div>
              <div class="carousel-item">
                <img src={photo6Image} alt="Map of locations" className="map-image" />
                <p>Zhilyanskaya Street (Holosiivskyj, Kyiv region)<br/>08135 Ukraine</p>
              </div>
              <div class="carousel-item">
                <img src={photo7Image} alt="Map of locations" className="map-image" />
                <p>Leskova Street (Pecherskyj, Kyiv region)<br/>08135 Ukraine</p>
              </div>
              <div class="carousel-item">
                <img src={photo8Image} alt="Map of locations" className="map-image" />
                <p>Shchorsa Street (Pecherskyj, Kyiv region)<br/>08135 Ukraine</p>
              </div>
              <div class="carousel-item">
                <img src={photo9Image} alt="Map of locations" className="map-image" />
                <p>Andriivskyi Union (Podilskyj, Kyiv region)<br/>08135 Ukraine</p>
              </div>
            </div>
            <button className="carousel-btn next" onClick={handleNext}>🠒</button>
            <div className="carousel-dots">
              {[...Array(9)].map((_, i) => (
                <span
                  key={i}
                  className="dot"
                  onClick={() => currentSlide(i)}
                ></span>
              ))}
            </div>
          </div>
          <button className="find-house-btn"><a href='/find_house'>{translations[language].findHouse}</a></button>
          <p>Welcome to our housing search site! We offer thousands of vetted<br/>listings, easy searching, and full support every step of the way to<br/>help you find your ideal home quickly and easily.</p>
          <div class="search-bar">
            <div class="search-field">
              <label>Where</label>
              <input type="text" placeholder="must be your dream home?" />
            </div>
            <div class="vertical-line"></div>
            <div class="search-field">
              <label>Check in</label>
              <input type="date" placeholder="and you will get access" />
            </div>
            <div class="vertical-line"></div>
            <div class="search-field">
              <label>Check out</label>
              <input type="date" placeholder="we have already checked" />
            </div>
            <div class="vertical-line"></div>
            <div class="search-field" onClick={handlePeopleButtonClick} ref={peopleButtonRef}>
              <label>Number of people</label>
              <input type="number" id="number-of-people" placeholder="and rooms" readonly />
            </div>
            <button class="search-btn">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.1667 32.0833C26.7481 32.0833 32.0833 26.7481 32.0833 20.1667C32.0833 13.5853 26.7481 8.25 20.1667 8.25C13.5853 8.25 8.25 13.5853 8.25 20.1667C8.25 26.7481 13.5853 32.0833 20.1667 32.0833Z" stroke="#F4F4F4" strokeWidth="1.5"/>
                <path d="M20.167 13.75C21.8688 13.75 23.5009 14.426 24.7043 15.6294C25.9076 16.8328 26.5837 18.4649 26.5837 20.1667" stroke="#F4F4F4" strokeWidth="1.5"/>
                <path d="M37.4003 37.5832L28.417 28.7832" stroke="#F4F4F4" strokeWidth="1.5"/>
              </svg><br/>
              Search
            </button>
          </div>
          {isPeopleComboboxOpen && (
            <div className="people-combobox" ref={peopleComboboxRef}>
              <ul>
                <div className='count-of-adults'>
                  <label>Adults</label>
                  <div className='quantity'>
                    <button className="decrement" onClick={decrement(setAdults, adults)}>-</button>
                    <input type="number" value={adults} readOnly />
                    <button className="increment" onClick={increment(setAdults, adults)}>+</button>
                  </div>
                </div>
                <div className='count-of-children'>
                  <label>Children</label>
                  <div className='quantity'>
                    <button className="decrement" onClick={decrement(setChildren, children)}>-</button>
                    <input type="number" value={children} readOnly />
                    <button className="increment" onClick={increment(setChildren, children)}>+</button>
                  </div>
                </div>
                <div className='count-of-age-needed'>
                  <label>Age needed</label>
                  <div className='quantity'>
                    <button className="decrement" onClick={decrement(setAgeNeeded, ageNeeded)}>-</button>
                    <input type="number" value={ageNeeded} readOnly />
                    <button className="increment" onClick={increment(setAgeNeeded, ageNeeded)}>+</button>
                  </div>
                </div>
                <div className='count-of-rooms'>
                  <label>Rooms</label>
                  <div className='quantity'>
                    <button className="decrement" onClick={decrement(setRooms, rooms)}>-</button>
                    <input type="number" value={rooms} readOnly />
                    <button className="increment" onClick={increment(setRooms, rooms)}>+</button>
                  </div>
                </div>
                <div className='isPets'>
                  <label>Traveling with pets?</label>
                  <label className="switch">
                    <input type="checkbox" checked={isPets} onChange={() => setIsPets(!isPets)} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <button className='done'>Done</button>
              </ul>
            </div>
          )}
        </div>
        <div className='socials'>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_601_789)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M36 18C36 27.9411 27.9411 36 18 36C8.05888 36 0 27.9411 0 18C0 8.05888 8.05888 0 18 0C27.9411 0 36 8.05888 36 18ZM18.645 13.2884C16.8943 14.0166 13.3952 15.5238 8.14784 17.81C7.29575 18.1488 6.84939 18.4803 6.80875 18.8045C6.74008 19.3522 7.42607 19.5679 8.3602 19.8617C8.48727 19.9016 8.61893 19.943 8.75391 19.9869C9.67296 20.2857 10.9092 20.6352 11.5519 20.649C12.1349 20.6616 12.7856 20.4213 13.504 19.928C18.4067 16.6185 20.9376 14.9457 21.0965 14.9097C21.2086 14.8842 21.3639 14.8522 21.4691 14.9458C21.5744 15.0393 21.5641 15.2165 21.5529 15.264C21.4849 15.5537 18.7922 18.0571 17.3987 19.3527C16.9643 19.7565 16.6561 20.043 16.5931 20.1085C16.452 20.255 16.3082 20.3937 16.17 20.5269C15.3162 21.35 14.6759 21.9672 16.2054 22.9752C16.9405 23.4596 17.5286 23.8601 18.1154 24.2597C18.7563 24.6961 19.3954 25.1314 20.2224 25.6735C20.4331 25.8116 20.6343 25.9551 20.8303 26.0948C21.5761 26.6265 22.2461 27.1041 23.0739 27.0279C23.5549 26.9837 24.0517 26.5314 24.304 25.1825C24.9003 21.9947 26.0724 15.0877 26.3433 12.2415C26.3671 11.9921 26.3372 11.673 26.3132 11.5329C26.2893 11.3928 26.2392 11.1932 26.057 11.0454C25.8414 10.8704 25.5085 10.8335 25.3595 10.8361C24.6825 10.8481 23.6438 11.2092 18.645 13.2884Z" fill="#F4F4F4"/>
          </g>
          <defs>
          <clipPath id="clip0_601_789">
          <rect width="36" height="36" fill="white"/>
          </clipPath>
          </defs>
          </svg>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.8846 3.66827C25.2224 3.66314 26.5603 3.67658 27.8978 3.7086L28.2534 3.72144C28.6641 3.7361 29.0693 3.75444 29.5588 3.77644C31.5094 3.8681 32.8404 4.17611 34.0083 4.62894C35.2183 5.09461 36.2376 5.72527 37.2569 6.7446C38.1889 7.66055 38.9103 8.76851 39.3708 9.99144C39.8236 11.1593 40.1316 12.4921 40.2233 14.4428C40.2453 14.9304 40.2636 15.3374 40.2783 15.7481L40.2893 16.1038C40.3218 17.4406 40.3359 18.7779 40.3314 20.1151L40.3333 21.4828V23.8844C40.3378 25.2223 40.3237 26.5601 40.2911 27.8976L40.2801 28.2533C40.2654 28.6639 40.2471 29.0691 40.2251 29.5586C40.1334 31.5093 39.8218 32.8403 39.3708 34.0081C38.9118 35.2323 38.1903 36.3412 37.2569 37.2568C36.3402 38.1887 35.2317 38.91 34.0083 39.3706C32.8404 39.8234 31.5094 40.1314 29.5588 40.2231C29.0693 40.2451 28.6641 40.2634 28.2534 40.2781L27.8978 40.2891C26.5603 40.3217 25.2224 40.3358 23.8846 40.3313L22.5169 40.3331H20.1171C18.7792 40.3376 17.4414 40.3236 16.1039 40.2909L15.7483 40.2799C15.313 40.2642 14.8779 40.2458 14.4429 40.2249C12.4923 40.1333 11.1613 39.8216 9.99158 39.3706C8.76817 38.9111 7.66002 38.1896 6.74475 37.2568C5.81167 36.3406 5.08966 35.232 4.62909 34.0081C4.17625 32.8403 3.86825 31.5093 3.77659 29.5586C3.75617 29.1236 3.73783 28.6885 3.72159 28.2533L3.71242 27.8976C3.67862 26.5602 3.66334 25.2223 3.66659 23.8844V20.1151C3.66147 18.7779 3.67491 17.4406 3.70692 16.1038L3.71975 15.7481C3.73442 15.3374 3.75275 14.9304 3.77475 14.4428C3.86642 12.4903 4.17442 11.1611 4.62725 9.99144C5.0881 8.76791 5.81152 7.66025 6.74659 6.74644C7.66123 5.81282 8.76868 5.09015 9.99158 4.62894C11.1613 4.17611 12.4904 3.8681 14.4429 3.77644L15.7483 3.72144L16.1039 3.71227C17.4408 3.67849 18.778 3.66321 20.1153 3.66644L23.8846 3.66827ZM21.9999 12.8349C20.7853 12.8178 19.5795 13.0421 18.4524 13.4951C17.3253 13.948 16.2994 14.6204 15.4345 15.4732C14.5695 16.326 13.8827 17.3423 13.4138 18.4628C12.945 19.5834 12.7036 20.786 12.7036 22.0007C12.7036 23.2154 12.945 24.418 13.4138 25.5385C13.8827 26.6591 14.5695 27.6754 15.4345 28.5282C16.2994 29.381 17.3253 30.0534 18.4524 30.5063C19.5795 30.9592 20.7853 31.1836 21.9999 31.1664C24.4311 31.1664 26.7626 30.2007 28.4817 28.4816C30.2008 26.7625 31.1666 24.4309 31.1666 21.9998C31.1666 19.5686 30.2008 17.237 28.4817 15.518C26.7626 13.7989 24.4311 12.8349 21.9999 12.8349ZM21.9999 16.5016C22.7305 16.4881 23.4565 16.6204 24.1354 16.8907C24.8143 17.1609 25.4325 17.5637 25.954 18.0756C26.4755 18.5875 26.8897 19.1981 27.1726 19.8719C27.4554 20.5457 27.6011 21.269 27.6012 21.9998C27.6014 22.7305 27.4559 23.4539 27.1733 24.1278C26.8907 24.8016 26.4766 25.4124 25.9553 25.9245C25.434 26.4365 24.8159 26.8395 24.1371 27.11C23.4583 27.3805 22.7324 27.513 22.0018 27.4998C20.5431 27.4998 19.1441 26.9203 18.1127 25.8889C17.0812 24.8574 16.5018 23.4585 16.5018 21.9998C16.5018 20.5411 17.0812 19.1421 18.1127 18.1107C19.1441 17.0792 20.5431 16.4998 22.0018 16.4998L21.9999 16.5016ZM31.6249 10.0849C31.0335 10.1086 30.4741 10.3602 30.064 10.7871C29.6539 11.2139 29.4249 11.7829 29.4249 12.3748C29.4249 12.9667 29.6539 13.5357 30.064 13.9625C30.4741 14.3893 31.0335 14.6409 31.6249 14.6646C32.2327 14.6646 32.8156 14.4232 33.2454 13.9934C33.6751 13.5636 33.9166 12.9807 33.9166 12.3729C33.9166 11.7652 33.6751 11.1823 33.2454 10.7525C32.8156 10.3227 32.2327 10.0813 31.6249 10.0813V10.0849Z" fill="#F4F4F4"/>
          </svg>
          <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.5018 3.4165C29.9369 3.4165 37.5851 11.0647 37.5851 20.4998C37.5851 29.935 29.9369 37.5832 20.5018 37.5832C17.4828 37.588 14.5169 36.7891 11.9089 35.2684L3.42531 37.5832L5.73498 29.0962C4.21301 26.4873 3.41344 23.5202 3.41848 20.4998C3.41848 11.0647 11.0667 3.4165 20.5018 3.4165ZM14.6798 12.4707L14.3381 12.4843C14.117 12.4978 13.9008 12.5559 13.7026 12.6552C13.5173 12.7601 13.3482 12.8913 13.2004 13.0447C12.9954 13.2377 12.8792 13.4051 12.7545 13.5674C12.1226 14.389 11.7824 15.3976 11.7876 16.434C11.791 17.2711 12.0097 18.086 12.3514 18.8479C13.0501 20.3888 14.1998 22.0203 15.7168 23.5321C16.0824 23.896 16.4411 24.2616 16.8272 24.6015C18.7121 26.2611 20.9584 27.4579 23.3872 28.0968L24.3575 28.2454C24.6736 28.2625 24.9896 28.2386 25.3074 28.2232C25.8049 28.1975 26.2907 28.0628 26.7304 27.8286C26.9541 27.7134 27.1724 27.5879 27.3847 27.4528C27.3847 27.4528 27.4581 27.4049 27.5982 27.299C27.8289 27.1282 27.9706 27.0069 28.162 26.807C28.3038 26.6601 28.4268 26.4875 28.5207 26.2911C28.654 26.0126 28.7872 25.4813 28.8419 25.0389C28.8829 24.7006 28.8709 24.5161 28.8658 24.4017C28.859 24.2189 28.7069 24.0293 28.5412 23.949L27.547 23.5031C27.547 23.5031 26.0607 22.8556 25.1519 22.4422C25.0568 22.4007 24.9549 22.3769 24.8512 22.3722C24.7343 22.3602 24.6162 22.3733 24.5049 22.4107C24.3935 22.4482 24.2914 22.509 24.2055 22.5891C24.1969 22.5857 24.0825 22.6831 22.8474 24.1796C22.7765 24.2748 22.6788 24.3468 22.5669 24.3864C22.4549 24.4259 22.3337 24.4313 22.2187 24.4017C22.1074 24.3718 21.9984 24.3342 21.8924 24.2889C21.6806 24.2001 21.6071 24.1659 21.4619 24.1044C20.4814 23.6766 19.5737 23.0985 18.7713 22.391C18.556 22.203 18.3561 21.998 18.1511 21.7999C17.4791 21.1562 16.8933 20.4281 16.4086 19.6337L16.3079 19.4714C16.2355 19.3624 16.1769 19.2447 16.1336 19.1212C16.0687 18.8701 16.2378 18.6685 16.2378 18.6685C16.2378 18.6685 16.6529 18.2141 16.846 17.9681C17.0339 17.7289 17.1928 17.4966 17.2953 17.3309C17.4969 17.0063 17.5601 16.6732 17.4541 16.4152C16.9758 15.2467 16.4804 14.0833 15.9713 12.9285C15.8705 12.6996 15.5716 12.5356 15.2999 12.5031C15.2077 12.4929 15.1154 12.4826 15.0232 12.4758C14.7938 12.4644 14.5639 12.4667 14.3347 12.4826L14.6781 12.469L14.6798 12.4707Z" fill="#F4F4F4"/>
          </svg>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_844_5519)">
          <path d="M33.3352 0H2.65781C1.18828 0 0 1.16016 0 2.59453V33.3984C0 34.8328 1.18828 36 2.65781 36H33.3352C34.8047 36 36 34.8328 36 33.4055V2.59453C36 1.16016 34.8047 0 33.3352 0ZM10.6805 30.6773H5.33672V13.493H10.6805V30.6773ZM8.00859 11.1516C6.29297 11.1516 4.90781 9.76641 4.90781 8.05781C4.90781 6.34922 6.29297 4.96406 8.00859 4.96406C9.71719 4.96406 11.1023 6.34922 11.1023 8.05781C11.1023 9.75937 9.71719 11.1516 8.00859 11.1516ZM30.6773 30.6773H25.3406V22.3242C25.3406 20.3344 25.3055 17.768 22.5633 17.768C19.7859 17.768 19.3641 19.9406 19.3641 22.1836V30.6773H14.0344V13.493H19.1531V15.8414H19.2234C19.9336 14.4914 21.6773 13.0641 24.2719 13.0641C29.6789 13.0641 30.6773 16.6219 30.6773 21.2484V30.6773Z" fill="#F4F4F4"/>
          </g>
          <defs>
          <clipPath id="clip0_844_5519">
          <rect width="36" height="36" fill="white"/>
          </clipPath>
          </defs>
          </svg>
      </div>
      </header>
      <section className="about-us">
        <h2>About us</h2>
        <div className="about-content">
          <div className="about-map">
            <img src={mapImage} alt="Map of locations" className="map-image" />
          </div>
          <div className="about-info">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;The Rent House company has been<br/>providing housing rental services in different<br/>segments of the real estate market for more<br/>than 20 years. Our company is famous for its<br/>reliability, professionalism, and individual<br/>approach to each client. We offer a wide range<br/>of properties - from economical apartments to<br/>luxury apartments and country houses.</p>
            <p>Advantages of the Rent House company:</p>
            <ol>
              <li>Experience and reliability. More than two decades of successful work in the rental housing market.</li><br/>
              <li>Wide selection of properties. Large catalog of real estate, including various options for all needs and budgets.</li><br/>
              <li>Professionalism. Qualified specialists ready to help you at all stages of the rental.</li><br/>
              <li>Individual approach. We take into account all the wishes and requirements of clients in order to find the ideal housing.</li><br/>
              <li>Legal support. We provide full legal support for transactions, guaranteeing the safety and transparency of the lease.</li><br/>
              <li>Convenience and comfort. We offer additional services for the arrangement and maintenance of housing.</li>
            </ol>
            <p>&nbsp;&nbsp;&nbsp;By contacting Rent House, you receive a<br/>guarantee of quality service and confidence in<br/>your choice. We do everything we can to make<br/>your rental experience as comfortable and<br/>enjoyable as possible.</p>
          </div>
        </div>
        <div className="statistics">
          <div className="satisfied-clients">
            <br/>
            <h3>+55K</h3>
            <p>satisfied clients</p>
          </div>
          <div className="active-offers">
            <br/>
            <h3>+7K</h3>
            <p>active offers</p>
          </div>
        </div>
      </section>
      <section className='popular-houses'>
        <h1>Popular houses in your area</h1>
        <div className="house-list-container">
          <div className="house-example">
            <img src={exampleHome} alt="Offer" />
            <div className='rating-example'>
              <p>8.3 ☆</p>
            </div>
            <div className='discount-example'>
              <p>27% off until September 16</p>
            </div>
            <div className='details-example'>
              <p>11101, New York</p>
            </div>
          </div>
          <div className="houses-list">
            {getVisibleHouses().map((house, index) => (
              <div className="house-card" key={index}>
                <img src={house.image} alt="House" />
                <div className="house-info">
                  <div className="rating">
                    <p>{house.rating}</p>
                  </div>
                  <div className='details'>
                    <p><strong>{house.details}</strong></p>
                    <p><strong>{house.discount}</strong></p>
                    <p>{house.description}</p>
                    <p>{house.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="buttons">
            <button className="prev-photo" onClick={handlePrev}>←</button>
            <button className="next-photo" onClick={handleNext}>→</button>
          </div>
          <button className="more-button">More</button>
        </div>
        <div className="company-info">
          <div className="basic">
            <p><strong>Rent House</strong> is deservedly considered one of the most reliable in the industry.<br/><strong>&nbsp;We provide</strong> our clients with the highest level of service and security at every<br/>stage of interaction. Our numerous positive reviews and <strong>high ratings</strong> on<br/>independent platforms confirm the trust and satisfaction of our customers. We<br/>are proud of our reputation and strive for continuous improvement. By choosing<br/>our company, you can be <strong>sure of the reliability and quality of the services<br/>provided.</strong> Book accommodation with us and enjoy a comfortable holiday<br/>without unnecessary worries.</p>
          </div>
          <div className="features">
            <div className="feature">
              <img src={procentImage} alt="Procent"/>
              <p>&nbsp;&nbsp;Our website for booking accommodation has a system for automatic suggestions. For every query you make, we recommend housing options that are tailored to your desires from future bookings. The more bookings you make, the more precise our system of recommendations will be. This will become part of our new service. This loyalty program allows each user to use and receive additional benefits and get the most of your trips more profitable and comfortable.</p>
            </div>
            <div className="feature">
              <img src={vereinbarungImage} alt="Vereinbarung"/>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;On our website you can book accommodation anywhere in the world and look for housing options. If your plans change, you can cancel your reservation without any penalty. We also extend to what we have bookings for sales. We will try to provide the possibility for our customers, providing the ability to easily manage their bookings.</p>
            </div>
            <div className="feature">
              <img src={planetImage} alt="Planet"/>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;On our website you can book accommodation anytime in the world. We offer a wide range of accommodation options, from cozy apartments to luxurious villas, in different countries and cities. Whether you are planning a beach holiday, a city break or a business trip, you'll find the perfect place to stay. Our service is available 24/7 so you can book your accommodation quickly and easily, no<br/>matter where you are.</p>
            </div>
            <div className="feature">
              <img src={messageImage} alt="Message"/>
              <p>Rent House has 24/7 support, ready to help you in any situation. Our team promptly responds to your requests and treats tasks with high responsibility. You can count on our assistance at any time of the day to ensure that your booking experience is comfortable and hassle-free as possible.</p>
            </div>
            <div class="logo-container">
              <img src={logo} alt="Logotype" />
            </div>
          </div>
        </div>
      </section>
      <section className='testimonials'>
        <h1>Testimonials</h1>
        <div className="testimonials-container">
          {/* {reviews.map((review, index) => (
            <div className="testimonial" key={index}>
              <div className="testimonial-header">
                <img src={review.image} alt={review.name} className="testimonial-avatar" />
                <div>
                  <h3>{review.name}</h3>
                  <p>{new Date(review.date).toLocaleDateString()}</p>
                </div>
              </div>
              <p>{review.text}</p>
            </div>
          ))} */}
        </div>
      </section>
      <footer className="main-footer">
        <div className="footer-content">
          <div className="logo-footer">
            <svg width="81" height="51" viewBox="0 0 81 51" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M61.0675 3.457V0.192383H0V50.3138H32.8382L30.9178 46.8572H2.88054V3.457H61.0675Z" fill="#F4F4F4"/>
              <path d="M74.1264 3.26482V0.384277H80.8477V49.5455H47.2414L45.7051 46.857H77.9672V3.26482H74.1264Z" fill="#F4F4F4"/>
              <path d="M71.2448 0H63.9474V21.7001H49.3527V9.21774H41.8633V41.2878H49.3527V27.8452H63.9474V41.2878H71.2448V0Z" fill="#F4F4F4"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M17.4757 41.288H9.41016V9.02588H27.4616C31.4943 9.40995 37.4474 12.4825 37.4474 20.548C37.4474 28.6136 31.1102 30.726 31.1102 30.726L43.7846 49.7375H35.7191L24.0049 32.2623H17.4757V41.288ZM17.0918 14.9789V26.3091H25.7334C28.614 25.733 29.7662 23.7742 29.7662 20.548C29.7662 16.1312 27.0777 15.171 25.3494 14.9789H17.0918Z" fill="#F4F4F4"/>
            </svg>&nbsp;&nbsp;
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

export default MainPage;