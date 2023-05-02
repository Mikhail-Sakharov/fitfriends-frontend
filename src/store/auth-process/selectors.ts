import {State} from '../../types/state';
import {AuthorizationStatus, ReducerNameSpace} from '../../const';
import {UserRole} from '../../types/user-role.enum';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[ReducerNameSpace.AuthProcess].authorizationStatus;
export const getUserRole = (state: State): UserRole => state[ReducerNameSpace.AuthProcess].userRole;
