const submit = document.getElementById('submit');

let display = document.querySelector('#display');

submit.addEventListener('click', () => {
    const location = document.getElementById('search');
    if(!location.value){
        alert('Enter the location')
        return
    }
    else{
        while(display.firstChild){
            display.removeChild(display.lastChild)
        }
        console.log(location.value)
        let value = location.value
        fetchWeatherInfo(value)

    }
})


async function fetchWeatherInfo(value) {

    let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=386052c5047e4eac94883018230406&q=${value}`, {mode: "cors"})
    let weatherData = await response.json()
    console.log(weatherData)

    if(weatherData['error']){
        alert(weatherData['error']['message'])
        return
    }
    try{
        let celcius = weatherData.current.temp_c
        let fahrenheit = weatherData.current.temp_f
    
        let div = document.createElement('div')
        div.classList.add('box')
        div.innerHTML = `
        <p style="color: #acb4f4; text-transform: uppercase; font-size: 25px;">${value.charAt(0).toUpperCase() + value.slice(1)}</p>
        <p>${celcius}°C</p>
        <p>${fahrenheit}°F</p>
        <p>Humidity: ${weatherData.current.humidity}%</p>
        <p>${weatherData.current.condition.text}`
    
        display.appendChild(div)

    }
    catch(err){
        alert(err)
    }
}