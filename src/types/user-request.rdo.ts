import {Status} from './status.enum';
import {UserRequestType} from './user-request-type.enum';

export class UserRequestRdo {
  public id!: string;
  public createdAt!: string;
  public updatedAt!: string;
  public type!: UserRequestType;
  public initiatorId!: string;
  public userId!: string;
  public statusChangeDate!: string;
  public status!: Status;
}
