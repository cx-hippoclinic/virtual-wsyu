import { SubNamespace } from "../common/config";

export const namespace = SubNamespace.phase2;
export enum StepPages {
  intra,
  play,
}
export interface IPlayerState {
  inited: boolean;
  pages: StepPages;
}
enum LornType {
  short,
  middle,
  long,
}
export interface LornPlanState {
  name?: string;
  type?: LornType;
  time?: number;
  rate?: number;
  quota?: number;
}
export const defaultLornData: LornPlanState[] = [
  {
    key: 0,
    name: "贷款方案1",
    type: LornType.short,
    time: 1,
    rate: 4.35,
    quota: 1,
  },
  {
    key: 1,
    name: "贷款方案2",
    type: LornType.short,
    time: 1,
    rate: 4.35,
    quota: 1.2,
  },
  {
    key: 2,
    name: "贷款方案3",
    type: LornType.short,
    time: 1,
    rate: 4.75,
    quota: 1.2,
  },
  {
    key: 3,
    name: "贷款方案4",
    type: LornType.middle,
    time: 4,
    rate: 4.95,
    quota: 1.2,
  },
  {
    key: 4,
    name: "贷款方案5",
    type: LornType.long,
    time: 6,
    rate: 4.95,
    quota: 1.5,
  },
].concat(new Array(5).fill({}));
