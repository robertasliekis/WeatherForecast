let input = document.querySelector(".input-field");
let buttonSubmit = document.querySelector(".button-submit");
let units = "metric";
let dataQuantity = 40;
let dayTime = 12;
let dayChangeTime = "03";
let weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
let apiID = "81ad4c959750e6a355b738eec878a3fd";

//buttonSubmit.addEventListener("click", function (name) {
let city = input.value;
city = "vilnius";
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&cnt=${dataQuantity}&appid=${apiID}`)
  .then((response) => response.json())
  .then((data) => {
    if (data.cod == 400 || data.cod == 404) {
      $(".alert-message").addClass("alert-message-visible");
    } else {
      $(".website-wrapper").removeClass("hide-class");
      $("body").removeClass("body-padding");
      $(".forecast-container").html("");

      let listDatePresent = data.list[0].dt_txt;
      let listHourPresent = parseInt(listDatePresent.substr(11, 2));

      let divIndexHourly = 1;
      let divIndexDaily = 1;

      let currentDate = new Date();
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
        let listDate = data.list[i].dt_txt;
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
        if (listDate.substr(11, 2) == dayChangeTime) {
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
        $(`.${weekdayType}-forecast-container`).append(`<div class="weekday weekday-${weekdayType}${classIndex}"></div>`);

        let weekDayTypeIndex = `.weekday-${weekdayType}${classIndex}`;

        switch (weekdayType) {
          case "present":
            $(weekDayTypeIndex).append(`<div class="city">${cityName.toUpperCase()}</div>`);
            break;
          case "daily":
            $(weekDayTypeIndex).append(`<div class="weekday-name">${weekDays[weekDayIndex].toUpperCase()}
            </div><div class="date">${data.list[arrayIndex].dt_txt.substr(5, 5)}</div>`);
            break;
          case "hourly":
            $(weekDayTypeIndex).append(`<div class="weekday-name">${weekDays[weekDayIndex].toUpperCase()}
            </div><div class="date">${data.list[arrayIndex].dt_txt.substr(5, 5)}</div><div class="time">${data.list[
              arrayIndex
            ].dt_txt.substr(11, 5)}</div>`);
            break;
        }

        $(weekDayTypeIndex).append(
          `
          <div class="temperature">${Math.round(data.list[arrayIndex].main.temp)}°C</div>
          <div class="icon icon${classIndex}${classIndex}${weekDayTypeIndex.substr(1)}"></div>
          <div class="description description${classIndex}">${data.list[arrayIndex].weather[0].description.toUpperCase()}</div>
          <div class="wind-speed wind-speed${classIndex}">WIND SPEED: <br>${data.list[arrayIndex].wind.speed} m/s</div>
          <div class="wind-direction wind-direction-${weekdayType}${classIndex}"><i class="fas fa-location-arrow"></i></div>
          `
        );

        weatherIconDisplay(weekDayTypeIndex.substr(1), `icon${classIndex}`, classIndex, arrayIndex);

        windAngle = data.list[arrayIndex].wind.deg - 180 + -45;
        document.querySelector(`.wind-direction-${weekdayType}${classIndex}`).style.transform = `rotate(${windAngle}deg)`;
      }

      function weatherIconDisplay(classLocation, className, classIndex, arrayIndex) {
        let icon = data.list[arrayIndex].weather[0].icon;
        let iconImage = new Image();
        iconImage.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        $(`.${className}${classIndex}${classLocation}`).append(iconImage);
      }
    }
  });
///});

$(".button-close").click(function () {
  $(".alert-message").removeClass("alert-message-visible");
});
