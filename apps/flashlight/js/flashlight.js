var flashlightAvailable = true;

function checkBatteryLevel(){
  if (navigator && navigator.mozBatery) {
    if ((!window.navigator.mozBattery.charging) && (navigator.mozBattery.level < 0.1)) {
      flashlightAvailable = false;
      //WindowManager.kill(origin);
    }
  }
}
/**
 * @description Attach events
 */
function delegate() {
}
/**
 * @description Executed automatically
 */
function init() {
  checkBatteryLevel();
  delegate();
}

init();
