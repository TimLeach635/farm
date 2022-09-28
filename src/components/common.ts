import { ISchema, Type, Types } from "bitecs";

interface IVector2fSchema extends ISchema {
  x: Type;
  y: Type;
}

export const Vector2f: IVector2fSchema = {
  x: Types.f32,
  y: Types.f32,
};

interface IRectangle2fSchema extends ISchema {
  bottomLeft: IVector2fSchema;
  size: IVector2fSchema;
}

export const Rectangle2f: IRectangle2fSchema = {
  bottomLeft: Vector2f,
  size: Vector2f,
};
