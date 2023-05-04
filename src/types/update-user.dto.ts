import {Duration} from './duration.enum';
import {Gender} from './gender.enum';
import {SubwayStation} from './subway-station.enum';
import {TrainingLevel} from './training-level.enum';
import {TrainingType} from './training-type.enum';
import {UserRole} from './user-role.enum';

class CoachQuestionnaire {
  public certificates?: string[];
  public description?: string;
  public isReadyToTrain?: boolean;
}

class UserQuestionnaire {
  public trainingDuration?: Duration;
  public dailyCaloriesCount?: number;
  public totalCaloriesCount?: number;
  public description?: string;
  public isReadyToGetTrained?: boolean;
}

export type Questionnaire = CoachQuestionnaire | UserQuestionnaire;

export default class UpdateUserDto {
  public userName?: string;
  public email?: string;
  public avatarUrl?: string;
  public password?: string;
  public gender?: Gender;
  public birthday?: string;
  public userRole?: UserRole;
  public location?: SubwayStation;
  public trainingLevel?: TrainingLevel;
  public trainingTypes?: TrainingType[];
  public questionnaire?: Questionnaire;
  public myFriends?: string[];
  public refreshToken?: string | null;
}
