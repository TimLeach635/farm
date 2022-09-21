import { addComponent, addEntity, createWorld, IWorld } from "bitecs";
import { Crop } from "./components/crop";
import { addFarm } from "./gameObjects/farm";

export interface World extends IWorld {
  time: {
    delta: number;
    elapsed: number;
    then: number;
  };
}

const world = createWorld<World>();

// Crops
const wheat = addEntity(world);
addComponent(world, Crop, wheat);
Crop.growthTime[wheat] = 3;

const lettuce = addEntity(world);
addComponent(world, Crop, lettuce);
Crop.growthTime[lettuce] = 2;

// Farms
addFarm(world, "growing", wheat, 0);
addFarm(world, "growing", lettuce, 0);

export default world;
