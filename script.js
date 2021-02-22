var cityInput = document.querySelector("#cityInput");
var countryInput = document.querySelector("#countryInput");
var theDisplay = document.querySelector("#timesDisplay");
var mainDisplay = document.querySelector("#mainDisplay");
var hiddenSection = document.querySelector("#hiddensection");
var errorMessage = document.querySelector("#errorMessage");
var resetBtn = document.querySelector("#resetBtn");

var submitButton = document.querySelector("#citySubmit");

//create the cards to hold the prayer times
var dayDate = document.createElement("h4");
var fajrTime = document.createElement("div");
var dhuhrTime = document.createElement("div");
var asrTime = document.createElement("div");
var maghribTime = document.createElement("div");
var ishaTime = document.createElement("div");

dayDate.classList.add("text-center", "fst-italic");
fajrTime.classList.add("card", "mt-3", "mx-4", "text-center", "p-3");
dhuhrTime.classList.add("card", "mt-3", "mx-4", "text-center", "p-3");
asrTime.classList.add("card", "mt-3", "mx-4", "text-center", "p-3");
maghribTime.classList.add("card", "mt-3", "mx-4", "text-center", "p-3");
ishaTime.classList.add("card", "mt-3", "mx-4", "mb-3", "text-center", "p-3");


theDisplay.appendChild(dayDate);
theDisplay.appendChild(fajrTime);
theDisplay.appendChild(dhuhrTime);
theDisplay.appendChild(asrTime);
theDisplay.appendChild(maghribTime);
theDisplay.appendChild(ishaTime);

//added event listener to submit button to run fetch function
submitButton.addEventListener("click", function(event){
  event.preventDefault();

  var cityName = cityInput.value;
  var countryName = countryInput.value;


  if (cityName === "" || countryName === "" || Number.isInteger(cityName) || Number.isInteger(countryName)) {
     errorMessage.classList.remove("hidden");
     errorMessage.textContent = "Please enter a valid city and country name!";
     
  } else {
    errorMessage.textContent= "";
    errorMessage.classList.add("hidden");
    hiddenSection.classList.remove("hidden");


    getTimes(cityName, countryName);
  };

});

//added event listener to reset button
resetBtn.addEventListener("click", function(event) {
event.preventDefault(event);
hiddenSection.classList.add("hidden");
errorMessage.textContent= "";
errorMessage.classList.add("hidden");
cityInput.value= "";
countryInput.value = "";

});

//function to retrieve namaz times data using fetch
function getTimes (cityName, countryName) {
//create complete url from user input
var theCity = "city=" + cityName;
var theCountry = "&country=" + countryName;
var baseURL = "http://api.aladhan.com/v1/timingsByCity?";
var completeURL = baseURL + theCity + theCountry;
  
console.log(theCity);
console.log(theCountry);

fetch(completeURL)
  .then(response => {
    if (response.ok) {
      response.json()
  .then(data => {
    displayData(data);
  })
    } else {
      var noData = document.createElement("div");
      noData.classList.add("card", "m-4");
      noData.textContent = "Oh no, looks like there's no data for those search terms, please try again!"
      mainDisplay.append(noData);
      return
    }
  })
};


function displayData (data) {
      console.log(data);
  dayDate.textContent = data.data.date.readable;
  fajrTime.textContent = "Fajr: " + data.data.timings.Fajr + " EST";
  dhuhrTime.textContent = "Dhuhr: " + data.data.timings.Dhuhr + " EST";
  asrTime.textContent = "Asr: " + data.data.timings.Asr + " EST";
  maghribTime.textContent = "Maghrib: " + data.data.timings.Maghrib + " EST";
  ishaTime.textContent = "Isha: " + data.data.timings.Isha + " EST";


}