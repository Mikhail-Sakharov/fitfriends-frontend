import {GymRdo} from './gym.rdo';
import {OrderType, PaymentMethod} from './order.rdo';

export class GymOrderRdo {
  public id!: string;
  public createdAt!: string;
  public orderType!: OrderType;
  public gym!: GymRdo;
  public price!: number;
  public quantity!: number;
  public totalOrderPrice!: number;
  public paymentMethod!: PaymentMethod;
  public traineeId!: string;
  public isCompleted!: boolean;
}
