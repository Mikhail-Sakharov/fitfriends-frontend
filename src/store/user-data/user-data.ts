import {createSlice} from '@reduxjs/toolkit';
import {ReducerNameSpace} from '../../const';
import {SubwayStation} from '../../types/subway-station.enum';
import {Gender} from '../../types/gender.enum';
import {UserRole} from '../../types/user-role.enum';
import {refreshTokensAction, registerUserAction, signInUserAction, updateUserAction, uploadAvatarAction, uploadCertificateAction} from '../api-actons';
import {TrainingType} from '../../types/training-type.enum';
import {TrainingLevel} from '../../types/training-level.enum';
import {CoachQuestionnaire, UserQuestionnaire} from '../../types/user.interface';

type UserData = {
  avatar: string;
  userName: string;
  description: string;
  isReadyToTrain: boolean;
  isReadyToGetTrained: boolean;
  trainingTypes: TrainingType[];
  trainingLevel: TrainingLevel | null;
  email: string;
  password: string;
  location: SubwayStation | null;
  birthday: string;
  gender: Gender | null;
  userRole: UserRole | null;
  certificates: string[];
};

const initialState: UserData = {
  avatar: '',
  userName: '',
  email: '',
  description: '',
  isReadyToTrain: false,
  isReadyToGetTrained: false,
  trainingTypes: [],
  trainingLevel: null,
  password: '',
  location: null,
  birthday: '',
  gender: null,
  userRole: null,
  certificates: []
};

export const userData = createSlice({
  name: ReducerNameSpace.UserData,
  initialState,
  reducers: {
    setAvatarAction: (state, action) => {
      state.avatar = action.payload as string;
    },
    setUserNameAction: (state, action) => {
      state.userName = action.payload as string;
    },
    setEmailAction: (state, action) => {
      state.email = action.payload as string;
    },
    setPasswordAction: (state, action) => {
      state.password = action.payload as string;
    },
    setLocationAction: (state, action) => {
      state.location = action.payload as SubwayStation;
    },
    setBirthdayAction: (state, action) => {
      state.birthday = action.payload as string;
    },
    setGenderAction: (state, action) => {
      state.gender = action.payload as Gender;
    },
    setUserRoleAction: (state, action) => {
      state.userRole = action.payload as UserRole;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(uploadAvatarAction.fulfilled, (state, action) => {
        state.avatar = action.payload.avatarUrl;
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        switch(action.payload.user.userRole) {
          case UserRole.Coach:
            state.avatar = action.payload.user.avatarUrl;
            state.userName = action.payload.user.userName;
            state.description = (action.payload.user.questionnaire as CoachQuestionnaire).description;
            state.isReadyToTrain = (action.payload.user.questionnaire as CoachQuestionnaire).isReadyToTrain;
            state.trainingTypes = action.payload.user.trainingTypes;
            state.trainingLevel = action.payload.user.trainingLevel;
            state.location = action.payload.user.location;
            state.gender = action.payload.user.gender;
            state.certificates = (action.payload.user.questionnaire as CoachQuestionnaire).certificates;
            break;
          case UserRole.User:
            state.avatar = action.payload.user.avatarUrl;
            state.userName = action.payload.user.userName;
            state.description = (action.payload.user.questionnaire as UserQuestionnaire).description;
            state.isReadyToGetTrained = (action.payload.user.questionnaire as UserQuestionnaire).isReadyToGetTrained;
            state.trainingTypes = action.payload.user.trainingTypes;
            state.trainingLevel = action.payload.user.trainingLevel;
            state.location = action.payload.user.location;
            state.gender = action.payload.user.gender;
            break;
        }
      })
      .addCase(signInUserAction.fulfilled, (state, action) => {
        switch(action.payload.user.userRole) {
          case UserRole.Coach:
            state.avatar = action.payload.user.avatarUrl;
            state.userName = action.payload.user.userName;
            state.description = (action.payload.user.questionnaire as CoachQuestionnaire).description;
            state.isReadyToTrain = (action.payload.user.questionnaire as CoachQuestionnaire).isReadyToTrain;
            state.trainingTypes = action.payload.user.trainingTypes;
            state.trainingLevel = action.payload.user.trainingLevel;
            state.location = action.payload.user.location;
            state.gender = action.payload.user.gender;
            state.certificates = (action.payload.user.questionnaire as CoachQuestionnaire).certificates;
            break;
          case UserRole.User:
            state.avatar = action.payload.user.avatarUrl;
            state.userName = action.payload.user.userName;
            state.description = (action.payload.user.questionnaire as UserQuestionnaire).description;
            state.isReadyToGetTrained = (action.payload.user.questionnaire as UserQuestionnaire).isReadyToGetTrained;
            state.trainingTypes = action.payload.user.trainingTypes;
            state.trainingLevel = action.payload.user.trainingLevel;
            state.location = action.payload.user.location;
            state.gender = action.payload.user.gender;
            break;
        }
      })
      .addCase(refreshTokensAction.fulfilled, (state, action) => {
        switch(action.payload.user.userRole) {
          case UserRole.Coach:
            state.avatar = action.payload.user.avatarUrl;
            state.userName = action.payload.user.userName;
            state.description = (action.payload.user.questionnaire as CoachQuestionnaire).description;
            state.isReadyToTrain = (action.payload.user.questionnaire as CoachQuestionnaire).isReadyToTrain;
            state.trainingTypes = action.payload.user.trainingTypes;
            state.trainingLevel = action.payload.user.trainingLevel;
            state.location = action.payload.user.location;
            state.gender = action.payload.user.gender;
            state.certificates = (action.payload.user.questionnaire as CoachQuestionnaire).certificates;
            break;
          case UserRole.User:
            state.avatar = action.payload.user.avatarUrl;
            state.userName = action.payload.user.userName;
            state.description = (action.payload.user.questionnaire as UserQuestionnaire).description;
            state.isReadyToGetTrained = (action.payload.user.questionnaire as UserQuestionnaire).isReadyToGetTrained;
            state.trainingTypes = action.payload.user.trainingTypes;
            state.trainingLevel = action.payload.user.trainingLevel;
            state.location = action.payload.user.location;
            state.gender = action.payload.user.gender;
            break;
        }
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        switch(action.payload.userRole) {
          case UserRole.Coach:
            state.avatar = action.payload.avatarUrl;
            state.userName = action.payload.userName;
            state.description = (action.payload.questionnaire as CoachQuestionnaire).description;
            state.isReadyToTrain = (action.payload.questionnaire as CoachQuestionnaire).isReadyToTrain;
            state.trainingTypes = action.payload.trainingTypes;
            state.trainingLevel = action.payload.trainingLevel;
            state.location = action.payload.location;
            state.gender = action.payload.gender;
            state.certificates = (action.payload.questionnaire as CoachQuestionnaire).certificates;
            break;
          case UserRole.User:
            state.avatar = action.payload.avatarUrl;
            state.userName = action.payload.userName;
            state.description = (action.payload.questionnaire as UserQuestionnaire).description;
            state.isReadyToGetTrained = (action.payload.questionnaire as UserQuestionnaire).isReadyToGetTrained;
            state.trainingTypes = action.payload.trainingTypes;
            state.trainingLevel = action.payload.trainingLevel;
            state.location = action.payload.location;
            state.gender = action.payload.gender;
            break;
        }
      })
      .addCase(uploadCertificateAction.fulfilled, (state, action) => {
        state.avatar = action.payload.avatarUrl;
        state.userName = action.payload.userName;
        state.description = (action.payload.questionnaire as CoachQuestionnaire).description;
        state.isReadyToTrain = (action.payload.questionnaire as CoachQuestionnaire).isReadyToTrain;
        state.trainingTypes = action.payload.trainingTypes;
        state.trainingLevel = action.payload.trainingLevel;
        state.location = action.payload.location;
        state.gender = action.payload.gender;
        state.certificates = (action.payload.questionnaire as CoachQuestionnaire).certificates;
      });
  }
});

export const {
  setAvatarAction,
  setUserNameAction,
  setEmailAction,
  setPasswordAction,
  setLocationAction,
  setBirthdayAction,
  setGenderAction,
  setUserRoleAction
} = userData.actions;
