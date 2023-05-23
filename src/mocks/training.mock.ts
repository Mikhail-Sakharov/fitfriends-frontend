import {Duration} from '../types/duration.enum';
import {Gender} from '../types/gender.enum';
import {TrainingLevel} from '../types/training-level.enum';
import {TrainingType} from '../types/training-type.enum';

export const trainingMock = {
  id: '6454c3c02cfb673f87f96ac2',
  createdAt: '2023-05-17T12:54:05.747Z',
  title: 'Training title',
  bgImageUrl: 'img/content/thumbnails/training-01.jpg',
  level: TrainingLevel.Newbie,
  type: TrainingType.Pilates,
  duration: Duration.TenToThirty,
  price: 1000,
  caloriesCount: 1234,
  description: 'Training description',
  gender: Gender.Undefined,
  videoUrl: 'files/4407c2ce-ecec-4ac3-b2cb-635057560b4d.mp4',
  rating: 5,
  coachId: '6454c3c02cfb673f87f96ac7',
  isSpecialOffer: false,
};
