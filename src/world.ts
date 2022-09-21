import { createWorld, IWorld } from "bitecs";
import { addFarm } from "./gameObjects/farm";
import { addCrop } from "./gameObjects/crop";

export interface World extends IWorld {
  time: {
    delta: number;
    elapsed: number;
    then: number;
  };
}

const world = createWorld<World>();

// Crops
const wheat = addCrop(world, 3);
const lettuce = addCrop(world, 2);

// Farms
addFarm(world, "growing", wheat.ecsId, 0);
addFarm(world, "growing", lettuce.ecsId, 0);

export default world;
