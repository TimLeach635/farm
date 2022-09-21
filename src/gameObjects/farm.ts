import { GameObject } from "./gameObject";
import { farmComponent } from "../components/farm";
import { addComponent, addEntity, IWorld } from "bitecs";
import { areaComponent } from "../components/area";

export type FarmState =
  "uncreated" |
  "plowed" |
  "growing" |
  "ready to harvest" |
  "harvested";

const farmStateMapping: { [key: number]: FarmState } = {
  0: "uncreated",
  1: "plowed",
  2: "growing",
  3: "ready to harvest",
  4: "harvested",
};

export class Farm extends GameObject {
  get state(): FarmState {
    return farmStateMapping[farmComponent.state[this.ecsId]];
  }
  set state(newState: FarmState) {
    farmComponent.state[this.ecsId] = parseInt(
      Object
        .keys(farmStateMapping)
        .find(key => farmStateMapping[key] === newState)
    );
  }

  get cropId(): number {
    return farmComponent.crop[this.ecsId];
  }
  set cropId(newCropId: number) {
    farmComponent.crop[this.ecsId] = newCropId;
  }

  get growthTime(): number {
    return farmComponent.growthTime[this.ecsId];
  }
  set growthTime(newGrowthTime: number) {
    farmComponent.growthTime[this.ecsId] = newGrowthTime;
  }
}

export const addFarm = (
  world: IWorld,
  state: FarmState,
  cropId: number,
  growthTime: number
): Farm => {
  const newFarmEcsId = addEntity(world);
  addComponent(world, farmComponent, newFarmEcsId);
  addComponent(world, areaComponent, newFarmEcsId);

  const proxy: Farm = new Farm(newFarmEcsId);
  proxy.state = state;
  proxy.cropId = cropId;
  proxy.growthTime = growthTime;

  return proxy;
}
