import {ReducerNameSpace} from '../../const';
import {Gender} from '../../types/gender.enum';
import {NotificationRdo} from '../../types/notification.rdo';
import {PurchaseRdo} from '../../types/purchase.rdo';
import {State} from '../../types/state';
import {SubwayStation} from '../../types/subway-station.enum';
import {TrainingLevel} from '../../types/training-level.enum';
import {TrainingType} from '../../types/training-type.enum';
import {UserRequestRdo} from '../../types/user-request.rdo';
import {UserRole} from '../../types/user-role.enum';
import {UserRdo} from '../../types/user.response';

export const getAvatar = (state: State): string => state[ReducerNameSpace.UserData].avatar;
export const getUserName = (state: State): string => state[ReducerNameSpace.UserData].userName;
export const getEmail = (state: State): string => state[ReducerNameSpace.UserData].email;
export const getPassword = (state: State): string => state[ReducerNameSpace.UserData].password;
export const getLocation = (state: State): SubwayStation | null => state[ReducerNameSpace.UserData].location;
export const getBirthday = (state: State): string => state[ReducerNameSpace.UserData].birthday;
export const getGender = (state: State): Gender | null => state[ReducerNameSpace.UserData].gender;
export const getUserRole = (state: State): UserRole | null => state[ReducerNameSpace.UserData].userRole;

export const getDescription = (state: State): string => state[ReducerNameSpace.UserData].description;
export const getIsReadyToTrain = (state: State): boolean => state[ReducerNameSpace.UserData].isReadyToTrain;
export const getIsReadyToGetTrained = (state: State): boolean => state[ReducerNameSpace.UserData].isReadyToGetTrained;
export const getTrainingTypes = (state: State): TrainingType[] => state[ReducerNameSpace.UserData].trainingTypes;
export const getTrainingLevel = (state: State): TrainingLevel | null => state[ReducerNameSpace.UserData].trainingLevel;
export const getCertificates = (state: State): string[] => state[ReducerNameSpace.UserData].certificates;

export const getMyFriends = (state: State): UserRdo[] => state[ReducerNameSpace.UserData].myFriends;
export const getMyIncomingRequests = (state: State): UserRequestRdo[] => state[ReducerNameSpace.UserData].myIncomingRequests;
export const getMyOutgoingRequests = (state: State): UserRequestRdo[] => state[ReducerNameSpace.UserData].myOutgoingRequests;
export const getNotifications = (state: State): NotificationRdo[] => state[ReducerNameSpace.UserData].notifications;
export const getMyPurchases = (state: State): PurchaseRdo[] => state[ReducerNameSpace.UserData].myPurchases;

