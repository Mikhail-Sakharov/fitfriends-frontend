import {createSlice} from '@reduxjs/toolkit';
import {ReducerNameSpace} from '../../const';
import {SubwayStation} from '../../types/subway-station.enum';
import {Gender} from '../../types/gender.enum';
import {UserRole} from '../../types/user-role.enum';

type UserData = {
  avatar: string;
  userName: string;
  email: string;
  password: string;
  location: SubwayStation | null;
  birthday: string;
  gender: Gender | null;
  userRole: UserRole | null;
};

const initialState: UserData = {
  avatar: '',
  userName: '',
  email: '',
  password: '',
  location: null,
  birthday: '',
  gender: null,
  userRole: null,
};

export const userData = createSlice({
  name: ReducerNameSpace.User,
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
