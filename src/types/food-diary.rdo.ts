import {MealType} from './meal-type.enum';
import {WeekDay} from './week-day.enum';

export class FoodDiaryRdo {
  public id!: string;
  public createdAt!: string[];
  public weekDay!: WeekDay;
  public userId!: string;
  public caloriesCount!: number;
  public mealType!: MealType;
}
