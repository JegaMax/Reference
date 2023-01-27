import getBrowser from './getBrowser';
import getOperatingSystem from './getOperatingSystem';

export default function (description) {
  return `
    ${description}

    Browser: ${getBrowser(window)}

    OS: ${getOperatingSystem(window)}
    `;
}
