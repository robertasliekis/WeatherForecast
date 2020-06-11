var input = document.querySelector(".input-field");
var buttonSubmit = document.querySelector(".button-submit");
var city = "vilnius";
var units = "metric";
var dataQuantity = 40;
var dayTime = 12;
var weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
var apiID = "81ad4c959750e6a355b738eec878a3fd";

buttonSubmit.addEventListener("click", function (name) {
  var city = input.value;
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=" + units + "&cnt=" + dataQuantity + "&appid=" + apiID)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod == 400 || data.cod == 404) {
        $(".alert-message").addClass("alert-message-visible");
      } else {
        $(".website-wrapper").removeClass("hide-class");
        $("body").removeClass("body-padding");
        $(".forecast-container").html("");

        var listDatePresent = data.list[0].dt_txt;
        var listHourPresent = parseInt(listDatePresent.substr(11, 2));

        var divIndexHourly = 1;
        var divIndexDaily = 1;

        var currentDate = new Date();
        currentWeekDay = currentDate.getDay() - 1;
        currentWeekDayDaily = currentWeekDay;
        currentWeekDayHourly = currentWeekDay;

        //Present day data display-------------------------------------------
        weatherDataDisplay("present", 0, 0, currentWeekDay, city);
        //Present day data display-------------------------------------------

        //Daily data display-------------------------------------------------
        if (listHourPresent > dayTime) {
          weatherDataDisplay("daily", 0, 0, currentWeekDayDaily, city);
          currentWeekDayDaily++;
        }

        for (i = 0; i < dataQuantity; i++) {
          var listDate = data.list[i].dt_txt;

          //Daily data display-------------------------------------------------
          if (listDate.substr(11, 2) == dayTime) {
            divIndexDaily++;
            weatherDataDisplay("daily", divIndexDaily, i, currentWeekDayDaily, city);
            if (currentWeekDayDaily == 6) {
              currentWeekDayDaily = 0;
            } else {
              currentWeekDayDaily++;
            }
          }
          //Daily data display-------------------------------------------------

          //Hourly data display-------------------------------------------------
          if (listDate.substr(11, 2) == "03") {
            if (currentWeekDayHourly == 6) {
              currentWeekDayHourly = 0;
            } else {
              currentWeekDayHourly++;
            }
          }
          weatherDataDisplay("hourly", divIndexHourly, i, currentWeekDayHourly, city);
          divIndexHourly++;
          //Hourly data display-------------------------------------------------
        }

        function weatherDataDisplay(weekdayType, classIndex, arrayIndex, weekDayIndex, cityName) {
          $("." + weekdayType + "-forecast-container").append('<div class="weekday weekday-' + weekdayType + classIndex + '"></div>');

          if (weekdayType == "present") {
            $(".weekday-" + weekdayType + classIndex).append('<div class="city">' + cityName.toUpperCase() + "</div>");
          }

          if (weekdayType == "daily" || weekdayType == "hourly") {
            $(".weekday-" + weekdayType + classIndex).append('<div class="weekday-name">' + weekDays[weekDayIndex].toUpperCase() + "</div>");
            $(".weekday-" + weekdayType + classIndex).append('<div class="date">' + data.list[arrayIndex].dt_txt.substr(5, 5) + "</div>");
          }

          if (weekdayType == "hourly") {
            $(".weekday-" + weekdayType + classIndex).append('<div class="time">' + data.list[arrayIndex].dt_txt.substr(10, 6) + "</div>");
          }

          $(".weekday-" + weekdayType + classIndex).append('<div class="temperature">' + Math.round(data.list[arrayIndex].main.temp) + "°C" + "</div>");

          weatherIconDisplay("weekday-" + weekdayType + classIndex, "icon" + classIndex, classIndex, arrayIndex);

          $(".weekday-" + weekdayType + classIndex).append('<div class="description description' + classIndex + '">' + data.list[arrayIndex].weather[0].description.toUpperCase() + "</div>");
          $(".weekday-" + weekdayType + classIndex).append('<div class="wind-speed wind-speed' + classIndex + '">' + "WIND SPEED: " + data.list[arrayIndex].wind.speed + " m/s" + "</div>");

          $(".weekday-" + weekdayType + classIndex).append('<div class="wind-direction wind-direction-' + weekdayType + classIndex + '"><i class="fas fa-location-arrow"></i></div>');
          windAngle = data.list[arrayIndex].wind.deg - 45;
          document.querySelector(".wind-direction-" + weekdayType + classIndex).style.transform = "rotate(" + windAngle + "deg)";
        }

        function weatherIconDisplay(classLocation, className, classIndex, arrayIndex) {
          $("." + classLocation).append('<div class="icon ' + className + classIndex + classLocation + '"></div>');
          var icon = data.list[arrayIndex].weather[0].icon;
          var iconImage = new Image();
          iconImage.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
          $("." + className + classIndex + classLocation).append(iconImage);
        }
      }
    });
});

$(".button-close").click(function () {
  $(".alert-message").removeClass("alert-message-visible");
});
