//SET RESTAURANT CONTAINER EQUAL TO MOVIE CONTAINER
var movieHeight = document.getElementById("movie").style.height;
var restaurantHeight = document.getElementById("restaurant").style.height;

if (restaurantHeight < movieHeight) {
  restaurantHeight = movieHeight;
}

//ON ANY BUTTON CLICK, UNHIDE RESULTS
var resultsContainer = document.querySelector("#results-container");
document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", event => {
    resultsContainer.classList.remove("hide");
  })
})

// CHECKS LOCAL STORAGE FOR ZIP CODE SEARCH HISTORY & AUTO-POPULATES ALL EXISTING ZIP CODES AS BUTTONS
var zipSearchContainerEl = document.querySelector("#zip-list");
var localStorageGetZipCodes = "zip-code-list";
var zipCodeArray;
if (localStorage.getItem(localStorageGetZipCodes)) {
  zipCodeArray =
    JSON.parse(localStorage.getItem(localStorageGetZipCodes)) || [];
  zipCodeArray.forEach((element) => {
    var zipEl = document.createElement("li");
    zipEl.classList = "btn zip-btn zip-btn:hover col-lg-3 col-md-3 col-sm-12";
    zipEl.textContent = element;
    zipEl.addEventListener("click", function (event) {
      var unhideFoodChoices = document.getElementById("restaurant-results-container");
          unhideFoodChoices.classList.remove("hide");
      generateGeocode(event.target.textContent);
    });
    zipSearchContainerEl.appendChild(zipEl);
  });
  var unhideClearButton = document.getElementById("clear");
      unhideClearButton.classList.remove("hide");
} else {
  zipCodeArray = [];
}

// DISPLAY SEARCHED ZIP CODES AS BUTTONS WITHOUT REPEATING ZIP CODES ALREADY SEARCHED
var displayZips = function(zipcode) {
    var unhideClearButton = document.getElementById("clear");
        unhideClearButton.classList.remove("hide");
  let inArray = false;
  for (let i = 0; i < zipCodeArray.length; i++) {
    if (zipCodeArray[i] === zipcode.value) {
      inArray = true;
    }
  }
  if (!inArray) {
    zipCodeArray.push(zipcode.value);
    var zipEl = document.createElement("li");
    zipEl.classList = "btn zip-btn zip-btn:hover col-lg-3 col-md-3 col-sm-12";
    zipEl.textContent = zipcode.value;
    zipEl.addEventListener("click", function (event) {
      generateGeocode(event.target.textContent);
    });
    zipSearchContainerEl.appendChild(zipEl);
    localStorage.setItem(localStorageGetZipCodes, JSON.stringify(zipCodeArray));
    console.log(zipEl);
    console.log(zipCodeArray);
  }
};

// 'CLEAR SEARCH HISTORY' BUTTON FUNCTIONS
var clearSearch = document.querySelector("#clear");

var clearHistory = function() {
  var hideClearButton = document.getElementById("clear");
  hideClearButton.classList.add("hide");
  localStorage.clear();
  document.location.reload(true);
};

clearSearch.addEventListener("click", clearHistory);
