import {SortOrder} from './sort-order';
import {SortType} from './sort.type';

export class GetOrdersQuery {
  public sortType?: SortType;
  public sortOrder?: SortOrder;
  public page?: number;
  public limit?: number;
}
