var cityInput = document.querySelector("#cityInput");
var countryInput = document.querySelector("#countryInput");
var theDisplay = document.querySelector("#timesDisplay");
var mainDisplay = document.querySelector("#mainDisplay");
var hiddenSection = document.querySelector("#hiddensection");
var errorMessage = document.querySelector("#errorMessage");
var resetBtn = document.querySelector("#resetBtn");
var theDate = document.querySelector("#theDate");
var fcol = document.querySelector("#fajr");
var dcol = document.querySelector("#dhuhr");
var acol = document.querySelector("#asr");
var mcol = document.querySelector("#maghrib");
var icol = document.querySelector("#isha");


var submitButton = document.querySelector("#citySubmit");

//create the cards to hold the prayer times
var dayDate = document.createElement("h4");

var fajrTime = document.createElement("div");
var dhuhrTime = document.createElement("div");
var asrTime = document.createElement("div");
var maghribTime = document.createElement("div");
var ishaTime = document.createElement("div");

var fheading = document.createElement("div");
var dheading = document.createElement("div");
var aheading = document.createElement("div");
var mheading = document.createElement("div");
var iheading = document.createElement("div");

var fcard = document.createElement("div");
var dcard = document.createElement("div");
var acard = document.createElement("div");
var mcard = document.createElement("div");
var icard = document.createElement("div");

fheading.classList.add("card-header", "text-center", "p-3", "myHeading", "fs-3");
dheading.classList.add("card-header", "text-center", "p-3", "myHeading", "fs-3");
aheading.classList.add("card-header", "text-center", "p-3", "myHeading", "fs-3");
mheading.classList.add("card-header", "text-center", "p-3", "myHeading", "fs-3");
iheading.classList.add("card-header", "text-center", "p-3", "myHeading", "fs-3");

fajrTime.classList.add("card-body", "fs-3");
dhuhrTime.classList.add("card-body", "fs-3");
asrTime.classList.add("card-body", "fs-3");
maghribTime.classList.add("card-body", "fs-3");
ishaTime.classList.add("card-body", "fs-3");

fcard.classList.add("card", "text-center", "h-100", "mainCard");
dcard.classList.add("card", "text-center", "h-100", "mainCard");
acard.classList.add("card", "text-center", "h-100", "mainCard");
mcard.classList.add("card", "text-center", "h-100", "mainCard");
icard.classList.add("card", "text-center", "h-100", "mainCard");

fcard.appendChild(fheading);
dcard.appendChild(dheading);
acard.appendChild(aheading);
mcard.appendChild(mheading);
icard.appendChild(iheading);

fcard.appendChild(fajrTime);
dcard.appendChild(dhuhrTime);
acard.appendChild(asrTime);
mcard.appendChild(maghribTime);
icard.appendChild(ishaTime);


theDate.appendChild(dayDate);
fcol.appendChild(fcard);
dcol.appendChild(dcard);
acol.appendChild(acard);
mcol.appendChild(mcard);
icol.appendChild(icard);

//added event listener to submit button to run fetch function
submitButton.addEventListener("click", function(event){
  event.preventDefault();

  var cityName = cityInput.value;
  var countryName = countryInput.value;


  if (cityName === "" || countryName === "") {
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
var baseURL = "https://api.aladhan.com/v1/timingsByCity?";
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
  fheading.textContent = "Fajr";
  dheading.textContent = "Dhuhr";
  aheading.textContent = "Asr";
  mheading.textContent = "Maghrib";
  iheading.textContent = "Isha";
  fajrTime.textContent = data.data.timings.Fajr + " EST";
  dhuhrTime.textContent = data.data.timings.Dhuhr + " EST";
  asrTime.textContent = data.data.timings.Asr + " EST";
  maghribTime.textContent = data.data.timings.Maghrib + " EST";
  ishaTime.textContent = data.data.timings.Isha + " EST";


}