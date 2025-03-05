import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const Main = () => {
  const isLogin = useSelector((state) => state.loginSlice);

  return (
    <>
     <div className='main'>
      <div className="main-con">
        <div className="slogan">
          <img src="/images/main2.jpg" alt="슬로건" />
        </div>
        <div className="main-container">
          <div className="main-section1">
            <div className="section1-con">
              <div className="section1-top">
                <h1>멘토 • 취준생 회원수 <br /> 대한민국 1위</h1>
                <span>멘토 풀, 취준생 회원수 모두 압도적 1위</span>
              </div>
              <div className="section1-bottom">
                <ul>
                  <li>
                    <div className="bottom-top">
                      <img src="/images/mentoricon.png" alt="main-icon" />
                    </div>
                    <div className="bottom-bottom">
                      <span>멘토 회원</span>
                      <h1>592,313명</h1>
                    </div>
                  </li>
                  <li>
                    <div className="bottom-top">
                      <img src="/images/membericon.png" alt="main-icon" />
                    </div>
                    <div className="bottom-bottom">
                      <span>취준생 회원</span>
                      <h1>1,533,045명</h1>
                    </div>
                  </li>
                  <li>
                    <div className="bottom-top">
                      <img src="/images/reviewicon.png" alt="main-icon" />
                    </div>
                    <div className="bottom-bottom">
                      <span>고객 만족도</span>
                      <h1>97.2%</h1>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="main-section2">
            <div className="section2-con">
              <div className="section2-top">
                <h1>153만 취준생 회원들이 <br />
                직접 작성한 후기</h1>
                <span>
                  실제 컨설팅 후 작성된 100% 리얼 후기를 보고 <br />
                  원하는 멘토를 보다 쉽고, 빠르게 찾을 수 있어요.
                </span>
              </div>
              <div className="section2-mid">
                <div className="review-container">
                  <div className="review-list">
                    {/* {reviews.concat(reviews).map((review, index) => (
                      <div key={index} className="review-item">
                        <div className="review-header">
                          <img src="https://via.placeholder.com/50" alt="프로필" className="profile-img" />
                          <div className="review-info">
                            <span className="review-author">사용자 {review.id}</span>
                            <span className="review-location">서울</span>
                          </div>
                        </div>
                        <div className="review-content">
                          <p>{review.text}</p>
                        </div>
                      </div>
                    ))} */}
                  </div>
                </div>
              </div>
              <div className="section2-bottom">
                <span><img src="/images/!!!.png" alt="" /> 후기는 랜덤으로 노출됩니다!</span>
              </div>
            </div>
          </div>
          {isLogin.id ?(
            <div className="main-section3">
              <h1 className="index-title-1">
                RESUMEBOOST를 사용해 보세요!
              </h1>
              <div className="cards-container">
                {/* 왼쪽 카드 */}
                <Link to={'/member/mentorList'} className="card card-green">
                  <div className="card-content">
                    <p className="card-subtitle-green">취업관련 컨설팅 멘토를 직접 찾아서 견적받고 싶다면?</p>
                    <h2 className="card-title-green">1분만에 나에게 맞는 <br />멘토 찾아보기</h2>
                  </div>
                  <div className="card-footer">
                    <div className="arrow-button-green">〉</div>
                    <img src="/images/index1.png" alt="paper plane" className="card-icon" />
                  </div>
                </Link>

                {/* 오른쪽 카드 */}
                <Link to={'/board'} className="card card-blue">
                  <div className="card-content">
                    <p className="card-subtitle-blue">전국 취준생들과 소통하는 커뮤니티</p>
                    <h2 className="card-title-blue">RESUMEBOOST<br /> 커뮤니티 둘러보기</h2>
                  </div>
                  <div className="card-footer">
                    <div className="arrow-button-blue">〉</div>
                    <img src="/images/index2.png" alt="user folder" className="card-icon" />
                  </div>
                </Link>
              </div>
            </div>
          ):(
            <div className="main-section3">
              <h1 className="index-title-1">
                이제, 1분만에 회원가입하고 <br /> 내게 딱 맞는 취업 멘토를 만나보세요!
              </h1>
              <div className="cards-container">
                {/* 왼쪽 카드 */}
                <Link to={'/auth/join'} className="card card-green">
                  <div className="card-content">
                    <p className="card-subtitle-green">취업관련 컨설팅 멘토를 직접 찾아서 견적받고 싶다면?</p>
                    <h2 className="card-title-green">1분만에 회원가입하고<br />나에게 맞는 멘토 찾아보기</h2>
                  </div>
                  <div className="card-footer">
                    <div className="arrow-button-green">〉</div>
                    <img src="/images/index1.png" alt="paper plane" className="card-icon" />
                  </div>
                </Link>

                {/* 오른쪽 카드 */}
                <Link to={'/auth/join/mentor'} className="card card-blue">
                  <div className="card-content">
                    <p className="card-subtitle-blue">취준 선배로써 or 경력자로써 부수입과 도움을 주고 싶다면?</p>
                    <h2 className="card-title-blue">1분만에 멘토가입하고<br />컨설팅 해주기</h2>
                  </div>
                  <div className="card-footer">
                    <div className="arrow-button-blue">〉</div>
                    <img src="/images/index2.png" alt="user folder" className="card-icon" />
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
     </div>
    </>
  )
}

export default Main