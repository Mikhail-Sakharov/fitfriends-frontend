import {SubwayStation} from './subway-station.enum';
import {TrainingLevel} from './training-level.enum';
import {TrainingType} from './training-type.enum';
import {UserRole} from './user-role.enum';
import {Questionnaire} from './user.interface';

export type RegisterUserRequestBody = {
  userName: string;
  email: string;
  password: string;
  gender: string;
  birthday: string;
  userRole: UserRole;
  location: SubwayStation;
  trainingLevel: TrainingLevel;
  trainingTypes: TrainingType[];
  questionnaire: Questionnaire;
};
