import {ReducerNameSpace} from '../../const';
import {Gender} from '../../types/gender.enum';
import {State} from '../../types/state';
import {SubwayStation} from '../../types/subway-station.enum';
import {UserRole} from '../../types/user-role.enum';

export const getAvatar = (state: State): string => state[ReducerNameSpace.UserData].avatar;
export const getUserName = (state: State): string => state[ReducerNameSpace.UserData].userName;
export const getEmail = (state: State): string => state[ReducerNameSpace.UserData].email;
export const getPassword = (state: State): string => state[ReducerNameSpace.UserData].password;
export const getLocation = (state: State): SubwayStation | null => state[ReducerNameSpace.UserData].location;
export const getBirthday = (state: State): string => state[ReducerNameSpace.UserData].birthday;
export const getGender = (state: State): Gender | null => state[ReducerNameSpace.UserData].gender;
export const getUserRole = (state: State): UserRole | null => state[ReducerNameSpace.UserData].userRole;
