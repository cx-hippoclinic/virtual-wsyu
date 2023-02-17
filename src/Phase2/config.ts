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
