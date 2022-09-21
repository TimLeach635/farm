import world, { World } from "./world";
import { farmGrowthSystem } from "./systems/farm";
import { generateAutoHarvestSystem } from "./systems/debug";
import { timeSystem } from "./systems/time";

export function initialise(
  harvestCallback: (farmId: number, cropId: number) => void
): World {
  world.time = {
    delta: 0,
    elapsed: 0,
    then: performance.now(),
  };

  setInterval(() => {
    farmGrowthSystem(world);
    generateAutoHarvestSystem(harvestCallback)(world);
    timeSystem(world);
  }, 16);

  return world;
}
