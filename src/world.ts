import { addComponent, addEntity, createWorld, IWorld } from "bitecs";
import { Crop } from "./components/crop";
import { Farm } from "./components/farm";
import { Area } from "./components/area";

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
const wheatFarm = addEntity(world);
addComponent(world, Farm, wheatFarm);
addComponent(world, Area, wheatFarm);
Farm.state[wheatFarm] = 2;
Farm.crop[wheatFarm] = wheat;
Farm.growthTime[wheatFarm] = 0;

const lettuceFarm = addEntity(world);
addComponent(world, Farm, lettuceFarm);
addComponent(world, Area, lettuceFarm);
Farm.state[lettuceFarm] = 2;
Farm.crop[lettuceFarm] = lettuce;
Farm.growthTime[lettuceFarm] = 0;

export default world;
