export default function getOperatingSystem(window) {
  let operatingSystem = 'Not known';
  if (window.navigator.appVersion.indexOf('Win') !== -1) {
    operatingSystem = 'Windows OS';
  }
  if (window.navigator.appVersion.indexOf('Mac') !== -1) {
    operatingSystem = 'MacOS';
  }
  if (window.navigator.appVersion.indexOf('X11') !== -1) {
    operatingSystem = 'UNIX OS';
  }
  if (window.navigator.appVersion.indexOf('Linux') !== -1) {
    operatingSystem = 'Linux OS';
  }

  return operatingSystem;
}
