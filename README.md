## 프로젝트 소개 DongTracker

<img src= "https://user-images.githubusercontent.com/50426259/187815562-0961ccb5-db34-40b7-8c7e-51313d8ab93b.png" width="200" height="100"/>
<br/>

DongTracker는 매장 점주를 주 소비자 층으로 매장의 매출을 서울시(강남구, 서초구)에 소재한 동을 중심으로 배달 건수, 매출 데이터 비교를 위한 프로젝트 입니다.
  <br/>
개발은 초기 세팅부터 전부 직접 구현했으며, AWS 배포로 주소를 통하여 확인하실 수 있습니다. 
<br/>
(단, 기업협업으로 진행한 프로젝트이므로 인스턴스 만료 날짜는 정확하지 않습니다.)
  <br/>
👉 [배포 주소](http://43.200.4.19:443/regions)

  <br/>

### 데모 영상

👉 [영상 보러가기](https://youtu.be/VTUndrwlGDY)

<br/>

### 프로젝트 목표

- 프로젝트 기획부터 배포까지 모두 직접 구현하며 실제 서비스 개발 과정 경험하기
  <br/>
- 공공 API 인구 데이터와 서비스에서 제공하는 매출 데이터를 결합하여 새로운 인사이트 도출
  <br/>
- 배달 주문 데이터를 동 단위로 정리하여 데이터 시각화 처리
  <br/>
- 지도 API를 이해하고 활용하여 사용자에게 접근성 높은 UX/UI 고려하기
  <br/>
- Daily Meeting, Code Review, Sprint 단위 기획 등 현업에서 진행하는 Agile 업무 방식 경험하기 

<br/>

### 개발 인원 및 기간

- 개발기간 : 2022/07/18 ~ 2022/08/11
  <br/>
- 개발 인원

  - 프론트엔드(2명) : 김은경, 이현범
  - 백엔드(1명) : 김우식
    <br/>


<br/>

## 협업 Tool

#### 1. Git / Github

- 기능 단위로 브랜치를 구분하고 Front-end, Back-end 나누어 레파지토리를 생성함
- Git Rebase를 통한 효율적인 commit 관리

#### 2. Trello

<img src = "https://user-images.githubusercontent.com/50426259/187819953-738ce774-ef39-49b9-949e-76f65e67f336.png" width="500" height="300"/>

4주차의 Sprint 목표와 업무 진행을 파악하기 위한 Tool로 Trello를 사용

Todo : Front-end, Back-end 각각의 업무를 나누어 전체적으로 해야할 일 기록한 티켓

nth Sprint :  일주일을 기준으로 진행해야 할 업무 티켓

Doing : 현재 개발 중인 업무 티켓

Done : 브랜치 merge 완료되고 정상적으로 작동하는 기능

Blocker : 개발의 속도가 더디거나, 해결해야하는 문제 기록

QnA : Tech Lead에게 질의응답 소통 티켓

#### 3. Notion

<img src = "https://user-images.githubusercontent.com/50426259/187820728-a900fdb3-1d83-438c-80c9-8876c0182bbf.png" width="500" height="300"/>


- 아침 standup meeting 상의한 내용을 모두 회의록에 기록

- 공유해야 하는 얘기는 구두가 아니라 notion을 통해 정확히 전달

#### 4. Slack

- 간단한 요청사항이나 일정조율을 위한 소통을위해 사용


<br/>


## 적용 기술

- Front-End : HTML, Sass , React , React Router , react-naver-maps ,  Recharts, Public API , AWS EC2

<br />

## :: 구현 사항 설명

### 1. Naver Map 사용하기
공식 문서 [Naver Maps JavaScript API v3](https://navermaps.github.io/maps.js.ncp/)에서 확인할 수 있듯 리액트에서 JSX 형태롤 작성하기 위해서는 따로 라이브러리 설치가 요구되었다.
공식 문서를 통해 속성 및 기능에 대해 참고하고 `npm install react-naver-maps` 진행하였다.

<br/>

#### ⛳ 자바스크립트 참고하며 React 컴포넌트 만들기
👉 Naver Map Javascript v3에서 제공하는 자바스크립트로 Map 이용하는 방법

```js
var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 15
});
```

👉 Naver Map Javascript v3에서 제공하는 자바스크립트로 Map 코드를 라이브러리를 통해 React에서 사용하는 방법

```js
//npm install react-naver-maps 설치

import {
  RenderAfterNavermapsLoaded,
  NaverMap,
} from 'react-naver-maps';
import './Map.scss';

const Map = () => {
  return (
    <RenderAfterNavermapsLoaded
      ncpClientId="네이버 클라우드 플랫폼에서 제공한 client key"
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMapAPI />
    </RenderAfterNavermapsLoaded>
  );
};

const NaverMapAPI = () => {

  return (
   <>
    <NaverMap
      id="react-naver-maps-introduction"
      style={{ width: '100%', height: '90vh'}}
      defaultCenter={{ lat: 37.497175, lng: 127.027926 }}
      //초기 화면 지도의 중앙 좌표
      defaultZoom={13}
	  //축소, 확대 기준
    >
    </NaverMap>
   </>
```
---

<br/>

### 2. GeoJSON 이해하고 좌표 데이터 활용하기
> GeoJSON(지오제이슨)은 위치정보를 갖는 점을 기반으로 체계적으로 지형을 표현하기 위해 설계된 개방형 공개 표준 형식이다. 이것은 JSON인 자바스그립트 오브젝트 노테이션(Object Notation)을 사용하는 파일 포맷이다. _위키피디아_

지도를 활용하는 프로젝트를 진행하다보니 장소에 대한 좌표가 필요하다.
데이터를 받아올 때 또는 넘겨줄 때, 좌표 데이터에 대하여 이해해야 했다.


<br/>

#### ⛳ 1배열 1꼭지점

👉 정확한 위치 즉, Marker에 대한 데이터

```js
{"type" : "Point",
  "coordinates" : [127.00784616,37.49190083]}
```

하나의 배열 안에 2개의 요소 ▶️ 하나의 꼭지점

---

<br/> 

### 3. Naver Map에 Marker 나타내기

<br />

#### ⛳ Marker 표시하기

`react-naver-maps`에서 기본적으로 제공하는 <Marker/> 컴포넌트를 `import` 한다.

네이버 맵 공식문서에서 제공하는 다양한 속성을 파악한다.

```js
import React, { useEffect, useState } from 'react';
import './Map.scss';

import {
  RenderAfterNavermapsLoaded,
  NaverMap,
  Marker,
} from 'react-naver-maps';

function NaverMapAPI() {
  const navermaps = window.naver.maps;

  const [mydata, setMyData] = useState([]);

  useEffect(() => {
    fetch('/data/lineTwo.json')
      .then(res => res.json())
      .then(data => {
        setMyData(data.line);
      });
  }, []);

  if (mydata.length === 0) return;

  return (
    <NaverMap
      id="react-naver-maps-introduction"
      style={{ width: '100%', height: '90vh', borderTop: 'transparent' }}
      defaultCenter={{ lat: 37.497175, lng: 127.027926 }}
      defaultZoom={14}
    >
      {mydata.map(input => (
        <Marker
          key={input.station}
          position={new navermaps.LatLng(...input.code)}
          animation={2}
		  title={input.station}
          icon={{
            content: 
                `<button class="markerBox">
                <div class="totalOrder">${input.order}</div>
                ${input.station}</button>`,
          	}}
        />
      ))}
    </NaverMap>
  );
}

const Map = () => {
  return (
    <RenderAfterNavermapsLoaded
      ncpClientId="발급받은 client key"
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMapAPI />
    </RenderAfterNavermapsLoaded>
  );
};

export default Map;
```
<br/>

- position : Marker가 표시될 좌표

- icon : Marker의 아이콘 커스터마이징(스타일은 scss로 진행)

- title : Marker가 가지고 있는 기본적인 Marker 이름

- animation : Marker가 나타날 때 보여지는 애니메이션(1,2,3)

- new navermaps.LatLng(...input.code) 좌표를 그려주는 메서드

네이버 지도에서 기본적으로 제공하는 좌표를 화면에 나타내는 메서드는 위와 같다. -new navermaps.LatLng([x축 좌표, y축 좌표])-의 기본값에서 Mockdata의 데이터를 map 함수를 통해 구현했다.

<br/>

**Mockdata**
MockData는 공공 API에서 제공하는 서울역 지하철 2호선의 일부를 가져와서 작성했다.

```js
{
  "line": [
    { "order": 11, "station": "잠실새내", "code": [37.511687, 127.086162] },
    { "order": 23, "station": "종합운동장", "code": [37.510997, 127.073642] },
    { "order": 1456, "station": "삼성", "code": [37.508844, 127.06316] },
    { "order": 71, "station": "선릉", "code": [37.504503, 127.049008] },
    { "order": 1341, "station": "역삼", "code": [37.500622, 127.036456] },
    { "order": 65, "station": "강남", "code": [37.497175, 127.027926] },
    { "order": 333, "station": "교대", "code": [37.493415, 127.01408] },
    { "order": 575, "station": "방배", "code": [37.481426, 126.997596] },
    { "order": 3, "station": "사당", "code": [37.47653, 126.981685] },
    { "order": 578, "station": "신대방", "code": [37.487462, 126.913149] },
    {
      "order": 976,
      "station": "구로디지털단지",
      "code": [37.485266, 126.901401]
    },
    { "order": 1343, "station": "신도림", "code": [37.508725, 126.891295] },
    { "order": 2345, "station": "문래", "code": [37.517933, 126.89476] }
  ]
}
```

```css
/*SCSS*/

@import '/src/styles/variables.scss';

.markerBox {
  padding-left: 25px;
  position: relative;
  width: 85px;
  height: 30px;
  font-size: 5px;
  background-color: yellow;
  border-radius: 35px;

  .totalOrder {
    text-align: center;
    line-height: 30px;
    width: 25px;
    height: 100%;
    top: 0;
    left: 0;
    background-color: blue;
    color: white;
    border-radius: 50%;
    position: absolute;
  }
}
```
결과물

<img src = "https://user-images.githubusercontent.com/50426259/187876303-682dded3-3912-4ac3-a967-16295673602a.png" width="500" height="300"/>

---

<br/>


### 3. Naver Map 폴리곤, 폴리라인 React로 나타내기

<br/>

#### ⛳ 네이버 맵 공식문서 코드

```js
var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.3674001, 127.1181196),
    zoom: 14
});

var polygon = new naver.maps.Polygon({
    map: map,
    paths: [
        [
            new naver.maps.LatLng(37.37544345085402, 127.11224555969238),
            new naver.maps.LatLng(37.37230584065902, 127.10791110992432),
            new naver.maps.LatLng(37.35975408751081, 127.10795402526855),
            new naver.maps.LatLng(37.359924641705476, 127.11576461791992),
            new naver.maps.LatLng(37.35931064479073, 127.12211608886719),
            new naver.maps.LatLng(37.36043630196386, 127.12293148040771),
            new naver.maps.LatLng(37.36354029942161, 127.12310314178465),
            new naver.maps.LatLng(37.365211629488016, 127.12456226348876),
            new naver.maps.LatLng(37.37544345085402, 127.11224555969238)
        ]
    ],
    fillColor: '#ff0000',
    fillOpacity: 0.3,
    strokeColor: '#ff0000',
    strokeOpacity: 0.6,
    strokeWeight: 3
});

var polyline = new naver.maps.Polyline({
    map: map,
    path: [
        new naver.maps.LatLng(37.359924641705476, 127.1148204803467),
        new naver.maps.LatLng(37.36343797188166, 127.11486339569092),
        new naver.maps.LatLng(37.368520071054576, 127.11473464965819),
        new naver.maps.LatLng(37.3685882848096, 127.1088123321533),
        new naver.maps.LatLng(37.37295383612657, 127.10876941680907),
        new naver.maps.LatLng(37.38001321351567, 127.11851119995116),
        new naver.maps.LatLng(37.378546827477855, 127.11984157562254),
        new naver.maps.LatLng(37.376637072444105, 127.12052822113036),
        new naver.maps.LatLng(37.37530703574853, 127.12190151214598),
        new naver.maps.LatLng(37.371657839593894, 127.11645126342773),
        new naver.maps.LatLng(37.36855417793982, 127.1207857131958)
    ]
});
```

해당 js를 jsx로 바꾸기 위해 작업했다.

- Polyline : 일련의 지도 좌표를 연결하여 선을 그리는 객체
- Polygon : 일련의 지도 좌표 목록을 잇는 닫힌 다각형

polyline은 테두리를 의미하고 따로 style도 지정가능하다
polygon은 polyline 안을 채워주는 영역이고 style로 색상지정 가능하다.

지도에 폴리곤을 표시할 수 있게 되었다.
테스트로 랜덤한 좌표를 작성해서 표현했다.

![](https://velog.velcdn.com/images/joahkim/post/c9626ecf-9057-436b-93cf-0b44764b3c3d/image.png)

<br/>

#### ⛳ React로 polyline, polygon 나타내기

JS로 작성된 공식문서를 참고하여 리액트에서 사용한 코드

```js
import React, { useEffect, useState } from 'react';
import './Map.scss';

import {
  RenderAfterNavermapsLoaded,
  NaverMap,
  Marker,
  Polyline,
  Polygon,
} from 'react-naver-maps';

function NaverMapAPI() {
  const navermaps = window.naver.maps;


  return (
    <NaverMap
      id="react-naver-maps-introduction"
      style={{ width: '100%', height: '90vh', borderTop: 'transparent' }}
      defaultCenter={{ lat: 37.497175, lng: 127.027926 }}
      defaultZoom={14}
    >
      <Marker
        key={1}
        position={new navermaps.LatLng(37.497175, 127.027926)}
        animation={2}
      />
      <Polyline
        clickable={true}
        strokeColor="blue"
        strokeStyle="solid"
        strokeWeight={1}
        path={[
          new navermaps.LatLng(37.359924641705476, 127.1148204803467),
          new navermaps.LatLng(37.36343797188166, 127.11486339569092),
          new navermaps.LatLng(37.368520071054576, 127.11473464965819),
          new navermaps.LatLng(37.3685882848096, 127.1088123321533),
          new navermaps.LatLng(37.37295383612657, 127.10876941680907),
          new navermaps.LatLng(37.38001321351567, 127.11851119995116),
          new navermaps.LatLng(37.378546827477855, 127.11984157562254),
          new navermaps.LatLng(37.376637072444105, 127.12052822113036),
          new navermaps.LatLng(37.37530703574853, 127.12190151214598),
          new navermaps.LatLng(37.371657839593894, 127.11645126342773),
          new navermaps.LatLng(37.36855417793982, 127.1207857131958),
        ]}
      />
      <Polygon
        fillColor="salmon"
        fillOpacity={0.35}
        clickable={true}
        paths={[
          new navermaps.LatLng(37.359924641705476, 127.1148204803467),
          new navermaps.LatLng(37.36343797188166, 127.11486339569092),
          new navermaps.LatLng(37.368520071054576, 127.11473464965819),
          new navermaps.LatLng(37.3685882848096, 127.1088123321533),
          new navermaps.LatLng(37.37295383612657, 127.10876941680907),
          new navermaps.LatLng(37.38001321351567, 127.11851119995116),
          new navermaps.LatLng(37.378546827477855, 127.11984157562254),
          new navermaps.LatLng(37.376637072444105, 127.12052822113036),
          new navermaps.LatLng(37.37530703574853, 127.12190151214598),
          new navermaps.LatLng(37.371657839593894, 127.11645126342773),
          new navermaps.LatLng(37.36855417793982, 127.1207857131958),
        ]}
      />
    </NaverMap>
  );
 }
};

export default Map;
```

- 폴리라인 (Polyline) : 영역의 테두리

- 폴리곤 (Polygon) : 영역 내부 채워지는 면적

---

<br/>

### 5. Naver Map 좌표 데이터 폴리곤, 폴리라인 나타내기

<br/>




