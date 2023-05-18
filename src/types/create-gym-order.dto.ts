import {PaymentMethod} from './order.rdo';

export class CreateGymOrderDto {
  public gymId!: string;
  public price!: number;
  public quantity!: number;
  public totalOrderPrice!: number;
  public paymentMethod!: PaymentMethod;
}
