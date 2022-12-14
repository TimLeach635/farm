import World from "./world";
import { generateAutoHarvestSystem } from "./systems/debug";

export function initialise(
  harvestCallback: (farmId: number, cropId: number) => void
): World {
  const world = new World(generateAutoHarvestSystem(harvestCallback));

  // Crops
  const wheat = world.addCrop(3, "wheat");
  const lettuce = world.addCrop(2, "lettuce");

  // Farms
  world.addFarm("growing", wheat.ecsId, 0, {
    bottomLeft: { x: 0, y: 0 },
    size: { x: 100, y: 100 },
  });
  world.addFarm("growing", lettuce.ecsId, 0, {
    bottomLeft: { x: 110, y: 0 },
    size: { x: 100, y: 100 },
  });

  return world;
}
