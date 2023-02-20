import { goodsType, SubNamespace } from "../common/config";

export const namespace = SubNamespace.phase3;
export enum StepPages {
  intra,
  play,
}
export enum SubPages {
  nav,
  info,
  strategic,
  material,
  Bank,
  Inventory,
  Production,
}
export interface IPlayerState {
  inited: boolean;
  pages: StepPages;
  subPage: SubPages;
  strategicData: {
    material: Record<goodsType, number>;
    productionLine: Record<goodsType, number>;
  };
  loanPlan: number;
}

export const materialPrice: Record<goodsType, number> = {
  [goodsType.hocus]: 3000,
  [goodsType.breathe]: 4700,
  [goodsType.ultrasound]: 23000,
};
