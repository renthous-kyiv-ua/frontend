import React from 'react';
import '../styles/SignUp.css';

const SignUp = () => {
  // document.getElementById('togglePassword').addEventListener('click', function () {
  //   const passwordInput = document.getElementById('password');
  //   const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  //   passwordInput.setAttribute('type', type);
  //   this.textContent = type === 'password' ? '👁' : '🙈'; // Change the icon
  // });  
  
  return (
    <div className="sign-up-page">
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
                <option value="en">EN</option>
                <option value="es">UA</option>
              </select>
            </div>
            <button onClick={() => window.location.href='/signin'} className="login">Registration / Login</button>
          </div>
        </nav>
        <div className="white-strip"></div>
        <div class="sign-up-content">
          <h2>Create New account</h2>
          <p class="create-acc">Or, <span class="highlight"><a href="/signin">Sign in</a></span></p>
          <div className='person'>
            <button className='tenant'>Tenant</button>
            <button className='agent'>Agent</button>
          </div><br/><br/>
          <label>First Name, Last Name</label>
          <input type="name" placeholder="Enter your passport First Name, Last Name" /><br/>
          <label>Email address</label>
          <input type="email" placeholder="Enter your email address" /><br/>
          <label>Password</label>
          <div class="password-wrapper">
            <input type="password" id="password" placeholder="🞄🞄🞄🞄🞄🞄🞄🞄" />
            <button type="button" id="togglePassword" class="toggle-password">
              <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.16386 8.16556C7.80968 8.51986 7.61075 9.00036 7.61084 9.50134C7.61093 10.0023 7.81003 10.4827 8.16433 10.8369C8.51864 11.1911 8.99913 11.39 9.50011 11.3899C10.0011 11.3899 10.4815 11.1908 10.8357 10.8364" stroke="#F4F4F4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13.9209 13.9134C12.5965 14.7431 11.0629 15.1779 9.5 15.1667C6.1 15.1667 3.26667 13.2778 1 9.5C2.20133 7.49778 3.56133 6.02633 5.08 5.08567M7.78111 4.00333C8.34682 3.88845 8.92275 3.83149 9.5 3.83333C12.9 3.83333 15.7333 5.72222 18 9.5C17.3704 10.5483 16.6973 11.4519 15.9808 12.2106M1 1L18 18" stroke="#F4F4F4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <a className='forgot' href='/forgot_pass'>Forgot your password?</a>
          <button class="email-button">Continue with email</button>
          <p>or use one of these options</p>
          <div class="other-options">
            <button class="social-button">
              <div class="inner-square">
                <svg width="18" height="31" viewBox="0 0 18 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 1H12.6364C10.7075 1 8.85767 1.76384 7.49377 3.12348C6.12987 4.48311 5.36364 6.32718 5.36364 8.25V12.6H1V18.4H5.36364V30H11.1818V18.4H15.5455L17 12.6H11.1818V8.25C11.1818 7.86544 11.3351 7.49662 11.6078 7.2247C11.8806 6.95277 12.2506 6.8 12.6364 6.8H17V1Z" fill="white" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </button>
            <button class="social-button">
              <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30.6985 12.4643H29.45V12.4H15.5V18.6H24.2598C22.9818 22.2092 19.5478 24.8 15.5 24.8C10.3641 24.8 6.2 20.6359 6.2 15.5C6.2 10.3641 10.3641 6.2 15.5 6.2C17.8707 6.2 20.0275 7.09435 21.6698 8.55522L26.0539 4.17105C23.2856 1.59107 19.5827 0 15.5 0C6.94012 0 0 6.94012 0 15.5C0 24.0599 6.94012 31 15.5 31C24.0599 31 31 24.0599 31 15.5C31 14.4607 30.893 13.4462 30.6985 12.4643Z" fill="#FFC107"/>
                <path d="M1.78711 8.28552L6.87963 12.0202C8.25758 8.6087 11.5947 6.2 15.5 6.2C17.8707 6.2 20.0275 7.09435 21.6697 8.55522L26.0539 4.17105C23.2856 1.59107 19.5827 0 15.5 0C9.54641 0 4.38336 3.36117 1.78711 8.28552Z" fill="#FF3D00"/>
                <path d="M15.5 31C19.5037 31 23.1415 29.4678 25.892 26.9762L21.0948 22.9167C19.4863 24.14 17.5208 24.8016 15.5 24.8C11.4685 24.8 8.04532 22.2293 6.75572 18.6418L1.70117 22.5362C4.26642 27.5559 9.47597 31 15.5 31Z" fill="#4CAF50"/>
                <path d="M30.6985 12.4643H29.45V12.4H15.5V18.6H24.2598C23.6485 20.3177 22.5474 21.8187 21.0924 22.9175L21.0947 22.916L25.892 26.9754C25.5525 27.2839 31 23.25 31 15.5C31 14.4607 30.893 13.4462 30.6985 12.4643Z" fill="#1976D2"/>
              </svg>
            </button>
            <button class="social-button">
              <svg width="27" height="33" viewBox="0 0 27 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.4962 31.676C20.7516 33.4174 18.8468 33.1425 17.0132 32.3176C15.0729 31.4744 13.2927 31.4377 11.2455 32.3176C8.68203 33.4541 7.32911 33.1242 5.79816 31.676C-2.88908 22.4555 -1.60736 8.41394 8.2548 7.90067C10.658 8.02899 12.3314 9.25716 13.7377 9.36715C15.8383 8.92721 17.8499 7.66237 20.0929 7.82735C22.781 8.04732 24.8104 9.14718 26.1455 11.1269C20.5914 14.5548 21.9087 22.0889 27 24.1969C25.9853 26.9466 24.668 29.6779 22.4784 31.6943L22.4962 31.676ZM13.5597 7.79068C13.2927 3.70287 16.5148 0.329958 20.2175 0C20.7338 4.7294 16.0519 8.24896 13.5597 7.79068Z" fill="black"/>
              </svg>
            </button>
          </div>
          <p>By signing in or creating an account, you agree with our <a href="/terms">Terms & Conditions</a> and <a href="/privacy">Privacy Statement</a></p>
        </div>
      </header>
      <footer className='sign-up-footer'>
        <div className="logo">
          <svg width="81" height="51" viewBox="0 0 81 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M61.0675 3.457V0.192383H0V50.3138H32.8382L30.9178 46.8572H2.88054V3.457H61.0675Z" fill="#F4F4F4"/>
            <path d="M74.1264 3.26482V0.384277H80.8477V49.5455H47.2414L45.7051 46.857H77.9672V3.26482H74.1264Z" fill="#F4F4F4"/>
            <path d="M71.2448 0H63.9474V21.7001H49.3527V9.21774H41.8633V41.2878H49.3527V27.8452H63.9474V41.2878H71.2448V0Z" fill="#F4F4F4"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M17.4757 41.288H9.41016V9.02588H27.4616C31.4943 9.40995 37.4474 12.4825 37.4474 20.548C37.4474 28.6136 31.1102 30.726 31.1102 30.726L43.7846 49.7375H35.7191L24.0049 32.2623H17.4757V41.288ZM17.0918 14.9789V26.3091H25.7334C28.614 25.733 29.7662 23.7742 29.7662 20.548C29.7662 16.1312 27.0777 15.171 25.3494 14.9789H17.0918Z" fill="#F4F4F4"/>
          </svg>
        </div>
        <div className="white-strip"></div>
      </footer>
    </div>
  );
}

export default SignUp;