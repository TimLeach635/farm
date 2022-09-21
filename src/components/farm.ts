import { defineComponent, ISchema, Types } from "bitecs";

// const FarmStates = {
//   0: "uncreated",
//   1: "plowed",
//   2: "growing",
//   3: "ready to harvest",
//   4: "harvested",
// };

const FarmSchema: ISchema = {
  state: Types.ui8,
  crop: Types.eid,
  growthTime: Types.f32,
};

export const Farm = defineComponent(FarmSchema);
