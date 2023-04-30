import {ReducerNameSpace} from '../../const';
import {Gender} from '../../types/gender.enum';
import {State} from '../../types/state';
import {SubwayStation} from '../../types/subway-station.enum';
import {UserRole} from '../../types/user-role.enum';

export const getAvatar = (state: State): string => state[ReducerNameSpace.User].avatar;
export const getUserName = (state: State): string => state[ReducerNameSpace.User].userName;
export const getEmail = (state: State): string => state[ReducerNameSpace.User].email;
export const getPassword = (state: State): string => state[ReducerNameSpace.User].password;
export const getLocation = (state: State): SubwayStation | null => state[ReducerNameSpace.User].location;
export const getBirthday = (state: State): string => state[ReducerNameSpace.User].birthday;
export const getGender = (state: State): Gender | null => state[ReducerNameSpace.User].gender;
export const getUserRole = (state: State): UserRole | null => state[ReducerNameSpace.User].userRole;
