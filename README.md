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


### 4. Naver Map 폴리곤, 폴리라인 React로 나타내기

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

<img src="https://velog.velcdn.com/images/joahkim/post/c9626ecf-9057-436b-93cf-0b44764b3c3d/image.png" width="500" height="300"/>

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

'1배열 1꼭지점' 이라며 [[[[x축 좌표, y축 좌표]]]]로 GeoJson 파일 형식을 이용하여 지도에 Marker를 나타낼 수 있었다.

Marker는 중심이 되는 좌표가 있다면 하나의 [[[[x축 좌표, y축 좌]표]]] 코드만 있어도 나타낼 수 있다.

폴리곤과 폴리라인 (Polygon, Polyline)은 하나의 꼭지점들을 이어서 선을 그리고(폴리라인) 그 선의 내부 영역(폴리곤)을 스타일링 할 수 있다.

**오늘의 작업**
서울시 강남구, 서초구의 동을 폴리라인과 폴리곤으로 나타내기!

강남구에는 압구정, 신사, 삼성, 대치, 역삼동 등이 소재하고 있으며
서초구에는 방배, 서초, 반포동 등이 소재하고 있다.

<br/>

#### ⛳ 동의 경계선을 나타내는 폴리라인 좌표는 어떻게 구할까?

프론트 엔드 입장으로 보면 백에서 보내주는 데이터를 잘 표현하기만 하면 된다. 하지만 도시의 공적인 데이터는 보통 공공API로부터 제공받고 있지 않을까 궁금하여 검색하기!

구글에 '대한민국 법정동 및 행정동 좌표'라고 검색하면 JSON 파일을 제공하는 블로그 및 공공 데이터 관련 웹 페이지에서 찾을 수 있다.

데이터는 백엔드에서 가공하여 대략 이런 형태이다.

```js
{
  "result": [
     {
	    "region_code": 11680101,
	    "ub_myeon_dong": "역삼동",
        "total_count": 33,
        "total_pay": 579400,
        "x_coordinate": 37.500335,
        "y_coordinate": 127.037596,
        "coordinate": {
            "type": "MultiPolygon",
            "coordinates": [
              [
                [
                  [
                    127.04898636795212,
                    37.504515906845704
                  ],
                  [
                    127.04920396473152,
                    37.50405518396562
                  ],
                  [
                    127.04984242979424,
                    37.50270342726028
                  ],
                  [
                    127.05048087185992,
                    37.50135166680836
                  ],
                  [
                    127.05054863257368,
                    37.50120832588475
                  ],
		//나머지 좌표 데이터 생략
```

<br/>

#### ⛳ 좌표 데이터의 양은 방대했다.
막상 찾아보니 막대한 양의 배열 데이터를 보고 조금 막막했다.

예를 들어, 방배동에 해당하는 폴리라인을 그리고 싶다면
선과 선을 이어주는 꼭지점이 무수히 많이 필요하다. 해당 꼭지점이 그려지기 위해서는 하나의 배열이 필요하고 배열 안에는 두개의 요소가 필요하다.
(x축과 y축)

<img src="https://velog.velcdn.com/images/joahkim/post/aab51381-146e-4d07-9710-c0ad89c90a75/image.png" width="500" height="300"/>

즉, 방배동 하나의 폴리라인을 그리기 위해서 약 300개가 넘는 배열을 받아야 한다.

<br/>

#### ⛳ Naver Map에서 폴리라인과 폴리곤을 나타내는 객체

위의 링크에서 첨부된 지난 게시글에서 React로 naver map 폴리곤, 폴리라인 나타내는 형태에 대해 언급했다.

```js
 	<Polyline
        strokeColor="blue" //테두리 색상
        strokeStyle="solid" //테두리 스타일
        strokeWeight={1} //테두리 두께
        path={[
          new navermaps.LatLng(37.359924641705476, 127.1148204803467),
          new navermaps.LatLng(37.36343797188166, 127.11486339569092),
          new navermaps.LatLng(37.368520071054576, 127.11473464965819),
        ]}
      />
          
    <Polygon
        fillColor="salmon" //바탕색
        fillOpacity={0.35} //바탕색 투명도
        paths={[
          new navermaps.LatLng(37.359924641705476, 127.1148204803467),
          new navermaps.LatLng(37.36343797188166, 127.11486339569092),
          new navermaps.LatLng(37.368520071054576, 127.11473464965819),
        ]}
      />
```

폴리라인과 폴리곤은 각각 path와 paths 속성을 가지고 있다.

`path = {[new navermaps.LatLng(x축 좌표, y축 좌표)]}`
위의 식은 naver map에서 기본적으로 제공하는 좌표를 지도에 나타내는 객체이다.

즉, `new navermaps.LatLng(x좌표 map 돌리기, y좌표 ==> map 돌리기)`

<br/>

#### ⛳ GeoJson의 배열을 벗기고 forEach()

```js
//목데이터 받아오기 위한 fetch 함수 작성

import React, { useEffect, useState } from 'react';
import {
  RenderAfterNavermapsLoaded,
  NaverMap,
  Marker,
  Polyline,
  Polygon,
} from 'react-naver-maps';
import './Map.scss';


function NaverMapAPI() {
  const navermaps = window.naver.maps;

  const [dongData, setDongData] = useState([]);


  useEffect(() => {
    fetch(
      'data/DongData.json'
    )
      .then(res => res.json())
      .then(data => {
        setDongData(data.result);
      });
  }, []);

  if (dongData.length === 0) return;
모든 좌표 데이터는 dongData에 담겨있다.

//3겹의 배열에 쌓인 좌표 데이터를 가져오기 위해 배열 벗겨내기

 const getCoordinates = dongData[0].coordinate.coordinates;
//우선 좌표를 가지고 있는 coordinates 객체에 접근하기
//getCoordinates = [[[[x축 좌표, y축 좌표]]]]

 const getPath = getCoordinates[0][0];
//getPath = [[x축 좌표, y축 좌표]]

 let newpaths = [];

  getPath.forEach(coordinate => {
    newpaths.push(new navermaps.LatLng(coordinate[1], coordinate[0]));
  });

  if (newpaths.length === 0) return;
```

`forEach`를 통해서 배열 안에 각각의 요소 즉 `getPath`에서 각각의 요소는 x축 좌표와 y축 좌표가 할당된 배열이 된다.

각각의 요소를 `forEach`를 통해서 `new navermaps.LatLng(y축, x축)` 으로 객체를 생성한다.

>📢 왜 인지 모르겠지만 해당 객체는 y축이 먼저 작성되고 그 다음 x축이 작성되어야 한다.
x축, y축 순서대로 작성했더니 안돼서 왜 안되지 하고 있다가 위치를 수정하니 바로 구현되었다....
따라서 `new navermaps.LatLng(coordinate[1], coordinate[0])`📢

이때 `push` 메서드로 정의한 `newpaths` 빈 배열에 추가한다.

결과적으로 `newpaths` 에는 아래의 값들이 담기고 네이버에서 제공한 로직에 따라 해당 값들이 지도에 표시된다.

<br/>

#### ⛳ 좌표 데이터 나타내기 위해서 map 함수 사용

```js
  return (
    <NaverMap
      id="react-naver-maps-introduction"
      style={{ width: '100%', height: '90vh', borderTop: 'transparent' }}
      defaultCenter={{ lat: 37.497175, lng: 127.027926 }}
      defaultZoom={13}
    >
      {dongData.map(input => (
        <Marker
          key={input.regions_code}
          position={
            new navermaps.LatLng(input.x_coordinate, input.y_coordinate)
          }
          animation={2}
          icon={{
            content: `<div class="markerBox">
            <h1 class="markerCountText">${input.count}</h1>
            <p class="markerText">${input.ub_myeon_dong}</p>
            </div>`,
          }}
        />
      ))}
      <Polyline
        clickable={true}
        strokeColor="rgb(17, 135, 207)"
        strokeStyle="solid"
        strokeWeight={2}
        path={newpaths}
      />
      <Polygon
        fillColor="rgb(17, 135, 207)"
        fillOpacity={0.35}
        clickable={true}
        paths={newpaths}
      />
    </NaverMap>
  );
```

하드 코딩이었던 Marker 또한 dongData에서 데이터를 불러와 `position` 속성으로 위치를 잡아준다.

`Polyline`의 `path` 속성에 `newpaths`를 부여한다.

폴리라인과 폴리곤 각각 같은 좌표값을 공유하기 때문에 `Polygon`의 `paths` 속성에도 `newpaths`를 부여한다.

<br/>

결과물

<img src="https://velog.velcdn.com/images/joahkim/post/4af06b1a-c156-4576-ae5f-1d2a7ad3eaae/image.png" width="500" height="300"/>

사실 모든 동의 폴리라인과 폴리곤이 나타나는게 정상이다.

하지만 바로 hover 될 때 폴리라인과 폴리곤이 나타나도록 함수를 수정했기 때문에 위의 이미지는 수정본이다.

<br/>

#### ⛳ 생각보다 헷갈렸던 배열 벗겨내기

GeoJson 파일 형식은 좌표 배열을 3겹의 배열로 감싸기 때문에 좌표를 얻어내기 위해서는 겹겹의 배열을 벗겨야했다. `getCoordinates[0][0][0]` 하며 모든 배열을 벗겨버리기도 했으며 덜 벗겨서 `forEach`에서 에러도 만났다.

`new navermaps.LatLng(coordinate[1], coordinate[0])` 에서 많은 시간을 뺏겼다. 여깃 안풀릴 때는 구글링이다. 수많은 개발자들이 나와 같은 문제를 겪었기 때문에 검색하면 반대로 작성하라고 명시되어 있다.

---

<br/>

### 6. Hover시 지도에 폴리라인과 폴리곤 나타내기

모든 동의 좌표가 동시에 그려지는 것은 의미가 없으니 동에 해당하는 Marker에 hover를 했을 때 그 동의 폴리곤, 폴리라인만 그려지게 할 것이다.

<br/>

#### ⛳ Hooks 폴더에 Custom Hooks 생성하기

우선 가독성을 위해서 Map.js에 작성된 state 및 함수, 변수 등을 Custom hooks로 따로 정리한다.

>dkssud

