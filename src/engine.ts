import world, { World } from "./ecs/world";
import { farmGrowthSystem } from "./ecs/systems/farm";
import { autoHarvestSystem, generateAutoHarvestSystem } from "./ecs/systems/debug";
import { timeSystem } from "./ecs/systems/time";

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
