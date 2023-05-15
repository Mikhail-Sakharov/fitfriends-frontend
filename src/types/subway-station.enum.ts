export enum SubwayStation {
  Pionerskaya = 'Пионерская',
  Petrogradskaya = 'Петроградская',
  Udelnaya = 'Удельная',
  Zvezdnaya = 'Звёздная',
  Sportivnaya = 'Спортивная'
}

export const SubwayStationLocationMap = {
  [SubwayStation.Pionerskaya]: {
    latitude: 60.002524,
    longitude: 30.296710
  },
  [SubwayStation.Petrogradskaya]: {
    latitude: 59.966405,
    longitude: 30.311455
  },
  [SubwayStation.Udelnaya]: {
    latitude: 60.016680,
    longitude: 30.315702
  },
  [SubwayStation.Zvezdnaya]: {
    latitude: 59.833283,
    longitude: 30.349557
  },
  [SubwayStation.Sportivnaya]: {
    latitude: 59.951838,
    longitude: 30.291241
  },
};
