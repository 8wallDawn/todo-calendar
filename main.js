const $calendarDates = document.querySelector('.calendar-dates');

// ========================================================
//1. 현재 날짜를 받는다.
let calendar = new Date();
const MaxDates = 42;

function getTime(time) {
    return {
        active: {
            dates: getlastDateTHisMonth(time), // #1
            startDay: getDayOfFirstDateThisMonth(time), // #2
            date: time.getDate(), // 출력할 날의 날짜
            day: time.getDay(), // 출력할 날의 요일
            month: time.getMonth(), // 출력할 날의 달
            year: time.getFullYear(), // 출력할 날의 연도
        },
        prevMonth: getPrevDate(time),
        // prevMonthYear: getPrevDate(time).getFullYear(),
        nextMonth: getNextDate(time),
        // nextMonthYear: getNextDate(time).getFullYear()
    }
}
console.log(getTime(calendar));

// #1 매개변수 달의 마지막 날을 읽음.
function getlastDateTHisMonth(time) {
    return new Date(time.getFullYear(),time.getMonth()+1,0).getDate();
}
// getlastDateTHisMonth(calendar);

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

function drawDays(time) {
    let datesInPrevMonth = range(getTime(time).active.startDay).map((date,idx)=>{
        return {
            dateNumber: getlastDateTHisMonth(getTime(time).prevMonth)-idx,
            month: new Date(getTime(time).prevMonth).getMonth(),
            year: new Date(getTime(time).prevMonth).getFullYear(),
            currentMonth: false
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
            currentMonth: true
        }
    });
    // console.log(datesInActiveMonth); //출력 되어야할 현재 달의 날들을 담음.

    let getPrevMonthDates = MaxDates - (datesInPrevMonth.length + datesInActiveMonth.length);

    let datesInNextMonth = range(getPrevMonthDates).map((date, idx) => {
        return {
            dateNumber: idx + 1,
            month: new Date(getTime(time).nextMonth).getMonth(),
            year: new Date(getTime(time).nextMonth).getFullYear(),
            currentMonth: false
        }
    });
    // console.log(datesInNextMonth); // 현재 달에 출력될 다음 달의 날들을 담음.

    let dates = [...datesInPrevMonth, ...datesInActiveMonth, ...datesInNextMonth];

    let datesTemplate = "";
    dates.forEach(day => {
        datesTemplate += `<li class="${day.currentMonth ? '' : 'another-month'}${day.today ? ' active-date ' : ''}${day.selected ? 'selected-date' : ''}${day.hasEvent ? ' event-date' : ''}" data-day="${day.dateNumber}" data-month="${day.month}" data-year="${day.year}"><div class="date">${day.dateNumber}</div></li>`
    });
    console.log(datesTemplate);

    $calendarDates.innerHTML = datesTemplate;
}
console.log(drawDays(calendar));


// ========================================================
//3. 이전달 또는 다음달 버튼을 누르면 calendar 변수의 date() 값을 교체한다.