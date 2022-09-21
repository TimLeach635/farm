import { Farm } from "../components/farm";
import { defineQuery } from "bitecs";
import { World } from "../world";
import { Crop } from "../components/crop";

const farmQuery = defineQuery([Farm]);

export const farmGrowthSystem = (world: World) => {
  const farms = farmQuery(world);

  farms.forEach((farm) => {
    if (Farm.state[farm] !== 2 /* growing */) return;


    Farm.growthTime[farm] += world.time.delta;

    if (Farm.growthTime[farm] > Crop.growthTime[Farm.crop[farm]]) {
      Farm.state[farm] = 3;  // ready to harvest
      Farm.growthTime[farm] = 0;
    }
  });

  return world;
}
