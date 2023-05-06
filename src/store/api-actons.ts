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
// import CreateTrainingDto from '../types/create-training.dto';

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
  async (createTrainingDtoRequest, {dispatch, extra: api}) => {
    const {data} = await api[0].post<TrainingRdo>(`${FF_SERVICE_URL}${APIRoute.Trainings}`, createTrainingDtoRequest);
    return data;
  },
);

/* type CreateTrainingRequestBody = {
  formData: FormData;
  createdTrainingId: string;
};

export const uploadVideoFileAction = createAsyncThunk<TrainingRdo, CreateTrainingRequestBody, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'trainings/video',
  async (createTrainingRequestBody, {dispatch, extra: api}) => {
    const {data} = await api[0].post<TrainingRdo>(
      `${FF_SERVICE_URL}${APIRoute.TrainingVideo}/${createTrainingRequestBody.createdTrainingId}`,
      createTrainingRequestBody.formData
    );
    return data;
  },
); */
