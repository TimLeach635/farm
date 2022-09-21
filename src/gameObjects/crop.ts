import { GameObject } from "./gameObject";
import { cropComponent } from "../components/crop";
import { addComponent, addEntity, IWorld } from "bitecs";

export class Crop extends GameObject {
  get growthTime(): number {
    return cropComponent.growthTime[this.ecsId];
  }
  set growthTime(newGrowthTime: number) {
    cropComponent.growthTime[this.ecsId] = newGrowthTime;
  }
}

export const addCrop = (
  world: IWorld,
  growthTime: number,
): Crop => {
  const newCropEcsId = addEntity(world);
  addComponent(world, cropComponent, newCropEcsId);

  const proxy: Crop = new Crop(newCropEcsId);
  proxy.growthTime = growthTime;

  return proxy;
}
