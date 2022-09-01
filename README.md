## 데모 영상

👉 [영상 보러가기](https://youtu.be/VTUndrwlGDY)


## 프로젝트 소개

<img src= "https://user-images.githubusercontent.com/50426259/187815562-0961ccb5-db34-40b7-8c7e-51313d8ab93b.png" width="200" height="100"/>

- 매장 점주를 주 소비자 층으로 타겟한 서울시(강남구, 서초구) 동단위별 배달 건수, 매출 데이터 비교 서비스 
  <br/>
- 개발은 초기 세팅부터 전부 직접 구현했으며, AWS 배포로 주소를 통하여 확인하실 수 있습니다.(기한제한 있음)
- <br/>
👉 [배포 주소](http://43.200.4.19:443/regions)

### 프로젝트 목표

- Frontend/Backend 통신에 필요한 데이터 구조 및 컴포넌트 구조에 대해서 상의해보기
  <br/>
- Git의 기본적인 Flow에 따른 방식 + squash, git rebase를 적용하여 commit 내역을 깔끔하게 관리해보기
  <br/>
- 내가 할 수 있는 것과 없는 것, 현재 우선순위가 높은 것과 그렇지 않은 것을 잘 구별하고 팀에게 전달하여 기획과 일정을 조율해보기
  <br/>
- 전체의 과정을 생각하며 프로젝트를 기획하고 프론트와 백이 맞춰보는 일정까지 고려하여 발표 전까지 팀원들과 최대한의 결과물을 만들어내보기
  <br/>
- Trello에 정리한 티켓 내용을 토대로 매일 아침 정해진 시간에 팀원들과 standup meeting을 진행해보기

### 개발 인원 및 기간

- 개발기간 : 2022/07/04 ~ 2022/07/15
  <br/>
- 개발 인원

  - 프론트엔드(4명) : 김은경, 김은정 , 이현범 , 전지현
  - 백엔드(1명) : 김상웅
    <br/>

- 담당파트
  - 김은경 : 로그인 / 소셜 로그인 , 검색 기능 (지역, 날짜, 인원) , 프로필 모달창
  - 김은정 : 상세페이지 하단 ( 후기 모달창, 후기 작성 - 후기modal과 후기component 연동 , 카카오맵 )
  - 이현범 : 상세페이지 상단 ( 결제과 달력과 연동 , 예약 및 결제 기능 , 달력과 예약창 연동)
  - 전지현 : 홈화면(캐러셀, 무한스크롤) , 지도리스트 페이지(카카오맵, 페이지네이션)
    <br/>
- [백엔드 github 링크](https://github.com/wecode-bootcamp-korea/34-2nd-TamnaBnB-backend)

## 협업 Tool

#### 1. Git / Github

- 브랜치 이름 : 페이지 단위로 나눔
- 라벨 활용 : 이슈 , 진행상황 등을 구분하기 위해서 라벨 사용
- 코드 리뷰 : review를 통한 코드 리뷰와 리팩토링

#### 2. Trello

![trello](/public/images/trello.gif)

1, 2주차의 Sprint 목표와 업무 진행을 파악하기 위한 Tool로 Trello를 사용했습니다.

backlog 프로젝트 미팅을 하며 전체 업무를 기능별로 세분화하여 전체 티켓을 발행했습니다.

Sprint Goal 일주일을 기준으로 진행해야 할 업무 티켓을 가리킵니다.

In progress 현재 개발 중인 업무 티켓을 가리킵니다.

In review Github에 PR을 올리고 리뷰와 merge 대기를 하는 작업을 가리킵니다.

Done merge가 완료되고 정상적으로 작동하는 기능을 가리킵니다.

Blocker 개발의 속도가 더디거나, 해결해야하는 문제들을 가리킵니다.

#### 3. Notion

![standup](/public//images/notion-modify.png)

- 아침 standup meeting 상의한 내용을 모두 회의록에 기록해놓았다.

- 공유해야 하는 얘기는 구두가 아니라 notion을 통해 정확히 전달되도록 하였다.

#### 4. Slack

- 간단한 요청사항이나 일정조율을 위한 소통을위해 사용하였다.

## 적용 기술

- Front-End : HTML, Styled-Component , React , React Router

<br />

# 개인이 담당했던 기능(Navigation Bar, Social Login)
