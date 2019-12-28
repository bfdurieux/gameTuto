window.addEventListener('load', ()=> {
    let longitudeCoords;
    let latitudeCoords;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            longitudeCoords = position.coords.longitude;
            latitudeCoords = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/4f663524a0060ff5b4edb6cd335486fc/${latitudeCoords},${longitudeCoords}`;
            
            fetch(api)//not allowed on localhost without cors-anywhere api
                .then(response => {//gets api data asynchronously
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    const{temperature, summary, icon} = data.currently;//pulls data from darksky api that you want to access later
                    
                    //Set DOM elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone.replace(/_/g, " ");

                    
                    setIcons(icon, document.querySelector('.icon'));
                    

                    let celcius = (temperature - 32) * (5/9);
                    
                    temperatureSection.addEventListener("click", () =>{
                        if(temperatureSpan.textContent === "°F"){
                            temperatureSpan.textContent = "°C";
                            temperatureDegree.textContent = Math.floor(celcius);
                        }else{
                            temperatureSpan.textContent = "°F";
                            temperatureDegree.textContent = temperature;
                        }
                    })
                })  
        });   
    }

    function setIcons(icon, iconID){
        const skycons =  new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});