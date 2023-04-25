import {Navigate} from 'react-router-dom';
import {UserRole} from '../../types/user-role.enum';
import {AppRoute} from '../../const';

type RoleDependentRouteProps = {
  userRole: UserRole;
};

function RoleDependentRoute({userRole}: RoleDependentRouteProps): JSX.Element {
  switch(userRole) {
    case UserRole.User:
      return <Navigate to={AppRoute.PersonalAccountUser}/>;
    case UserRole.Coach:
      return <Navigate to={AppRoute.PersonalAccountCoach}/>;
  }
}

export default RoleDependentRoute;
