//get all divs from html
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


//Luxon datetime setup
let DateTime = luxon.DateTime;

let currentDate = DateTime.local().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit'});
let today = DateTime.local();
let currentHr = today.get('hour');
let now = today.toLocaleString(DateTime.TIME_SIMPLE);
console.log(currentHr)
console.log(now)

//create the cards to hold the prayer times
var dayDate = document.createElement("h4");
var timeNow = document.createElement("h5");

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
theDate.appendChild(timeNow);
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
  
//fetch function to retrieve data from URL
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
      return;
    }
  })
};

//function to set retrieved data to page
function displayData (data) {
      console.log(data);
  dayDate.textContent= currentDate;
  timeNow.textContent = now;
  fheading.textContent = "Fajr";
  dheading.textContent = "Dhuhr";
  aheading.textContent = "Asr";
  mheading.textContent = "Maghrib";
  iheading.textContent = "Isha";

  let timesArray = [];
  //get times and check if past or future
  let timeF = data.data.timings.Fajr;
  let timeD = data.data.timings.Dhuhr;
  let timeA = data.data.timings.Asr;
  let timeM = data.data.timings.Maghrib;
  let timeI = data.data.timings.Isha;

  timesArray.push(timeF, timeD, timeA, timeM, timeI);

  //convert times to 12 hour format, push to new array
  newArray = []
  timesArray.forEach(time => {
    time = time.split(':');
    let mTime = time[0] >= 12 && (time[0]-12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
    newArray.push(mTime)
  })
  console.log(newArray);

  fajrTime.textContent = `${newArray[0]}`;
  dhuhrTime.textContent = `${newArray[1]}`;
  asrTime.textContent = `${newArray[2]}`;
  maghribTime.textContent = `${newArray[3]}`;
  ishaTime.textContent = `${newArray[4]}`;

}

//window.addEventListener('onload', getTimes('New York', 'USA'));