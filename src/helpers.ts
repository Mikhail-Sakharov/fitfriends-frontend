import {GetTrainingsQuery} from './types/get-trainings.query';

export const getHumanizedDate = (date: string) => {
  const day = `${date[8]}${date[9]}`;
  const month = `${date[5]}${date[6]}`;
  const year = `${date[0]}${date[1]}${date[2]}${date[3]}`;
  const humanizedDate = `${day}.${month}.${year}`;
  return humanizedDate;
};

export const getTrainingsQueryString = (getTrainingsQuery?: GetTrainingsQuery) => {
  if (!getTrainingsQuery) {return '';}

  const queryParams = [
    `${getTrainingsQuery.minPrice ? `minPrice=${getTrainingsQuery.minPrice}` : ''}`,
    `${getTrainingsQuery.maxPrice ? `maxPrice=${getTrainingsQuery.maxPrice}` : ''}`,
    `${getTrainingsQuery.minCaloriesCount ? `minCaloriesCount=${getTrainingsQuery.minCaloriesCount}` : ''}`,
    `${getTrainingsQuery.maxCaloriesCount ? `maxCaloriesCount=${getTrainingsQuery.maxCaloriesCount}` : ''}`,
    `${getTrainingsQuery.minRating ? `minRating=${getTrainingsQuery.minRating}` : ''}`,
    `${getTrainingsQuery.maxRating ? `maxRating=${getTrainingsQuery.maxRating}` : ''}`,
    `${getTrainingsQuery.duration ? `duration=${getTrainingsQuery.duration}` : ''}`,
    `${getTrainingsQuery.sortType ? `sortType=${getTrainingsQuery.sortType}` : ''}`,
    `${getTrainingsQuery.sortOrder ? `sortOrder=${getTrainingsQuery.sortOrder}` : ''}`,
    `${getTrainingsQuery.page ? `page=${getTrainingsQuery.page}` : ''}`,
    `${getTrainingsQuery.limit ? `limit=${getTrainingsQuery.limit}` : ''}`,
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
