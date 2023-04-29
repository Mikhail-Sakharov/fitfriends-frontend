export const getHumanizedDate = (date: string) => {
  const day = `${date[8]}${date[9]}`;
  const month = `${date[5]}${date[6]}`;
  const year = `${date[0]}${date[1]}${date[2]}${date[3]}`;
  const humanizedDate = `${day}.${month}.${year}`;
  return humanizedDate;
};
