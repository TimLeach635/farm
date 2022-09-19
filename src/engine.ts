import world from "./ecs/world";
import { farmGrowthSystem } from "./ecs/systems/farm";
import { autoHarvestSystem } from "./ecs/systems/debug";
import { timeSystem } from "./ecs/systems/time";

world.time = {
  delta: 0,
  elapsed: 0,
  then: performance.now(),
};

setInterval(() => {
  farmGrowthSystem(world);
  autoHarvestSystem(world);
  timeSystem(world);
}, 16);
