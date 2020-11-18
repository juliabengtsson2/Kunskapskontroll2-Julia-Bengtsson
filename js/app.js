
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


        fetch(url).then(
            function(response){
                console.log(response);
                return response.json();
                changeColor();
            }
        ).then(
            function(data){
                console.log(data)

                // Description
                //Selectar mina element och letar fram data för description.
                let descriptionBoxText = document.querySelector('.description h6');
                descriptionBoxText.innerText = data.weather[0].description;
 
                // Weather-icon
                // Selectar mina element, letar upp data för iconen. Lägger till en url för iconerna . 
                let weatherIcon = document.querySelector('.weather-icon img');
                let iconImg = data.weather[0].icon;
                let iconUrl = `http://openweathermap.org/img/wn/${iconImg}@2x.png`;
                weatherIcon.src = iconUrl;

                // Temperatur
                // Selectar elementen och letar fram data för temperaturen. Avrundar graderna till ett heltal.
                let tempration = document.querySelector('.tempration h6');
                let tempBox = data.main.temp;
                let tempRound = Math.round(tempBox);
                tempration.innerText = `${tempRound} celsius `;

                // Vindhastigheten
                // Selectar elementen och letar fram data för vindhastigheten
                let wind = document.querySelector('.wind h6');
                wind.innerText = `${data.wind.deg} m/s `;

                // Luktfuktigheten
                // Selectar elementen och letar fram data för luktfuktigheten
                let luftfuktigheten = document.querySelector('.humidity h6');
                luftfuktigheten.innerText = `${data.main.humidity} %`;

                //Timezone
                // Selectar mina element och letar fram data för timezone.
                let timeZone = document.querySelector('.timezone h6');
                timeZone.innerText = data.timezone;

                
            }
        ).catch(
            function(error){
                alert('Staden kunde inte hittas, försök igen');
            }
        )

}
);

function changeColor(){
    let wind = document.querySelector('.wind');

    if(tempRound <= 20){
        wind.style.backgroundColor = 'ljusblå';
    }
}
