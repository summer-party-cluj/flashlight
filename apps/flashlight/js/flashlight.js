var flashlightAvailable = true,
    flashlightUnavailableMsgs = [],
    flashlightOn = false;
/**
 * @description Check battery level
 */
function checkBatteryLevel() {
  if (navigator && navigator.mozBatery) {
    if ((!window.navigator.mozBattery.charging) && (navigator.mozBattery.level < 0.1)) {
      flashlightAvailable = false;
      flashlightUnavailableMsgs.push("Battery too low");
      //WindowManager.kill(origin);
    }
  }
}
/**
 * @description Test availability of flashlight required resources
 */
function testFlashlightResources() {
  var unavailableResourceMsg = "Flashlight functionality is not available",
      flashModeValues = "",
      testOk = false;
  if (navigator && navigator.mozCamera) {
    flashModeValues = navigator.mozCamera.getParameter("flash-mode-values");
    if (flashModeValues.length > 0) {
      testOk = true;
    }
  }
  if (!testOk) {
    flashlightUnavailableMsgs.push(unavailableResourceMsg);
  }
}
/**
 * @description Activate flashlight
 */
function showFlashlight() {
  navigator.mozCamera.setParameter("flash-mode", "torch");
  if (flashlightOn) {
    setTimeout(function () {showFlashlight(); }, 1);
  } else {
    navigator.mozCamera.setParameter("flash-mode", "off");
  }
}
/**
 * @description function executed when flashlight button is clicked
 */
function flashlightButtonClick() {
  var flashlightUnavailableMsg;
  if (flashlightAvailable) {
    flashlightOn = !flashlightOn;
    showFlashlight();
  } else {
    flashlightUnavailableMsg = flashlightUnavailableMsgs.join("\n");
    alert(flashlightUnavailableMsg);
  }
}
/**
 * @description Attach events
 */
function delegate() {
  var flashlightButtonEl;
  flashlightButtonEl = document.getElementById("flashlightButton");
  if (flashlightButtonEl) {
    flashlightButtonEl.addEventListener("click", flashlightButtonClick, false);
  }
}
/**
 * @description Executed automatically
 */
function init() {
  checkBatteryLevel();
  testFlashlightResources();
  delegate();
}
//initialize
window.addEventListener("DOMContentLoaded", function () {init(); });
