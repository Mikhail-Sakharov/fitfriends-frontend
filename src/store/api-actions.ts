import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance, AxiosResponse} from 'axios';
import {APIRoute, FF_NOTIFIER_URL, FF_SERVICE_URL, FF_USERS_URL} from '../const';
import {UserRdo, UserResponse} from '../types/user.response';
import {RegisterUserRequestBody} from '../types/register-user-request-body';
import {AppDispatch, State} from '../types/state';
import {saveTokens} from '../services/tokens';
import {SignInUserRequestBody} from '../types/sign-in-user-request-body';
import UpdateUserDto from '../types/update-user.dto';
import {TrainingRdo} from '../types/training.rdo';
import {GetTrainingsQuery} from '../types/get-trainings.query';
import {getQueryString} from '../helpers';
import UpdateTrainingDto from '../types/update-training.dto';
import {OrderRdo} from '../types/order.rdo';
import {GetOrdersQuery} from '../types/get-orders.query';
import {UserRequestRdo} from '../types/user-request.rdo';
import {UserRequestType} from '../types/user-request-type.enum';
import {Status} from '../types/status.enum';
import {NotificationRdo} from '../types/notification.rdo';
import {GymRdo} from '../types/gym.rdo';
import {GetGymsQuery} from '../types/get-gyms.query';
import {FavoriteGymRdo} from '../types/favorite-gym.rdo';
import {Purchase} from '../types/purchase.type';
import {GetUsersQuery} from '../types/get-users.query';
import {SubscriptionStatus} from '../types/subscription-status.enum';
import CreateOrderDto from '../types/create-order.dto';

type UploadVideoFileDto = {
  videoFileFormData: FormData;
  createdTrainingId: string;
};

type UpdateTrainingArgs = {
  trainingId: string;
  updateTrainingDto: UpdateTrainingDto;
};

type TrainingRequestDto = {
  type: UserRequestType;
  userId: string;
};

type ChangeRequestStatusDto = {
  trainingRequestStatus: Status;
  requestId: string;
};

export const registerUserAction = createAsyncThunk<UserResponse, RegisterUserRequestBody, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'auth/register',
  async (registerUserRequestBody, {dispatch, extra: api}) => {
    const {data} = await api[0].post<UserResponse>(`${FF_USERS_URL}${APIRoute.Register}`, registerUserRequestBody);
    saveTokens(data.tokens.accessToken, data.tokens.refreshToken);
    return data;
  },
);

export const signInUserAction = createAsyncThunk<UserResponse, SignInUserRequestBody, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'auth/signin',
  async (signInUserRequestBody, {dispatch, extra: api}) => {
    const {data} = await api[0].post<UserResponse>(`${FF_USERS_URL}${APIRoute.Login}`, signInUserRequestBody);
    saveTokens(data.tokens.accessToken, data.tokens.refreshToken);
    return data;
  },
);

export const uploadCertificateAction = createAsyncThunk<UserRdo, FormData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'users/certificate',
  async (certificate, {dispatch, extra: api}) => {
    const {data} = await api[0].post<UserRdo>(`${FF_USERS_URL}${APIRoute.Certificate}`, certificate);
    return data;
  },
);

export const deleteCertificateAction = createAsyncThunk<UserRdo, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'users/deleteCertificate',
  async (certificateUrl, {dispatch, extra: api}) => {
    const {data} = await api[0].get<UserRdo>(`${FF_USERS_URL}${APIRoute.DeleteCertificate}?certificateUrl=${certificateUrl}`);
    return data;
  },
);

export const uploadAvatarAction = createAsyncThunk<UserRdo, FormData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'users/avatar',
  async (avatar, {dispatch, extra: api}) => {
    const {data} = await api[0].post<UserRdo>(`${FF_USERS_URL}${APIRoute.Avatar}`, avatar);
    return data;
  },
);

export const refreshTokensAction = createAsyncThunk<UserResponse, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'auth/refresh',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api[1].get<UserResponse>(`${FF_USERS_URL}${APIRoute.Refresh}`);
    saveTokens(data.tokens.accessToken, data.tokens.refreshToken);
    return data;
  },
);

export const updateUserAction = createAsyncThunk<UserRdo, UpdateUserDto, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'users/update',
  async (updateUserDto, {dispatch, extra: api}) => {
    const {data} = await api[0].patch<UserRdo>(`${FF_USERS_URL}${APIRoute.Users}`, updateUserDto);
    return data;
  },
);

export const createTrainingAction = createAsyncThunk<TrainingRdo, FormData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'trainings/create',
  async (createTrainingRequest, {dispatch, extra: api}) => {
    const {data} = await api[0].post<TrainingRdo>(`${FF_SERVICE_URL}${APIRoute.Trainings}`, createTrainingRequest);
    return data;
  },
);

export const uploadVideoFileAction = createAsyncThunk<TrainingRdo, UploadVideoFileDto, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'trainings/uploadVideo',
  async (uploadVideoFileDto, {dispatch, extra: api}) => {
    const trainingId = uploadVideoFileDto.createdTrainingId;
    const requestBody = uploadVideoFileDto.videoFileFormData;
    const {data} = await api[0].post<TrainingRdo>(
      `${FF_SERVICE_URL}${APIRoute.TrainingVideo}/${trainingId}`, requestBody);
    return data;
  },
);

export const fetchMyTrainingsAction = createAsyncThunk<TrainingRdo[][], GetTrainingsQuery | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'coach/myTrainings',
  async (getTrainingsQuery, {dispatch, extra: api}) => {
    const queryString = getQueryString(getTrainingsQuery);
    const {data} = await api[0].get<TrainingRdo[]>(`${FF_SERVICE_URL}${APIRoute.Trainings}${queryString}`);
    const allTrainings = await api[0].get<TrainingRdo[]>(`${FF_SERVICE_URL}${APIRoute.Trainings}`);
    return [data, allTrainings.data];
  },
);

type FetchTrainingsParams = {
  coachId: string;
  queryParams?: {
    page: number;
    limit: number;
  };
};

export const fetchTrainingsAction = createAsyncThunk<TrainingRdo[], FetchTrainingsParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'fetchTrainingsAction',
  async (fetchTrainingsParams, {dispatch, extra: api}) => {
    const queryString = getQueryString(fetchTrainingsParams.queryParams);
    const {data} = await api[0].get<TrainingRdo[]>(`${FF_SERVICE_URL}${APIRoute.TrainingsCoach}/${fetchTrainingsParams.coachId}${queryString}`);
    return data;
  },
);

export const fetchUserInfoAction = createAsyncThunk<UserRdo, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'users/info',
  async (userId, {dispatch, extra: api}) => {
    const {data} = await api[0].get<UserRdo>(`${FF_USERS_URL}${APIRoute.Users}/${userId}`);
    return data;
  },
);

export const fetchTrainingInfoAction = createAsyncThunk<TrainingRdo, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'trainings/info',
  async (trainingId, {dispatch, extra: api}) => {
    const {data} = await api[0].get<TrainingRdo>(`${FF_SERVICE_URL}${APIRoute.Trainings}/${trainingId}`);
    return data;
  },
);

export const updateTrainingAction = createAsyncThunk<TrainingRdo, UpdateTrainingArgs, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'trainings/update',
  async (updateTrainingArgs, {dispatch, extra: api}) => {
    const trainingId = updateTrainingArgs.trainingId;
    const updateTrainingDto = updateTrainingArgs.updateTrainingDto;
    const {data} = await api[0].patch<TrainingRdo>(`${FF_SERVICE_URL}${APIRoute.Trainings}/${trainingId}`, updateTrainingDto);
    return data;
  },
);

export const fetchMyOrdersAction = createAsyncThunk<OrderRdo[], GetOrdersQuery | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'getMyOrders',
  async (getOrdersQueryArgs, {dispatch, extra: api}) => {
    const queryString = getQueryString(getOrdersQueryArgs);
    const {data} = await api[0].get<OrderRdo[]>(`${FF_SERVICE_URL}${APIRoute.Orders}${queryString}`);
    return data;
  },
);

export const fetchMyFriendsAction = createAsyncThunk<UserRdo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'getMyFriends',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api[0].get<UserRdo[]>(`${FF_USERS_URL}${APIRoute.Friends}`);
    return data;
  },
);

export const fetchIncomingUserRequestsForTraining = createAsyncThunk<UserRequestRdo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'fetchIncomingUserRequestsForTraining',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api[0].get<UserRequestRdo[]>(`${FF_NOTIFIER_URL}${APIRoute.UserIncomingRequests}`);
    return data;
  },
);

export const fetchOutgoingUserRequestsForTraining = createAsyncThunk<UserRequestRdo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'fetchOutgoingUserRequestsForTraining',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api[0].get<UserRequestRdo[]>(`${FF_NOTIFIER_URL}${APIRoute.UserOutgoingRequests}`);
    return data;
  },
);

export const sendTrainingRequestAction = createAsyncThunk<UserRequestRdo, TrainingRequestDto, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'sendTrainingRequestAction',
  async (trainingRequest, {dispatch, extra: api}) => {
    const {data} = await api[0].post<UserRequestRdo>(`${FF_NOTIFIER_URL}${APIRoute.UserRequests}`, trainingRequest);
    return data;
  },
);

export const changeTrainingRequestStatusAction = createAsyncThunk<UserRequestRdo, ChangeRequestStatusDto, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'changeTrainingRequestStatusAction',
  async (changeRequestStatusDto, {dispatch, extra: api}) => {
    const requestId = changeRequestStatusDto.requestId;
    const updateUserRequestDto = {
      status: changeRequestStatusDto.trainingRequestStatus
    };
    const {data} = await api[0].patch<UserRequestRdo>(`${FF_NOTIFIER_URL}${APIRoute.UserRequests}/${requestId}`, updateUserRequestDto);
    return data;
  },
);

export const fetchNotificationsAction = createAsyncThunk<NotificationRdo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'fetchNotificationsAction',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api[0].get<NotificationRdo[]>(`${FF_NOTIFIER_URL}${APIRoute.Notifications}`);
    return data;
  },
);

export const deleteNotificationAction = createAsyncThunk<undefined, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'deleteNotificationAction',
  async (notificationId, {dispatch, extra: api}) => {
    const {data} = await api[0].delete<undefined>(`${FF_NOTIFIER_URL}${APIRoute.Notifications}/${notificationId}`);
    return data;
  },
);

export const fetchGymsCatalogAction = createAsyncThunk<GymRdo[][], GetGymsQuery | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'fetchGymsCatalogAction',
  async (getGymsQueryArgs, {dispatch, extra: api}) => {
    const queryString = getQueryString(getGymsQueryArgs);
    const filteredRequest = await api[0].get<GymRdo[]>(`${FF_SERVICE_URL}${APIRoute.Gyms}${queryString}`);
    const allTheGyms = await api[0].get<GymRdo[]>(`${FF_SERVICE_URL}${APIRoute.Gyms}`);
    return [filteredRequest.data, allTheGyms.data];
  },
);

export const fetchMyFavoriteGymsAction = createAsyncThunk<FavoriteGymRdo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'fetchMyFavoriteGymsAction',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api[0].get<FavoriteGymRdo[]>(`${FF_SERVICE_URL}${APIRoute.FavoriteGyms}`);
    return data;
  },
);

export const addGymToFavoritesAction = createAsyncThunk<undefined, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'addGymToFavoritesAction',
  async (gymId, {dispatch, extra: api}) => {
    const {data} = await api[0].get<undefined>(`${FF_SERVICE_URL}${APIRoute.AddGymToFavorites}/${gymId}`);
    return data;
  },
);

export const removeGymFromFavoritesAction = createAsyncThunk<undefined, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'removeGymFromFavoritesAction',
  async (gymId, {dispatch, extra: api}) => {
    const {data} = await api[0].get<undefined>(`${FF_SERVICE_URL}${APIRoute.RemoveGymFromFavorites}/${gymId}`);
    return data;
  },
);

export const fetchGymInfoAction = createAsyncThunk<GymRdo, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'fetchGymInfoAction',
  async (gymId, {dispatch, extra: api}) => {
    const {data} = await api[0].get<GymRdo>(`${FF_SERVICE_URL}${APIRoute.Gyms}/${gymId}`);
    return data;
  },
);

export const fetchMyPurchasesAction = createAsyncThunk<Purchase[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'fetchMyPurchasesAction',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api[0].get<Purchase[]>(`${FF_SERVICE_URL}${APIRoute.Purchases}`);
    return data;
  },
);

export const fetchTrainingCatalogAction = createAsyncThunk<TrainingRdo[][], GetTrainingsQuery | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'fetchTrainingCatalogAction',
  async (getTrainingsQuery, {dispatch, extra: api}) => {
    const queryString = getQueryString(getTrainingsQuery);
    const {data} = await api[0].get<TrainingRdo[]>(`${FF_SERVICE_URL}${APIRoute.TrainingCatalog}${queryString}`);
    const allCatalogTrainings = await api[0].get<TrainingRdo[]>(`${FF_SERVICE_URL}${APIRoute.TrainingCatalog}`);
    return [data, allCatalogTrainings.data];
  },
);

export const fetchUsersCatalogAction = createAsyncThunk<UserRdo[][], GetUsersQuery, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'fetchUsersCatalogAction',
  async (getUsersQuery, {dispatch, extra: api}) => {
    const queryString = getQueryString(getUsersQuery);
    const fullUsersCatalog = await api[0].get<UserRdo[]>(`${FF_USERS_URL}${APIRoute.Users}`);
    const filteredUsersCatalog = await api[0].get<UserRdo[]>(`${FF_USERS_URL}${APIRoute.Users}${queryString}`);
    return [fullUsersCatalog.data, filteredUsersCatalog.data];
  },
);

export const removeFriendAction = createAsyncThunk<AxiosResponse<undefined>, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'removeFriendAction',
  async (friendId, {dispatch, extra: api}) => await api[0].get<undefined>(`${FF_USERS_URL}${APIRoute.RemoveFriend}/${friendId}`),
);

export const addFriendAction = createAsyncThunk<AxiosResponse<undefined>, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'addFriendAction',
  async (friendId, {dispatch, extra: api}) => await api[0].get<undefined>(`${FF_USERS_URL}${APIRoute.AddFriend}/${friendId}`),
);

export const toggleSubscriberStatusAction = createAsyncThunk<AxiosResponse<undefined>, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'toggleSubscriberStatusAction',
  async (coachId, {dispatch, extra: api}) => await api[0].get<undefined>(`${FF_NOTIFIER_URL}${APIRoute.Subscription}/${coachId}`),
);

export const checkSubscriptionStatusAction = createAsyncThunk<SubscriptionStatus, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'checkSubscriptionStatusAction',
  async (coachId, {dispatch, extra: api}) => {
    const {data} = await api[0].get<SubscriptionStatus>(`${FF_NOTIFIER_URL}${APIRoute.SubscriptionStatus}/${coachId}`);
    return data;
  },
);

export const buyTrainingAction = createAsyncThunk<OrderRdo, CreateOrderDto, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'buyTrainingAction',
  async (createOrderDto, {dispatch, extra: api}) => {
    const {data} = await api[0].post<OrderRdo>(`${FF_SERVICE_URL}${APIRoute.Orders}`, createOrderDto);
    return data;
  },
);
