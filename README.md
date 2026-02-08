# 💌 Rolling
<div align=center>
<img width="724" height="402" alt="image" src="https://github.com/user-attachments/assets/6711fe4e-0e49-4961-8cfd-088ab2be53d6" />
</div>

## 📝 프로젝트 소개
복잡한 가입 절차 없이 링크 하나로 **롤링 페이퍼**를 만들고,
여러 사람이 각자의 메시지와 이모지로 마음을 모아 전달할 수 있어요.<br />
생일, 감사 인사, 응원, 축하 등 어떤 순간이든 마음을 전해야 할 때
**Rolling**으로 가장 쉽게 시작해 보세요.
<br />

## 🔗 배포 주소
- **Service**: https://rolling-nine.vercel.app/

<br />

## 👥 팀 소개
  <table>
    <tr>
      <td width="200px">
        <a href="https://github.com/geniexx64" target="_blank">  
        <img src="https://avatars.githubusercontent.com/u/9052086?v=4" alt="김현진" />  
        </a>  
      </td>
      <td width="200px">
        <a href="https://github.com/ziy1027" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/24265870?v=4" alt="김송현" />
        </a>
      </td>
      <td width="200px">
        <a href="https://github.com/Lseojeong" target="_blank">  
        <img src="https://avatars.githubusercontent.com/u/112802701?v=4" alt="이서정" />  
        </a>  
      </td>
      <td width="200px">
        <a href="https://github.com/bitna0a" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/129211732?v=4" alt="남빛나" />
        </a>
      </td>
    </tr>
    <tr>
          <td align="center">
        <a href="https://github.com/geniexx64" target="_blank">
          김현진
        </a>
      </td>
      <td align="center">
        <a  href="https://github.com/ziy1027" target="_blank">
          김송현
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/Lseojeong" target="_blank">
          이서정
        </a>
      </td>
      <td align="center">
        <a  href="https://github.com/bitna0a" target="_blank">
          남빛나
        </a>
      </td>
    </tr>
  <table>
<br />
    
## 👥 팀원별 역할 및 기여

### 김현진
**공통 컴포넌트**
- 이모티콘 선택(emoji-picker-react), 이모티콘 리액션 뱃지, 이모티콘 더보기 기능 구현
- 모달 컴포넌트 (메시지용, 확인용)
- 공통 버튼 컴포넌트 및 링크 버튼 컴포넌트

**페이지**
- `/post/{id}/message` 페이지 API 연동
- 404 페이지 UI 구현

### 김송현
**공통 컴포넌트**
- Header
- Footer

**페이지**
- 리스트 페이지(`/list`)
  - 전체 레이아웃 및 반응형 구현
  - 인기 롤링 페이퍼 영역
  - 최근 롤링 페이퍼 영역
- 리스트 상세 페이지
  - 전체 레이아웃 및 반응형 구현

**기능**
- 인기 롤링 페이퍼 슬라이드 구현 (Swiper 라이브러리 사용)
- 최근 롤링 페이퍼 더보기 기능 구현
- 롤링페이퍼 작성/메시지 작성 페이지 Name input 글자 수 제한
- 전체 페이지 Scroll To Top 기능 구현

**기타**
- 디자인 리뉴얼


### 남빛나
**공통 컴포넌트**
- 관계 배지 컴포넌트
- 인풋 컴포넌트
- 드롭다운 컴포넌트

**페이지**
- 랜딩 페이지 전체 레이아웃 및 반응형 구현
- `/post/{id}` 페이지 편집 모드 구현
- `/post/{id}` 페이지 API 연동

**기능**
- 무한 스크롤 구현
- 글 작성 모듈
- 폰트 모듈
- `formatDate` 유틸 함수 구현


### 이서정
**공통 컴포넌트**
- 개별 프로필 컴포넌트
- 그룹 프로필 컴포넌트

**페이지**
- 메시지 페이지
  - 전체 레이아웃 및 반응형 구현
  - 에디터 Quill → Tiptap 마이그레이션
- 포스트 페이지
  - 전체 레이아웃 및 반응형 구현
  - API 연동

**기능**
- ErrorBoundary 및 Toast 알림 시스템 구현
- 카카오톡 공유 및 URL 복사 기능
- 공통 API 및 팀 API Axios 인스턴스 설정

**기타**
- 초기 프로젝트 세팅
  - ESLint, Prettier 설정
  - Husky 설정
  - VSCode 개발 환경 설정
- SEO 및 메타태그 설정 (OG 태그, 파비콘)
- React Router 기반 라우팅 설정
- 스타일 시스템 설정
  - 컬러, 폰트 굵기 정의
  - 폰트 적용
- Vercel 배포

## 🖥️ 화면
> 모든 화면은 **PC / Tablet / Mobile** 반응형을 고려해 구현했습니다.

### 1️⃣ 랜딩 페이지
| PC | Tablet | Mobile |
|---|---|---|
| ![pc_6](https://github.com/user-attachments/assets/9c3163b5-8bc1-4874-aa04-37284eba5dbb)| ![tablet_2](https://github.com/user-attachments/assets/85eb66f2-0996-4a1d-a7d9-e4c9e6614b1e)| ![제목 없음 (2)](https://github.com/user-attachments/assets/88d7059c-fe8f-4d2b-b131-21eb87d2b7a6)|

- 서비스 컨셉 및 주요 기능 소개
- 반응형 레이아웃 적용

### 2️⃣ 리스트 페이지 (/list)
| PC | Tablet | Mobile |
|---|---|---|
| ![pc_4](https://github.com/user-attachments/assets/e430fff9-0c90-4c54-8a71-cdc40004d9b6)| ![tablet_1](https://github.com/user-attachments/assets/df69274c-d3c2-4c44-ad73-987d65646801)| ![제목 없음 (3)](https://github.com/user-attachments/assets/0f2588f9-bc1e-4155-8eab-1a8e8a2e32d6)|

- 인기 롤링페이퍼 슬라이드(swiper)
- 최근 롤링페이퍼 더보기 기능

### 3️⃣ 리스트 상세 페이지
| PC | Tablet | Mobile |
|---|---|---|
| ![pc_5](https://github.com/user-attachments/assets/9902f14f-122f-41ed-9865-caced1219038)| ![제목 없음 (1)](https://github.com/user-attachments/assets/d14522a7-834e-435e-817d-e47b235ad1a7)| ![제목 없음 (5)](https://github.com/user-attachments/assets/782e97b4-6406-4b0c-aca5-087dc9189e31)|

- 롤링페이퍼 정보 및 메시지 목록 표시
- 메세지 및 롤링페이퍼 삭제
- 이모지 리액션 생성
- 카카오톡 공유 & url 복사

### 4️⃣ 롤링페이퍼 작성 / 편집 페이지 (/post/{id})
| PC | Tablet | Mobile |
|---|---|---|
| ![pc_2 (1)](https://github.com/user-attachments/assets/e662ab77-ece5-4e3a-b051-5e2288665ca0)|![제목 없음 (7)](https://github.com/user-attachments/assets/32f5b06f-f82f-4927-9b79-8016320e397c)|![제목 없음 (4)](https://github.com/user-attachments/assets/e4ab4034-ea49-404c-a2ad-9fcb559e71ed)|

- 폰트 및 스타일 설정

### 5️⃣ 메시지 작성 페이지 (/post/{id}/message)
| PC | Tablet | Mobile |
|---|---|---|
| ![pc_3](https://github.com/user-attachments/assets/5c38875b-0b96-44aa-8a28-79a1b4e719ca)| ![제목 없음](https://github.com/user-attachments/assets/3e664897-0e72-4175-84e9-9735caea2dde)| ![제목 없음 (6)](https://github.com/user-attachments/assets/06f84fa0-0eb1-4862-8814-fc3753d2ef23)|

- Tiptap 기반 메시지 작성

---

<br />

## 🛠️ 기술 스택

### Frontend
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black"/> <img src="https://img.shields.io/badge/React%20Router-CA4245?style=flat&logo=reactrouter&logoColor=white"/> <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white"/> <img src="https://img.shields.io/badge/CSS%20Modules-000000?style=flat&logo=cssmodules&logoColor=white"/>

### Editor & UI
<img src="https://img.shields.io/badge/Tiptap-000000?style=flat&logo=tiptap&logoColor=white"/> <img src="https://img.shields.io/badge/Emoji%20Picker-FFDD00?style=flat&logo=emoji&logoColor=black"/> <img src="https://img.shields.io/badge/Swiper-6332F6?style=flat&logo=swiper&logoColor=white"/>

### Tooling & Infra
<img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white"/> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=black"/> <img src="https://img.shields.io/badge/Husky-000000?style=flat&logo=git&logoColor=white"/> <img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white"/>

### Collaboration
<img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=notion&logoColor=white"/> <img src="https://img.shields.io/badge/Discord-5865F2?style=flat&logo=discord&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white"/>


<br />

## 🗂️ 폴더 구조
```bash
📦 src
 ┣ 📁 apis        # API 요청 함수
 ┣ 📁 assets      # 아이콘, 이미지 등 정적 리소스
 ┣ 📁 components  # 공통 컴포넌트
 ┣ 📁 pages       # 페이지 단위 컴포넌트
 ┣ 📁 routers     # 라우터 설정
 ┣ 📁 styles      # 공통 스타일 (폰트, 컬러, reset.css)
 ┣ 📁 utils       # 유틸 함수
 ┣ 📁 hooks       # 커스텀 훅
 ┣ 📁 constants   # 상수 관리
 ┣ 📄 App.jsx     # 루트 컴포넌트
 ┗ 📄 main.jsx    # 엔트리 포인트
