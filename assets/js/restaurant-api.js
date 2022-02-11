// RESTAURANT API CALL
var apiKey = "8f375f78cfmshc8b558ca44d4980p13ed1ejsn240d1b3459f9";
var restaurantEl = document.querySelector("#restaurant"); //results container

// ZIP CODE SEARCH FUNCTION
var searchBtn = document.querySelector("#submit");
var zipcode = document.querySelector("#zip");

searchBtn.addEventListener("click", function () {
  var zipcode = document.querySelector("#zip");

  //unhide food choices
  if (zipcode.value) {
    var unhideFoodChoices = document.getElementById(
      "restaurant-results-container"
    );
    unhideFoodChoices.classList.remove("hide");
    generateGeocode(zipcode.value);
    displayZips(zipcode);

    zipcode.value = "";
  }
});

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

// RESTAURANT RESULTS FUNCTIONS
var restaurantArrayCategory = []; //modal generation

// POPULATE RESTAURANT RESULTS TO CONTAINER
displayRestaurants = function (data) {
  // CLEAR CONTAINER
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
    categoryBtn.setAttribute("class", "btn, restaurant-btn, hoverable");
    categoryBtn.textContent = categoriesArray[i];
    categoryBtn.addEventListener("click", function (event) {
      restaurantNames(event);
    });
  }

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

          // RESTAURANT RESULTS
          var restaurantContainer = document.createElement("div");
          restaurantEl.appendChild(restaurantContainer);
          restaurantContainer.setAttribute(
            "class",
            "restaurant-result hoverable"
          );

          // RESTAURANT MODAL TRIGGER
          var restaurant = document.createElement("button");
          restaurant.innerHTML = restaurantObject.name; //populate results by name
          restaurant.setAttribute("class", "btn modal-trigger restaurant-btn");
          restaurant.setAttribute("href", "#restaurant-modal");
          restaurant.setAttribute("id", [i]);
          restaurantContainer.appendChild(restaurant);
          restaurant.addEventListener("click", function (event) {
            displayModal(event);
          });
        }
      }
    }
  };
};

// RESTAURANT MODALS
var displayModal = function (event) {
  for (var i = 0; i < restaurantArrayCategory.length; i++) {
    if (restaurantArrayCategory[i].name === event.target.textContent) {
      // MODAL CONTENTS
      var name = restaurantArrayCategory[i].name;
      var address = restaurantArrayCategory[i].address;
      var imgSrc = restaurantArrayCategory[i].imgSrc;
      var phone = restaurantArrayCategory[i].phone;
      var website = restaurantArrayCategory[i].website;

      var img = document.createElement("img");
      img.src = imgSrc;
      img.setAttribute("class", "restaurant-img");
      img.setAttribute("id", "restaurant-img");

      var modalEl = document.querySelector("#restaurant-modal");
      modalEl.innerHTML =
        '<center><div class="modal-content"><h4>' + name + "</h4></center>";
      modalEl.appendChild(img);
      modalEl.insertAdjacentHTML(
        "beforeend",
        "<center><p>" +
          address +
          "</p><p>" +
          phone +
          "</p><p>" +
          '<a href="' +
          website +
          '">' +
          website +
          "</a></p></center>"
      );
    }
  }
};
