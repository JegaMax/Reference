export const getOS = () => {
  const userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  let os = '';

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = OPERATING_SYSTEM.MAC;
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = OPERATING_SYSTEM.IOS;
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = OPERATING_SYSTEM.WINDOWS;
  } else if (/Android/.test(userAgent)) {
    os = OPERATING_SYSTEM.ANDROID;
  } else if (!os && /Linux/.test(platform)) {
    os = OPERATING_SYSTEM.LINUX;
  }

  return os;
};

export const OPERATING_SYSTEM = {
  MAC: 'Mac OS',
  IOS: 'iOS',
  WINDOWS: 'Windows',
  ANDROID: 'Android',
  LINUX: 'Linux',
};

export const DEFAULT_KEY = {
  CONTROL: 'CONTROL',
  COMMAND: 'COMMAND',
};

const getKeyboardModifierKey = () => {
  const os = getOS();
  switch (os) {
    case OPERATING_SYSTEM.MAC:
    case OPERATING_SYSTEM.IOS:
      return DEFAULT_KEY.COMMAND;
    default:
      return DEFAULT_KEY.CONTROL;
  }
};

export default getKeyboardModifierKey;
