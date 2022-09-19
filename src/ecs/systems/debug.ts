import { World } from "../world";
import { defineQuery } from "bitecs";
import { Farm } from "../components/farm";

const farmQuery = defineQuery([Farm]);

export const generateAutoHarvestSystem = (
  harvestCallback: (farmId: number, cropId: number) => void
): ((world: World) => World) => {
  return (world: World) => {
    const farms = farmQuery(world);
    farms.forEach((farm) => {
      if (Farm.state[farm] !== 3 /* ready to harvest */) return;

      harvestCallback(farm, Farm.crop[farm]);

      Farm.state[farm] = 2;  // jump immediately back to "growing"
      Farm.growthTime[farm] = 0;
    });

    return world;
  }
}

export const autoHarvestSystem = generateAutoHarvestSystem(
  (farmId, cropId) => {
    console.debug(`Harvesting farm ${farmId} containing crop ${cropId}`);
  }
);
