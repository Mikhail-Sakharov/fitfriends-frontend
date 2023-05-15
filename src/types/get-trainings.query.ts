import {SortOrder} from './sort-order';
import {SortType} from './sort.type';

export class GetTrainingsQuery {
  public minPrice?: number;
  public maxPrice?: number;
  public minCaloriesCount?: number;
  public maxCaloriesCount?: number;
  public minRating?: number;
  public maxRating?: number;
  public duration?: string;
  public trainingType?: string;
  public sortType?: SortType;
  public sortOrder?: SortOrder;
  public page?: number;
  public limit?: number;
}
