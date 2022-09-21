import { defineComponent, ISchema, Types } from "bitecs";

const CropSchema: ISchema = {
  growthTime: Types.f32,
};

export const Crop = defineComponent(CropSchema);
