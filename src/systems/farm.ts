import { farmComponent } from "../components/farm";
import { defineQuery } from "bitecs";
import { ITimeWorld } from "../world";
import { cropComponent } from "../components/crop";

const farmQuery = defineQuery([farmComponent]);

export const farmGrowthSystem = (world: ITimeWorld) => {
  const farms = farmQuery(world);

  farms.forEach((farm) => {
    if (farmComponent.state[farm] !== 2 /* growing */) return;


    farmComponent.growthTime[farm] += world.time.delta;

    if (farmComponent.growthTime[farm] > cropComponent.growthTime[farmComponent.crop[farm]]) {
      farmComponent.state[farm] = 3;  // ready to harvest
      farmComponent.growthTime[farm] = 0;
    }
  });

  return world;
}
