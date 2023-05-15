export enum SubwayStation {
  Pionerskaya = 'Пионерская',
  Petrogradskaya = 'Петроградская',
  Udelnaya = 'Удельная',
  Zvezdnaya = 'Звёздная',
  Sportivnaya = 'Спортивная'
}

export const SubwayStationLocationMap = {
  [SubwayStation.Pionerskaya]: {
    latitude: 60.00427541278721,
    longitude: 30.296226881508126
  },
  [SubwayStation.Petrogradskaya]: {
    latitude: 59.96642767232921,
    longitude: 30.31126902707095
  },
  [SubwayStation.Udelnaya]: {
    latitude: 60.01804620495246,
    longitude: 30.31822335590989
  },
  [SubwayStation.Zvezdnaya]: {
    latitude: 59.83299541309431,
    longitude: 30.351728269391458
  },
  [SubwayStation.Sportivnaya]: {
    latitude: 59.95070314761982,
    longitude: 30.289707727070056
  },
};
