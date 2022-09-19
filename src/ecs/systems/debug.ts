import { World } from "../world";
import { defineQuery } from "bitecs";
import { Farm } from "../components/farm";

const farmQuery = defineQuery([Farm]);

export const autoHarvestSystem = (world: World) => {
  const farms = farmQuery(world);
  farms.forEach((farm) => {
    if (Farm.state[farm] !== 3 /* ready to harvest */) return;

    console.debug(`Harvesting farm ${farm} containing crop ${Farm.crop[farm]}`);

    Farm.state[farm] = 2;  // jump immediately back to "growing"
    Farm.growthTime[farm] = 0;
  });

  return world;
}
