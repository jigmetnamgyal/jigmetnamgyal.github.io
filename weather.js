// const showTime = () => {
//     const dateObject = new Date()

//     let formattedString = dateObject.getHours() + ":" + dateObject.getMinutes() + ":" + dateObject.getSeconds()
//     document.getElementById("time").innerHTML = formattedString;
// }

// setInterval(showTime, 1000);

window.onload = () => {
  getDetailForCurrentLocation();
}

const getWeatherData = async (city) => {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7f0485700e5e455faf216f5cf7c38659&units=metric`
		);
		return await response.json();
	} catch (error) {
		console.error;
	}
};

const getWeatherWithCoordinates = async (latitude, longitude) => {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7f0485700e5e455faf216f5cf7c38659&units=metric`
		);
		return await response.json();
	} catch (error) {
		console.error;
	}
};

const success = async (pos) => {
	const coordinates = pos.coords;

  try {
		const data = await getWeatherWithCoordinates(coordinates.latitude, coordinates.longitude);
		changeHtmlContent(data);
	} catch (error) {
		console.log(error);
	}
};

const error = (err) => {
	console.log(err.message);
};

const getDetailForCurrentLocation = () => {
	const options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};

	if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, options)
	} else {
		alert("Geolocation is not supported by this browser.");
	}
};

const getDetailsFromCoordinates = async () => {
	let latitude = document.getElementById("changeLat").value;
	let longitude = document.getElementById("changeLong").value;

	try {
		const data = await getWeatherWithCoordinates(latitude, longitude);
		console.log(data);
		changeHtmlContent(data);
	} catch (error) {
		console.log(error);
	}
};

const getCityLocationDetails = async () => {
	let city = document.getElementById("change-city").value;

	try {
		const data = await getWeatherData(city);
		changeHtmlContent(data);
	} catch (error) {
		console.log(error);
	}
};

const windDirection = (degree) => {
	if (degree > 337.5) {
		return "northern";
	}
	if (degree > 292.5) {
		return "northwestern";
	}
	if (degree > 247.5) {
		return "west";
	}
	if (degree > 202.5) {
		return "southwestern";
	}
	if (degree > 157.5) {
		return "southern";
	}
	if (degree > 122.5) {
		return "southeastern";
	}
	if (degree > 67.5) {
		return "eastern";
	}
	if (degree > 22.5) {
		return "northeastern";
	}
	return "northern";
};

const changeHtmlContent = (data) => {
	window.location.href = "#";
	document.getElementById("main-temp").innerHTML = `${data.main.temp}°C`;
	document.getElementById("humidity").innerHTML = `${data.main.humidity}%`;

	document.getElementById(
		"pressure"
	).innerHTML = `${data.main.pressure} Pascal`;

	document.getElementById(
		"min-temp-value"
	).innerHTML = `${data.main.temp_min}°C`;

	document.getElementById(
		"max-temp-value"
	).innerHTML = `${data.main.temp_max}°C`;

	document.getElementById("wind-speed").innerHTML = `${
		data.wind.speed
	} m/s ${windDirection(data.wind.deg)}`;

	document.getElementById(
		"weather-description-value"
	).innerHTML = `${data.weather[0].description}`;
};
