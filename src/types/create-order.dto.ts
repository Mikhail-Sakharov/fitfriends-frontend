import {OrderType, PaymentMethod} from './order.rdo';

export default class CreateOrderDto {
  public orderType!: OrderType;
  public trainingId!: string;
  public price!: number;
  public quantity!: number;
  public totalOrderPrice!: number;
  public paymentMethod!: PaymentMethod;
  public coachId!: string;
}
