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

export const FF_USERS_SERVICE_URL = 'http://localhost:5678';

export enum APIRoute {
  Register = '/auth/register',
  Login = '/auth/login',
  Logout = '/auth/logout',
  Refresh = '/auth/refresh',
  Users = '/users',
  Friends = '/users/friends',
  Avatar = '/users/avatar',
  Certificate = '/users/certificate',
  AddFriend = '/users/friends/add',
  RemoveFriend = '/users/friends/remove',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum ReducerNameSpace {
  Auth = 'AUTH',
  User = 'USER'
}

export const EMAIL_REG_EXP = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

export const CERTIFICATE_FILE_TYPES = ['jpg', 'pdf', 'png'];

export const AVATAR_FILE_TYPES = ['jpg', 'png'];
