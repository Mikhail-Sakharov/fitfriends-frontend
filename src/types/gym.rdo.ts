import {GymFeatures} from './gym-features.enum';
import {SubwayStation} from './subway-station.enum';

export class GymRdo {
  public id!: string;
  public ceatedAt!: string;
  public title!: string;
  public location!: SubwayStation;
  public isVerified?: boolean;
  public features!: GymFeatures[];
  public images!: string[];
  public description!: string;
  public price!: number;
}
