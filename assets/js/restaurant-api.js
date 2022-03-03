const restaurantContainer = document.querySelector(
  "#restaurant-results-container"
);
const restaurantCategoryContainer = document.querySelector(
  "#restaurant-category-container"
);
const restaurantNameContainer = document.querySelector(
  "#restaurant-name-container"
);
const zipSearchContainer = document.querySelector("#zip-search-container");
const restaurantApiKey = "c449a8d1b1mshcbe3ee310732590p115c8ejsn3b8d1f48601a";

// USE COORDINATES OBTAINED FROM GEOCODE API CALL TO MAKE TRAVEL ADVISOR API CALL
function getRestaurants(location) {
  const bl_latitude = location[0].boundingbox[0]; //bottom left latitude
  const tr_latitude = location[0].boundingbox[1]; //top right latitude
  const bl_longitude = location[0].boundingbox[2]; //bottom left longitude
  const tr_longitude = location[0].boundingbox[3]; //top right longitude

  const apiUrl =
    "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary?bl_latitude=" +
    bl_latitude +
    "&tr_latitude=" +
    tr_latitude +
    "&bl_longitude=" +
    bl_longitude +
    "&tr_longitude=" +
    tr_longitude +
    "&restaurant_tagcategory_standalone=10591&restaurant_tagcategory=10591&limit=30&currency=USD&open_now=true&lunit=mi&lang=en_US";

  fetch(apiUrl, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
      "x-rapidapi-key": restaurantApiKey,
    },
  }).then(function (response) {
    response.json().then(function (data) {
      displayRestaurants(data);
    });
  });
}

// GEOCODING API CALL FOR ZIP CODE INFORMATION
function generateGeocode(zipcode) {
  var geocodeApiUrl =
    "https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?postalcode=" +
    zipcode +
    "&country=USA&accept-language=en&polygon_threshold=0.0";

  fetch(geocodeApiUrl, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
      "x-rapidapi-key": restaurantApiKey,
    },
  }).then(function (response) {
    response.json().then(function (location) {
      getRestaurants(location);
    });
  });
}

// POPULATE RESTAURANT RESULTS TO CONTAINER
function displayRestaurants(data) {
  var restaurantArray = data.data;

  // GENERATE CATEGORIES
  var categoriesArray = [];
  for (var i = 0; i < Object.keys(restaurantArray).length; i++) {
    if (
      restaurantArray[i].cuisine != undefined &&
      Object.keys(restaurantArray[i].cuisine).length != 0
    ) {
      var categories = restaurantArray[i].cuisine[0].name;
      if (categoriesArray.includes(categories) === false) {
        categoriesArray.push(categories);
      }
    }
  }

  // GENERATE CATEGORY BUTTONS
  for (var i = 0; i < categoriesArray.length; i++) {
    var categoryBtn = document.createElement("button");
    categoryBtn.setAttribute(
      "class",
      "btn btn-outline-secondary m-1 w-50 restaurant-btn"
    );
    categoryBtn.textContent = categoriesArray[i];
    restaurantCategoryContainer.appendChild(categoryBtn);
    categoryBtn.addEventListener("click", restaurantNames);
  }

  // GENERATE RESTAURANT CARDS
  function restaurantNames(event) {
    for (var i = 0; i < restaurantArray.length; i++) {
      if (
        restaurantArray[i].cuisine[0].name &&
        restaurantArray[i].cuisine[0].name == event.target.textContent
      ) {
        // create cards
        var restaurantName = restaurantArray[i].name;
        var restaurantImg = restaurantArray[i].photo.images.small.url;
        var restaurantCard = document.createElement("div");
        restaurantCard.setAttribute("data-restaurant-index", i);
        restaurantCard.setAttribute(
          "class",
          "card m-3 restaurant-category-btn"
        );
        restaurantCard.setAttribute("style", "width: 18rem;");
        restaurantCard.innerHTML = `
              <img class="card-img-top crop" src="${restaurantImg}" alt="Photo of ${restaurantName}">
              <h5 class="card-title">${restaurantName}</h5>
              </div>
              `;
        //hide buttons
        restaurantCategoryContainer.setAttribute("class", "hide");
        //generate on page
        restaurantNameContainer.appendChild(restaurantCard);
        //modal trigger
        restaurantCard.addEventListener("click", displayModal);
      }
    }
  }

  // RESTAURANT MODALS
  function displayModal(event) {
    const index =
      event.target.getAttribute("data-restaurant-index") ||
      event.target.parentNode.getAttribute("data-restaurant-index");
    const restaurant = restaurantArray[index];

    var restaurantName = restaurant.name;
    var restaurantAddress = restaurant.address;
    var phone = restaurant.phone;
    var website = restaurant.website;

    var markup = `
    <p>
    <li>${restaurantAddress}</li>
    <li>${phone}</li>
    <li><a href="${website}>${website}</a></li>
    </ul>
    </p>`;

    var modal = document.getElementById("restaurant-modal");
    var title = modal.getElementsByClassName("modal-title")[0];
    var body = modal.getElementsByClassName("modal-body")[0];
    title.textContent = restaurantName;
    body.innerHTML = markup;

    $("#restaurant-modal").modal("show");
  }
}

// ZIP CODE HISTORY
var localStorageGetZipCodes = "zip-code-list";

if (localStorage.getItem(localStorageGetZipCodes)) {
  zipCodeArray =
    JSON.parse(localStorage.getItem(localStorageGetZipCodes)) || [];

  zipCodeArray.forEach((element) => {
    var zipEl = document.createElement("button");
    //styling
    zipEl.classList = "zip-history btn btn-light";
    zipEl.textContent = element;
    //generate results onclick
    zipEl.addEventListener("click", function (event) {
      resultsContainer.classList.remove("hide");
      generateGeocode(event.target.textContent);
    });
    zipSearchContainer.appendChild(zipEl);
  });

  var unhideClearButton = document.getElementById("clear");
  unhideClearButton.classList.remove("hide");
} else {
  zipCodeArray = [];
}

// DISPLAY SEARCHED ZIP CODES AS BUTTONS WITHOUT REPEATING ZIP CODES ALREADY SEARCHED
var displayZips = function (zipcode) {
  //clear search history button
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
    var zipEl = document.createElement("button");
    //styling
    zipEl.classList = "btn btn-light";
    zipEl.textContent = zipcode.value;
    zipEl.addEventListener("click", function (event) {
      generateGeocode(event.target.textContent);
    });
    zipSearchContainer.appendChild(zipEl);
    localStorage.setItem(localStorageGetZipCodes, JSON.stringify(zipCodeArray));
  }
};

//VALIDATE ZIPCODE
var zipcode = document.querySelector("#zip"); //zip input field
var zipcodeContainer = document.querySelector("#zipcode-ask");

function isUSAZipCode(str) {
  return /^\d{5}(-\d{4})?$/.test(str);
}
var searchBtn = document.querySelector("#submit"); //zip submit button

searchBtn.addEventListener("click", function (event) {
  if (document.getElementById("error")) {
    document.getElementById("error").remove();
  }

  if (isUSAZipCode(zipcode.value)) {
    resultsContainer.classList.remove("hide");
    generateGeocode(zipcode.value);
    displayZips(zipcode);
    zipcode.value = "";
  } else {
    var error = document.createElement("div");
    error.setAttribute("id", "error");
    error.innerText = "Invalid zipcode";
    zipcodeContainer.appendChild(error);
  }
});

// 'CLEAR SEARCH HISTORY' BUTTON FUNCTIONS
var clearSearch = document.querySelector("#clear");

var clearHistory = function () {
  var hideClearButton = document.getElementById("clear");
  hideClearButton.classList.add("hide");
  localStorage.clear();
  document.location.reload(true);
};

clearSearch.addEventListener("click", clearHistory);
