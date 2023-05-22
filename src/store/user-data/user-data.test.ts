import {Duration} from '../../types/duration.enum';
import {Gender} from '../../types/gender.enum';
import {NotificationRdo} from '../../types/notification.rdo';
import {Purchase} from '../../types/purchase.type';
import {SubscriptionStatus} from '../../types/subscription-status.enum';
import {SubwayStation} from '../../types/subway-station.enum';
import {TrainingLevel} from '../../types/training-level.enum';
import {TrainingType} from '../../types/training-type.enum';
import {UserRequestRdo} from '../../types/user-request.rdo';
import {UserRole} from '../../types/user-role.enum';
import {UserRdo} from '../../types/user.response';
import {setAvatarAction, setBirthdayAction, setEmailAction, setGenderAction, setLocationAction, setPasswordAction, setUserNameAction, setUserRoleAction, userData} from './user-data';

describe('Reducer: userData', () => {
  type UserData = {
    id: string;
    avatar: string;
    userName: string;
    description: string;
    isReadyToTrain: boolean;
    isReadyToGetTrained: boolean;
    trainingTypes: TrainingType[];
    trainingLevel: TrainingLevel | null;
    trainingDuration: Duration | null;
    dailyCaloriesCount: number | null;
    email: string;
    password: string;
    location: SubwayStation | null;
    birthday: string;
    gender: Gender | null;
    userRole: UserRole | null;
    certificates: string[];
    myFriends: UserRdo[];
    myIncomingRequests: UserRequestRdo[];
    myOutgoingRequests: UserRequestRdo[];
    notifications: NotificationRdo[];
    myPurchases: Purchase[];
    fullUsersCatalog: UserRdo[];
    filteredUsersCatalog: UserRdo[];
    subscriptionStatus: SubscriptionStatus;
  };

  const initialState: UserData = {
    id: '',
    avatar: '',
    userName: '',
    email: '',
    description: '',
    isReadyToTrain: false,
    isReadyToGetTrained: false,
    trainingTypes: [],
    trainingLevel: null,
    trainingDuration: null,
    dailyCaloriesCount: null,
    password: '',
    location: null,
    birthday: '',
    gender: null,
    userRole: null,
    certificates: [],
    myFriends: [],
    myIncomingRequests: [],
    myOutgoingRequests: [],
    notifications: [],
    myPurchases: [],
    fullUsersCatalog: [],
    filteredUsersCatalog: [],
    subscriptionStatus: SubscriptionStatus.NotSubscribedYet
  };

  const state = {
    id: '',
    avatar: '',
    userName: '',
    email: '',
    description: '',
    isReadyToTrain: true,
    isReadyToGetTrained: true,
    trainingTypes: [],
    trainingLevel: null,
    trainingDuration: null,
    dailyCaloriesCount: null,
    password: '',
    location: null,
    birthday: '',
    gender: null,
    userRole: null,
    certificates: [],
    myFriends: [],
    myIncomingRequests: [],
    myOutgoingRequests: [],
    notifications: [],
    myPurchases: [],
    fullUsersCatalog: [],
    filteredUsersCatalog: [],
    subscriptionStatus: SubscriptionStatus.NotSubscribedYet
  };

  it('without additional parameters should return the initial state', () => {
    expect(userData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should change "avatar"', () => {
    expect(userData.reducer(state, setAvatarAction('img.png')))
      .toEqual(
        {
          ...state,
          avatar: 'img.png',
        }
      );
  });

  it('should change "userName"', () => {
    expect(userData.reducer(state, setUserNameAction('User')))
      .toEqual(
        {
          ...state,
          userName: 'User',
        }
      );
  });

  it('should change "email"', () => {
    expect(userData.reducer(state, setEmailAction('qwe@qwe.qwe')))
      .toEqual(
        {
          ...state,
          email: 'qwe@qwe.qwe',
        }
      );
  });

  it('should change "password"', () => {
    expect(userData.reducer(state, setPasswordAction('123456')))
      .toEqual(
        {
          ...state,
          password: '123456',
        }
      );
  });

  it('should change "location"', () => {
    expect(userData.reducer(state, setLocationAction(SubwayStation.Petrogradskaya)))
      .toEqual(
        {
          ...state,
          location: SubwayStation.Petrogradskaya,
        }
      );
  });

  it('should change "birthday"', () => {
    expect(userData.reducer(state, setBirthdayAction('2023-05-05T08:52:16.486Z')))
      .toEqual(
        {
          ...state,
          birthday: '2023-05-05T08:52:16.486Z',
        }
      );
  });

  it('should change "gender"', () => {
    expect(userData.reducer(state, setGenderAction(Gender.Undefined)))
      .toEqual(
        {
          ...state,
          gender: Gender.Undefined,
        }
      );
  });

  it('should change "userRole"', () => {
    expect(userData.reducer(state, setUserRoleAction(UserRole.Coach)))
      .toEqual(
        {
          ...state,
          userRole: UserRole.Coach,
        }
      );
  });
});
