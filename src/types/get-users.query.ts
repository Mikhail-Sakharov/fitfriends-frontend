import {SortOrder} from './sort-order';
import {SortType} from './sort.type';

export class GetUsersQuery {
  public location?: string;
  public trainingTypes?: string;
  public trainingLevel?: string;
  public userRole?: string;
  public isReadyForTraining?: boolean;
  public sortType?: SortType;
  public sortOrder?: SortOrder;
  public page?: number;
  public limit?: number;
}
