import {OrderType, PaymentMethod} from '../types/order.rdo';
import {trainingMock} from './training.mock';

export const orderMock = {
  id: '6454c3c02cfb673f87f96ac7',
  createdAt: '2023-05-17T13:54:05.747Z',
  orderType: OrderType.Training,
  training: trainingMock,
  price: 1000,
  quantity: 3,
  totalOrderPrice: 3000,
  paymentMethod: PaymentMethod.Visa,
  coachId: '6454c3c02cfb673f87f96ac7',
  traineeId: '6454c3c02cfb673f87f96ac3',
  isCompleted: false,
  statistics: {
    totalSoldQuantity: 5,
    totalSoldAmountOfMoney: 5000
  },
};
