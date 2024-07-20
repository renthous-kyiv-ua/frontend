import React, { useEffect } from 'react';
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

const MainPage = () => {

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

    function nextSlide() {
      showSlide(currentIndex + 1);
    }

    function currentSlide(index) {
      showSlide(index);
    }

    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.addEventListener('click', () => currentSlide(index));
    });

    const intervalId = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      clearInterval(intervalId);
      document.querySelector('.next').removeEventListener('click', nextSlide);
      document.querySelectorAll('.dot').forEach((dot) => {
        dot.removeEventListener('click', currentSlide);
      });
    };
  }, []);

//   document.getElementById('number-of-people').addEventListener('click', function() {
//     document.getElementById('people-popup').style.display = 'block';
//   });
  
//   document.getElementById('done-btn').addEventListener('click', function() {
//     document.getElementById('people-popup').style.display = 'none';
//     updateNumberOfPeople();
//   });
  
//   function updateNumberOfPeople() {
//     const adults = document.getElementById('adult-count').value;
//     const children = document.getElementById('children-count').value;
//     const rooms = document.getElementById('room-count').value;
//     document.getElementById('number-of-people').value = `${adults} adults, ${children} children, ${rooms} rooms`;
//   }
  
//   document.getElementById('adult-increase').addEventListener('click', function() {
//     document.getElementById('adult-count').value++;
//   });
//   document.getElementById('adult-decrease').addEventListener('click', function() {
//     const count = document.getElementById('adult-count');
//     if (count.value > 1) count.value--;
//   });
  
//   document.getElementById('children-increase').addEventListener('click', function() {
//     document.getElementById('children-count').value++;
//   });
//   document.getElementById('children-decrease').addEventListener('click', function() {
//     const count = document.getElementById('children-count');
//     if (count.value > 0) count.value--;
//   });
  
//   document.getElementById('age-increase').addEventListener('click', function() {
//     document.getElementById('age-count').value++;
//   });
//   document.getElementById('age-decrease').addEventListener('click', function() {
//     const count = document.getElementById('age-count');
//     if (count.value > 0) count.value--;
//   });
  
//   document.getElementById('room-increase').addEventListener('click', function() {
//     document.getElementById('room-count').value++;
//   });
//   document.getElementById('room-decrease').addEventListener('click', function() {
//     const count = document.getElementById('room-count');
//     if (count.value > 1) count.value--;
//   });  

  return (
    <div className="home">
      <header className="home-header">
        <nav className="navigation">
          <ul className="nav-list">
            <li className="active" href="/">Home</li>
            <li href="/about">About Us</li>
            <li href="/agents">Agents</li>
            <li href="/tenant">Tenant</li>
            <li href="/landlord">Landlord</li>
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
              <select className="select-dropdown">
                <option value="en">EN</option>
                <option value="es">UA</option>
              </select>
            </div>
            <button onClick={() => window.location.href='/signin'} className="login">Registration / Login</button>
          </div>
        </nav>
        <div className="white-strip"></div>
        <div className="hero-section">
          <h1>Are you looking<br/>for your dream<br/>home?</h1>
          <div class="carousel">
            <div class="carousel-images">
              <div class="carousel-item">
                <img src={photo1Image} alt="Description 1" />
                <p>Lesi Ukrainki Street (Chaiki, Kyiv region)<br/>08135 Ukraine</p>
              </div>
              <div class="carousel-item">
                <img src={photo2Image} alt="Description 2" />
                <p>Saksagansky Street (Holosiivskyj, Kyiv region)<br/>08135 Ukraine</p>
              </div>
              <div class="carousel-item">
                <img src={photo3Image} alt="Description 3" />
                <p>Sicheslavska Street (Solomjanskyj, Kyiv region)<br/>08135 Ukraine</p>
              </div>
              <div class="carousel-item">
                <img src={photo4Image} alt="Description 4" />
                <p>Zolotoustivska Street (Shevchenko, Kyiv region)<br/>08135 Ukraine</p>
              </div>
              <div class="carousel-item">
                <img src={photo5Image} alt="Description 5" />
                <p>Kharkovskoe Shosse (Darnyckyj, Kyiv region)<br/>08135 Ukraine</p>
              </div>
              <div class="carousel-item">
                <img src={photo6Image} alt="Description 6" />
                <p>Zhilyanskaya Street (Holosiivskyj, Kyiv region)<br/>08135 Ukraine</p>
              </div>
              <div class="carousel-item">
                <img src={photo7Image} alt="Description 7" />
                <p>Leskova Street (Pecherskyj, Kyiv region)<br/>08135 Ukraine</p>
              </div>
              <div class="carousel-item">
                <img src={photo8Image} alt="Description 8" />
                <p>Shchorsa Street (Pecherskyj, Kyiv region)<br/>08135 Ukraine</p>
              </div>
              <div class="carousel-item">
                <img src={photo9Image} alt="Description 9" />
                <p>Andriivskyi Union (Podilskyj, Kyiv region)<br/>08135 Ukraine</p>
              </div>
            </div>
            <button class="carousel-btn next" onclick="nextSlide()">❯</button>
            <div class="carousel-dots">
              <span class="dot" onclick="currentSlide(0)"></span>
              <span class="dot" onclick="currentSlide(1)"></span>
              <span class="dot" onclick="currentSlide(2)"></span>
              <span class="dot" onclick="currentSlide(3)"></span>
              <span class="dot" onclick="currentSlide(4)"></span>
              <span class="dot" onclick="currentSlide(5)"></span>
              <span class="dot" onclick="currentSlide(6)"></span>
              <span class="dot" onclick="currentSlide(7)"></span>
              <span class="dot" onclick="currentSlide(8)"></span>
            </div>
          </div>
          <button className="find-house-btn">Find a House</button>
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
            <div class="search-field">
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
          <div id="people-popup" class="popup">
            <div class="popup-content">
              <label>Adults</label>
              <button id="adult-decrease">-</button>
              <input type="number" id="adult-count" value="1" />
              <button id="adult-increase">+</button>
              <label>Children</label>
              <button id="children-decrease">-</button>
              <input type="number" id="children-count" value="0" />
              <button id="children-increase">+</button>
              <label>Age needed</label>
              <button id="age-decrease">-</button>
              <input type="number" id="age-count" value="0" />
              <button id="age-increase">+</button>
              <label>Rooms</label>
              <button id="room-decrease">-</button>
              <input type="number" id="room-count" value="1" />
              <button id="room-increase">+</button>
              <label>Traveling with pets?</label>
              <input type="checkbox" id="pets-checkbox" />
              <button id="done-btn">Done</button>
            </div>
          </div>
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
            <p>&nbsp;&nbsp;&nbsp;The Rent House company has been<br/>providing housing rental services in different<br/>segments of the real estate market for more<br/>than 20 years. Our company is famous for its<br/>reliability, professionalism, and individual<br/>approach to each client. We offer a wide range<br/>of properties - from economical apartments to<br/>luxury apartments and country houses.</p>
            <p>Advantages of the Rent House company:</p>
            <ol>
              <li>Experience and reliability. More than two decades of successful work in the rental housing market.</li><br/>
              <li>Wide selection of properties. Large catalog of real estate, including various options for all needs and budgets.</li><br/>
              <li>Professionalism. Qualified specialists ready to help you at all stages of the rental.</li><br/>
              <li>Individual approach. We take into account all the wishes and requirements of clients in order to find the ideal housing.</li><br/>
              <li>Legal support. We provide full legal support for transactions, guaranteeing the safety and transparency of the lease.</li><br/>
              <li>Convenience and comfort. We offer additional services for the arrangement and maintenance of housing.</li>
            </ol>
            <p>&nbsp;&nbsp;&nbsp;By contacting Rent House, you receive a guarantee of quality service and confidence in your choice. We do everything we can to make your rental experience as comfortable and enjoyable as possible.</p>
          </div>
        </div>
        <div className="statistics">
          <div className="satisfied-clients">
            <h3>+55K</h3>
            <p>satisfied clients</p>
          </div>
          <div className="active-offers">
            <h3>+7K</h3>
            <p>active offers</p>
          </div>
        </div>
      </section>
      {/* Leave space for the rest of the information to scroll */}
    </div>
  );
}

export default MainPage;