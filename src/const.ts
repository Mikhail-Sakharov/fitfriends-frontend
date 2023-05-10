import {TrainingType} from './types/training-type.enum';

export enum AppRoute {
  Root = '/',
  Intro = '/intro',
  SignUp = '/signup',
  SignUpQuestionnaireCoach = '/coach',
  SignUpQuestionnaireUser = '/user',
  Main = '/main',
  SignIn = '/signin',
  PersonalAccountCoach = '/personal-account-coach',
  PersonalAccountUser = '/personal-account-user',
  CreateTraining = '/create-training',
  MyTrainings = '/my-trainings',
  MyOrders = '/my-orders',
  FriendsList = '/friends-list',
  TrainingCard = '/training-card',
  TrainingCatalog = '/training-catalog',
  MyPurchases = '/my-purchases',
  MyGyms = '/my-gyms',
  TrainingDiary = '/training-diary',
  FoodDiary = '/food-diary',
  GymsCatalog = '/gyms-catalog',
  GymCard = '/gym-card',
  UsersCatalog = '/users-catalog',
  UserCard = '/user-card',
  NotFound = '*'
}

export const FF_USERS_URL = 'http://localhost:5678';

export const FF_SERVICE_URL = 'http://localhost:5679';

export enum APIRoute {
  Register = '/auth/register',
  Login = '/auth/login',
  Logout = '/auth/logout',
  Refresh = '/auth/refresh',
  Users = '/users',
  Friends = '/users/friends',
  Avatar = '/users/avatar',
  Certificate = '/users/certificate',
  DeleteCertificate = '/users/certificate/delete',
  AddFriend = '/users/friends/add',
  RemoveFriend = '/users/friends/remove',
  Trainings = '/trainings',
  TrainingVideo = '/trainings/video',
  Orders = '/orders/trainings',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum ReducerNameSpace {
  AuthProcess = 'AUTH_PROCESS',
  UserData = 'USER_DATA',
  AppData = 'APP_DATA',
  TrainingData = 'TRAINING_DATA'
}

export const TrainingTypeImageMap = {
  [TrainingType.Yoga]: 'img/content/thumbnails/training-01.jpg',
  [TrainingType.Running]: 'img/content/thumbnails/training-06.jpg',
  [TrainingType.Boxing]: 'img/content/thumbnails/training-03.jpg',
  [TrainingType.Stratching]: 'img/content/thumbnails/training-12.jpg',
  [TrainingType.Crossfit]: 'img/content/thumbnails/training-02.jpg',
  [TrainingType.Aerobics]: 'img/content/thumbnails/training-07.jpg',
  [TrainingType.Pilates]: 'img/content/thumbnails/training-09.jpg',
  [TrainingType.PowerLifting]: 'img/content/thumbnails/training-10.jpg'
};

export const FILTER_QUERY_DELAY = 1000;

export const EMAIL_REG_EXP = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

export const CERTIFICATE_FILE_TYPES = ['jpg', 'pdf', 'png'];

export const AVATAR_FILE_TYPES = ['jpg', 'png'];

export const AVATAR_MAX_SIZE = 1000000;

export const VIDEO_FILE_TYPES = ['mov', 'avi', 'mp4'];

export const MAX_CERTIFICATES_COUNT_PER_PAGE = 3;

export const MAX_TRAININGS_COUNT_PER_PAGE = 12;

export const UserDailyCaloriesCount = {
  MIN: 1000,
  MAX: 5000
};

export const UserTotalCaloriesCount = {
  MIN: 1000,
  MAX: 5000
};

export const TrainingTypesCount = {
  MIN: 1,
  MAX: 3
};

export const CoachDescriptionLength = {
  MIN: 10,
  MAX: 140
};

export const UserNameLength = {
  MIN: 1,
  MAX: 15
};

export const UserPasswordLength = {
  MIN: 6,
  MAX: 12
};

export const TrainingTitleLength = {
  MIN: 1,
  MAX: 15
};

export const TrainingCaloriesCount = {
  MIN: 1000,
  MAX: 5000
};

export const TrainingPrice = {
  MIN: 0,
  MAX: 1000000
};

export const TrainingDescriptionLength = {
  MIN: 10,
  MAX: 140
};

export const RatingCount = {
  MIN: 0,
  MAX: 5
};
