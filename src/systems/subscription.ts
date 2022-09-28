import { defineQuery, defineSystem, System } from "bitecs";
import { FarmState as FarmGrowthState, getFarmState } from "../gameObjects/farm";
import { ITimeWorld } from "../world";
import { farmComponent } from "../components/farm";
import { cropComponent } from "../components/crop";
import { Rectangle2f } from "../gameObjects/common";
import { areaComponent } from "../components/area";

interface CropState {
  id: number;
  name: string;
  growthTime: number;
}

interface FarmState {
  id: number;
  state: FarmGrowthState;
  crop: CropState;
  growthTime: number;
  area: Rectangle2f;
}

export interface WorldState {
  time: {
    elapsed: number;
  };
  crops: CropState[];
  farms: FarmState[];
}

const cropQuery = defineQuery([cropComponent]);
const farmQuery = defineQuery([farmComponent]);

const generateWorldState = (world: ITimeWorld, stringMap: { [key: number]: string }): WorldState => {
  const cropIds = cropQuery(world);
  const cropStates: CropState[] = cropIds.map(cropId => ({
    id: cropId,
    name: stringMap[cropComponent.name[cropId]],
    growthTime: cropComponent.growthTime[cropId],
  }));
  const farmIds = farmQuery(world);
  const farmStates: FarmState[] = farmIds.map(farmId => ({
    id: farmId,
    state: getFarmState(farmComponent.state[farmId]),
    crop: cropStates.find(cropState => cropState.id === farmComponent.crop[farmId]),
    growthTime: farmComponent.growthTime[farmId],
    area: {
      bottomLeft: {
        x: areaComponent.bottomLeft.x[farmId],
        y: areaComponent.bottomLeft.y[farmId],
      },
      size: {
        x: areaComponent.size.x[farmId],
        y: areaComponent.size.y[farmId],
      },
    }
  }));

  return {
    time: {
      elapsed: world.time.elapsed,
    },
    crops: cropStates,
    farms: farmStates,
  }
}

export const subscriptionSystem: System<[
  {[key: number]: string},
  ...((worldState: WorldState) => void)[]
]> = defineSystem(
  (world: ITimeWorld, stringMap, ...callbacks): ITimeWorld => {
    const worldState = generateWorldState(world, stringMap);

    callbacks.forEach(callback => {
      callback(worldState);
    });

    return world;
  }
);
