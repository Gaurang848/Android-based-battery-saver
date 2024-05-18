document.querySelector("#btn").addEventListener("click", function () {
  var container = document.querySelector(".cnt");
  if (container.textContent.trim() === "Battery saver is off") {
    container.textContent = "Battery saver is on";
  } else {
    container.textContent = "Battery saver is off";
  }
});
function updateTime() {
  var now = new Date();
  var hours = now.getHours();
  var meridian = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  var minutes = now.getMinutes().toString().padStart(2, "0");
  var seconds = now.getSeconds().toString().padStart(2, "0");
  var timeString = hours + ":" + minutes + " " + meridian;
  document.getElementById("time").textContent = timeString;
}

// Update time every second
setInterval(updateTime, 1000);

// Initial call to display time immediately
updateTime();
/*=============== BATTERY ===============*/
initBattery();

function initBattery() {
  const batteryLiquid = document.querySelector(".batteryliquid"),
    batteryStatus = document.querySelector(".batterystatus"),
    batteryPercentage = document.querySelector(".batterypercent");

  navigator.getBattery().then((batt) => {
    updateBattery = () => {
      /* 1. We update the number level of the battery */
      let level = Math.floor(batt.level * 100);
      batteryPercentage.innerHTML = level + "%";

      /* 2. We update the background level of the battery */
      batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`;

      /* 3. We validate full battery, low battery and if it is charging or not */
      if (level == 100) {
        /* We validate if the battery is full */
        batteryStatus.innerHTML = `Full battery <i class="ri-battery-2-fill green-color"></i>`;
        batteryLiquid.style.height = "103%"; /* To hide the ellipse */
      } else if ((level <= 20) & !batt.charging) {
        /* We validate if the battery is low */
        batteryStatus.innerHTML = `Low battery <i class="ri-plug-line animated-red"></i>`;
      } else if (batt.charging) {
        /* We validate if the battery is charging */
        batteryStatus.innerHTML = `Charging... <i class="ri-flashlight-line animated-green"></i>`;
      } else {
        /* If it's not loading, don't show anything. */
        batteryStatus.innerHTML = "";
      }

      /* 4. We change the colors of the battery and remove the other colors */
      if (level <= 20) {
        batteryLiquid.classList.add("gradient-color-red");
        batteryLiquid.classList.remove(
          "gradient-color-orange",
          "gradient-color-yellow",
          "gradient-color-green"
        );
      } else if (level <= 40) {
        batteryLiquid.classList.add("gradient-color-orange");
        batteryLiquid.classList.remove(
          "gradient-color-red",
          "gradient-color-yellow",
          "gradient-color-green"
        );
      } else if (level <= 80) {
        batteryLiquid.classList.add("gradient-color-yellow");
        batteryLiquid.classList.remove(
          "gradient-color-red",
          "gradient-color-orange",
          "gradient-color-green"
        );
      } else {
        batteryLiquid.classList.add("gradient-color-green");
        batteryLiquid.classList.remove(
          "gradient-color-red",
          "gradient-color-orange",
          "gradient-color-yellow"
        );
      }
    };
    updateBattery();

    /* 5. Battery status events */
    batt.addEventListener("chargingchange", () => {
      updateBattery();
    });
    batt.addEventListener("levelchange", () => {
      updateBattery();
    });
  });
}
