import {SortOrder} from './sort-order';
import {SortType} from './sort.type';

export class GetGymsQuery {
  public minPrice?: number;
  public maxPrice?: number;
  public location?: string;
  public features?: string;
  public isVerified?: boolean;
  public sortType?: SortType;
  public sortOrder?: SortOrder;
  public page?: number;
  public limit?: number;
}
