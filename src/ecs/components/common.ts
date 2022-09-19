import { ISchema, Types } from "bitecs";

export const Vector2f: ISchema = {
  x: Types.f32,
  y: Types.f32,
};

export const Rectangle2f: ISchema = {
  bottomLeft: Vector2f,
  size: Vector2f,
};
