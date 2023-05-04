import {Duration} from './duration.enum';
import {TrainingGenderType} from './training-gender.enum';
import {TrainingLevel} from './training-level.enum';
import {TrainingType} from './training-type.enum';

export default class CreateTrainingDto {
  public title!: string;
  public bgImageUrl!: string;
  public level!: TrainingLevel;
  public type!: TrainingType;
  public duration!: Duration;
  public price?: number;
  public caloriesCount!: number;
  public description!: string;
  public gender!: TrainingGenderType;
  public videoUrl!: string;
  public rating?: number;
  public isSpecialOffer!: boolean;
}
