export const convertToSeconds = (time) => {
  return (
    parseInt(time.hours) * 3600 +
    parseInt(time.minutes) * 60 +
    parseInt(time.seconds)
  );
};
export const formatTime = (time) => {
  return `${time.hours}:${time.minutes}:${time.seconds}`;
};
