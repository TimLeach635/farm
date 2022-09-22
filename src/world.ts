import { createWorld, IWorld, pipe } from "bitecs";
import { addFarm, Farm, FarmState } from "./gameObjects/farm";
import { addCrop, Crop } from "./gameObjects/crop";
import { farmGrowthSystem } from "./systems/farm";
import { timeSystem } from "./systems/time";
import { subscriptionSystem, WorldState } from "./systems/subscription";

const GAME_TICK_MS = 16;

export interface ITimeWorld extends IWorld {
  time: {
    delta: number;
    elapsed: number;
    then: number;
  };
}

export class World {
  world: ITimeWorld;
  crops: Crop[] = [];
  farms: Farm[] = [];
  pipeline;
  subscriptions: { [key: number]: (worldState: WorldState) => void } = {};
  nextId: number = 0;

  constructor(...debugSystems: ((world: IWorld) => IWorld)[]) {
    this.world = createWorld<ITimeWorld>();
    this.world.time = {
      delta: 0,
      elapsed: 0,
      then: performance.now(),
    };

    this.pipeline = pipe(
      farmGrowthSystem,
      ...debugSystems,
      timeSystem,
    );

    setInterval(() => {
      this.pipeline(this.world);
      subscriptionSystem(this.world, ...Object.values(this.subscriptions));
    }, GAME_TICK_MS);
  }

  addCrop(growthTime: number): Crop {
    const newCrop: Crop = addCrop(this.world, growthTime);
    this.crops.push(newCrop);
    return newCrop;
  }

  addFarm(state: FarmState, cropId: number, growthTime: number) {
    const newFarm: Farm = addFarm(this.world, state, cropId, growthTime);
    this.farms.push(newFarm);
    return newFarm;
  }

  subscribe(callback: (worldState: WorldState) => void): number {
    const id = this.nextId;
    this.subscriptions[id] = callback;
    this.nextId++;
    return id;
  }

  unsubscribe(subscriptionId: number): void {
    delete this.subscriptions[subscriptionId];
  }
}

export default World;
