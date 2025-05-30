let lastSearchedCity = null;

async function fetchData(name) {
    let disBtn=document.getElementById("search");
    disBtn.disabled = true;
    disBtn.textContent = "Loading...";
    try{
        let uri=`http://api.weatherapi.com/v1/current.json?key=${sessionStorage.getItem("key")}&q=${encodeURIComponent(name)}&aqi=no`;
        let response=await fetch(uri);
        if(!response.ok){
            showError("ErrorMessage","Invalid city name");
        }else{
            lastSearchedCity=name;
            let data = await response.json();
            postAnswer(data);
        }
    }
    catch (error){
        showError("ErrorMessage","Something went wrong");
    } finally {
        disBtn.disabled = false;
        disBtn.textContent = "Search";
    }
}

function postAnswer(data){
    const contImage = document.getElementById("image");
    contImage.replaceChildren(); 
    const image = document.createElement("img"); 
    image.src = "https:" + data.current.condition.icon; //replace with other icons
    image.alt = data.current.condition.text;
    image.className = "img-fluid";
    image.width = 100;
    contImage.appendChild(image);

     // City Information
    document.getElementById("CityName").innerHTML = `
        ${data.location.name}, ${data.location.region}, ${data.location.country}
        <small class="text-muted d-block">${data.location.localtime}</small>`;

    // Weather Details
    const weatherDetails = document.getElementById("information");
    weatherDetails.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <p><strong>Condition:</strong> ${data.current.condition.text}</p>
                <p><strong>Temperature:</strong> ${data.current.temp_c}°C (${data.current.temp_f}°F)</p>
                <p><strong>Feels Like:</strong> ${data.current.feelslike_c}°C (${data.current.feelslike_f}°F)</p>
                <p><strong>Coordinates:</strong> ${data.location.lat}, ${data.location.lon}</p>
            </div>
            <div class="col-md-6">
                <p><strong>Wind:</strong> ${data.current.wind_kph} kph (${data.current.wind_mph} mph) ${data.current.wind_dir}</p>
                <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
                <p><strong>Pressure:</strong> ${data.current.pressure_mb} mb (${data.current.pressure_in} in)</p>
                <p><strong>UV Index:</strong> ${data.current.uv}</p>
            </div>
        </div>`;
}

const searchCity = document.getElementById("searchForm");
searchCity.addEventListener("submit",(e)=>{
    const city=document.getElementById("city");
    const cityText = city.value.trim();
    if(cityText!=""){
        fetchData(cityText);
    }
    else {
        showError("ErrorMessage","Please enter the name of the city");
    }
});


function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  
  setTimeout(() => {
    hideError(elementId);
  }, 5000);
}

function hideError(elementId) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.style.display = 'none';
  }
}

function weatherRefresh(intervalMs = 120000) { //every 2 min - 120000
  setInterval(() => {
    if (lastSearchedCity) {
      fetchData(lastSearchedCity);
    }
  }, intervalMs);
}


weatherRefresh();
//api key
sessionStorage.setItem("key","<>");