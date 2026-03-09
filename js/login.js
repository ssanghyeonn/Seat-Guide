const loginForm = document.querySelector("#loginform");
const loginInput = document.querySelector("#loginform input");
const greetingHeader = document.querySelector("#greeting");

loginForm.addEventListener("submit", checkSeatAvailability);

function checkSeatAvailability(event) {
    event.preventDefault();

    const peopleCount = parseInt(loginInput.value);

    if (isNaN(peopleCount) || peopleCount <= 0) {
        greetingHeader.innerText = "올바른 인원 수를 입력하세요.";
        return;
    }

    const remainSeats = window.currentRemainSeats; // seat.js에서 관리

    if (remainSeats >= peopleCount) {
        greetingHeader.innerText =
            peopleCount + "명 자리 이용 가능합니다 ✅";
        greetingHeader.style.color = "green";
    } else {
        greetingHeader.innerText =
            peopleCount + "명 자리 부족합니다 ❌";
        greetingHeader.style.color = "red";
    }

    loginInput.value = "";
}
