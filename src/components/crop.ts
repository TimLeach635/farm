import { defineComponent, ISchema, Types } from "bitecs";

const CropSchema: ISchema = {
  name: Types.ui32,
  growthTime: Types.f32,
};

export const cropComponent = defineComponent(CropSchema);
