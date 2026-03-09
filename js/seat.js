const totalSeatsSpan = document.querySelector("#totalSeats");
const usedSeatsSpan = document.querySelector("#usedSeats");
const awaySeatsSpan = document.querySelector("#awaySeats");
const remainSeatsSpan = document.querySelector("#remainSeats");
const congestionPercentSpan = document.querySelector("#congestionPercent");
const congestionBox = document.querySelector("#congestionBox");
const seatLayout = document.querySelector("#seat_layout");

let TOTAL_SEATS = 16;

// 🔥 전역 공유용
window.currentRemainSeats = TOTAL_SEATS;

// 🔥 좌석 생성
for (let i = 0; i < 4; i++) {
    const desk = document.createElement("div");
    desk.classList.add("desk");

    for (let j = 0; j < 4; j++) {
        const seat = document.createElement("div");
        seat.classList.add("seat", "empty");
        desk.appendChild(seat);
    }

    seatLayout.appendChild(desk);
}

const seats = document.querySelectorAll(".seat");

// 🔥 좌석 상태 업데이트
function updateSeatData(usedSeats, awaySeats) {

    const remainSeats = TOTAL_SEATS - usedSeats - awaySeats;
    const congestion = Math.floor((usedSeats / TOTAL_SEATS) * 100);

    // 🔥🔥🔥 이 줄이 핵심
    window.currentRemainSeats = remainSeats;

    totalSeatsSpan.innerText = TOTAL_SEATS;
    usedSeatsSpan.innerText = usedSeats;
    awaySeatsSpan.innerText = awaySeats;
    remainSeatsSpan.innerText = remainSeats;
    congestionPercentSpan.innerText = congestion;

    changeCongestionColor(congestion);

    // 전체 초기화
    seats.forEach(seat => {
        seat.classList.remove("used", "away");
        seat.classList.add("empty");
    });

    // 사용중 표시
    for (let i = 0; i < usedSeats; i++) {
        seats[i].classList.remove("empty");
        seats[i].classList.add("used");
    }

    // 자리비움 표시
    for (let i = usedSeats; i < usedSeats + awaySeats; i++) {
        seats[i].classList.remove("empty");
        seats[i].classList.add("away");
    }
}

function changeCongestionColor(percent) {
    if (percent < 50) {
        congestionBox.style.color = "green";
    } else if (percent < 80) {
        congestionBox.style.color = "orange";
    } else {
        congestionBox.style.color = "red";
    }
}

// 🔥 초기값 한 번 실행 (중요)
updateSeatData(0, 0);

/* 🔥 3초마다 랜덤 테스트 */
setInterval(() => {

    const randomUsed = Math.floor(Math.random() * 10);
    const randomAway = Math.floor(Math.random() * 5);

    if (randomUsed + randomAway <= TOTAL_SEATS) {
        updateSeatData(randomUsed, randomAway);
    }

}, 3000);