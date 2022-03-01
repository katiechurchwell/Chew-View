var apiKey = "c449a8d1b1mshcbe3ee310732590p115c8ejsn3b8d1f48601a"; //My api key
var resultsContainer = document.querySelector("#results-container"); //all results container
var restaurantEl = document.querySelector("#restaurant-results-container"); //restaurant results container
var zipSearchContainerEl = document.querySelector("#zip-search-container"); //zip history container
var localStorageGetZipCodes = "zip-code-list";
var searchBtn = document.querySelector("#submit"); //zip submit button
var zipcode = document.querySelector("#zip"); //zip input field

//REFORMAT LAYOUT ON SUBMIT
function reformatLayout() {
  const hero = document.querySelector(".hero");
  const title = document.querySelector(".title");
  const zipcodeLabel = document.querySelector("#zipcode-label");
  hero.style.display = "none";
  title.style.display = "none";
  zipcodeLabel.style.display = "none";
}

// USE COORDINATES OBTAINED FROM GEOCODE API CALL TO MAKE TRAVEL ADVISOR API CALL
getRestaurants = function (location) {
  var bl_latitude = location[0].boundingbox[0]; //bottom left latitude
  var tr_latitude = location[0].boundingbox[1]; //top right latitude
  var bl_longitude = location[0].boundingbox[2]; //bottom left longitude
  var tr_longitude = location[0].boundingbox[3]; //top right longitude

  var apiUrl =
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
      "x-rapidapi-key": apiKey,
    },
  }).then(function (response) {
    response.json().then(function (data) {
      displayRestaurants(data);
    });
  });
};

// GEOCODING API CALL FOR ZIP CODE INFORMATION
generateGeocode = function (zipcode) {
  var geocodeApiUrl =
    "https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?postalcode=" +
    zipcode +
    "&country=USA&accept-language=en&polygon_threshold=0.0";

  fetch(geocodeApiUrl, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
      "x-rapidapi-key": apiKey,
    },
  }).then(function (response) {
    response.json().then(function (location) {
      getRestaurants(location);
    });
  });
};

// RESTAURANT RESULTS FUNCTIONS

// POPULATE RESTAURANT RESULTS TO CONTAINER
displayRestaurants = function (data) {
  //reformat layout
  reformatLayout();
  // clear container
  restaurantEl.innerHTML = "";
  var restaurantArray = data.data;

  // GENERATE FOOD CATEGORIES
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

  // GENERATE FOOD CATEGORY BUTTONS
  for (var i = 0; i < categoriesArray.length; i++) {
    var categoryBtn = document.createElement("button");
    restaurantEl.appendChild(categoryBtn);
    categoryBtn.setAttribute(
      "class",
      "btn btn-outline-secondary m-1 restaurant-btn"
    );
    categoryBtn.setAttribute("font-family", "Open Sans");
    categoryBtn.textContent = categoriesArray[i];
    categoryBtn.addEventListener("click", function (event) {
      restaurantNames(event);
    });
  }

  // RESTAURANT MODALS
  var restaurantArrayCategory = [];

  var displayModal = function (event) {
    for (var i = 0; i < restaurantArrayCategory.length; i++) {
      if (restaurantArrayCategory[i].name === event.target.textContent) {
        var modalData = new Object();
        modalData.name = restaurantArray[i].name;
        modalData.address = restaurantArray[i].address;
        modalData.imgSrc = restaurantArray[i].photo.images.small.url;
        modalData.phone = restaurantArray[i].phone;
        modalData.website = restaurantArray[i].website;
      }
    }
    // MODAL CONTENTS
    var name = modalData.name;
    var address = modalData.address;
    var imgSrc = modalData.imgSrc;
    var phone = modalData.phone;
    var website = modalData.website;

    const modalItem = document.getElementById("restaurant-modal");

    modalItem.innerHTML = "";
    modalItem.innerHTML = `
        <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">${name}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <img src="${imgSrc}" alt="Photo of ${name}">
        <center>
        <ul>
        <li>${address}</li>
        <li>${phone}</li>
        <li><a href="${website}>${website}</a></li>
        </ul>
        </center>
        </div>
        </div>
        </div>
        `;

    new bootstrap.Modal(modalItem).show();
  };

  // GENERATE RESTAURANT SUGGESTION RESULTS
  restaurantNames = function (event) {
    // CLEAR CONTENTS
    restaurantEl.innerHTML = "";
    for (var i = 0; i < Object.keys(restaurantArray).length; i++) {
      if (
        restaurantArray[i].cuisine != undefined &&
        Object.keys(restaurantArray[i].cuisine).length != 0
      ) {
        if (restaurantArray[i].cuisine[0].name === event.target.textContent) {
          //
          var restaurantObject = new Object();
          restaurantObject.name = restaurantArray[i].name;
          restaurantObject.address = restaurantArray[i].address;
          restaurantObject.imgSrc = restaurantArray[i].photo.images.small.url;
          restaurantObject.phone = restaurantArray[i].phone;
          restaurantObject.website = restaurantArray[i].website;

          restaurantArrayCategory.push(restaurantObject);

          // RESTAURANT MODAL TRIGGER
          var restaurant = document.createElement("button");
          restaurant.innerHTML = restaurantObject.name; //populate results by name
          restaurant.setAttribute(
            "class",
            "btn btn-outline-secondary m-1 restaurant-btn"
          );
          restaurant.setAttribute("data-bs-toggle", "modal"); //modal trigger
          restaurant.setAttribute("data-bs-target", "#restaurant-modal"); //modal link
          restaurantEl.appendChild(restaurant);
          restaurant.addEventListener("click", function (event) {
            // displayModal(event);
          });
        }
      }
    }
  };
};

// ZIP CODE SEARCH FUNCTION
// ZIP CODE HISTORY
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
    zipSearchContainerEl.appendChild(zipEl);
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
    zipSearchContainerEl.appendChild(zipEl);
    localStorage.setItem(localStorageGetZipCodes, JSON.stringify(zipCodeArray));
  }
};

//VALIDATE ZIPCODE
function isUSAZipCode(str) {
  return /^\d{5}(-\d{4})?$/.test(str);
}

searchBtn.addEventListener("click", function (event) {
  if (zipcode.value) {
    resultsContainer.classList.remove("hide");
    generateGeocode(zipcode.value);
    displayZips(zipcode);

    zipcode.value = "";
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
