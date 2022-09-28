import { GameObject } from "./gameObject";
import { farmComponent } from "../components/farm";
import { addComponent, addEntity, IWorld } from "bitecs";
import { areaComponent } from "../components/area";
import { Rectangle2f } from "./common";

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

export const getFarmState = (key: number): FarmState => {
  return farmStateMapping[key];
}

export const getFarmStateKey = (state: FarmState): number => {
  return parseInt(
    Object
      .keys(farmStateMapping)
      .find(key => farmStateMapping[key] === state)
  );
}

export class Farm extends GameObject {
  get state(): FarmState {
    return getFarmState(farmComponent.state[this.ecsId]);
  }
  set state(newState: FarmState) {
    farmComponent.state[this.ecsId] = getFarmStateKey(newState);
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

  get area(): Rectangle2f {
    return {
      bottomLeft: {
        x: areaComponent.bottomLeft.x[this.ecsId],
        y: areaComponent.bottomLeft.y[this.ecsId],
      },
      size: {
        x: areaComponent.size.x[this.ecsId],
        y: areaComponent.size.y[this.ecsId],
      },
    }
  }
  set area({ bottomLeft, size }: Rectangle2f)
  {
    areaComponent.bottomLeft.x[this.ecsId] = bottomLeft.x;
    areaComponent.bottomLeft.y[this.ecsId] = bottomLeft.y;
    areaComponent.size.x[this.ecsId] = size.x;
    areaComponent.size.y[this.ecsId] = size.y;
  }
}


export const addFarm = (
  world: IWorld,
  state: FarmState,
  cropId: number,
  growthTime: number,
  area: Rectangle2f
): Farm => {
  const newFarmEcsId = addEntity(world);
  addComponent(world, farmComponent, newFarmEcsId);
  addComponent(world, areaComponent, newFarmEcsId);

  const proxy: Farm = new Farm(newFarmEcsId);
  proxy.state = state;
  proxy.cropId = cropId;
  proxy.growthTime = growthTime;
  proxy.area = area;

  return proxy;
}
