import {Gender} from './gender.enum';
import {SubwayStation} from './subway-station.enum';
import {TrainingLevel} from './training-level.enum';
import {TrainingType} from './training-type.enum';
import {UserRole} from './user-role.enum';
import {Questionnaire, User} from './user.interface';

export class UserRdo {
  public id!: string;
  public createdAt!: string[];
  public userName!: string;
  public email!: string;
  public avatarUrl!: string;
  public gender!: Gender;
  public birthday!: string;
  public userRole!: UserRole;
  public location!: SubwayStation;
  public trainingLevel!: TrainingLevel;
  public trainingTypes!: TrainingType[];
  public questionnaire!: Questionnaire;
  public myFriends!: User[];
}

class Tokens {
  public accessToken!: string;
  public refreshToken!: string;
}

export class UserResponse {
  public user!: UserRdo;
  public tokens!: Tokens;
}
