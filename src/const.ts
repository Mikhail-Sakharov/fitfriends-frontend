export enum AppRoute {
  Intro = 'intro',
  SignUp = 'signup',
  SignUpQuestionnaireCoach = 'coach',
  SignUpQuestionnaireUser = 'user',
  Main = 'main',
  SignIn = 'signin',
  PersonalAccountCoach = 'personal-account-coach',
  PersonalAccountUser = 'personal-account-user',
  CreateTraining = 'create-training',
  MyTrainings = 'my-trainings',
  MyOrders = 'my-orders',
  FriendsList = 'friends-list',
  TrainingCard = 'training-card',
  TrainingCatalog = 'training-catalog',
  MyPurchases = 'my-purchases',
  MyGyms = 'my-gyms',
  TrainingDiary = 'training-diary',
  FoodDiary = 'food-diary',
  GymsCatalog = 'gyms-catalog',
  GymCard = 'gym-card',
  UsersCatalog = 'users-catalog',
  UserCard = 'user-card',
  NotFound = '*'
}

/* export enum APIRoute {

} */

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}
