// const showTime = () => {
//     const dateObject = new Date()

//     let formattedString = dateObject.getHours() + ":" + dateObject.getMinutes() + ":" + dateObject.getSeconds()
//     document.getElementById("time").innerHTML = formattedString;
// }


// setInterval(showTime, 1000);

const getWeatherData = async (city) => {
  try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7f0485700e5e455faf216f5cf7c38659&units=metric`); 
      return await response.json()
  } catch (error) {
      console.error
  }
}

const getCityLocationDetails = async () => {
  let city = document.getElementById('changecity').value

  try {
      const weather = await getWeatherData(city); 
      console.log(weather); 
  } catch (error) {
      console.log(error); 
  }

  window.location.href = "#"
}