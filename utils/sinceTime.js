const data = [
  [31536000, (isPlural) => ` year${isPlural ? 's' : ''} ago`],
  [2592000, (isPlural) => ` month${isPlural ? 's' : ''} ago`],
  [604800, (isPlural) => ` week${isPlural ? 's' : ''} ago`],
  [86400, (isPlural) => ` day${isPlural ? 's' : ''} ago`],
  [3600, (isPlural) => ` hour${isPlural ? 's' : ''} ago`],
  [60, (isPlural) => ` minute${isPlural ? 's' : ''} ago`],
];

const sinceTime = (date) => {
  if (date) {
    const seconds = Math.floor((+new Date() - Date.parse(date)) / 1000);

    let interval;
    for (let i = 0; i < data.length; i++) {
      interval = parseFloat((seconds / data[i][0]).toFixed(0));
      if (interval >= 1) {
        return interval + (data[i][1])(interval > 1);
      }
    }
    return parseFloat(seconds.toFixed(0)) + ' s ago';
  } else {
    return 'No time specified';
  }
};

export default sinceTime;
