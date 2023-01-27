const secondsDiffFromNow = (time) => {
  const fromTime = Date.parse(new Date(time).toString());
  const timeNow = Date.now();
  const timeDiff = (timeNow - fromTime) / 1000;
  return timeDiff;
};

export default secondsDiffFromNow;
