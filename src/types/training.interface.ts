import {Duration} from './duration.enum';
import {TrainingGenderType} from './training-gender.enum';
import {TrainingLevel} from './training-level.enum';
import {TrainingType} from './training-type.enum';

export interface Training {
  id?: string;
  createdAt?: string;
  title: string;
  bgImageUrl: string;
  level: TrainingLevel;
  type: TrainingType;
  duration: Duration;
  price?: number;
  caloriesCount: number;
  description: string;
  gender: TrainingGenderType;
  videoUrl: string;
  rating?: number;
  coachId: string;
  isSpecialOffer?: boolean;
}
