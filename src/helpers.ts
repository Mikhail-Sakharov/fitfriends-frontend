import {GetTrainingsQuery} from './types/get-trainings.query';

export const getHumanizedDate = (date: string) => {
  const day = `${date[8]}${date[9]}`;
  const month = `${date[5]}${date[6]}`;
  const year = `${date[0]}${date[1]}${date[2]}${date[3]}`;
  const humanizedDate = `${day}.${month}.${year}`;
  return humanizedDate;
};

export const getQueryString = (queryArgs?: GetTrainingsQuery) => {
  if (!queryArgs) {return '';}

  const queryParams = [
    `${queryArgs.minPrice ? `minPrice=${queryArgs.minPrice}` : ''}`,
    `${queryArgs.maxPrice ? `maxPrice=${queryArgs.maxPrice}` : ''}`,
    `${queryArgs.minCaloriesCount ? `minCaloriesCount=${queryArgs.minCaloriesCount}` : ''}`,
    `${queryArgs.maxCaloriesCount ? `maxCaloriesCount=${queryArgs.maxCaloriesCount}` : ''}`,
    `${queryArgs.minRating ? `minRating=${queryArgs.minRating}` : ''}`,
    `${queryArgs.maxRating ? `maxRating=${queryArgs.maxRating}` : ''}`,
    `${queryArgs.duration ? `duration=${queryArgs.duration}` : ''}`,
    `${queryArgs.sortType ? `sortType=${queryArgs.sortType}` : ''}`,
    `${queryArgs.sortOrder ? `sortOrder=${queryArgs.sortOrder}` : ''}`,
    `${queryArgs.page ? `page=${queryArgs.page}` : ''}`,
    `${queryArgs.limit ? `limit=${queryArgs.limit}` : ''}`,
  ];

  const queryString = `?${queryParams.filter((param) => param !== '').join('&')}`;
  return queryString;
};

export const debounce = <T>(callback: (arg: T) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (arg: T) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(arg), delay);
  };
};

export const saveTrainingId = (trainingId: string): void => {
  localStorage.setItem('fitfriends-trainingId', trainingId);
};

export const getTrainingId = (): string => {
  const trainingId = localStorage.getItem('fitfriends-trainingId');
  return trainingId ?? '';
};

export const dropTrainingId = (): void => {
  localStorage.removeItem('fitfriends-trainingId');
};
