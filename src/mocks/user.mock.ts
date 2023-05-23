import {Duration} from '../types/duration.enum';
import {Gender} from '../types/gender.enum';
import {SubwayStation} from '../types/subway-station.enum';
import {TrainingLevel} from '../types/training-level.enum';
import {TrainingType} from '../types/training-type.enum';
import {UserRole} from '../types/user-role.enum';

export const userMock = {
  id: '6454c3c02cfb673f87f96ac3',
  createdAt: '2023-05-17T13:54:05.747Z',
  updatedAt: '2023-05-17T13:54:05.747Z',
  userName: 'qwe',
  email: 'qwe@qwe.qwe',
  avatarUrl: 'files/8eda14b6-e2c8-4ff7-9443-c0764ee0e1fe.png',
  gender: Gender.Female,
  birthday: '23.05.2023',
  userRole: UserRole.User,
  location: SubwayStation.Petrogradskaya,
  trainingLevel: TrainingLevel.Pro,
  trainingTypes: [TrainingType.PowerLifting, TrainingType.Yoga],
  questionnaire: {
    trainingDuration: Duration.ThirtyToFifty,
    dailyCaloriesCount: 1000,
    totalCaloriesCount: 10000,
    description: 'The best trainee ever',
    isReadyToGetTrained: true
  },
  myFriends: []
};
