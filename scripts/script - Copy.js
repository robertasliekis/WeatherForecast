var input = document.querySelector(".input-field");
var button = document.querySelector(".button-submit");
var city = "vilnius";
var units = "metric";
var dataQuantity = 40;
var dayTime = 12;
var weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
var apiID = "81ad4c959750e6a355b738eec878a3fd";

var currentDate = new Date();
var currentWeekDay = currentDate.getDay() - 1;

//button.addEventListener("click", function (name) {
fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=" + units + "&cnt=" + dataQuantity + "&appid=" + apiID)
  .then((response) => response.json())
  .then((data) => {
    if (data.cod == 400 || data.cod == 404) {
      $(".alert-message").addClass("alert-message-visible");
    } else {
      $(".website-wrapper").removeClass("hide-class");
      $("body").removeClass("body-padding");
      $(".forecast-container").html("");

      //Present weather forecast start--------------------------------------------------------

      $(".forecast-present-container").append('<div class="city">' + city.toUpperCase() + "</div>");
      $(".forecast-present-container").append('<div class="temperature">' + Math.round(data.list[0].main.temp) + "°C </div>");
      weatherIconDisplay("forecast-present-container", "icon", 0, 0);
      $(".forecast-present-container").append('<div class="description">' + data.list[0].weather[0].description.toUpperCase() + "</div>");
      $(".forecast-present-container").append('<div class="wind-speed">' + "WIND SPEED: " + data.list[0].wind.speed + " m/s" + "</div>");
      $(".forecast-present-container").append('<div class="wind-direction wind-direction-present"><i class="fas fa-location-arrow"></i></div>');
      var iconAngle = 45;
      var windAngle = data.list[0].wind.deg - 45;
      document.querySelector(".wind-direction-present").style.transform = "rotate(" + data.list[0].wind.deg - 45 + "deg)";
      //Present weather forecast end--------------------------------------------------------

      var listDatePresent = data.list[0].dt_txt;
      var listHourPresent = parseInt(listDatePresent.substr(11, 2));

      var divIndex = 1;

      if (listHourPresent > dayTime) {
        $(".daily-forecast-container").append('<div class="weekday weekday' + divIndex + '"></div>');
        $(".weekday" + divIndex).append('<div class="weekday-name">' + weekDays[currentWeekDay].toUpperCase() + "</div>");
        $(".weekday" + divIndex).append('<div class="date">' + data.list[0].dt_txt.substr(5, 5) + "</div>");
        $(".weekday" + divIndex).append('<div class="temperature">' + Math.round(data.list[0].main.temp) + "°C" + "</div>");

        weatherIconDisplay("weekday" + divIndex, "icon-present" + divIndex, 1, 0);
        $(".weekday" + divIndex).append('<div class="description description' + divIndex + '">' + data.list[0].weather[0].description.toUpperCase() + "</div>");
        $(".weekday" + divIndex).append('<div class="wind-speed wind-speed' + divIndex + '">' + "WIND SPEED: " + data.list[0].wind.speed + " m/s" + "</div>");
        $(".weekday" + divIndex).append('<div class="wind-direction wind-direction' + divIndex + '"><i class="fas fa-location-arrow"></i></div>');
        windAngle = data.list[0].wind.deg - 45;
        document.querySelector(".wind-direction" + divIndex).style.transform = "rotate(" + data.list[0].wind.deg - 45 + "deg)";
        currentWeekDay++;
      }

      for (i = 0; i < dataQuantity; i++) {
        var listDate = data.list[i].dt_txt;
        if (listDate.substr(11, 2) == dayTime) {
          divIndex++;
          $(".daily-forecast-container").append('<div class="weekday weekday' + divIndex + '"></div>');
          $(".weekday" + divIndex).append('<div class="weekday-name">' + weekDays[currentWeekDay].toUpperCase() + "</div>");
          $(".weekday" + divIndex).append('<div class="date">' + data.list[i].dt_txt.substr(5, 5) + "</div>");

          $(".weekday" + divIndex).append('<div class="temperature">' + Math.round(data.list[i].main.temp) + "°C" + "</div>");

          weatherIconDisplay("weekday" + divIndex, "icon-weekday" + divIndex, divIndex, i);

          $(".weekday" + divIndex).append('<div class="description description' + divIndex + '">' + data.list[i].weather[0].description.toUpperCase() + "</div>");
          $(".weekday" + divIndex).append('<div class="wind-speed wind-speed' + divIndex + '">' + "WIND SPEED: " + data.list[i].wind.speed + " m/s" + "</div>");

          $(".weekday" + divIndex).append('<div class="wind-direction wind-direction' + divIndex + '"><i class="fas fa-location-arrow"></i></div>');
          windAngle = data.list[i].wind.deg - 45;
          document.querySelector(".wind-direction" + divIndex).style.transform = "rotate(" + data.list[i].wind.deg - 45 + "deg)";

          if (currentWeekDay == 6) {
            currentWeekDay = 0;
          } else {
            currentWeekDay++;
          }
        }
      }

      divIndex = 1;
      currentWeekDay = currentDate.getDay() - 1;

      for (i = 0; i < dataQuantity; i++) {
        var listDate = data.list[i].dt_txt;
        if (listDate.substr(11, 2) == "03") {
          if (currentWeekDay == 6) {
            currentWeekDay = 0;
          } else {
            currentWeekDay++;
          }
        }
        $(".hourly-forecast-container").append('<div class="weekday weekday-hourly' + divIndex + '"></div>');
        $(".weekday-hourly" + divIndex).append('<div class="weekday-name">' + weekDays[currentWeekDay].toUpperCase() + "</div>");
        $(".weekday-hourly" + divIndex).append('<div class="date">' + data.list[i].dt_txt.substr(5, 5) + "</div>");
        $(".weekday-hourly" + divIndex).append('<div class="time">' + data.list[i].dt_txt.substr(10, 6) + "</div>");

        $(".weekday-hourly" + divIndex).append('<div class="temperature">' + Math.round(data.list[i].main.temp) + "°C" + "</div>");

        weatherIconDisplay("weekday-hourly" + divIndex, "icon" + divIndex, divIndex, i);

        $(".weekday-hourly" + divIndex).append('<div class="description description' + divIndex + '">' + data.list[i].weather[0].description.toUpperCase() + "</div>");
        $(".weekday-hourly" + divIndex).append('<div class="wind-speed wind-speed' + divIndex + '">' + "WIND SPEED: " + data.list[i].wind.speed + " m/s" + "</div>");

        $(".weekday-hourly" + divIndex).append('<div class="wind-direction wind-direction-hourly' + divIndex + '"><i class="fas fa-location-arrow"></i></div>');
        windAngle = data.list[i].wind.deg - 45;
        document.querySelector(".wind-direction-hourly" + divIndex).style.transform = "rotate(" + windAngle + "deg)";

        divIndex++;
      }

      var divIndex = 1;
      currentWeekDay = currentDate.getDay() - 1;

      input.value = "";

      function weatherDataDisplay(weekdayType, classIndex, arrayIndex) {
        $(".hourly-forecast-container").append('<div class="weekday weekday-' + weekdayType + classIndex + '"></div>');
        $(".weekday-hourly" + classIndex).append('<div class="weekday-name">' + weekDays[currentWeekDay].toUpperCase() + "</div>");
        $(".weekday-hourly" + classIndex).append('<div class="date">' + data.list[arrayIndex].dt_txt.substr(5, 5) + "</div>");
        $(".weekday-hourly" + classIndex).append('<div class="time">' + data.list[arrayIndex].dt_txt.substr(10, 6) + "</div>");

        $(".weekday-hourly" + classIndex).append('<div class="temperature">' + Math.round(data.list[arrayIndex].main.temp) + "°C" + "</div>");

        weatherIconDisplay("weekday-hourly" + classIndex, "icon" + classIndex, classIndex, arrayIndex);

        $(".weekday-hourly" + classIndex).append('<div class="description description' + classIndex + '">' + data.list[arrayIndex].weather[0].description.toUpperCase() + "</div>");
        $(".weekday-hourly" + classIndex).append('<div class="wind-speed wind-speed' + classIndex + '">' + "WIND SPEED: " + data.list[arrayIndex].wind.speed + " m/s" + "</div>");

        $(".weekday-hourly" + classIndex).append('<div class="wind-direction wind-direction-hourly' + classIndex + '"><i class="fas fa-location-arrow"></i></div>');
        windAngle = data.list[arrayIndex].wind.deg - 45;
        document.querySelector(".wind-direction-hourly" + classIndex).style.transform = "rotate(" + windAngle + "deg)";
      }

      function weatherIconDisplay(classLocation, className, classIndex, arrayIndex) {
        $("." + classLocation).append('<div class="icon ' + className + classIndex + '"></div>');
        var icon = data.list[arrayIndex].weather[0].icon;
        var iconImage = new Image();
        iconImage.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        $("." + className + classIndex).append(iconImage);
      }
    }
  });
//});

$(".button-close").click(function () {
  $(".alert-message").removeClass("alert-message-visible");
});
