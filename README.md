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

### 프로젝트 영상

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

매주 Sprint 목표와 업무 진행을 파악하기 위한 Tool로 Trello를 사용

- Todo : Front-end, Back-end 각각의 업무를 나누어 전체적으로 해야할 일 기록한 티켓

- nth Sprint :  일주일을 기준으로 진행해야 할 업무 티켓

- Doing : 현재 개발 중인 업무 티켓

- Done : 브랜치 merge 완료되고 정상적으로 작동하는 기능

- Blocker : 개발의 속도가 더디거나, 해결해야하는 문제 기록

- QnA : Tech Lead에게 질의응답 소통 티켓

#### 3. Notion

<img src = "https://user-images.githubusercontent.com/50426259/187820728-a900fdb3-1d83-438c-80c9-8876c0182bbf.png" width="500" height="300"/>


- 업무 시작 전 standup meeting 상의한 내용을 모두 회의록에 기록

- 공유해야 하는 얘기는 구두가 아니라 notion을 통해 정확히 전달

#### 4. Slack

- 간단한 요청사항이나 일정조율을 위한 소통을위해 사용


<br/>


## 적용 기술

- Front-End : HTML, Sass , React , React Router , react-naver-maps ,  Recharts, Public API , AWS EC2

<br />

## :: 구현 사항 설명

### 1. Naver Map 사용하기
공식 문서 [Naver Maps JavaScript API v3](https://navermaps.github.io/maps.js.ncp/)에서 확인할 수 있듯 리액트에서 작성하기 위해서는 따로 라이브러리 설치가 요구되었다.
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

👉 Naver Map Javascript v3에서 Map 코드 라이브러리를 통해 React에서 사용하는 방법

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

- `position` : Marker가 표시될 좌표

- `icon` : Marker의 아이콘 커스터마이징(스타일은 scss로 진행)

- `title` : Marker가 가지고 있는 기본적인 Marker 이름

- `animation` : Marker가 나타날 때 보여지는 애니메이션(1,2,3)

- `new navermaps.LatLng(...input.code)` 좌표를 그려주는 메서드

네이버 지도에서 기본적으로 제공하는 좌표를 화면에 나타내는 메서드는 위와 같다. `new navermaps.LatLng([x축 좌표, y축 좌표])`의 기본값에서 Mockdata의 데이터를 map 함수를 통해 구현했다.

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
> #### 결과물

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

'1배열 1꼭지점' 을 코드로 나타내면 `[[[[x축 좌표, y축 좌표]]]]`로 GeoJson 파일 형식을 이용하여 지도에 Marker를 나타낼 수 있었다.

Marker는 중심이 되는 좌표가 있다면 하나의 `[[[[x축 좌표, y축 좌]표]]]` 코드만 있어도 나타낼 수 있다.

폴리곤과 폴리라인 (Polygon, Polyline)은 하나의 꼭지점들을 이어서 선을 그리고(폴리라인) 그 선의 내부 영역(폴리곤)을 스타일링 할 수 있다.

**오늘의 작업**
서울시 강남구, 서초구의 동을 폴리라인과 폴리곤으로 나타내기

강남구에는 압구정, 신사, 삼성, 대치, 역삼동 등이 소재하고 있으며
서초구에는 방배, 서초, 반포동 등이 소재하고 있다.

<br/>

#### ⛳ 동의 경계선을 나타내는 폴리라인 좌표는 어떻게 구할까?

프론트 엔드 입장으로 보면 백에서 보내주는 데이터를 UI적으로 표현한다. 하지만 도시의 공적인 데이터는 보통 공공API로부터 제공받고 있지 않을까 궁금하여 검색했다.

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
x축, y축 순서대로 작성했더니 안돼서 왜 안되지 하고 있다가 위치를 수정하니 바로 구현되었다.
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

> #### 결과물

<img src="https://velog.velcdn.com/images/joahkim/post/4af06b1a-c156-4576-ae5f-1d2a7ad3eaae/image.png" width="500" height="300"/>

사실 모든 동의 폴리라인과 폴리곤이 나타나는게 정상이다.

하지만 바로 `hover` 될 때 폴리라인과 폴리곤이 나타나도록 함수를 수정했기 때문에 위의 이미지는 수정본이다.

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

우선 가독성을 위해서 Map.js에 작성된 `state` 및 함수, 변수 등을 Custom hooks로 따로 정리한다.

<img src="https://velog.velcdn.com/images/joahkim/post/aacd5b48-579a-4318-a17f-1fb3a493a91d/image.png" width="500" height="300"/>

>**usePolygon.js**

```js
import React, { useState } from 'react';

const usePolygon = () => {
  
  const navermaps = window.naver.maps;

  const [poly, setPoly] = useState([]);
  
  let onHoverPaths = [];

  const handleHoverCoordinate = data => {
    setPoly(data.coordinate.coordinates[0][0]);
  };

  poly.forEach(coordinate => {
    onHoverPaths.push(new navermaps.LatLng(coordinate[1], coordinate[0]));
  });

  return {
    onHoverPaths,
    handleHoverCoordinate,
  };
};
export default usePolygon;
```

- 폴리곤과 폴리라인을 그리기 위해서 배열을 벗겨낸 후 좌표 데이터를 `new navermaps.LatLng()` 객체를 통해서 지도에 그려낼 수 있다.

- `handleHoverCoordinate` 함수를 통해 hover 되는 marker의 data를 인수로 받아 해당 data의 좌표값만 추출해 `poly`에 할당한다.

- 이전에 작성한 코드는 `handleHoverCoordinate`를 정의하는 대신 3개의 변수를 작성했다.

- 좌표값만 추출하기 위해서는 많은 변수를 사용하는 것보다 함수 하나만 작성하는 것이 `hover` 이벤트를 처리하는데 적합하다.

- `poly`에는 `hover` 되는 Marker에 해당하는 좌표값들이(폴리라인, 폴리곤) 배열 안에 담겨져있다.

- 이전 코드와 마찬가지로 `forEach` 메소드를 통해 `new navermap`을 통해 생성된 객체를 `onHoverPaths` 배열에 `push` 한다.

- `return` 에 `{ }`를 작성하여 그 안에 export 할 함수나 변수 등을 작성하면 추후 `import` 하여 사용할 수 있다.

여기까지 custom hook을 만들어서 코드를 좀 더 깔끔하고 재활용성을 높이는 작업을 했다.

---

#### ⛳ hover 시 폴리곤, 폴리라인 나타내기

우선 **usePolygon**을 사용하기 위해서 사용할 곳에서 import한다.

>**Map.js**

```js
import usePolygon from '../../hooks/usePolygon';

function NaverMapAPI({ dongData }) {
  
  const navermaps = window.naver.maps;

  const { onHoverPaths, handleHoverCoordinate } = usePolygon();
  //구조분해할당하여 usePolygon hook 가져오기
  
  const [isMouseOn, setIsMouseOn] = useState(false);
  //마우스 호버 되었을 때 true, 아웃 되었을 때 false
  
```


```js
 return (
    <NaverMap
      id="react-naver-maps-introduction"
      style={{ width: '100vw', height: '90vh', borderTop: 'transparent' }}
      defaultCenter={{ lat: 37.497175, lng: 127.027926 }}
      defaultZoom={13}
    >
      {dongData.map(input => (
        <>
          <Marker
            key={input.region_code}
            position={
              new navermaps.LatLng(input.x_coordinate, input.y_coordinate)
            }
            icon={{
              content: `<div class="markerBox" >
            <h1 class="markerCountText">${input.total_count}</h1>
            <p class="markerText">${input.ub_myeon_dong}</p>
            </div>`,
            }}
            title={input.ub_myeon_dong}
            onMouseover={() => {
              handleHoverCoordinate(input);
              setIsMouseOn(true);
            }}
            onMouseout={() => {
              mouseOut();
              setIsMouseOn(false);
            }}
          />
        </>
      ))}
```

- `dongData`는 부모 컴포넌트인 Main.js에서 `props`로 넘겨 받았다.

`dongData`에는 Marker의 정보, Polygon, Polyline 정보가 모두 담겨있다.

<br/>

**📢 Naver Map에서 hover 이벤트는 `onMouseover`이다. `onMouseOver`라고 작성하면 작동하지 않는다📢**

> #### 과정 정리하기

1. 역삼동 Marker에 `mouseover` 시 역삼동 좌표의 폴리곤과 폴리라인이 그려져야 한다. 역삼동의 좌표 데이터를 넘겨준다.

	- `onMouseover` 의 콜백함수로 usePloygon hook에서 `import` 한 `handleHoverCoordinate` 함수를 작성한다.
    
	- 전달되는 인자는 `dongData`의 input 즉, 각각의 데이터이다.
    
```js
  const handleHoverCoordinate = data => {
    setPoly(data.coordinate.coordinates[0][0]);
  };

//매개변수 data가 인자인 dongData의 input을 받는다.
//따라서 mouseover되는 객체의 데이터가 함수의 인자가 된다.
```

<br/>

2. Marker에 `mouseover` 될 때 폴리곤과 폴리라인이 생성되고 `mouseout`되면 생성되지 않는다.

	- 모달창과 원리는 같다. 조건부 연산자를 사용하여 true 라면 폴리라인과 폴리곤이 보여지게 되고 false라면 보이지 않게 된다.
    	- `const [isMouseOn, setIsMouseOn] = useState(false);`
    
    	- 초기값은 `mouseover` 되지 않은 상태에는 보이지 않기 때문에 false 값
    
    	- `mouseover`되면 `isMouseOn`은 `true` 값을 가져 폴리곤과 폴리라인이 그려진다.
    
```js
 {isMouseOn && (
        <>
          <Polyline
            clickable={true}
            strokeColor="rgb(17, 135, 207)"
            strokeStyle="solid"
            strokeWeight={2}
            path={onHoverPaths}
          />
          <Polygon
            fillColor="rgb(17, 135, 207)"
            fillOpacity={0.35}
            clickable={true}
            paths={onHoverPaths}
          />
        </>
      )}

```

> #### 결과

<img src="https://velog.velcdn.com/images/joahkim/post/b1a14413-42db-4a25-a32e-449a14d0a1e5/image.gif" width="500" height="300"/>

---

<br/>

### 7. useSearchParams로 필터링하기

페이지 상단에는 매장 전체보기, A매장, B매장, C매장 버튼이 있다.

header 바로 아래 왼쪽에는 전체, 배달의 민족, 요기요 버튼이 있다.

각각의 버튼을 클릭했을 때, A매장에 해당하는 정보가 지도에 그려지게 필터링을 한다.

`useSearchParams`를 활용하여 Query String의 형태로 서버에 GET 요청을 한다.

<img src="https://velog.velcdn.com/images/joahkim/post/90b2304d-2422-4f16-9079-bd9fd839854c/image.png" widht="500" height="300"/>

서버가 요청때 맞춰달라는 Query String 형식

<br/>

#### ⛳ filter를 위한 hook 따로 생성하기

> **useFilter.js**

```js
import { useSearchParams, useLocation } from 'react-router-dom';

const useFilter = () => {
  const location = useLocation();
  //url 정보를 가져오기 위함
  
  const [searchParams, setSearchParams] = useSearchParams();
  //주소창에 삽입할 쿼리 스트링을 searchParams에 저장

  const sortStore = storeName => {
    if (location.search.includes('application')) {
      const application = searchParams.get('application');
      setSearchParams({ store: `${storeName}`, application });
    } else {
      setSearchParams({ store: `${storeName}` });
      //key는 쿼리 스트링에서 ? 다음, value 는 = 이후
      //즉, ?store=${storeName}으로 url이 설정된다.
    }
  };

  /*if문을 작성하여 사용자가 배달 플랫폼을 클릭한 상태 or 클릭하지 않은 상태에서의 
  url 설정을 다르게 해야하기 때문*/

  const showAllStoreData = () => {
    location.search.includes('store', 'application') &&
      searchParams.delete('store', 'application');
    setSearchParams(searchParams);
  };

  //전제 매장 보기 버튼을 클릭하면 모든 쿼리스트링이 지워지게 설정

  return { sortStore, showAllStoreData };
};

export default useFilter;

```

---

#### ⛳ 매장 필터링

> **Main.js**

```js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Map from '../Map/Map';
import './Main.scss';

const Main = () => {
  const location = useLocation();

  const [dongData, setDongData] = useState([]);

  const url = location.search;

  useEffect(() => {
    fetch(`http://서버/regions${url}`)
      .then(res => res.json())
      .then(data => {
        setDongData(data.result);
      });
  }, [url]);
  
  if (dongData.length === 0) return;
  return (
    <>
      <Header dongData={dongData} url={url} />
      <Map />
    </>
  );
};

export default Main;
```

- 최상위 컴포넌트인 **Main.js** 에서 데이터를 넘겨주기 위해 `fetch` 함수를 작성한다.

- 서버에서 Query String으로 데이터를 GET 방식으로 요청하라고 했기에 `url` 즉, `location.search`을 그대로 보낸다.

- 받은 데이터는 그대로 `dongData`를 `state`에 저장하여 **Header.js, Map.js**에 넘겨준다.

<br/>

> #### 📢 Blocker!!

초기화면에서 매장, 플랫폼, 전체버튼을 2번 눌러야 지도에 알맞게 마커가 표시된다. 첫번째 눌렀을 때 주소창에는 해당하는 Query String이 데이터를 잘 요청하고 있었다. dongData에도 버튼에 따른 정확한 데이터가 저장되었다. 문제는 UI가 변경되지 않는다. 의존성 배열에 `dongData`를 명시해도 비동기적으로 동작하기 때문에 문제를 해결하지 못했다.

> #### 📢 해결!!

과정을 다시 생각하자

버튼 클릭 ▶️ `url` 변경 ▶️ 데이터 요청 ▶️ 화면에 구현

의존성 배열에 변수 `url`을 작성한다.

간단하게 `url`이 변경될 때마다 `fetch` 함수를 요청하는 것이기 때문이다. 그럼 의존성 배열에 `url`을 삽입하면 `url`이 변경될 때마다 즉, 버튼이 클릭될 때마다 데이터를 요청하고 어차피 `dongData`에 변경된 데이터가 담기기 때문에 `state`는 자동으로 업데이트 된다. 그럼 UI도 변경될 것이다.

---

> **Header.js**

```js
import React from 'react';
import './Header.scss';
import useFilter from '../../hooks/useFilter';

const Header = ({ dongData }) => {
  const { applications, stores } = dongData[0];
  //매장, 플랫폼 데이터를 구조분해할당하여 사용하기 편하게!
  
  const { sortStore, sortApplication, showAllAppData, showAllStoreData } =
    useFilter();
  //useFilter hook 사용하기


  return (
    <>
      <header className="header">
        <section className="headerContext">
          <div className="logo">
            <div className="goToMain">
              <img className="logoImage" src="/images/logo.png" alt="logo" />
            </div>
          </div>
          <div className="storesButtons">
            <button className="storeBtn" onClick={showAllStoreData}>
    		//useFilter에서 미리 정의한 함수 onClick으로 사용
              매장 전체 보기
            </button>
			//매장 버튼 map 함수 활용하여 각각에 맞는 데이터 할당
            {stores.map(data => (
              <button
                className="storeBtn"
                onClick={() => sortStore(data.name)}
                //클릭되는 버튼 데이터에서 name은 매장의 이름
                //매장이름이 searchParams에 의해 그대로 query string에 삽입
                key={data.id}
              >
                {data.name}
              </button>
            ))}
          </div>
        </section>
      </header>
      <header className="platformHeader">
        <div className="btnContainer">
          <button className="btnBox" onClick={showAllAppData}>
            <span className="btnText">전체</span>
          </button>
          {applications.map(input => (
            <button
              className="btnBox"
              key={input.id}
              onClick={() => sortApplication(input.name)}
			  //매장 버튼과 마찬가지로 플랫폼 버튼에도 플랫폼 이름
            >
              <span className="btnText">{input.name}</span>
            </button>
          ))}
        </div>
      </header>
    </>
  );
};

export default Header;

```

> #### 순서정리!

1. 매장 버튼을 클릭하면 `onClick` 함수로 `url`을 변경한다.
2. 변경된 `url`의 `Query String`을 가져온다.
3. `url`이라는 변수에 `Query String`을 담아서 서버에 데이터 요청한다.
4. `useEffect`에 작성하여 `url`이 변경될 때마다 `fetch` 함수를 호출한다.
5. 즉, 버튼을 누르면 `url`이 변경되고 변경되면 그에 따른 데이터를 가져와 저장한다.

**Main.js**에서 `<Map />`에 `dongData`를 넘겨주었기 때문에 Marker에서 `dongData`에 담긴 값만 지도에 나타낸다.

<br/>

> #### 결과물

초기화면

<img src="https://velog.velcdn.com/images/joahkim/post/db697975-3641-463a-9895-e90a81d46e47/image.png" width="500" height="300"/>

A매장클릭

<img src="https://velog.velcdn.com/images/joahkim/post/bf679c5e-ae70-4428-8e67-73136fedaf56/image.png" width="500" height="300"/>

B매장클릭

<img src="https://velog.velcdn.com/images/joahkim/post/cc61284c-7ad0-4bc2-bab4-2b3ccfeea893/image.png" width="500" height="300"/>

C매장클릭

<img src="https://velog.velcdn.com/images/joahkim/post/151c607d-0e3c-49f7-a319-fcbfca0c4e96/image.png" width="500" height="300"/>

배달의 민족 클릭

<img src="https://velog.velcdn.com/images/joahkim/post/31fb15ba-b401-4ccf-99c2-9b2b4062dc21/image.png" width="500" height="300"/>

요기요 클릭

<img src="https://velog.velcdn.com/images/joahkim/post/9fd2c852-6942-4ad2-9d1c-90cd2ea8056a/image.png" width="500" height="300"/>

매장과 플랫폼 버튼 클릭 시

<img src="https://velog.velcdn.com/images/joahkim/post/e916ba08-afb7-4878-a445-4865cc420b55/image.png" width="500" height="300"/>

---

<br/>

### 8. custom hooks 생성하고 활용하기

개인적으로 custom hook을 사용하면서 큰 장점은 2가지였다.

1. 코드의 가독성을 높여준다.

2. 컴포넌트 재사용성 보다 다른 차원의 재사용

`useEffect, useState`와 같은 hooks를 직접 만들 수 있다고?
처음 custom hook을 접했을 때는 선뜻 그렇구나! 하며 사용할 수 없었다.
조금 어려웠기 때문이다. 지금은 `state`가 3개 이상 생기면 바로 custom hook으로 빼내 재사용한다.

---

<br/>

#### ⛳ custom hook 만들기

먼저 `src` 폴더 내부에 `hooks` 폴더를 생성한다. 

`hooks` 폴더에 `custom hooks`를 작성하면 된다.

**useFilter.js** 파일을 보면 필터링을 위해 작성된 코드이다.

<img src="https://velog.velcdn.com/images/joahkim/post/913db1b1-9150-4b10-9a5a-05b1b94f872a/image.png" width="500" height="300"/>

해당 코드들은 사실 **Header.js**에 작성되어도 된다. 하지만 하나의 컴포넌트 안에 복잡하고 길어지는 코드가 작성되어 있다면 가독성이 떨어지게 된다.

추후 **useFilter hook**을 다른 컴포넌트에도 사용할 수 있다.

---

#### ⛳ 작성법

컴포넌트 생성하는 방법과 동일하다!

다른 점은 마지막 `return`문에서 작성한 함수 및 변수등을 `return`하면 도니다.

```js
//useFilter.js

import { useSearchParams, useLocation } from 'react-router-dom';

const useFilter = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortStore = storeName => { };

  const sortApplication = appName => { };

  const showAllStoreData = () => {  };

  const showAllAppData = () => {  };
  
  
  return { sortStore, sortApplication, showAllStoreData, showAllAppData };
};

export default useFilter;
```

--- 

#### ⛳ 사용법

`useFilter`를 사용할 곳에 `import`한 후 구조분해할당으로 선언하면 끝!

`return` 문 안에서 자유롭게 위의 `filter` 함수들을 사용할 수 있다.

```js
//Header.js

import useFilter from '../../hooks/useFilter';

const Header = () => {

  const { sortStore, sortApplication, showAllAppData, showAllStoreData } =
    useFilter();

 return ()
  
} 
```
---

<br/>

### 10. map 돌린 객체에 onClick 따로 적용하기

네이버 지도에 동 marker를 map함수로 나타냈다.

각각의 marker를 클릭하면 해당 marker에 해당하는 circle이 나타난다.

하지만 marker 자체를 map을 돌렸기 때문에 1번 marker를 클릭하면 1,2,3 marker 각각에 대한 circle을 모두 그린다.

나는 1번 marker에 해당하는 circle만 띄우고 싶다.

<img src="https://velog.velcdn.com/images/joahkim/post/d44dfe9f-a547-4f09-b408-fec241eec879/image.png" width="500" height="300"/>

문제의 모든 서클 나타내기

<br/>

#### ⛳ Marker의 id 값을 활용하자

```js
  const [openCircle, setOpenCircle] = useState(false);
  //서클이 나타났다 꺼졌다를 모달을 위한 state

  const [selectedMarkerId, setSelectedMarkerId] = useState(0);
  //각 Marker의 id 값을 비교하기 위한 state 
  //초기값이 0인 이유는 id 값이 0인 Marker가 없기 때문


 const handleClickMarker = marker => {
    setSelectedMarkerId(marker.id);
    setOpenCircle(!openCircle);
  };
 //Marker를 클릭하면 해당 Marker의 id값이 selectedMarkedId state에 할당된다.
```

```js
return (
  
  //storeMarker는 Marker와 Circle에 대한 모든 데이터를 가지고 있다.
  
 {storeMarker.map(data => (
        <div key={data.id}>
          <Marker
            position={
              new navermaps.LatLng(data.x_coordinate, data.y_coordinate)
            }
            icon={{
              content: `<div class="markerBoxStore">
                          <h1 class="markerCountTextStore">아이콘</h1>
                          <p class="markerTextStore">${data.name}</p>
                          </div>`,
            }}
            title={data.name}
            onClick={() => handleClickMarker(data)}
          />
          {selectedMarkerId === data.id && openCircle && (
            <Circle
              center={[data.y_coordinate, data.x_coordinate]}
              radius={1000}
              fillOpacity={0.5}
              fillColor="#8CD790"
              strokeWeight={2}
              strokeColor="#5CAB7D"
              strokeStyle="dashed"
              clickable={true}
            />
          )}
        </div>
      ))}
 )
}
```
- `handleClickMarker` 함수에 의해 Marker가 클릭되면 data라는 인수가 marker로 전달된다.

- 1번 매장의 marker를 클릭하면 해당 매장의 marker `id` 값이 `selectedMarkerId`에 할당된다.

- Circle 컴포넌트는 `selectedMarkerId`와 marker의 `id`가 일치하면 지도에 그려진다.


> #### 정리하면

1번 매장 marker의 id 값이 1
클릭하면 해당 id 값이 `selectedMarkerId`에 저장 `selectedMarkerId = 1`

현재 `<Marker/>`와 `<Circle/>`에 뿌려지는 데이터는 1번 매장

따라서 `selectedMarkerId === data.id`는 `true`

<br/>

#### ⛳ 해결

marker에는 고유의 id 값이 있다. 

내가 클릭한 marker의 `id` 값과 `selectMarker`의 `id`가 같다면 circle을 보여줘라

여기서 circle에는 `id` 값이 없다. 그럼 어떻게 알고 1번 marker에 해당하는 circle이 나타날까

일단 map 함수가 돌아갈때 먼저 첫번째 배열의 요소가 들어가게된다.

데이터는 1번 marker에 해당하는 데이터가 들어가지!
`data.x_coordinate, data.y_coordinate` 여기에도 1번 marker에 해당하는 좌표가 들어가게 되고  circle의 center에도 똑같은 좌표가 나올 것이다.

그니깐 배열의 첫번째 요소를 순환할 때의 데이터만 들어가지게 되는 것!


`onClick={() => handleClickMarker(data)}`

`handleClickMarker`의 인수로 data가 들어가고 

```js
const handleClickMarker = marker => {
    setSelectedMarkerId(marker.id);
    setOpenCircle(!openCircle);
  };
```
첫 번째 데이터의 `id` 값 즉, 1을 `selectedMarkerId`의 값을 업데이트 시킨다.

`selectedMarkerId` 값과 클릭한 `marke`r의 `id` 값은 무조건 똑같을 수 밖에

만약 같다면 해당 데이터가 들어가져있는 `circle`을 나타내는 것이다.

`setOpenCircle`은 그냥 모달창 열었다 닫았다 하는 것

<img src="https://velog.velcdn.com/images/joahkim/post/05aa4b82-4a21-4179-806d-fb5680724e43/image.gif" width="500" height="300"/>

<br/>

#### ⛳ 리팩토링(컴포넌트화)

```js
//Map.js

<StoreMarker storeMarker={storeMarker} navermaps={navermaps} />
```

```js
//StoreMarker.js

import React, { useState } from 'react';
import { Marker, Circle } from 'react-naver-maps';
import getDistance from 'geolib/es/getDistance';
import DeliveryMarker from './DeliveryMarker';

const StoreMarker = ({ storeMarker, navermaps }) => {
  const [selectedMarkerId, setSelectedMarkerId] = useState(0);
  const [deliveryData, setDeliveryData] = useState([]);

  const handleClickMarker = marker => {
    setSelectedMarkerId(marker.id);
  };

  return (
    <div>
      {storeMarker.map(data => (
        <div key={data.id}>
          <Marker
            position={
              new navermaps.LatLng(data.x_coordinate, data.y_coordinate)
            }
            icon={{
              content: `<div class="markerBoxStore">
                          <div class="markerCountTextStore">아이콘</div>
                          <p class="markerTextStore">${data.name}</p>
                          </div>`,
            }}
            title={data.name}
            onClick={() => handleClickMarker(data)}
          />
          {selectedMarkerId === data.id && (
            <Circle
              center={[data.y_coordinate, data.x_coordinate]}
              radius={1000}
              fillOpacity={0.5}
              fillColor="#8CD790"
              strokeWeight={2}
              strokeColor="#5CAB7D"
              strokeStyle="dashed"
              clickable={true}
              onClick={() => setSelectedMarkerId(0)}
            />
          )}
        </div>
      ))}
    </div>
  );
};
```

---

<br/>

### 11. 하나씩 밀려나오는 Data 처리하기 (Blocker)

A매장 `Marker`를 클릭하면 `Circle`이 나타나면서 `Circle` 반경 안에있는 장소의 pin만 나타내고 싶다. 

하지만 A매장 `Marker`를 클릭하면 pin이 안나오다가 B매장 `Marker`를 클릭하면 A매장에 해당하는 pin이 나타나고 C매장 `Marker`를 클릭하면 B매장에 해당하는 pin이 나타난다.

즉, data가 하나씩 밀려서 나타난다.

<br/>

#### ⛳ 해결책을 찾아나가는 과정

```js
  const [deliveryData, setDeliveryData] = useState([]);
  const [inRange, setInRange] = useState([]);

  const handleClickMarker = marker => {
    setSelectedMarkerId(marker.id);
    setOpenCircle(!openCircle);
    fetch(`http://서버/deliveries?store=${marker.name}`)
      .then(res => res.json())
      .then(data => {
        setDeliveryData(data.result)
 	 });
      const filtered = deliveryData.filter(
       
       spot =>
        getDistance(
        {
         latitude: marker.x_coordinate,
         longitude: marker.y_coordinate,
        },
        {
          latitude: spot.y_coordinate,
          longitude: spot.x_coordinate,
        }
 	 ) <= 1000
	);
	setDeliveryData(filtered);
};


{deliveryData &&
  openCircle &&
  deliveryData.map(data => (
  <div key={data.id}>
    <Marker
       position={
          new navermaps.LatLng(data.y_coordinate,data.x_coordinate)}
	   icon={{
      	content: `<div class="pin">
					<i class="fa-solid fa-location-pin"></i>	
				</div>`}}
       title="배달지"
	/>
  </div>
))}
```
<br/>

> #### 문제

A매장을 클릭하면 아무것도 안나온다.
2번 클릭하면 나온다

그 후 C 매장을 누르면 A매장에 해당하는 배달지 마커가 찍힌다.
한 번 더 클릭하면 C 매장에 해당하는 배달지 마커가 찍힌다.

이렇게 불러와지는 데이터가 한박자 늦게 화면에 구성된다.

오케 그럼 어떻게 해야할까? 구글에 검색하니 해결책이 나온다



> 1. `useEffect`를 사용해서 의존성 배열에 `state`를 넣어라

=> 이 방법은 url 주소 변경할 때 사용한 적이 있다.

1번이 부적격인 이유
`useEffect`는 함수안에 작성할 수 없다. 하지만 `onClick`함수에서 이 모든 일이 일어나기 위해 `handleClickMarker` 안에 작성하고 싶다.
`useEffect`를 함수 밖에 작성하면 인수를 전해줄 수 없다. 즉 클릭되는 버튼에 담긴 데이터를 넘겨줄 수 없다

>2. `useState`를 사용할 때 `state`를 업데이트 하기 위해서는 `callback` 함수로 이전값을 명시하자

=> `setData(count + 1) => (x)`

=> `setData(prevCount + 1) => (o)`

2번이 부적격인 이유
위의 예시로 단순히 count에 1을 더하는 간단한 식은 가능할지도 모른다.
하지만 만약 count를 업데이트 시키는 방법과 현재 내가 작성한 코드에서 위의 방법으로 어떻게 적용해야 하는지 모르겠다. 일단 데이터에서 넘겨받는 인수는 어디에 작성하며 + 1이 아닌 map 함수 안에 있는 즉, 같은 `state` 안의 다른 요소를 어떻게 가져올 수 있을까...

>3. spread 연산자를 사용한다. 

=> 받아오는 데이터가 배열이기 때문에 데이터를 직접 수정하기 보다는 깊은 복사를 통해서 변경한다.

=> `setData([...deliveryData, deliveryData])`

3가지 꾸역꾸역 작성했지만 실패...문제가 해결되지는 않았다.

<br/>

#### ⛳ 해결방법

애초에 데이터를 `state`에 저장하는 것이 아니라 변수 그대로 `filter`를 사용한다.



```js
const [deliveryData, setDeliveryData] = useState([]);

  const handleClickMarker = marker => {
    setSelectedMarkerId(marker.id);
    setOpenCircle(!openCircle);
    fetch(`http://43.200.4.19:80/deliveries?store=${marker.name}`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.result.filter(
          //굳이 원본 데이터부터 setState에 담지 않아도 된다.
          spot =>
            getDistance(
              {
                latitude: marker.x_coordinate,
                longitude: marker.y_coordinate,
              },
              {
                latitude: spot.y_coordinate,
                longitude: spot.x_coordinate,
              }
            ) <= 1000 //1km(m단위로 작성)
        );
        setDeliveryData(filtered);
      });
  };



{deliveryData &&
  openCircle &&
  deliveryData.map(data => (
  <div key={data.id}>
  	<Marker
	  position={new navermaps.LatLng(data.y_coordinate, Data.x_coordinate)}
      icon={{
              content: `<div class="pin">
                        	<i class="fa-solid fa-location-pin"></i>
                        </div>`}}
      title="배달지"
    />
   </div>
 ))}
```
<br/>

`useState`의 초기값은 빈 배열이다. 따라서 처음 화면에서 state에 담긴 값이 `[]` 이라는 것

지금 `fetch`를 작성해서 받아온 데이터도 어차피 배열이니 바로 `filter`를 돌리자

그랬더니 처음부터 데이터가 담기면서 데이터가 밀려서 나오지 않고 제대로 나온다. 

결과적으로 처음에 서버에서 데이터를 받아올 때 `state`에 저장하는 것이 아니라 `data`라는 변수에 저장하고 해당 변수를 바로 `filter`를 적용하여 원하는 데이터만 뽑아내 사용한다.

---

<br/>

### 12. 위경도를 사용하여 좌표간 거리 구하기

<br/>

👉 `Circle` 반경은 1km, 반경 내 장소를 pin으로 나타내기
검색을 하니 geolib 라이브러리 다운 받아서 작성하기

또는

구글에 좌표간의 거리 구하기 검색하면

공식이 적힌 함수가 나오는데 복사해서 작성하고 있는 컴포넌트 가장 하단에 붙여넣고 함수 바로 사용하면 된다.

<br/>

#### ⛳ 라이브러리 사용하기

```js
//geolib 라이브러리 사용

const [deliveryData, setDeliveryData] = useState([]);

const filtered = data.result.filter(
  spot =>
  getDistance(
    {
      latitude: marker.x_coordinate,
      longitude: marker.y_coordinate,
      //marker의 좌표
    },
    {
      latitude: spot.y_coordinate,
      longitude: spot.x_coordinate,
      //pin 위치의 좌표
    }
  ) <= 1000
);
setDeliveryData(filtered);
```

- `Marker`에서 가져오는 데이터는 매장 마커의 좌표

- `spot` 하나하나가 `filter` 되면서 `Marker`와의 거리를 계산한다.

- `<=1000`은 반경 1000m 이하라는 뜻

우리는 반경 1km로 설정할 것이기 때문 만약 범위 설정 버튼을 만들게 된다면 해당 숫자를 변수에 담아주면 된다.

결과적으로 **marker**로부터 1km 이내의 좌표만 `filtered`에 담기게 된다.

**filter** 메서드는 **map**과 **forEach**와는 다르게 조건에 부합하는 결과만 추출한다.

<br/>

#### ⛳ 아쉬운 점

단 한만 사용할 기능을 위해서 라이브러리를 설치하는 것은 조금 부담스럽다.
구글에서 공식을 긁어와 사용을 해봤지만 결과값이 생각보다 잘 나오지 않았다. 
m인지 km인지 정확하지 않으며 배열에 거리값이 담기지 않았다.

추후 이 부분을 라이브러리가 아닌 단순한 함수로 적용해보려고 한다.

또한 자세히 보면 pin이 circle을 살짝 삐져나가는데 이것 또한 CSS적으로 수정할 수 있는 부분인지 공부해보자

<img src="https://velog.velcdn.com/images/joahkim/post/bd252bdd-124e-4cf7-b8fc-1f58286bae45/image.png" width="500" height="300"/>

---

<br/>

### 13. Recharts

[Recharts 공식 문서](https://recharts.org/en-US/)

Google Chart와 Recharts 중 어떤 것을 사용할지 고민하다가 예전부터 한 번 사용해보고 싶었던 Recharts를 선택했다.

많은 기능을 지원했고 난이도가 높지 않아서 만족했다.

복잡한 데이터를 시각화 하는 작업이 아닌 단순한 수치를 나타내는 작업이라 코드를 복사하고 붙여넣는 일이 전부였다.

<br/>

#### ⛳ Pie Chart 사용법

```js
import React from 'react';
import { PieChart, Pie, Legend, Cell, Tooltip } from 'recharts';
import './TimeChart.scss';

const PieChartComponent = ({ storeData }) => {
  if (storeData.length === 0) return;
  const data = [
    { name: '아침', value: storeData.offer_time_data[0].pay },
    { name: '점심', value: storeData.offer_time_data[1].pay },
    { name: '저녁', value: storeData.offer_time_data[2].pay },
  ];

  const COLORS = ['#1AA7EC', '#1E2F97', '#4bAAAD'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {percent ? `${(percent * 100).toFixed(0)}%` : ''}
      </text>
    );
  };

  return (
    <div>
      <div className="timeTitle">시간별 차트</div>
      <div className="row d-flex justify-content-center text-center">
        <div className="col-md-8">
          <PieChart width={300} height={200}>
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="bottom"
              iconSize="13"
              wrapperStyle={{
                fontWeight: '700',
                border: '1px solid #FAFAFA',
                borderRadius: '10px',
                boxShadow:
                  'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
                padding: '5px',
              }}
            />
            <Pie
              data={data}
              cx="65%"
              cy="70%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  style={{
                    filter: `drop-shadow(5px 5px 5px #666`,
                  }}
                  stroke="1"
                />
              ))}
            </Pie>
            <Tooltip isAnimationActive={false} />
          </PieChart>
        </div>
      </div>
    </div>
  );
};
export default PieChartComponent;

```

👉 시간대별 데이터를 나타내기 위해 PieChart를 사용했다.


- `Legend` 는 범례를 나타낸다


- `Cell`은 Pie 모양의 Chart 자체에 스타일링을 주기 위해서 적용했다.


- `Tooltip`은 차트에 마우스를 올리면 상세 데이터를 보여준다.



- `return`문 위의 함수와 변수는 기본적으로 제공하지만 커스터마이징 하기 위해서 값을 조금씩 바꿔나가면 원하는대로 스타일링을 할 수 있다.

<br/>

#### ⛳ Bar Chart 사용법

```js
import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './DateChart.scss';
const DateChart = ({ storeData }) => {
  if (storeData.length === 0) return;

  const data = [
    {
      name: '월',
      매출액: storeData.weekday_data[0].pay,
      배달건수: storeData.weekday_data[0].count,
    },
    {
      name: '화',
      매출액: storeData.weekday_data[1].pay,
      배달건수: storeData.weekday_data[1].count,
    },
    {
      name: '수',
      매출액: storeData.weekday_data[2].pay,
      배달건수: storeData.weekday_data[2].count,
    },
    {
      name: '목',
      매출액: storeData.weekday_data[3].pay,
      배달건수: storeData.weekday_data[3].count,
    },
    {
      name: '금',
      매출액: storeData.weekday_data[4].pay,
      배달건수: storeData.weekday_data[4].count,
    },
    {
      name: '토',
      uv: 7000,
      매출액: storeData.weekday_data[5].pay,
      배달건수: storeData.weekday_data[5].count,
    },
    {
      name: '일',
      매출액: storeData.weekday_data[6].pay,
      배달건수: storeData.weekday_data[6].count,
    },
  ];
  return (
    <div>
      <div className="dateTitle">요일별 차트</div>
      <BarChart width={350} height={200} data={data} className="barChart">
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          iconSize="5"
          wrapperStyle={{
            fontWeight: '700',
          }}
        />
        <Bar dataKey="매출액" fill="#1187CF" radius={3} />
        <Bar dataKey="배달건수" fill="black" radius={3} />
        <XAxis dataKey="name" style={{ fontSize: '12px' }} tickLine={false} />
        <Tooltip
          content={data}
          contentStyle={{ border: 'none' }}
          isAnimationActive={false}
          cursor={false}
        />
      </BarChart>
    </div>
  );
};

export default DateChart;

```

- 요일별 데이터를 나타내기 위해서 Bar Chart를 사용했다.

> `BarChart component`의 `width`와 `height`와 `Bar component`의 `radius`를 활용하여 차트의 사이즈를 조절할 수 있다.
