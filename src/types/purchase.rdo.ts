import {TrainingRdo} from './training.rdo';
import {OrderType, PaymentMethod} from './order.rdo';

export class PurchaseRdo {
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
  public isCompleted!: string;
}
