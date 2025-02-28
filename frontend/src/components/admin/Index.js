import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';



const Index = () => {

  const [events, setEvents] = useState([
    { title: 'event 1', date: '2025-02-27'},
    { title: 'event 1', date: '2025-02-28'}
  ]);

  const handleEventClick = (info) => {
    alert(`이벤트 제목: ${info.event.title}`);
  };

  // info는 FullCalendar에서 이벤트가 발생할 때 제공하는 객체로, 
  // 이벤트에 대한 다양한 정보를 담고 있습니다. 
  // eventClick 콜백 함수의 info 객체는 클릭된 이벤트에 대한 세부 정보를 포함하고 있어, 
  // 이를 활용해 이벤트의 다양한 속성에 접근할 수 있습니다.

  //info 객체의 주요 속성
  //event: 클릭된 이벤트 객체. 이벤트의 속성(예: title, start, end 등)에 접근할 수 있습니다.
  //el: 클릭된 이벤트의 DOM 요소.
  //jsEvent: 실제로 발생한 JavaScript 이벤트 객체. 일반적인 마우스 이벤트 속성(예: clientX, clientY 등)에 접근할 수 있습니다.
  //view: 이벤트가 발생한 캘린더 뷰에 대한 정보.

  // height : 캘린더의 높이를 설정합니다.
  // contentHeight : 캘린더의 콘텐츠 높이를 설정합니다.
  // aspectRatio : 캘린더의 가로 세로 비율을 설정합니다.
  // customButtons : 사용자 정의 버튼을 설정하고 툴바에 추가합니다.

  return (
    <>
      <div className='admin-index'>
        <div className='admin-index-con'>


          <FullCalendar 
            initialView='dayGridMonth' // 처음 보여줄 때 월로 표시되게
            plugins={[dayGridPlugin]} 
            events={events} // 메모 표시

            firstDay={1} // 주의 첫 번째 날을 월요일로 설정
            // initialDate="2024-06-01" // 처음 랜더 시 표시될 날짜
            timeZone="Asia/Seoul"
            weekends={true}
            locale={'ko'} // 언어 설정
            height="auto"

            headerToolbar={{
              start: "prev, next today", //상단툴바의 시작부분, 이동버튼, 오늘날짜버튼 배치
              center: "title", //상단툴바의 제목 배치
              end: "dayGridMonth dayGridWeek dayGridDay", //view변경 버튼 배치
            }}

            views={{ // 특정 뷰에 대한 설정을 세부적으로 조정
              dayGridMonth: { 
                dayMaxEventRows: 3, // 하루에 최대 3개의 이벤트 행 표시 (초과되는 건 +more 로 표시됨)
                buttonText: '월간' // 월간 뷰 버튼 텍스트 설정
              },
              dayGridWeek: { 
                buttonText: '주간' // 주간 뷰 버튼 텍스트 설정
              },
              dayGridDay: { 
                buttonText: '일간' // 일간 뷰 버튼 텍스트 설정
              }

            }}

            

            eventColor="#76c3c5" // 이벤트 기본 색상 설정
            eventTextColor="#089196" // 이벤트 텍스트 색상 설정
            eventBackgroundColor="#76c3c577" // 이벤트 배경 색상 설정
            eventBorderColor="#76c3c5" // 이벤트 테두리 색상 설정
            eventClick={handleEventClick} // 이벤트 클릭 시 콜백 함수 설정
            // eventMouseEnter // 이벤트 마우스 올렸을 때
            // eventMouseLeave // 이벤트 마우스 떠났을 때
          ></FullCalendar>
          

        </div>
      </div>
    </>
  )
}

export default Index