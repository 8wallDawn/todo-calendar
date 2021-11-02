## ✅기획

---

유튜브 강의 및 투두 리스트 클론 코딩을 바탕으로 스스로 연습하며 개발하는 첫 프로젝트입니다.

많이 미숙하지만 차후 리팩토링, 추가 기능 구현 등 꾸준히 개발해나가고 지인들에게 공유하여 피드백을 통한 수정 또한 해나가며 웹앱으로 까지 개발하고 싶은 마음이 있습니다.

실제 본인이 사용하고 싶은 todo의 기능을 구현하고자 하였습니다.

차후 TypeScript, SASS 등을 공부하고 나면 추가로 재개발을 하고 싶은 마음이 있습니다.

---

### 개발 언어

html, css, javascript

### 기본 기능

- 달력과 날짜별 일정 출력
- 일정 추가
- 일정 삭제
- 일정 완료

## ✅부족한 점

---

⚠ 설계가 진짜 중요하다. 어떤 함수를 사용해서 어떤 데이터를 이용하여 어떤 값을 도출할 것인지. 함수 끼리의 연결관계가 무엇인지. 로컬스토리지를 사용한다면 어떻게 값을 분류하여 저장하고 사용할 것인지 중요하다. 얼마나 잘 짜여져있는지에 따라 내가 쓴 코드를 다시 볼때에도 생각이 빠르게 다시 들고 추가, 수정하기에 편리하다. 일이라고 생각했을 때 지금 짠 코드를 넘겨준다고 상상하면 맞을 것 같다. 코드를 짜는 일보다 리팩토링이 더 큰일이 되었다... 첫 프로젝트에서 느껴서 다행이라 생각하자..

⚠ 디자인 적 설계 역시 중요하다. 차후 다크모드나 테마색상 변경이 쉽고 간단하게 적용하기 위해서 html, css 설계가 중요하다는 것을 깨달았다.

## JS 설명

## 전역 변수

---

- `TODOLIST` = 로컬스토리지에 저장될 todolist가 저장되며 속성은 `todoDateKey()` 함수를 통해서 설정한다.
  - key : `incomplete-todos`
  - value : `{"10-31-2021":["세수하기","양치하기"],"10-30-2021":["샤워 하기"]}`
- `COMPLETELIST` = 로컬스토리지에 저장될 완료한 todolist가 저장되며 속성은 `todoDateKey()` 함수를 통해서 설정한다.
  - key : `complete-todos`
  - value : `{"10-31-2021":["기지개 펴기"],"10-30-2021":["러닝 하기"]}`
- `calendar` : `new Date()`를 통해서 오늘 날짜 값을 기본값으로 설정한다.
- `MaxDates` : 42값으로 달력에 출력되어야 하는 총 날짜 수는 7(날)\*6(주)로 42이다.

## 날짜 정보를 담는 함수

---

### getTime()

날짜 값을 전달 받아 해당 날짜에 대한 날짜, 요일, 월, 연도, 이전 및 다음 달 등에 대한 정보를 객체로 담아 return 하는 함수로 브라우저가 오픈 될 시에 현재 날짜값을 기준으로 처음 리턴되며, 이후 날짜 선택 등 사용자에 의해 변경된 날짜에 대한 정보값을 받음.

```jsx
return {
  active: {
    dates: getlastDateThisMonth(time), //  해당 달의 마지막 날, 즉 해당 달의 날짜 수
    startDay: getDayOfFirstDateThisMonth(time), //  해당 달에 대한 첫날의 요일 값, 현재 달에 출력될 이전 달의 날짜의 수 이기도 하다.
    date: time.getDate(), // 출력할 날의 날짜
    day: time.getDay(), // 출력할 날의 요일
    month: time.getMonth(), // 출력할 날의 달
    year: time.getFullYear(), // 출력할 날의 연도
    timeFormat: todoDateKey(time), // 현재 날에 대한 날짜 정보를 담음. ex. 10-27-2021
  },
  prevMonth: getPrevDate(time), // 해당 달의 이전 달
  nextMonth: getNextDate(time), // 해당 달의 다음 달
};
```

### 🔅부속 함수

### getlastDateThisMonth(time)

전달 받은 날짜(time)에 대해 해당 달의 마지막 날을 리턴함.

`new Date(연도, 월, 날짜)` 에서 날짜값이 0 인 경우 해당 월의 이전달의 마지막 날짜를 리턴.

```jsx
return new Date(time.getFullYear(), time.getMonth() + 1, 0).getDate();
// new Date(2021, 10, 0)
// => Sun Oct 31 2021 00:00:00 GMT+0900 (한국 표준시).
```

### getDayOfFirstDateThisMonth(time)

전달 받은 날짜(time)에 대해 해당 달에 대한 첫날의 요일 값을 리턴함.

`new Date(연도, 월, 날짜)` 에서 해당 달의 첫째 날은 날짜값 '1' 부터 시작.

```jsx
return new Date(time.getFullYear(), time.getMonth(), 1).getDay();
// new Date(time.getFullYear(),time.getMonth(),1)
// Fri Oct 01 2021 00:00:00 GMT+0900 (한국 표준시)
```

### getPrevDate(time)과 getNextDate(time)

해당 함수는 `getTime()`에서 리턴할 객체 정보에 대해서 이전달과 다음달에 대한 값을 얻는데에 사용되는 함수이다. 이전달과 다음달에 대한 함수를 따로 만든 이유는 `getTime()`의 리턴 객체를 살펴 볼 때 더욱 가독성이 좋게 알아 볼 수 있도록 하기 위함이다.

❗ 2021년 1월의 이전달인 2020년 12월의 값이 리턴되도록 하기에 월에 대한 값을 줄이는 `new Date(time.getFullYear(),time.getMonth()-1,1);` 으로 충분할까 생각할 수도 있지만 자동으로 연도가 넘어가기 때문에 걱정할 필요 없다.

## 날짜 출력

---

![calendar-dates](./readmeImage/날짜출력)

### drawDates(time)

변수

1. datesInPrevMonth - 현재 출력될 달력에서 함께 출력될 이전 달의 날짜에 대한 정보를 저장.

```jsx
let datesInPrevMonth = range(getTime(time).active.startDay)
  .map((date, idx) => {
    return {
      dateNumber: getlastDateThisMonth(getTime(time).prevMonth) - idx,
      month: new Date(getTime(time).prevMonth).getMonth(),
      year: new Date(getTime(time).prevMonth).getFullYear(),
      currentMonth: false,
      dateTemp: todoDateKey(
        new Date(
          new Date(getTime(time).prevMonth).getFullYear(),
          new Date(getTime(time).prevMonth).getMonth(),
          getlastDateThisMonth(getTime(time).prevMonth) - idx
        )
      ),
    };
  })
  .reverse();
```

- dateNumber - 날짜 값으로 예를 들어 이전달의 마지막 날이 30일 이고 출력될 날이 5일 이라면 26~30일이 dateNumber 값으로 되어야 한다. idx는 [0,1,2,3,4] 일 것이고 getlastDateThisMonth()를 통해서 30일이 리턴 될 것이므로 30-0, 30-1, ..., 30-4 순으로 값이 저장될 것이다. 따라서 마지막에 `reverser()` 를 통해 반전 하는 것.
- month - 이전 달의 달 값으로 10월인 경우 9 저장
- year - 이전 달의 연도 값
- currentMonth : false - 현재 달인지에 대해 묻는 값으로 이전 달에 대한 값이므로 false 저장
- dateTemp - 해당 날짜에 해당하는 월,일,연 을 특정 형식에 맞추어 저장해두기 위한 프로퍼티

1. datesInActiveMonth - 현재 출력될 달력에서 현재 달의 날에 대한 정보를 저장

```jsx
let datesInActiveMonth = range(getTime(time).active.dates).map((date, idx) => {
  let dateNumber = idx + 1;
  let today = new Date();
  return {
    dateNumber,
    today:
      today.getDate() === dateNumber &&
      today.getFullYear() === getTime(time).active.year &&
      today.getMonth() === getTime(time).active.month,
    month: getTime(time).active.month,
    year: getTime(time).active.year,
    selected: getTime(time).active.date === dateNumber,
    currentMonth: true,
    dateTemp: todoDateKey(
      new Date(
        getTime(time).active.year,
        getTime(time).active.month,
        dateNumber
      )
    ),
  };
});
```

- dateNumber - 해당 하는 날의 날짜 값으로 idx는 0부터 시작하므로 +1을 하면 해당 하는 날짜의 값과 동일하다.
- today - 해당하는 날짜가 오늘인지를 확인하는 것으로 월,일,연도가 동일한지를 boolean값으로 리턴한다.
- month - 해당하는 날의 달 값
- year - 해당하는 날의 연도 값
- selected - active는 선택한 날에 대한 값이 저장되는 영역이다. 이러한 active의 날짜와 dateNumber가 동일하면 사용자가 선택한 날이라는 의미가 된다. 이러한 조건으로 리턴된 boolean 값으로 선택되었는지 확인한다.
- currentMonth - 해당하는 날의 달이 오늘날의 달이므로 true값을 저장
- dateTemp - 해당 날짜에 해당하는 월,일,연 을 특정 형식에 맞추어 저장해두기 위한 프로퍼티

1. datesInNextMonth - 현재 출력될 달력에서 함께 출력될 다음 달의 날짜에 대한 정보를 저장.

```jsx
let datesInNextMonth = range(getPrevMonthDates).map((date, idx) => {
  return {
    dateNumber: idx + 1,
    month: new Date(getTime(time).nextMonth).getMonth(),
    year: new Date(getTime(time).nextMonth).getFullYear(),
    currentMonth: false,
    dateTemp: todoDateKey(
      new Date(
        new Date(getTime(time).nextMonth).getFullYear(),
        new Date(getTime(time).nextMonth).getMonth(),
        idx + 1
      )
    ),
  };
});
```

- dateNumber - 해당 하는 날의 날짜 값으로 idx는 0부터 시작하므로 +1을 하면 해당 하는 날짜의 값과 동일하다.
- month - 해당하는 날의 달 값
- year - 해당하는 날의 연도 값
- currentMonth : false - 현재 달인지에 대해 묻는 값으로 다음 달에 대한 값이므로 false 저장
- dateTemp - 해당 날짜에 해당하는 월,일,연 을 특정 형식에 맞추어 저장해두기 위한 프로퍼티

```jsx
let dates = [...datesInPrevMonth, ...datesInActiveMonth, ...datesInNextMonth];
let datesTemplate = "";
```

- dates 는 현재 달력에 출력되어야 할 이전달, 현재달, 다음달의 날짜를 한 배열에 합쳐 저장한 변수이다.
- datesTemplate 는 html에 추가되어야할 html코드 형식이 저장될 빈 string 데이터 변수이다.

```jsx
dates.forEach((date) => {
  let todoTemp = "";

  if (TODOLIST.hasOwnProperty(date.dateTemp)) {
    TODOLIST[date.dateTemp].map((dailyTodo) => {
      todoTemp += `<li>${dailyTodo}</li>`;
    });

    datesTemplate += `<li class="${date.currentMonth ? "" : "another-month"}${
      date.today ? " active-date " : ""
    }${date.selected ? "selected-date" : ""}"data-day="${
      date.dateNumber
    }" data-month="${date.month}" data-year="${
      date.year
    }"><div class="date"  data-day="${date.dateNumber}">${
      date.dateNumber
    }</div><div class="todo"><ul class="toDoList-${
      date.dateTemp
    }"><li>${todoTemp}</li></ul></div></li>`;
  } else {
    datesTemplate += `<li class="${date.currentMonth ? "" : "another-month"}${
      date.today ? " active-date " : ""
    }${date.selected ? "selected-date" : ""}"data-day="${
      date.dateNumber
    }" data-month="${date.month}" data-year="${
      date.year
    }"><div class="date"  data-day="${date.dateNumber}">${
      date.dateNumber
    }</div><div class="todo"><ul class="toDoList-${
      date.dateTemp
    }"></ul></div></li>`;
  }
});
$calendarDates.innerHTML = datesTemplate;
```

![조건문false](./readmeImage/if조건문false)

if 조건문 false

![조건문true](./readmeImage/if조건문true)

if 조건문 true

- todoTemp 는 해당 `date` 별로 들어가야할 todo 목록들이 html내에 출력될 수 있도록하는 형식을 담는 변수이다.
- datesTemplate는 위에 말했는 html에 추가되어야할 코드 형식이 저장되는 변수인데 `date` 가 `TODOLIST` 값을 가지고 있는지 여부에 따라 달라지는데 값을 가지고 있는 경우에는 todolist가 출력되도록 하며, 없는 경우에는 출력할 todolist 값이 없기 때문에 달력의 형태만 출력한다.
- 각 datesTemplate는 현재날짜, 또는 선택한 날짜에 따라 css 스타일이 달라져야 하기 때문에 이에 맞는 값이 출력되도록 date내에 있는 프로퍼티의 값 여부에 따라 각기 다른 class 이름을 부여하거나 부여하지 않는다. _그 예로 해당 달인지를 확인하는 date.currentMonth 값이 false인 경우 해당 달이 아니기 때문에 another-month인 클래스 이름을 가지게 된다._

### 🔅 부속함수

### range(number)

한 달의 날짜는 이전달과 현재달, 다음달의 날짜가 출력되는데, 한 화면에 출력되는 각 달의 길이를 idx를 통해서 몇개인지 객체로 담아 리턴하는 함수

매개변수인 number에는

1. `getTime().active.startDay` - 현재 출력될 달의 이전 달에 대한 날짜의 수
2. `getTime().active.dates` - 현재 출력될 해당 달의 날짜 수
3. `getPrevMonthDates = MaxDates - (datesInPrevMonth.length + datesInActiveMonth.length)` - 한 달에 출력될 42개의 날짜 중 이전달과 이번달의 날짜 수를 합해 빼면 다음 달의 날짜 수이다.

가 들어온다.

```jsx
// 예) 이전 달의 날이 3일이다 => [0,1,2]
return new Array(number).fill().map((e, idx) => idx);
```

## 현재 달과 다음 달, 이전 달을 해당 연도와 함께 출력

---

![monthAndyear](./readmeImage/monthandyearImage)

### drawMonthAndYear(time)

```jsx
const AVAIALBLE_MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

let months = [getTime(time).prevMonth, time, getTime(time).nextMonth];

let monthsInfo = months.map((month, idx) => {
  return {
    monthNumber: month.getMonth(),
    monthString: AVAIALBLE_MONTHS[month.getMonth()],
    year: month.getFullYear(),
    prev: idx === 0,
    active: idx === 1,
    next: idx === 2,
  };
});
// console.log(monthsInfo);
let monthYearTemplate = "";

monthsInfo.forEach((month, idx) => {
  monthYearTemplate += `<div class="${
    month.active ? "active-month" : "other-month"
  } ${month.prev ? "prev" : ""} ${
    month.next ? "next" : ""
  }"><span class="month">${month.monthString}</span> <span class="year">${
    month.year
  }</span></div>`;
});
// console.log(monthYearTemplate);

$calendarMonthAndYear.innerHTML = monthYearTemplate;
```

- AVAILABLE_MONTHS - html에 출력할 달에 대한 문자열을 담아둔 배열
- months - 현재 출력될 달력의 날(`getTime(time)`)에 대한 이전달과, 현재달, 다음달의 날 값을 저장.
- monthsInfo - 각 달에 대한 정보를 담는다.
  - monthNumber - 해당 달에 대한 값으로 10월의 경우 9가 담긴다.
  - monthString - 해당 달에 대한 `AVAILABLE_MONTHS`의 idx와 `monthNumber` 가 동일하다. 이를 통해서 해당 달의 문자열 값을 얻을 수 있다.
  - prev, active, next - 이전, 현재, 다음 달에대한 idx 값을 비교하면서 boolean 값을 저장해 차후 html에 클래스 이름을 지정할 때에 활용하는 값이다.
- monThYearTemplate - html을 통해 출력할 코드를 저장하는 곳으로 현재 달인지 이전 달인지는 monthsInfo를 통해서 클래스 이름을 부여하여 출력하는 등 각 달에 대해 상이하게 출력되게 한다.

## 이전달, 다음달 선택 또는 날짜 선택 트리거 함수

---

이전달, 다음달 선택 트리거 함수, 날짜 선택 트리거 함수의 공통점은 눌렀을 때 시간 값이 해당 날짜에 대한 값으로 수정되어야 한다는 것이다.

따라서 시간값을 업데이트 하는 함수가 필요하다.

### updateTime(time)

```jsx
calendar = new Date(time);
```

전달 받은 인수를 통해서 새로운 날짜값이 calendar에 담기도록 변경한다.

### monthTrigger() // 이전 달 및 다음 달 선택 트리거 함수

```jsx
$prevMonth = document.querySelector(".prev");
$nextMonth = document.querySelector(".next");

$prevMonth.addEventListener("click", function () {
  updateTime(getTime().prevMonth);
  drawAll(calendar);
  monthTrigger();
  // console.log('prev'); 이벤트 리스터 작동확인
});

$nextMonth.addEventListener("click", (e) => {
  updateTime(getTime().nextMonth);
  drawAll(calendar);
  monthTrigger();
  // console.log('next') 이벤트 리스터 작동확인
});
```

⚠ `monthTrigger()` 를 재선언하는 이유 : drawMonthAndYear() 에서 현재 우리가 사용하는 변수 $prevMonth, $nextMonth에 저장되는 클래스 prev와 next가 innerHTML에 의해 재생성 되기 때문에 addEventListener 가 재할당되지 않아 일회성 이벤트리스너로 될 수 있기 때문이다.

- 이전달과 다음달에 대한 element에 이벤트 리스터를 추가하며, 이전 달의 경우 이전달 1일의 `Date`값을 다음 달의 경우 다음달 1일에 대한 `Date`값으로 시간을 업데이트한 후에 변경된 날로 출력하는 `drawAll(calendar)` 함수를 실행한다.

### dateTrigger() // 날짜 선택 트리거 함수

```jsx
$dates = document.querySelector(".calendar-dates");

$dates.addEventListener("click", (e) => {
  let element = e.path[1];

  // getStrDateByEl 에서 $dates 즉, 날짜들이 출력되는 영역에 날짜값이 아닌 element들이 있는데 해당 element는 date값이 없는 불필요 영역으로 값을 불러올 필요가 없다. 이때문에 return false를 통한 실행 중지가 있다.
  getStrDateByEl(element);
  updateTime(strDate);
  // console.log(strDate);
  drawAll(calendar);

  monthTrigger();
  completeToDo(calendar);
});
```

이 함수에서 우리는 `$dates` 요소의 영역을 클릭하였을 때, 각 날짜 data 값이 들어가 있는 `<li>` 요소를 통해서 시간 값을 업데이트 해야한다. 그러기 위해 다음을 살펴보자.

- element - `console.log(e)` 를 하고 path를 살펴보면 다음과 같은 결과가 나온다.

```jsx
path: (9) [div.date, li, ul.calendar-dates, div.inner, div#calendar.calendar, body, html, document, Window]
```

우리가 사용하고자 하는 <li> 태그가 `e.path[1]` 인 것을 확인할 수 있다. 그렇게 때문에 . 해당 값을 element에 저장한 것이다.

- getStrDateByEl(element) - `drawDates(time)` 을 통해서 생성된 `<li>` 태그 중 하나를 살펴보자.

```jsx
<li class="selected-date" data-day="5" data-month="9" data-year="2021">
  <div class="date" data-day="5">
    5
  </div>
  <div class="todo">
    <ul class="toDoList-10-5-2021"></ul>
  </div>
</li>
```

첫번째 `<li>` 태그에 data-day, data-month, data-year 값이 들어 가 있어 이를 통해서 우리는 `updateTime(time)` 함수에 업데이트할 시간 값을 `getStrDateByEl(El)` 통해서 얻을 수 있다.

리턴받은 `strDate` 를 통해서 시간값을 업데이트하고 `drawAll(calendar)`를 통해서 새롭게 출력한다.

`monthTrigger()` 또한 `drawAll()`로 인하여 재출력되었으므로 재호출하여 이벤트 리스너를 부여한다.

`completeToDo(calendar)` 또한 위와 같은 이유이며, 자세한 함수 내용은 아래에서 알아보자.

### getStrDateByEl(El) // 요소를 통해서 요소 내의 data를 이용하여 날짜값을 리턴

```jsx
let date = El.getAttribute("data-day");
let month = El.getAttribute("data-month");
let year = El.getAttribute("data-year");
if (!date) return false; // 매개변수 Element의 date값이 없는 경우, 실행중단.
return (strDate = `${Number(month) + 1}/${date}/${year}`);
```

## ToDolist 추가, 출력, 완료

---

LocalStorage를 이용하여 현재 진행중 또는 미완료한 todo와 완료한 todo는

- value : `{"10-31-2021":["세수하기","양치하기"],"10-30-2021":["샤워 하기"]}`

다음과 같은 형태로 저장된다. value의 내부 key값을 보면 `"월-일-연도"` 의 형태인 것을 확인 할 수 있다. 이를 탐색하거나 비교하기 위해서 날짜별 Key 값의 형태를 얻는 함수가 필요하다.

### todoDateKey(time) // 로컬스토리지의 value의 key값과 동일한 형태의 값을 반환하는 함수

```jsx
return `${time.getMonth() + 1}-${time.getDate()}-${time.getFullYear()}`; // 달-일-연도
```

인수로 받은 날짜값을 LocalStorage의 value의 key값에 해당하는 형태와 동일한 형태를 반환하는 함수이다.

### addToDoTrigger() // todo 추가

![inputTODO](./readmeImage/addtotriggerImage)

추가 버튼을 눌렀을 때, `<input class="insert-todo__field>` 에 입력된 value 값을 저장하게 되는데, 일자별로 분류를 하기 위해서 우리는 로컬스토리지에 저장되는 value들의 키 값을 특정한 날짜의 폼형태를 지니게 하였다.

추가 하는 todo는 내가 선택한 날짜에 대한 todo 만을 추가하기 때문에 선택된 날짜를 의미하도록 해둔(`drawDate()` 참고) `.selected-date` 를 불러와 날짜 폼을 얻는다. 여기서 얻은 선택된 날에 대한 날짜 폼이 바로 LocalStorage에 저장되는 값의 todolist 값의 키가 된다.

만약 `TODOLIST[toDoKey]` 에 값이 없으면, 그 날에 대한 todo는 배열의 형태로 담겨 관리되어야 한다. 때문에 아래와 같은 `if` 문이 존재하며, 없을 경우 아래의 push() 또한 되지 않을 뿐더러 `drawDates()`에서 `.map()` 과 같은 메서드를 통한 관리가 용이하지 않아진다.

생성한 배열또는 이미 있는 배열에 `<input>`을 통해 전달받은 값을 로컬스토리지에 전달하기 위한 변수 `TODOLIST` 에 추가하고 `<input>` 의 `value`가 초기화 되어 사용자가 다시 지우는 번거로움이 없도록 한다.

todo 가 추가 되면 달력에 표시가 되어야 하기 때문에 재출력된 코드에 관련된 함수를 재선언한다.

```jsx
const $addToDoBtn = document.querySelector(".insert-todo__field__btn");
const $todoField = document.querySelector(".insert-todo__field");

$addToDoBtn.addEventListener("click", (e) => {
  let $selectedDates = document.querySelector(".selected-date");

  let toDoValue = $todoField.value;

  getStrDateByEl($selectedDates);
  let toDoKey = todoDateKey(new Date(strDate));

  if (!TODOLIST[toDoKey]) TODOLIST[toDoKey] = [];

  if (toDoValue) TODOLIST[toDoKey].push(toDoValue);

  localStorage.setItem(incompleteToDosStorageName, JSON.stringify(TODOLIST));
  $todoField.value = ""; // <input> 입력 폼 초기화

  drawAll(calendar);
  monthTrigger();
});
```

### drawToDos() // complete영역과 incomplete 영역에 todo 들을 출력

![complete와incomplete](./readmeImage/drawtodoImage)

출력이 될 complete와 incomplete 영역을 불러온다.

현재 선택되어 페이지에 전달된 시간값에 대한 complete와 incomplete todo이기 때문에 `getTime(calendar)`를 통해서 해당 시간값을 불러온다.

각각 LocalStorage의 값을 저장해두는 `TODOLIST`와 `COMPLETELIST` 를 불러오며, 빈 값인지 여부를 확인하여 빈값인 경우 빈 배열을 생성하여 저장한다.

각 값들에 대해 html문서에 추가할 빈 string 객체를 만들고 추가하며, 불러왔던 출력될 html 요소에 innerHTML을 한다.

차후 추가버튼과 취소버튼을 담당하는 아이콘은 구글의 Material Icons를 사용했다.

```jsx
const $completeList = document.querySelector(".complete__list");
const $incompleteList = document.querySelector(".incomplete__list");

const today = getTime(calendar);

let todayToDoList = TODOLIST[today.active.timeFormat] || [];
let todayCompleteList = COMPLETELIST[today.active.timeFormat] || [];

let todayToDoTemplate = "";
todayToDoList.forEach((todo) => {
  todayToDoTemplate += `<li><span class="material-icons completeBtn">done</span>${todo}<span class="material-icons cancelBtn">clear</span></li>`;
});
let todayCompleteTemplate = "";
todayCompleteList.forEach((completeTodo) => {
  todayCompleteTemplate += `<li>${completeTodo}</li>`;
});

$incompleteList.innerHTML = todayToDoTemplate;
$completeList.innerHTML = todayCompleteTemplate;
```

### completeToDo( ) // 완료 버튼과 COMPLETELIST 에 추가

각 todo 별로 추가하였던 완료버튼을 `document.querysSelectorAll()` 을 통해 모두 불러온다.

버튼의 idx 순서와 TODOLIST에 담긴 idx 순서가 동일한 것을 바탕으로 버튼의 idx를 통해 몇 번째의 TODOLIST의 value 값인지를 알 수 있다.

완료버튼을 눌러 COMPLETELIST에 추가되어야할 값을 completeTodo라고 하였다.

completeTodo를 제외한 나머지 값이 TODOLIST에 다시 재할당 되어야하고 completeTodo는 COMPLETELIST에 추가되어야 한다.

completeTodo를 제외한 값은 filter()를 통해서 선택한 completeTodo와 동일하지 않은 값들을 새배열에 담아 TODOLIST에 재할당 하였다.

```jsx
const $completeBtn = document.querySelectorAll(".completeBtn");

$completeBtn.forEach((btn, idx) => {
  btn.addEventListener("click", (e) => {
    let todoList = TODOLIST[todoDateKey(calendar)];

    let completeTodo = TODOLIST[todoDateKey(calendar)][idx];

    let changeToDolist = todoList.filter(
      (todo) => todo !== TODOLIST[todoDateKey(calendar)][idx]
    );

    TODOLIST[todoDateKey(calendar)] = changeToDolist; // 재할당
    localStorage.setItem(incompleteToDosStorageName, JSON.stringify(TODOLIST));

    if (!COMPLETELIST[todoDateKey(calendar)])
      COMPLETELIST[todoDateKey(calendar)] = [];
    COMPLETELIST[todoDateKey(calendar)].push(completeTodo);

    localStorage.setItem(
      completeToDosStorageName,
      JSON.stringify(COMPLETELIST)
    );

    drawAll(calendar);
    monthTrigger();
  });
});
```

### cancelToDo( ) // 취소 버튼과 TODOLIST 에서의 제외

위의 `completeToDo()` 와 원리는 동일하다.

`.filter()`를 통해서 취소 버튼을 누른 값과 동일하지 않은 값들만 다시 재할당하여 LocalStorage에 저장하면 취소한 todo는 사라지고 나머지 값만 남게된다.

```jsx
const $cancelBtn = document.querySelectorAll(".cancelBtn");

$cancelBtn.forEach((btn, idx) => {
  btn.addEventListener("click", (e) => {
    // console.log(idx)
    // console.log(TODOLIST[todoDateKey(calendar)])
    let todoList = TODOLIST[todoDateKey(calendar)];
    // console.log(TODOLIST[todoDateKey(calendar)][idx])

    let changeToDolist = todoList.filter(
      (todo) => todo !== TODOLIST[todoDateKey(calendar)][idx]
    );
    // console.log(changeToDolist);

    TODOLIST[todoDateKey(calendar)] = changeToDolist;
    localStorage.setItem(incompleteToDosStorageName, JSON.stringify(TODOLIST));

    drawAll(calendar);
    monthTrigger();
  });
});
```
