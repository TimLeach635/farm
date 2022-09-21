import World from "./world";
import { generateAutoHarvestSystem } from "./systems/debug";

export function initialise(
  harvestCallback: (farmId: number, cropId: number) => void
): World {
  const world = new World(generateAutoHarvestSystem(harvestCallback));

  // Crops
  const wheat = world.addCrop(3);
  const lettuce = world.addCrop(2);

  // Farms
  world.addFarm("growing", wheat.ecsId, 0);
  world.addFarm("growing", lettuce.ecsId, 0);

  return world;
}
