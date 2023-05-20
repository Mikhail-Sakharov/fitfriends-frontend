import {MealType} from './meal-type.enum';
import {WeekDay} from './week-day.enum';

export class UpdateFoodDiaryDto {
  public weekDay?: WeekDay;
  public caloriesCount?: number;
  public mealType?: MealType;
}
