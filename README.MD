## 이 프로젝트는 프로그래머스 사이트에서진행한 고양이검색사이트 사전과제입니다.

---

## HTML, CSS 시멘틱 마크업 적용

코드가 전체적으로 div로만 이루어져 있습니다. 시멘틱한 방법으로 마크업을 변경하세요.

## 반응형 CSS 지원

- [x] 유저가 사용하는 디바이스의 길이에 따라 row당 column개수를 적절히 변경해야 한다.

- [x] 992px 이하 3개 768px 이하 2개 576px 이하 1개

## 다크모드 지원

- [x] 기존 CSS의 모든주석을 제거 하고 모든 글자는 #FFFFFF, 배경은 #000000으로 한정한다.

- [x] OS의 다크모드 활성화 여부를 기반으로 동작.

- [x] 유저가 테마를 토글링할 수 있도록 좌측 상단에 해당 기능을 토글하는 체크박스를 생성.

## 이미지 상세보기 모달

- [x] max-size가 768px 이하인경우 모달의 가로길이를 디바이스 가로길이만큼 늘림

- [x] 이미지 클릭 시 생성된 모달에서 다음 종료(닫힘) 이벤트를 추가한다.

- [x] 키보드의 esc를 누를 때

- [x] 모달 영역밖을 클릭할 때

- [x] 우측 상단의 닫기를 클릭할 때

- [x] /cats/:id를 통해 고양이의 성격, 태생정보를 렌더링한다. 해당정보는 불러온다.

- [x] Modal의 열기/닫기 이벤트에 fade in/out 적용

## 검색 페이지

- [x] 페이지 진입 시 검색창(input)에 focus처리

- [x] 키워드가 입력된 상태에서 input을 클릭 시 기존 키워드 삭제

- [x] 데이터 요청 시 Loading UI 추가 필요

- [x] 검색결과가 없는 경우 유저가 파악 할 수 있도록 UI 처리 필요

- [x] 최근 5개의 검색 키워드를 SearchInput아래 표시되도록 생성. 해당 키워드를 선택할 시 검색요청 발생

- [x] 페이지 새로고침 시 마지막 검색결과 화면 유지

- [x] SearchInput옆 자유롭게 버튼을 추가하여 /api/cats/random50 을 호출하여 화면에 렌더링.

- [x] Lazy load를 이해하고 이미지가 화면에 보일 시점에 loading되도록 처리

- [x] 검색결과 각 아이템에 고양이 이름을 노출한다.

## 스크롤 페이징 구현

- [x] 유저가 스크롤바 끝가지 이동 시 다음페이지 로딩하도록 만들어야 한다

## 랜덤고양이 배너 섹션

- [] 현재 검색 결과 목록 위에 배너형태의 랜덤 고양이 섹션을 추가한다.

- [] 앱이 구동될 때 /api/cats/random50 api요청 이후 받은 결과를 별도 섹션에 노출

- [] 겸색결과가 많더라도 화면에 5개만 노출하여 각 이미지는 좌,우 슬라이등 버튼을 가진다

- [] 좌, 우 버튼을 클릭하면, 현재 노출된 이미지는 사라지고, 이전 또는 다음 이미지를 보여준다. 트랜지션은 선택이다

## 추가 요구사항

- [] SearchResult에 각 아이템을 클릭하는 이벤트를 EventDelegation을 이용하여 수정

- [] 각 컴포넌트의 내부함수와 Util함수를 잘게 나누기

## API

- [x] fetch는 async await를 활용하여 진행하고 에러가 나는 경우 적절히 처리한다

- [] status code에 따라 에러메세지를 분리하여 작성한다

```
const request = async (url: string) => {
    try {
    const result = await fetch(url);
    return result.json();
    } catch (e) {
    console.warn(e);
    }
}

const api = {
    fetchGif: keyword => {
    return request(`${API_ENDPOINT}/api/gif/search?q=${keyword}`);
    },
    fetchGifAll: () => {
    return request(`${API_ENDPOINT}/api/gif/all`);
    }
};
```

### 랜덤한 고양이 50개 요청

GET : /cats/random50
HTTP/1.1 200 OK

```
{
"data": [{
    id: string
    url: string
    name: string
    }]
}
```

### 사용자의 검색 요청

Get : /cats/search | query ⇒ q=””

HTTP/1.1 200 OK

```
{
"data": [{
    id: string
    url: string
    name: string
    }]
}
```

### 이미지 상세보기 시 고양이 데이터 요청

Get : /cats/:id

HTTP/1.1 200 OK

```
{
"data": {
    name: string
    id: string
    url: string
    width: number
    height: number
    temperament: string
    origin: string
    }
}
```
