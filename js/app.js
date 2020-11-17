
// Min API nyckel
const apiKey = '936e6b19657ee354a8b03c7716352395';

// Selectar body
const body = document.querySelector('body');
// Selectar form-elementet, input-elementet.
let formWeather = document.querySelector('#search-content');
// Selectar första h2-elementet
let h2Element = document.querySelectorAll('h2');
let h2 = h2Element[0];

// Lägger på en eventlistner som händer när användaren klickar på sök (submit).
formWeather.addEventListener('submit',
    //Skapar en function
    function selectCity(event){
        event.preventDefault();

        //Selectar input-elementet, lägger till input.value i mitt h2-element. 
        let input = document.querySelector('input');
        let inputCity = input.value;
        h2.innerText = inputCity;

        // Lägger in min URL 
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&appid=${apiKey}`;

        
        // Description
        let descriptionBoxText = document.querySelector('.discription');
        descriptionBoxText.innerText = data.weather[0].description;
 
        // Weather-icon
        let weatherIcon = document.querySelector('.weather-icon');
        let iconImg = data.weather[0].icon;
        let iconUrl = `http://openweathermap.org/img/wn/${iconImg}@2x.png`;
 
        weatherIcon.src = iconUrl;

}
);
