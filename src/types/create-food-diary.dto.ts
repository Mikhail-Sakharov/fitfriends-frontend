import {MealType} from './meal-type.enum';
import {WeekDay} from './week-day.enum';

export class CreateFoodDiaryDto {
  public weekDay!: WeekDay;
  public caloriesCount!: number;
  public mealType!: MealType;
}
