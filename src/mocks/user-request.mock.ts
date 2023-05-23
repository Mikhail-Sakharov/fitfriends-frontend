import {Status} from '../types/status.enum';
import {UserRequestType} from '../types/user-request-type.enum';

export const userRequestMock = {
  id: '6454c3c02cfb673f87f96ac7',
  createdAt: '2023-05-17T13:54:05.747Z',
  updatedAt: '2023-05-17T13:54:05.747Z',
  type: UserRequestType.Training,
  initiatorId: '6454c3c02cfb673f87f96ac8',
  userId: '6454c3c02cfb673f87f96ac9',
  statusChangeDate: '2023-05-17T13:54:05.747Z',
  status: Status.Accepted
};
