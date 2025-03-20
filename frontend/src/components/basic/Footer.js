import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Left Section */}
          <div className="footer-left">
            <h3 className="company-name">RESUMEBOOST</h3>
            
            <div className="company-info">
              <p>주식회사 resume | 대표이사 임혜성 | 서울특별시 노원구 상계동 593-1 화일빌딩 6층 602호</p>
              <p>사업자등록번호 000-00-00000 | 통신판매업신고 제0000-서울노원-00000호</p>
            </div>
            
            <div className="customer-center">
              <h4>고객센터</h4>
              <button className="kakao-button">
                <span className="kakao-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M22.125 0H1.875C.839 0 0 .84 0 1.875v20.25C0 23.161.84 24 1.875 24h20.25C23.161 24 24 23.16 24 22.125V1.875C24 .839 23.16 0 22.125 0zM12 18.75c-.591 0-1.17-.041-1.732-.12-.562.396-3.813 2.679-4.12 2.722 0 0-.125.049-.232-.014s-.088-.229-.088-.229c.032-.22.843-3.018.992-3.533-2.745-1.36-4.57-3.769-4.57-6.513 0-4.246 4.365-7.688 9.75-7.688s9.75 3.442 9.75 7.688c0 4.245-4.365 7.687-9.75 7.687zM8.05 9.867h-.878v3.342c0 .296-.252.537-.563.537s-.562-.24-.562-.537V9.867h-.878a.552.552 0 0 1 0-1.101h2.88a.552.552 0 0 1 0 1.101zm10.987 2.957a.558.558 0 0 1 .109.417.559.559 0 0 1-.219.37.557.557 0 0 1-.338.114.558.558 0 0 1-.45-.224l-1.319-1.747-.195.195v1.227a.564.564 0 0 1-.562.563.563.563 0 0 1-.563-.563V9.328a.563.563 0 0 1 1.125 0v1.21l1.57-1.57a.437.437 0 0 1 .311-.126c.14 0 .282.061.388.167a.555.555 0 0 1 .165.356.438.438 0 0 1-.124.343l-1.282 1.281 1.385 1.835zm-8.35-3.502c-.095-.27-.383-.548-.75-.556-.366.008-.654.286-.749.555l-1.345 3.541c-.171.53-.022.728.133.8a.857.857 0 0 0 .357.077c.235 0 .414-.095.468-.248l.279-.73h1.715l.279.73c.054.153.233.248.468.248a.86.86 0 0 0 .357-.078c.155-.071.304-.268.133-.8l-1.345-3.54zm-1.311 2.443.562-1.596.561 1.596H9.376zm5.905 1.383a.528.528 0 0 1-.539.516h-1.804a.528.528 0 0 1-.54-.516v-3.82c0-.31.258-.562.575-.562s.574.252.574.562v3.305h1.195c.297 0 .54.231.54.515z"></path>
                  </svg>
                </span>
                <span>카톡으로 상담하기</span>
              </button>
              <div className="service-hours">
                <p>RESUMEBOOST 고객센터는 카카오톡으로 운영 중입니다.</p>
                <p>평일(월-금) : 10:00~17:00 주말(토요일) : 13:00~17:00 (일요일, 공휴일 제외)</p>
                <p className="email">resumeboost@gmail.com</p>
              </div>
            </div>
          </div>
          
          {/* Right Section */}
          <div className="footer-right">
            <div className="app-download">
              <h4>App Download</h4>
              <div className="app-links">
                <span className="app-link">
                  <span className="app-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"></path>
                    </svg>
                  </span>
                  <span>App Store</span>
                </span>
                <span className="app-link">
                  <span className="app-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path fill="currentColor" d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"></path>
                    </svg>
                  </span>
                  <span>Google Play</span>
                </span>
              </div>
            </div>
            
            <div className="sns-links">
              <h4>SNS</h4>
              <div className="social-icons">
                <svg viewBox="0 0 24 24" width="24" height="24" className='social-icon youtube'>
                  <path fill="currentColor" d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"></path>
                </svg>
                <svg viewBox="0 0 24 24" width="24" height="24" className='social-icon instagram'>
                  <path fill="currentColor" d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"></path>
                </svg>
                <svg viewBox="0 0 24 24" width="24" height="24" className='social-icon kakao'>
                  <path fill="currentColor" d="M22.125 0H1.875C.839 0 0 .84 0 1.875v20.25C0 23.161.84 24 1.875 24h20.25C23.161 24 24 23.16 24 22.125V1.875C24 .839 23.16 0 22.125 0zM12 18.75c-.591 0-1.17-.041-1.732-.12-.562.396-3.813 2.679-4.12 2.722 0 0-.125.049-.232-.014s-.088-.229-.088-.229c.032-.22.843-3.018.992-3.533-2.745-1.36-4.57-3.769-4.57-6.513 0-4.246 4.365-7.688 9.75-7.688s9.75 3.442 9.75 7.688c0 4.245-4.365 7.687-9.75 7.687zM8.05 9.867h-.878v3.342c0 .296-.252.537-.563.537s-.562-.24-.562-.537V9.867h-.878a.552.552 0 0 1 0-1.101h2.88a.552.552 0 0 1 0 1.101zm10.987 2.957a.558.558 0 0 1 .109.417.559.559 0 0 1-.219.37.557.557 0 0 1-.338.114.558.558 0 0 1-.45-.224l-1.319-1.747-.195.195v1.227a.564.564 0 0 1-.562.563.563.563 0 0 1-.563-.563V9.328a.563.563 0 0 1 1.125 0v1.21l1.57-1.57a.437.437 0 0 1 .311-.126c.14 0 .282.061.388.167a.555.555 0 0 1 .165.356.438.438 0 0 1-.124.343l-1.282 1.281 1.385 1.835zm-8.35-3.502c-.095-.27-.383-.548-.75-.556-.366.008-.654.286-.749.555l-1.345 3.541c-.171.53-.022.728.133.8a.857.857 0 0 0 .357.077c.235 0 .414-.095.468-.248l.279-.73h1.715l.279.73c.054.153.233.248.468.248a.86.86 0 0 0 .357-.078c.155-.071.304-.268.133-.8l-1.345-3.54zm-1.311 2.443.562-1.596.561 1.596H9.376zm5.905 1.383a.528.528 0 0 1-.539.516h-1.804a.528.528 0 0 1-.54-.516v-3.82c0-.31.258-.562.575-.562s.574.252.574.562v3.305h1.195c.297 0 .54.231.54.515z"></path>
                </svg>
              </div>
            </div>
            
            <div className="win-notice">
              <button onClick={scrollToTop} className="scroll-top">
                ▲
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
    <div className="certifications">
      <div className="cert-text">
        <p>ISO 0000 / ISO 00000 인증<br />
        정보보안경영시스템 / 환경경영시스템 인증 획득</p>
      </div>
    </div>
    </>
  );
};

export default Footer;