
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
        input.value = '';

        // Lägger in min URL 
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&appid=${apiKey}`;

        // Skapar en fetch-funktion
        fetch(url).then(
            function(response){
                // Respons innehåller information om hur det har gått
                console.log(response);

                if(response.status >= 200 && response.status < 300){
                    return response.json();
                } else if(response.status === 404){
                    alert('Staden kunde inte hittas, vänligen försök igen');
                    throw 'Staden kunde inte hittas, vänligen försök igen';
                }else if(response.status === 401){
                    alert('Fel API-nyckel');
                    throw response.status, 'Fel API-nyckel';
                }
                
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
                let text = document.querySelectorAll('p');
                let temprationText = text[1];
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

                //Lägger på en if-statment på tempratur paragrafen. Texten ändrar färg beroende på graderna i den valda staden.
                if(tempRound <= 5){
                    temprationText.style.color = 'blue';
                }else if(tempRound >= 6 && tempRound <= 10){
                    temprationText.style.color = 'lightblue';
                }else if(tempRound >= 11 && tempRound <= 20){
                    temprationText.style.color = 'yellow';
                }else if(tempRound >= 21 && tempRound <= 25){
                    temprationText.style.color = 'orange';
                }else {
                    temprationText.style.color = 'red';
                }

                // Skapar en click-eventlistner och kallar på min resetData funktion.
                input.addEventListener('click', resetData);  
            }

        ).catch(
            function(error){
                // Om staden inte finns kommer ett felmeddelande
                
                alert('Staden kunde inte hittas, försök igen');
                console.log('error');
            }
        )
}
);

// Skapar en function som resetar informationen på hemsidan när användaren klickar på input.
function resetData(){

    // Selectar description, h6 elementet och ändrar värdet till null
    let descriptionBoxText = document.querySelector('.description h6');
    descriptionBoxText.innerText = null;

    // Selectar mitt iconElement och ändrar värdet till null så att iconen försvinner när jag vill göra en ny sökning.
    let weatherIcon = document.querySelector('.weather-icon img');
    let iconImg = null;
    let iconUrl = `http://openweathermap.org/img/wn/${iconImg}@2x.png`;
    weatherIcon.src = iconUrl;

    // Selectar mitt temperatur-element och ändrar värdet till null.
    let tempration = document.querySelector('.tempration h6');
    let tempBox = null;
    let tempRound = Math.round(tempBox);
    tempration.innerText = null;

    // Selectar mitt wind-element och ändrar värdet till null
    let wind = document.querySelector('.wind h6');
    wind.innerText = null;

    // Selectar mitt humidity-element och ändrar värdet till null
    let luftfuktigheten = document.querySelector('.humidity h6');
    luftfuktigheten.innerText = null;

    //Selectar mitt timezone-element och ändrar värdet till null
    let timeZone = document.querySelector('.timezone h6');
    timeZone.innerText = null;

    //Selectar mitt input element och ändrar värdet till null.
    let input = document.querySelector('input');
    let inputCity = null;
    h2.innerText = inputCity;
    input.value = '';
}