const heder2 = document.querySelector("#clock")

function updateClock() {
    // console.lof("updateClock id callde");

    const curtime = new Date();
    const timeString = String(curtime.getHours()).padStart(2, "0") + ":" + String(curtime.getMinutes()).padStart(2, "0") + ":" + String(curtime.getSeconds()).padStart(2, "0");
    // console.log(timeString)

    heder2.innerHTML = timeString
}

updateClock()
setInterval(updateClock, 1000)