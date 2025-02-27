import { Outlet } from 'react-router-dom';
import Header from '../../components/basic/Header';
import Footer from '../../components/basic/Footer';
import { useState, useEffect, useRef } from 'react'; // useRef 추가
import { useSelector } from 'react-redux';
import jwtAxios from '../../util/jwtUtils';

const DefaultLayout = () => {
  const [chatbotModal, setChatbotModal] = useState(false);
  const [messages, setMessages] = useState([]); // 채팅 메시지 목록
  const [question, setQuestion] = useState(""); // 입력 필드 값
  const isLogin = useSelector((state) => state.loginSlice);
  const chatContentRef = useRef(null); // 메시지 컨테이너 참조

  const chatbotModalFn = () => {
    setChatbotModal(!chatbotModal);
    if (!chatbotModal) {
      // 챗봇 모달이 열릴 때 초기 챗봇 메시지 전송
      const initialBotMessage = `
          <div class='head-img'><img src='/images/favicon3.png'></div>
          <div class='message'>무엇을 도와드릴까요?</div>
          <div class='time'>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>`;
      setMessages((prev) => [...prev, { text: initialBotMessage, sender: 'bot' }]);
    }
  };

  // 메시지 전송
  const sendMessage = async (message) => {
    if (!message || message.trim().length < 2) return;

    // 사용자 메시지 추가
    const userMessage = `
        <div class='head-img'>${isLogin.NickName}</div>
        <div class='msg'>
          <div class='time'>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div class='message'>${message}</div>
        </div>
        `;
    setMessages((prev) => [...prev, { text: userMessage, sender: 'user' }]);

    // 서버로 메시지 전송
    try {
      const response = await jwtAxios("http://localhost:8090/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ message }), // message를 JSON 형식으로 전송
      });
    
      const responseText = response.data.message.answer; // 수정된 응답에서 메시지 가져오기
      console.log(responseText)
      let botMessage= ``;
      if(responseText.mentor === null && responseText.mentorList === null){
        botMessage += `
          <div class='head-img'><img src='/images/favicon3.png'></div>
          <div class='message'>${responseText.content.replace(/\\n/g, "<br>")}</div>
          <div class='time'>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          `;
      }else if(responseText.mentor === null){
        botMessage += `
            <div class='head-img'><img src='/images/favicon3.png'></div>
            <div class='message'>
              <h1>${responseText.content.replace(/\\n/g, "<br>")}</h1>
              <div class='message-mentorList'>
              ${responseText.mentorList.map((el, index) => {
                let rankClass = 'black'; // 기본 색상
                if (index === 0) {
                    rankClass = 'gold'; // 1등
                } else if (index === 1) {
                    rankClass = 'silver'; // 2등
                } else if (index === 2) {
                    rankClass = 'bronze'; // 3등
                }
                return `
                    <div class="mentorList-langk">
                        <span class="${rankClass}">${index + 1}등</span>
                        <div class="mentorList-langk-top">
                            <div class="mentorList-langk-img">
                                ${el.attachFile === 1 ? (
                                    `<img 
                                    src="http://localhost:8090/member/profile/${el.newImgName}"
                                    alt="프로필" class="profile" />`
                                ) : (
                                    `<img 
                                    src="data:image/png;base64,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"
                                    alt="프로필" class="profile" />`
                                )}
                            </div>
                            <div class="mentorList-langk-nickName">${el.nickName}</div>
                        </div>
                        <div class="mentorList-langk-bottom">
                            <span>리뷰: ${el.replyCount}</span>
                            <span>조회: ${el.viewCount}</span>
                        </div>
                    </div>
                `;
              }).join('')}
              </div>
            </div>
            <div class='time'>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        `
      }else if(responseText.mentorList === null){
        const mentor = responseText.mentor
        botMessage += `
            <div class='head-img'><img src='/images/favicon3.png'></div>
            <div class='message'>
              <h1>${responseText.content.replace(/\\n/g, "<br>")}</h1>
              <div class='message-mentor'>
                <div class='message-mentor-top'>
                    ${mentor.attachFile === 1 ? (
                        `<img 
                        src="http://localhost:8090/member/profile/${mentor.newImgName}"
                        alt="프로필" class="profile" />`
                    ) : (
                        `<img 
                        src="data:image/png;base64,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"
                        alt="프로필" class="profile" />`
                    )}
                    <div class='message-mentor-nickName'>${mentor.nickName}</div>
                </div>
                <div class='message-mentor-body'>
                  <span>이름: ${mentor.userName}</span>
                  <span>경력: ${mentor.career}</span>
                  <span>리뷰: ${mentor.replyCount}</span>
                  <span>조회: ${mentor.viewCount}</span>
                </div>
                <div class='message-mentor-item'>
                  <span>멘토의 등록 상품</span>
                  ${mentor.itemEntities.map(el => `
                    <div>
                      <span>${el.category}:</span>
                      <span>${el.itemPrice}원</span>
                    </div>
                    `
                  ).join('')}
                </div>
                <div class='message-mentor-bottom'>
                    <div>
                      <span>Mail.</span>
                      <span>${mentor.userEmail}</span>
                    </div>
                    <div>
                      <span>Tel.</span>
                      <span>${mentor.phone}</span>
                    </div>
                </div>
              </div>
            </div>
            <div class='time'>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        `
      }
    
      // 챗봇 응답 추가
      setMessages((prev) => [...prev, { text: botMessage, sender: 'bot' }]);
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }

    setQuestion(""); // 입력 필드 리셋
  };

  // 엔터 키 입력 처리
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage(question);
    }
  };

  // 메시지 추가 시 자동 스크롤
  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]); // messages가 변경될 때마다 실행

  return (
    <div className='wrapper'>
      <Header />
      <div className='default-layout'>
        <div className='default-layout-con'>
          <Outlet />
          {isLogin.id&&(
            <div className="chatbot" onClick={()=>{
              chatbotModalFn();
            }}>
              <div className="chatbot-icon">💬</div>
            </div>
          )}

          {/* 챗봇 창 */}
          {chatbotModal && (
            <div className="chatbot-con">
              <div id="chat-disp">
                <div id="chat-disp-con">
                  <div id="chat-header">
                    <span>
                      RESUMEBOOST
                    </span>
                    <span className="btn-wrap">
                      <button type="button" id="close" onClick={() => { 
                        chatbotModalFn(); 
                        setMessages([]); // X 버튼 클릭 시 메시지 초기화
                      }}>X</button>
                    </span>
                  </div>
                  <div id="chat-content" ref={chatContentRef}> {/* ref 추가 */}
                    {messages.map((msg, index) => (
                      <div key={index} className={`data-con ${msg.sender}`}>
                        <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                      </div>
                    ))}
                  </div>
                  <div id="chat-question" className="flex between">
                    <input type="text" id="question" 
                      value={question} 
                      onChange={(e) => setQuestion(e.target.value)} 
                      onKeyDown={handleKeyDown}
                      placeholder="질문을 입력하세요" 
                    />
                    <button id="btn-msg-send" onClick={() => sendMessage(question)}>
                      전송
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;