const showTime = () => {
    const dateObject = new Date()

    let formattedString = dateObject.getHours() + ":" + dateObject.getMinutes() + ":" + dateObject.getSeconds()
    document.getElementById("time").innerHTML = formattedString;
}


setInterval(showTime, 1000);