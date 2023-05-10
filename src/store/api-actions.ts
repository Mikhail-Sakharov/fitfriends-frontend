import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute, FF_SERVICE_URL, FF_USERS_URL} from '../const';
import {UserRdo, UserResponse} from '../types/user.response';
import {RegisterUserRequestBody} from '../types/register-user-request-body';
import {AppDispatch, State} from '../types/state';
import {saveTokens} from '../services/tokens';
import {SignInUserRequestBody} from '../types/sign-in-user-request-body';
import UpdateUserDto from '../types/update-user.dto';
import {TrainingRdo} from '../types/training.rdo';
import {GetTrainingsQuery} from '../types/get-trainings.query';
import {getTrainingsQueryString} from '../helpers';
import UpdateTrainingDto from '../types/update-training.dto';

type UploadVideoFileDto = {
  videoFileFormData: FormData;
  createdTrainingId: string;
};

type UpdateTrainingArgs = {
  trainingId: string;
  updateTrainingDto: UpdateTrainingDto;
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
    const queryString = getTrainingsQueryString(getTrainingsQuery);
    const {data} = await api[0].get<TrainingRdo[]>(`${FF_SERVICE_URL}${APIRoute.Trainings}${queryString}`);
    const allTrainings = await api[0].get<TrainingRdo[]>(`${FF_SERVICE_URL}${APIRoute.Trainings}`);
    return [data, allTrainings.data];
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
