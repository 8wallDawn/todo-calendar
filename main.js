const $calendarDates = document.querySelector('.calendar-dates');
const $calendarMonthAndYear = document.querySelector('.calendar-month-year');

// ========================================================
//1. 현재 날짜를 받는다.
let calendar = new Date();
const MaxDates = 42;

function getTime() {
    let time = new Date(calendar);

    return {
        active: {
            dates: getlastDateThisMonth(time), // #1
            startDay: getDayOfFirstDateThisMonth(time), // #2
            date: time.getDate(), // 출력할 날의 날짜
            day: time.getDay(), // 출력할 날의 요일
            month: time.getMonth(), // 출력할 날의 달
            year: time.getFullYear(), // 출력할 날의 연도
            timeFormat: todoDateKey(time)
        },
        prevMonth: getPrevDate(time),
        // prevMonthYear: getPrevDate(time).getFullYear(),
        nextMonth: getNextDate(time),
        // nextMonthYear: getNextDate(time).getFullYear()
    }
}
console.log(getTime(calendar));

// #1 매개변수 달의 마지막 날을 읽음.
function getlastDateThisMonth(time) {
    return new Date(time.getFullYear(),time.getMonth()+1,0).getDate();
}
// getlastDateThisMonth(calendar);

// #2  매개변수 달의 첫 날의 요일 idx
function getDayOfFirstDateThisMonth(time) {
    return new Date(time.getFullYear(),time.getMonth(),1).getDay();
}
// getDayOfFirstDateThisMonth(calendar);


// #3-1, #3-2 달이 1월 이라면 이전 달은 12월 이면서 연도에 -1을 하고 12월이면 다음 달은 1월 이면서 연도에 +1
// getPrevYear(new Date(2021,0,1)); 2020 12 1
// getPrevYear(new Date(2021,3,1)); 2021 2 1
// getNextYear(new Date(2021,11,1)); 2022 1 1
// getNextYear(new Date(2021,9,1)); 2021 10 1
function getPrevDate(time){
    if (time.getMonth() == 0) {
        return new Date(time.getFullYear()-1,11,1);
    }
    else return new Date(time.getFullYear(),time.getMonth()-1,1);
}
function getNextDate(time) {
    if (time.getMonth()==11) {
        return new Date(time.getFullYear()+1,0,1);
    }
    else return new Date(time.getFullYear(),time.getMonth()+1,1);
}



// ========================================================
//2. 현재 날짜에 대한 일을 출력한다.

// #4 달력에 표시될 이전 달의 날과 현재 달의 날, 다음 달의 날의 수를 배열에 담는 방식
// 예) 이전 달의 날이 3일이다 => [0,1,2]
function range(number) {
    return new Array(number).fill().map((e, idx) => idx);
}
// console.log(range(getTime(calendar).active.startDay));

function drawDates(time) {
    let datesInPrevMonth = range(getTime(time).active.startDay).map((date,idx)=>{
        return {
            dateNumber: getlastDateThisMonth(getTime(time).prevMonth)-idx,
            month: new Date(getTime(time).prevMonth).getMonth(),
            year: new Date(getTime(time).prevMonth).getFullYear(),
            currentMonth: false,
            dateTemp: todoDateKey(new Date(new Date(getTime(time).prevMonth).getFullYear(),  new Date(getTime(time).prevMonth).getMonth(), getlastDateThisMonth(getTime(time).prevMonth)-idx))
        }
    }).reverse();
    // console.log(datesInPrevMonth); //현재 달에 출력 되어야할 이전달의 날들을 담음.

    let datesInActiveMonth = range(getTime(time).active.dates).map((date, idx) => {
        let dateNumber = idx + 1;
        let today = new Date();
        return {
            dateNumber,
            today: today.getDate() === dateNumber && today.getFullYear() === getTime(time).active.year && today.getMonth() === getTime(time).active.month,
            month: getTime(time).active.month,
            year: getTime(time).active.year,
            selected: getTime(time).active.date === dateNumber,
            currentMonth: true,
            dateTemp: todoDateKey(new Date(getTime(time).active.year, getTime(time).active.month, dateNumber))
        }
    });
    // console.log(datesInActiveMonth); //출력 되어야할 현재 달의 날들을 담음.

    let getPrevMonthDates = MaxDates - (datesInPrevMonth.length + datesInActiveMonth.length);

    let datesInNextMonth = range(getPrevMonthDates).map((date, idx) => {
        return {
            dateNumber: idx + 1,
            month: new Date(getTime(time).nextMonth).getMonth(),
            year: new Date(getTime(time).nextMonth).getFullYear(),
            currentMonth: false,
            dateTemp: todoDateKey(new Date(new Date(getTime(time).nextMonth).getFullYear(), new Date(getTime(time).nextMonth).getMonth(), idx+1))
        }
    });
    // console.log(datesInNextMonth); // 현재 달에 출력될 다음 달의 날들을 담음.

    let dates = [...datesInPrevMonth, ...datesInActiveMonth, ...datesInNextMonth];

    let datesTemplate = "";
    // dates.forEach(date => {
    //     datesTemplate += `<li class="${date.currentMonth ? '' : 'another-month'}${date.today ? ' active-date ' : ''}${date.selected ? 'selected-date' : ''}${date.hasEvent ? ' event-date' : ''}"data-day="${date.dateNumber}" data-month="${date.month}" data-year="${date.year}"><div class="date"  data-day="${date.dateNumber}">${date.dateNumber}</div><div class="todo"><ul class="toDoList-${date.dateTemp}"></ul></div></li>`
    //     // <div class="todo"><ul class="toDoList-${date.dateTemp}"></ul></div>
    // });
    // // console.log(datesTemplate);

    // $calendarDates.innerHTML = datesTemplate;

    // ===================================================
    dates.forEach(date => {
        // console.log('dateTemp',date.dateTemp)
        // console.log('TODOLIST-KEY',Object.keys(TODOLIST))
        // console.log(TODOLIST['10-27-2021'])
        // let dailyTodos = TODOLIST[date.dateTemp];
        // console.log(typeof dailyTodos); // object
        // console.log(TODOLIST);
        let todoTemp = '';
        
        if(TODOLIST.hasOwnProperty(date.dateTemp)){
            TODOLIST[date.dateTemp].map(dailyTodo => {
                todoTemp += `<li>${dailyTodo}</li>`
            });
            // console.log(todoTemp);

            datesTemplate += `<li class="${date.currentMonth ? '' : 'another-month'}${date.today ? ' active-date ' : ''}${date.selected ? 'selected-date' : ''}${date.hasEvent ? ' event-date' : ''}"data-day="${date.dateNumber}" data-month="${date.month}" data-year="${date.year}"><div class="date"  data-day="${date.dateNumber}">${date.dateNumber}</div><div class="todo"><ul class="toDoList-${date.dateTemp}"><li>${todoTemp}</li></ul></div></li>`
        } else {
            datesTemplate += `<li class="${date.currentMonth ? '' : 'another-month'}${date.today ? ' active-date ' : ''}${date.selected ? 'selected-date' : ''}${date.hasEvent ? ' event-date' : ''}"data-day="${date.dateNumber}" data-month="${date.month}" data-year="${date.year}"><div class="date"  data-day="${date.dateNumber}">${date.dateNumber}</div><div class="todo"><ul class="toDoList-${date.dateTemp}"></ul></div></li>`
        }
    })
    $calendarDates.innerHTML = datesTemplate;
    
    // ===================================================
}
// console.log(drawDays(calendar));

// ========================================================
//3. 현재달과 다음달, 이전달과 그 달의 연도를 함께 출력
function drawMonthAndYear (time) {
    const AVAIALBLE_MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

    let months = [getTime(time).prevMonth, time,getTime(time).nextMonth];

    let monthsInfo = months.map((month, idx)=> {
        return {
            monthNumber : month.getMonth(),
            monthString : AVAIALBLE_MONTHS[month.getMonth()],
            year : month.getFullYear(),
            prev : idx===0,
            active: idx ===1,
            next: idx===2
        }
    });
    // console.log(monthsInfo);
    let monthYearTemplate ="";

    monthsInfo.forEach((month, idx) => {
        monthYearTemplate += `<div class="${month.active ? 'active-month' : 'other-month'} ${month.prev ? 'prev' : ''} ${month.next ? 'next' : ''}"><span class="month">${month.monthString}</span><span class="year">${month.year}</span></div>`
    });
    // console.log(monthYearTemplate);

    $calendarMonthAndYear.innerHTML = monthYearTemplate;
}

// ========================================================
//4. 이전달 또는 다음달 버튼을 누르면 calendar 변수의 date() 값을 교체한다.

function updateTime(time) {
    calendar = new Date(time);
}

function monthTrigger(){
    $prevMonth = document.querySelector('.prev');
    $nextMonth = document.querySelector('.next');

    $prevMonth.addEventListener('click', function(){
        updateTime(getTime().prevMonth);
        drawAll(calendar);
        monthTrigger() // 해당 함수를 재 선언 하는 이유는 다음과 같다.
        // drawMonthAndYear() 에서 현재 우리가 사용하는 변수 $prevMonth, $nextMonth에 저장되는 클래스 prev와 next가 innerHTML에 의해 재생성 되기 때문에 addEventListener 가 재할당되지 않아 일회성 이벤트리스터로 될 수 있기 때문이다.
        // console.log('prev');
    })

    $nextMonth.addEventListener('click', e=> {
        updateTime(getTime().nextMonth);
        drawAll(calendar);
        monthTrigger()
        // console.log('next')
    });

    // console.log('monthTrigger');
}
// document.querySelector('.prev').addEventListener('click', () => {
//     updateTime(getTime().prevMonth);
//     drawAll(calendar);
//     console.log('prev');
// })

// ========================================================
// 5. 날짜 선택 시 최신화
function dateTrigger(){
    $dates = document.querySelector('.calendar-dates');
    
    $dates.addEventListener('click', e => {
        let element = e.path[1];
        // getStrDateByEl 에서 $dates 즉, 날짜들이 출력되는 영역에 날짜값이 아닌 element들이 있는데 해당 element는 date값이 없는 불필요 영역으로 값을 불러올 필요가 없다. 이때문에 return false를 통한 실행 중지가 있다.
        getStrDateByEl(element);
        updateTime(strDate);
        // console.log(strDate);
        drawAll(calendar);

        monthTrigger();
        completeToDo(calendar);
    })
    
    // console.log('dateTrigger');
}
// ========================================================
function getStrDateByEl(El) {
    let date = El.getAttribute('data-day');
    let month = El.getAttribute('data-month');
    let year = El.getAttribute('data-year');
    if (!date) return false; // 매개변수 Element의 date값이 없는 경우, 실행중단.
    return strDate = `${Number(month) + 1}/${date}/${year}`;
}

// ========================================================
//6. todolist
function todoDateKey (time) {
    return `${time.getMonth()+1}-${time.getDate()}-${time.getFullYear()}` // 달/일/연도
}
// console.log(todoDateKey(calendar))
const incompleteToDosStorageName='incomplete-todos'
let TODOLIST = JSON.parse(localStorage.getItem(incompleteToDosStorageName)) || {};

function addToDoTrigger() {
    const $addToDoBtn = document.querySelector('.insert-todo__field__btn');
    const $todoField = document.querySelector('.insert-todo__field');
    
    $addToDoBtn.addEventListener('click', e => {
        let $selectedDates = document.querySelector('.selected-date');
        // console.log($selectedDates);   
        
        let toDoValue = $todoField.value;
        // console.log(toDoValue);
        
        getStrDateByEl($selectedDates);
        let toDoKey = todoDateKey(new Date(strDate))
        // console.log(toDoKey);

        // let $todoList = document.querySelector(`.toDoList-${+new Date(strDate)}`);
        // console.log($todoList);

        if(!TODOLIST[toDoKey]) TODOLIST[toDoKey] = [];

        // console.log(TODOLIST)
        if(toDoValue) TODOLIST[toDoKey].push(toDoValue);

        localStorage.setItem(incompleteToDosStorageName, JSON.stringify(TODOLIST));
        $todoField.value = '';

        drawAll(calendar);
        monthTrigger();
    });
    
}

function drawToDos () {
    const $completeList = document.querySelector('.complete__list');
    const $incompleteList = document.querySelector('.incomplete__list');

    // const $completeBtn = document.createElement('button');
    // $completeBtn.innerText = 'check';

    const today = getTime(calendar);

    let todayToDoList = TODOLIST[today.active.timeFormat] || [];
    // console.log(todayToDoList)
    let todayToDoTemplate = '';
    todayToDoList.forEach(todo => {
        todayToDoTemplate += `<li><span class="material-icons completeBtn">done</span>${todo}</li>`;
    });

    $incompleteList.innerHTML = todayToDoTemplate;

    // drawToDosInCalendar();
}
// function drawToDosInCalendar() {
//     const $toDoList = document.querySelector(`.toDoList-${getTime(calendar).active.timeFormat}`)
//     console.log($toDoList);

//     const today = getTime(calendar);

//     let todayToDoList = TODOLIST[today.active.timeFormat] || [];
//     let perDayToDoTemplate = '';
//     todayToDoList.forEach(todo => {
//         perDayToDoTemplate += `<li>${todo}</li>`;
//     });

//     $toDoList.innerHTML = perDayToDoTemplate;
// }

// ========================================================
//6. 완료 버튼 누를시에 complete 리스트에 출력하고 storage에 추가
const completeToDosStorageName='complete-todos'
let COMPLETELIST = JSON.parse(localStorage.getItem(completeToDosStorageName)) || {};

function completeToDo () {
    const $completeBtn = document.querySelectorAll('.completeBtn');
    // console.log(todoDateKey(calendar));
    // console.log($completeBtn);
    console.log('실행!')

    $completeBtn.forEach((btn,idx) => {
        btn.addEventListener('click', e => {
            console.log(idx)
            // console.log('good-work', idx);
            // console.log(TODOLIST[todoDateKey(calendar)])
            let todoList = TODOLIST[todoDateKey(calendar)]
            // console.log(TODOLIST[todoDateKey(calendar)][idx])

            let changeToDolist = todoList.filter(todo => 
                todo !== TODOLIST[todoDateKey(calendar)][idx]
            )
            console.log(changeToDolist);
            
            TODOLIST[todoDateKey(calendar)]=changeToDolist;
            localStorage.setItem(incompleteToDosStorageName, JSON.stringify(TODOLIST));
            
            drawAll(calendar);
        })
    })
}


// ========================================================
//5. 한번에 출력

function drawAll(time) {
    drawMonthAndYear(time),
    drawDates(time)
    drawToDos();
    completeToDo();
};

function init() {
    drawAll(calendar);
    monthTrigger();
    dateTrigger();
    addToDoTrigger()
}

init();