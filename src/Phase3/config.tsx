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
  enableStoreCount: number;
  productionData: {
    choseSize: productionLineSize;
    step: ProductionStep;
  };
}

export const materialPrice: Record<goodsType, number> = {
  [goodsType.hocus]: 3000,
  [goodsType.breathe]: 4700,
  [goodsType.ultrasound]: 23000,
};

export const materialDetail = {
  [goodsType.hocus]: [
    { name: "麻醉蒸发罐", price: 1000 },
    { name: "呼吸回路", price: 1200 },
    { name: "流量计", price: 800 },
  ],
  [goodsType.breathe]: [
    { name: "空气混合器", price: 2000 },
    { name: "雾化器", price: 1500 },
    { name: "压缩机", price: 1200 },
  ],
  [goodsType.ultrasound]: [
    { name: "超声换能器", price: 10000 },
    { name: "声透镜", price: 5000 },
    { name: "检测器", price: 8000 },
  ],
};

export enum productionLineSize {
  small = "small",
  middle = "middle",
  large = "large",
}

export const productionLineToTag = {
  [productionLineSize.small]: "小型生产线",
  [productionLineSize.middle]: "中型生产线",
  [productionLineSize.large]: "大型生产线",
};

export enum ProductionStep {
  construction,
  materials,
  delivery,
  pay,
  nextPay,
}
