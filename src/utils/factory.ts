export const timeStampToTime = (timeStamp: number) => {
  if (!timeStamp) {
    return;
  }
  const date = new Date(
    timeStamp.toString().length === 10 ? timeStamp * 1000 : timeStamp
  );
  const Y = date.getFullYear();
  const M = (date.getMonth() + 1).toString().padStart(2, '0');
  const D = date.getDate().toString().padStart(2, '0');
  return `${Y}-${M}-${D}`;
};
