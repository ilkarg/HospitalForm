let data = {
    "doctors": [],
    "specializations": [],
    "cards": []
};

let selectedCard = undefined;

function fillSpecializationSelect() {
    let specializationSelect = document.querySelector("#select-specialization");
    let doctorSelect = document.querySelector("#select-doctor");
    data["specializations"].map(function (specialization) {
        let option = document.createElement("option");
        option.innerText = specialization;
        specializationSelect.appendChild(option);
    });
    data["doctors"].map(function (doctor) {
        if (doctor.specialization === specializationSelect.value) {
            let option = document.createElement("option");
            option.innerText = doctor.full_name;
            doctorSelect.appendChild(option);
        }
    });
    document.querySelectorAll(".card-selected").forEach(function(__card) {
        __card.classList.remove("card-selected");
    });
    document.querySelector("#form").classList.add("hidden");
    document.querySelector("#time").innerHTML = "";
    clearBookedStatus();
    if (doctorSelect.value !== "") {
        getDoctorCards();
    }
}

function loadDoctorsBySpecialization() {
    let specializationSelect = document.querySelector("#select-specialization");
    let doctorSelect = document.querySelector("#select-doctor");
    doctorSelect.innerHTML = "";
    data["doctors"].map(function (doctor) {
        if (doctor.specialization === specializationSelect.value) {
            let option = document.createElement("option");
            option.innerText = doctor.full_name;
            doctorSelect.appendChild(option);
        }
    });
    document.querySelectorAll(".card-selected").forEach(function(__card) {
        __card.classList.remove("card-selected");
    });
    document.querySelector("#form").classList.add("hidden");
    document.querySelector("#time").innerHTML = "";
    clearBookedStatus();
    if (doctorSelect.value !== "") {
        getDoctorCards();
    }
}

function getDoctorCards() {
    document.querySelector("#time").innerHTML = "";
    let doctorSelect = document.querySelector("#select-doctor");
    data["cards"].map(function(card) {
        if (card.doctor === doctorSelect.value) {
            let day = card.date.split(".")[0];
            day = day[0] === "0" ? day[1] : day;
            let monthName = month[card.date.split(".")[1]];
            let year = card.date.split(".")[2];
            if (document.querySelector("#month-picker").innerText === monthName && document.querySelector("#year").innerText === year) {
                let dateDiv = Array.from(document.querySelectorAll('#calendar-days>div'))
                .find(el => el.textContent === day);
                let _month = getDictKeyByValue(document.querySelector("#month-picker").innerText);
                let year = document.querySelector("#year").innerText;
                if (notBookedCardExistsInDate(`${day}.${_month}.${year}`)) {
                    dateDiv.classList.add("not-booked");
                } else {
                    dateDiv.classList.add("booked");
                }
                dateDiv.onclick = function(event) {
                    document.querySelector("#time").innerHTML = "";
                    document.querySelector("#form").classList.add("hidden");
                    if (event.target.className.indexOf("not-booked") !== -1) {
                        let day = event.target.innerText;
                        let _month = getDictKeyByValue(document.querySelector("#month-picker").innerText);
                        let year = document.querySelector("#year").innerText;
                        let cards = getAllCardTimes(doctorSelect.value, `${day}.${_month}.${year}`);
                        cards.map(function(_card) {
                            if (_card.booked == 0) {
                                let button = document.createElement("button");
                                button.innerText = _card.time;
                                button.classList.add("btn", "text-uppercase");
                                button.onclick = function(event) {
                                    selectedCard = card;
                                    document.querySelectorAll(".card-selected").forEach(function(__card) {
                                        __card.classList.remove("card-selected");
                                    });
                                    event.target.classList.add("card-selected");
                                    document.querySelector("#form").classList.remove("hidden");
                                };
                                document.querySelector("#time").appendChild(button);
                            }
                        });
                    }
                }
            }
        }
    });
}

function getDoctorId(doctorFullName) {
    let id = 0;
    data["doctors"].map(function(doctor) {
        if (doctor.full_name === doctorFullName) {
            id = doctor.id;
            return;
        }
    });
    return id;
}

function clearBookedStatus() {
    document.querySelectorAll("#calendar-days>div").forEach(function(dateCard) {
        dateCard.classList.remove("booked");
        dateCard.classList.remove("not-booked");
    });
}

function getBookedCard(date) {
    let bookedCardArr = [];
    data["cards"].map(function(card) {
        if (card.date === date && card.booked == 0) {
            bookedCardArr.push(card);
        }
    });
    return bookedCardArr;
}

function getNotBookedCard(date) {
    let notBookedCardArr = [];
    data["cards"].map(function(card) {
        if (card.date === date && card.booked != 0) {
            notBookedCardArr.push(card);
        }
    });
    return notBookedCardArr;
}

function notBookedCardExistsInDate(date) {
    let status = false;
    data["cards"].map(function(card) {
        if (card.date === date && card.booked == 0) {
            status = true;
            return;
        }
    });
    return status;
}

function getAllCardTimes(doctorFullName, date) {
    let cardArr = [];
    data["cards"].map(function(card) {
        if (card.date === date && card.doctor === doctorFullName) {
            cardArr.push(card);
        }
    });
    return cardArr;
}

function getDictKeyByValue(value) {
    let result = "";
    Object.keys(month).map(function(key) {
        if (month[key] === value) {
            result = key;
            return;
        }
    });
    return result;
}

const month = {
    "01": "Январь",
    "02": "Февраль",
    "03": "Март",
    "04": "Апрель",
    "05": "Май",
    "06": "Июнь",
    "07": "Июль",
    "08": "Август",
    "09": "Сентябрь",
    "10": "Октябрь",
    "11": "Ноябрь",
    "12": "Декабрь"
};

const isLeapYear = (year) => {
    return (
        (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
        (year % 100 === 0 && year % 400 === 0)
    );
};
const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
};
let calendar = document.querySelector('.calendar');
const month_names = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];
let month_picker = document.querySelector('#month-picker');
const dayTextFormate = document.querySelector('.day-text-formate');
const timeFormate = document.querySelector('.time-formate');
const dateFormate = document.querySelector('.date-formate');

const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days');
    calendar_days.innerHTML = '';
    let calendar_header_year = document.querySelector('#year');
    let days_of_month = [
        31,
        getFebDays(year),
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];

    let currentDate = new Date();

    month_picker.innerHTML = month_names[month];

    calendar_header_year.innerHTML = year;

    let first_day = new Date(year, month);


    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {

        let day = document.createElement('div');

        if (i >= first_day.getDay()) {
            day.innerHTML = i - first_day.getDay() + 1;

            if (i - first_day.getDay() + 1 === currentDate.getDate() &&
                year === currentDate.getFullYear() &&
                month === currentDate.getMonth()
            ) {
                day.classList.add('current-date');
            }
        }
        calendar_days.appendChild(day);
    }
};

let month_list = calendar.querySelector('.month-list');
month_names.forEach((e, index) => {
    let month = document.createElement('div');
    month.innerHTML = `<div>${e}</div>`;

    month_list.append(month);
    month.onclick = () => {
        currentMonth.value = index;
        generateCalendar(currentMonth.value, currentYear.value);
        month_list.classList.replace('show', 'hide');
        clearBookedStatus();
        document.querySelector("#time").innerHTML = "";
        getDoctorCards();
    };
});

(function () {
    month_list.classList.add('hideonce');
})();
document.querySelector('#pre-year').onclick = () => {
    --currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
    document.querySelector("#time").innerHTML = "";
    getDoctorCards();
};
document.querySelector('#next-year').onclick = () => {
    ++currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
    document.querySelector("#time").innerHTML = "";
    getDoctorCards();
};

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);

const todayShowTime = document.querySelector('.time-formate');
const todayShowDate = document.querySelector('.date-formate');

const currshowDate = new Date();
const showCurrentDateOption = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
};
const currentDateFormate = new Intl.DateTimeFormat('en-US', showCurrentDateOption).format(currshowDate);