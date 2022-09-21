import { defineComponent, ISchema, Types } from "bitecs";

const FarmSchema: ISchema = {
  state: Types.ui8,
  crop: Types.eid,
  growthTime: Types.f32,
};

export const farmComponent = defineComponent(FarmSchema);
