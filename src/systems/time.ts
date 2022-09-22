import { ITimeWorld } from "../world";
import { defineSystem, System } from "bitecs";

export const timeSystem: System<[], ITimeWorld> = defineSystem((world: ITimeWorld) => {
  const now = performance.now();  // this is in milliseconds
  const delta = (now - world.time.then) / 1000;  // delta is in seconds

  world.time.delta = delta;
  world.time.elapsed += delta;
  world.time.then = now;

  return world;
});
