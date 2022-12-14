import { defineQuery, defineSystem, IWorld, System } from "bitecs";
import { farmComponent } from "../components/farm";

const farmQuery = defineQuery([farmComponent]);

export const generateAutoHarvestSystem = (
  harvestCallback: (farmId: number, cropId: number) => void
): System => {
  return defineSystem((world: IWorld) => {
    const farms = farmQuery(world);
    farms.forEach((farm) => {
      if (farmComponent.state[farm] !== 3 /* ready to harvest */) return;

      harvestCallback(farm, farmComponent.crop[farm]);

      farmComponent.state[farm] = 2;  // jump immediately back to "growing"
      farmComponent.growthTime[farm] = 0;
    });

    return world;
  });
}

export const autoHarvestSystem = generateAutoHarvestSystem(
  (farmId, cropId) => {
    console.debug(`Harvesting farm ${farmId} containing crop ${cropId}`);
  }
);
