#  <img src="frontend/public/favicon2.ico" width="25px">  RESUMEBOOST

![Image](https://github.com/user-attachments/assets/e4bcc848-5ce9-4859-97a4-7d890e75a035)



<br>

## 📌 목차

+ [🔎  프로젝트 소개](#프로젝트-소개)
+ [👨‍💼  팀원구성, 역할](#팀원-구성-및-역할)
+ [🖥  기술스택](#개발-환경)
+ [📄  프로젝트 구조](#프로젝트-구조)
+ [📄  데이터베이스 ERD](#데이터베이스-ERD)
+ [⚙  페이지별 기능](#페이지별-기능)
<br>

## 프로젝트 소개

- RESUMEBOOST는 취업 준비에 필요한 이력서, 자소서, 면접 첨삭에 특화된 플랫폼입니다.
- 멘토 회원, 일반회원으로 나뉘어 자신에 맞는 가입을 할 수 있습니다.
- 자유롭게 게시글을 남기거나 댓글을 작성할 수 있는 게시판도 있습니다.
- 취업 준비를 플랫폼이란 목적에 맞게 실시간 공채 속보도 제공합니다.

<br>

## 팀원 구성 및 역할

<div align="center">

![Image](https://github.com/user-attachments/assets/cea7f7e5-d6a1-4b9f-83f4-cd2a72943448)

</div>

<br>

## 개발 환경

- Front : HTML, React, JS, Redux, Axios
- Back-end : JAVA, Springboot, Spring security, Gradle
- 버전 및 이슈관리 : Github
- 활용한 OpenAPI : 카카오맵, 카카오페이, 카카오로그인, 고용24
- 협업 툴 : Github, Notion
- 배포 툴 : Docker, Github actions, Amazon EC2
<br>



<br>

## 프로젝트 구조

```
├── README.md
├── .github/workflows
├── .vscode
├── docker-compose.yml
├── frontend
     ├── nginx
     ├── public
     ├── Dockerfile
     ├── src
     │     ├── components
     │     ├── css
     │     ├── router
     │     └── slice
     └──   └── App.js
└── resumeboost
     ├── gradle/wrapper
     ├── Dockerfile
     ├── build.gradle
     ├── src/main
     │     ├── java/org/project/resumeboost
     │     │     ├── admin
     │     │     ├── basic
     │     │     ├── board
     │     │     ├── cart
     │     │     ├── chatbot
     │     │     ├── item
     │     │     ├── member
     │     │     ├── openApi
     │     │     ├── S3
     │     │     ├── security
     └──   └──   └── util
```

<br>

<br>

## 데이터베이스 ERD
### 총 15개의 테이블, member테이블을 기준으로 여러 기능의 테이블 조인
![Image](https://github.com/user-attachments/assets/5360e9e5-3886-46c2-8c36-1677e2e90391)

<br>
<br>

## 페이지별 기능

### 🙎‍♂️ 로그인, 회원가입

<details>
<summary>초기 화면</summary>

<br>
  
- 플랫폼 접속 초기화면으로 목적에 맞게 회원가입할 수 있습니다.
- 비로그인시 메인페이지와 커뮤니티를 볼 수 있습니다.

![Image](https://github.com/user-attachments/assets/44f948eb-2a0a-4f02-b08a-cdf14916c3fc)

</details>

<details>
<summary>회원 가입</summary>

<br>
    
- 일반회원과 멘토회원을 선택해 가입할 수 있습니다.
- 이메일 주소를 입력하면 입력창에서 바로 유효성 검사가 진행되고 통과하지 못한 경우 경고 문구가 입력창 하단에 표시됩니다.
- 이메일 주소의 형식이 유효하지 않거나 이미 가입된 이메일일 경우 입력창 하단에 경고 문구가 나타납니다.
- 닉네임과 전화번호 또한 중복확인과 유효성검사 후 입력창 하단에 경고 문구가 나타납니다.
- 작성이 완료된 후, 유효성 검사가 통과된 경우 다음 회원가입 버튼이 활성화되며, 버튼을 클릭하면 로그인페이지로 이동합니다.

![Image](https://github.com/user-attachments/assets/058a5747-18f6-4e72-b892-6d8c0bd1ac90)

</details>

<details>
<summary>로그인</summary>

<br>
   
- 이메일과 비밀번호를 입력한 후 DB에서 회원 존재여부를 확인 후 로그인이 진행됩니다.
- 카카오 소셜로그인으로 로그인할 시 처음 로그인한 경우라면 회원정보 추가작성 페이지로 이동하고, 아닐 시 바로 로그인이 진행됩니다.
- 일반로그인과 카카오로그인 모두 `JWT`를 발급 후 `React Cookie`에 저장해 로그인상태와 사용자 인증을 합니다.
- 로그인을 한 후 메인페이지로 이동합니다.


![Image](https://github.com/user-attachments/assets/3f4b2681-8be0-491e-b2ff-7237b1da18f1)

</details>

<br>

### 🙎‍♂️ 회원 개인페이지

<details>
<summary>일반 회원</summary>

<br>
  
- 자신의 정보를 확인할 수 있고, 수정 및 프로필 이미지 추가,변경을 할 수 있습니다.
- 나의 게시글,댓글,리뷰를 볼 수 있고 구매한 상품내역을 확인할 수 있습니다.
- 각각 `Component`를 만들어 관리되고, 왼쪽에 `li`를 클릭 시 렌더링 되도록 `useEfect`를 활용해 구현했습니다.

![Image](https://github.com/user-attachments/assets/c8320f43-79cf-4059-a570-d16451d73cae)

</details>

<details>
<summary>멘토 회원</summary>

<br>
  
- 일반 회원과 마찬가지로 개인정보를 수정할 수 있습니다.
- 멘토 회원은 구매내역 대신 내가 등록한 상품과 상품등록을 확인할 수 있습니다.

![Image](https://github.com/user-attachments/assets/f90a1582-fabb-4d90-8794-9ddda0665d6e)

</details>

<br>

### 🛒 상품, 장바구니

<details>
<summary>상품페이지</summary>

<br>
   
- 멘토회원이 등록한 상품을 볼 수 있으며 가격과 카테고리를 확인할 수 있습니다.
- 원하는 상품을 장바구니에 담을 수 있고, 장바구니에 담을 시 **데이터베이스**에 장바구니정보를 저장합니다.
- `Redux slice`를 이용해 백엔드 서버에서 장바구니 정보를 가져오고 아이템 선택,전체삭제를 할 수 있습니다.

![Image](https://github.com/user-attachments/assets/fef0e087-9542-4f1c-8555-6e689f9df0d5)

</details>
<br>

### 💰 결제, 카카오페이

<details>
<summary>결제</summary>

<br>
   
- 결제페이지는 **총 3단계**로 나뉘어 있으며, 각 단계별 **컴포넌트**로 구분하여 관리했습니다.
- `useState`로 단계별 상태를 관리해 각 단계로 이동할 수 있고, 주문자의 정보확인, 결제방법 선택, 결제완료로 구분됩니다.
- 결제정보는 데이터베이스에 저장되며, 결제 성공 시 장바구니 데이터와, 장바구니 Slice 아이템이 삭제됩니다.

![Image](https://github.com/user-attachments/assets/d996af72-08a5-4d9f-aea6-fbe6f6cac506)

</details>

<details>
<summary>카카오페이</summary>

<br>
   
- 2단계에서 **카카오페이**를 선택할 시 카카오페이 API에서 제공하는 결제페이지로 이동한 후, 모바일로 결제를 진행합니다.
- 결제방법이 카카오페이로 데이터베이스에 저장되며, 마찬가지로 장바구니 데이터를 삭제합니다.

![Image](https://github.com/user-attachments/assets/911dce44-bf79-42f2-a2dd-b4e2816fc498)

</details>

<details>
<summary>결제내역 페이지</summary>

<br>
   
- 결제내역 페이지에서는 결제한 목록들을 볼 수 있고, 결제 수단별, 시간별 정렬기능을 구현했습니다.
<br>
- 밑에 영상은 결제 기능의 풀영상입니다. 

![Image](https://github.com/user-attachments/assets/2021c2ce-a856-44ae-8396-56c730f2b97b)

</details>

<br>

### 📋 게시판

<details>
<summary>게시판</summary>

<br>
   
- 왼쪽 프로필 영역은 로그인시 저장된 **쿠키**를 가져와서 로그인 상태를 구분해 구현했습니다.
- 게시글 목록은 **페이징**으로 구현되어있습니다.
- 모든 회원이 작성한 게시글을 볼 수 있으며, 작성된 글의 카테고리별 정렬기능을 통해 볼 수 있습니다.
- 게시글 수정과 삭제는 내가 작성한 글만 가능하고, 게시글 작성 시 카테고리 선택을 **모달창** 형식으로 나타내 모달창의 상태를 `useState`로 관리합니다.

<br>
- 게시글 작성
  
![Image](https://github.com/user-attachments/assets/7a44d0d6-e201-4fa2-abbd-fb89a5b5da9b)

<br>
- 게시글 열람

![Image](https://github.com/user-attachments/assets/40e0e84e-4074-476e-96c5-8a1f71d05b3c)

</details>

<details>
<summary>댓글</summary>

<br>
   
- 게시판과 마찬가지로 댓글의 수정,삭제도 본인의 글만 가능합니다.
- 댓글 목록을 **페이징**으로 구현하여 사용자가 보기 편리하게 구현했습니다.

![Image](https://github.com/user-attachments/assets/c043590e-1bf2-4ad2-8cc1-796553f53b6d)

</details>
<br>

### 🤖 챗봇, KOMORAN

<details>
<summary>챗봇</summary>

<br>
   
- **코모란 형태소 분석기**를 활용하여 사용자가 검색한 키워드를 확인 후 데이터를 제공합니다.
- 일반 페이지의 레이아웃 위에 나타납니다.

![Image](https://github.com/user-attachments/assets/34204640-6cdf-458a-a439-2ddc387108cf)

</details>
<br>

### 🛠️ 관리자페이지

<details>
<summary>관리자 페이지</summary>

<br>

- 일반 페이지와 구분되도록 레이아웃을 변경해 헤더대신 왼쪽 메뉴바가 나타납니다
- 관리자 페이지는 회원,상품,결제 등 항목별로 페이지로 나뉘고 왼쪽에 메뉴를 클릭 시 각 페이지가 렌더링됩니다.
- 각 페이지는 목록이 페이징으로 구현되었고, 기본적인 CRUD가 전부 가능합니다.

![Image](https://github.com/user-attachments/assets/d8d19f7f-cce5-489d-aafc-d642150a486e)

</details>
<br>

### 💡 추가 활용한 Open API

<details>
<summary>카카오맵 API</summary>

<br>
   
- 고객센터 페이지를 만들어 회사위치와 전화번호를 확인할 수 있고 지도와 마커를 구현했습니다.

![Image](https://github.com/user-attachments/assets/c5d1ec7a-f7b5-45d5-be6f-7a2b73f1db4a)

</details>

<details>
<summary>고용24 API</summary>

<br>
   
- 고용24 API를 이용해 공채속보 데이터를 가져오고, xml형식의 데이터를 `xmlMapper`를 통해 `json`으로 변환 후 `React` 프론트 페이지에서 공채속보를 열람할 수 있습니다.

![Image](https://github.com/user-attachments/assets/651f77a1-fdef-4274-83ac-9eeadd24a0c6)

</details>
<br>

### 배포와 CICD

<details>
<summary>Docker, CICD</summary>

<br>
   
- 프론트, 백엔드 개발환경이 달라 `DockerFile`을 따로 작성 후 `image`를 만들고 배포합니다.
- 배포된 `image`는 `EC2`에서 `pull`해서 실행합니다.
- image를 빌드하고 배포하는 과정을 github actions를 통해 자동화합니다.

<img src="https://github.com/user-attachments/assets/2e84381b-7850-4c89-be8c-9dd7f32b8d04" width="400px">
<br>

- github actions를 통해 배포되는 영상입니다.

![Image](https://github.com/user-attachments/assets/a174ad93-07d1-4061-9936-5cd953429a0c)
  
</details>

<details>
<summary>S3</summary>

<br>
   
- 프로젝트 진행 중 필요한 이미지나 프로필 수정, 게시글 이미지 첨부를 할 시 이미지의 관리가 용이하며 보안이 좋은 S3를 사용해 파일 수정, 삭제를 합니다.
- 프론트에서 파일 입력 필드를 통해 백엔드 서버로 이미지를 전송하게 되면 백엔드에서 만든 S3Service와 S3Config 클래스를 통해 S3에 파일을 저장합니다.

![Image](https://github.com/user-attachments/assets/97cb4f40-b592-4d92-9ba5-0383e74098ad)

</details>
