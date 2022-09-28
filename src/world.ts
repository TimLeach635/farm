import { createWorld, IWorld, pipe } from "bitecs";
import { addFarm, Farm, FarmState } from "./gameObjects/farm";
import { addCrop, Crop } from "./gameObjects/crop";
import { farmGrowthSystem } from "./systems/farm";
import { timeSystem } from "./systems/time";
import { subscriptionSystem, WorldState } from "./systems/subscription";
import { Rectangle2f } from "./gameObjects/common";

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
  nextSubscriptionId: number = 0;

  strings: { [key: number]: string } = {};
  nextStringId: number = 0;

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
      subscriptionSystem(this.world, this.strings, ...Object.values(this.subscriptions));
    }, GAME_TICK_MS);
  }

  addString(string: string): number {
    const id = this.nextStringId;
    this.strings[id] = string;
    this.nextStringId++;
    return id;
  }

  addCrop(growthTime: number, name: string): Crop {
    const newCrop: Crop = addCrop(this.world, this.addString(name), growthTime);
    this.crops.push(newCrop);
    return newCrop;
  }

  addFarm(state: FarmState, cropId: number, growthTime: number, area: Rectangle2f) {
    const newFarm: Farm = addFarm(this.world, state, cropId, growthTime, area);
    this.farms.push(newFarm);
    return newFarm;
  }

  subscribe(callback: (worldState: WorldState) => void): number {
    const id = this.nextSubscriptionId;
    this.subscriptions[id] = callback;
    this.nextSubscriptionId++;
    return id;
  }

  unsubscribe(subscriptionId: number): void {
    delete this.subscriptions[subscriptionId];
  }
}

export default World;
