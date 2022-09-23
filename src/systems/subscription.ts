import { defineQuery, defineSystem, System } from "bitecs";
import { FarmState, getFarmState } from "../gameObjects/farm";
import { ITimeWorld } from "../world";
import { farmComponent } from "../components/farm";
import { cropComponent } from "../components/crop";

interface CropState {
  id: number;
  growthTime: number;
}

export interface WorldState {
  time: {
    elapsed: number;
  };
  crops: CropState[];
  farms: {
    id: number;
    state: FarmState;
    crop: CropState;
    growthTime: number;
  }[];
}

const cropQuery = defineQuery([cropComponent]);
const farmQuery = defineQuery([farmComponent]);

const generateWorldState = (world: ITimeWorld): WorldState => {
  const cropIds = cropQuery(world);
  const cropStates: CropState[] = cropIds.map(cropId => ({
    id: cropId,
    growthTime: cropComponent.growthTime[cropId],
  }));
  const farmIds = farmQuery(world);
  const farmStates = farmIds.map(farmId => ({
    id: farmId,
    state: getFarmState(farmComponent.state[farmId]),
    crop: cropStates.find(cropState => cropState.id === farmComponent.crop[farmId]),
    growthTime: farmComponent.growthTime[farmId],
  }));

  return {
    time: {
      elapsed: world.time.elapsed,
    },
    crops: cropStates,
    farms: farmStates,
  }
}

export const subscriptionSystem: System<((worldState: WorldState) => void)[]> = defineSystem(
  (world: ITimeWorld, ...callbacks): ITimeWorld => {
    const worldState = generateWorldState(world);

    callbacks.forEach(callback => {
      callback(worldState);
    });

    return world;
  }
);
