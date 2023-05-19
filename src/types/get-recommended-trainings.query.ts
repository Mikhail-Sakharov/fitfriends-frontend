import {SortOrder} from './sort-order';
import {SortType} from './sort.type';

export class GetRecommendedTrainingsQuery {
  public minCaloriesCount?: number;
  public maxCaloriesCount?: number;
  public duration?: string;
  public trainingType?: string;
  public trainingLevel?: string;
  public sortType?: SortType;
  public sortOrder?: SortOrder;
  public page?: number;
  public limit?: number;
}
