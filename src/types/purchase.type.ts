import {GymOrderRdo} from './gym-order.rdo';
import {OrderRdo} from './order.rdo';

export type Purchase = (Omit<OrderRdo, 'statistics'> | GymOrderRdo);
