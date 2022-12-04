// on window load I get the data for the current user location
window.onload = () => {
	getDetailForCurrentLocation();
};

// Using the open weather api to fetch the details of weather using city name
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

// Using the open weather api to fetch the details of weather using coordinates
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

// Using the rest countries api to fetch the details of country
const getCountry = async (country) => {
	try {
		const countryDetails = await fetch(
			`https://restcountries.com/v3.1/alpha/${country}`
		);
		return await countryDetails.json();
	} catch (error) {
		console.error;
	}
};

// this will get and set the data obtained from the api
const getCityLocationDetails = async () => {
	let city = document.getElementById("change-city").value;

	try {
		const data = await getWeatherData(city);
		changeHtmlContent(data);
	} catch (error) {
		console.log(error);
	}
};

// this will get and set the data obtained from the api
const getDetailsFromCoordinates = async () => {
	let latitude = document.getElementById("changeLat").value;
	let longitude = document.getElementById("changeLong").value;

	try {
		const data = await getWeatherWithCoordinates(latitude, longitude);
		changeHtmlContent(data);
	} catch (error) {
		console.log(error);
	}
};

// this will get and set the data obtained from the api
const getDetailForCurrentLocation = () => {
	const options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(success, error, options);
	} else {
		alert("Geolocation is not supported by this browser.");
	}
};

// this will will execute when there is success use of geolocation
const success = async (pos) => {
	const coordinates = pos.coords;

	try {
		const data = await getWeatherWithCoordinates(
			coordinates.latitude,
			coordinates.longitude
		);
		changeHtmlContent(data);
	} catch (error) {
		console.log(error);
	}
};

const error = (err) => {
	console.log(err.message);
};

const changeHtmlContent = async (data) => {
	window.location.href = "#";

	let country = await getCountry(data.sys.country);
	let mainTemp = `${data.main.temp}°C`
	let humidity = `${data.main.humidity}%`
	let pressure = `${data.main.pressure} Pascal`
	let minTemp = `${data.main.temp_min}°C`
	let maxTemp = `${data.main.temp_max}°C`
	let feelLike = `${data.main.feels_like}°C`
	let windInfo = `${data.wind.speed} m/s ${windDirection(data.wind.deg)} (${data.wind.deg}°)`
	let weatherDesc = `${data.weather[0].description}`
	let weatherType = `${data.weather[0].main}`
	let countryNameInfo = `${country[0].name.official}, ${data.sys.country}`
	let countryName = `${country[0].name.official}`
	let time = `${unixTimeConverter(data.dt)}`

	setInnerHtml("main-temp", mainTemp);
	setInnerHtml("humidity", humidity);
	setInnerHtml("pressure",  pressure);
	setInnerHtml("min-temp-value", minTemp);
	setInnerHtml("max-temp-value", maxTemp);
	setInnerHtml("real-feel-value", feelLike);
	setInnerHtml("wind-speed", windInfo);

	setInnerHtml("weather-description-value", weatherDesc);
	setInnerHtml("weather-type", weatherType);
	setInnerHtml("place-name", countryNameInfo);
	setInnerHtml("country-name", countryName);
	setInnerHtml("date-time-country", time);
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

const unixTimeConverter = data => {
    let unix_timestamp = data; 
    var date = new Date(unix_timestamp * 1000); 
    return date; 
}

const setInnerHtml = (className, value) => {
    document.getElementById(className).innerHTML = value;
}
