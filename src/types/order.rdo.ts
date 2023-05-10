import {TrainingRdo} from './training.rdo';

export enum OrderType {
  Gym = 'абонемент',
  Training = 'тренировка'
}

export enum PaymentMethod {
  Visa = 'visa',
  Mir = 'mir',
  Umoney = 'umoney'
}

export class OrderRdo {
  public id!: string;
  public createdAt!: string;
  public orderType!: OrderType;
  public training!: TrainingRdo;
  public price!: number;
  public quantity!: number;
  public totalOrderPrice!: number;
  public paymentMethod!: PaymentMethod;
  public coachId!: string;
  public traineeId!: string;
  public isCompleted!: boolean;
  public statistics!: {
    totalSoldQuantity: number;
    totalSoldAmountOfMoney: number;
  };
}
