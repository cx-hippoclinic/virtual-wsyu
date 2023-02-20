import { goodsType, SubNamespace } from "../common/config";

export const namespace = SubNamespace.phase1;
export enum StepPages {
  intra,
  play,
  result,
}
export interface IPlayerState {
  inited: boolean;
  pages: StepPages;
  myShoutsCount: number;
  money: number;
}

export enum Role {
  seller = "seller",
  buyer = "buyer",
}
export function fmtN(n: number, digit = 2) {
  const _n = +n;
  return Number.isNaN(_n) ? null : +_n.toFixed(digit).toString();
}

export const orderDetailData = [
  {
    key: 1,
    [goodsType.hocus]: "100台；10000+2000元",
    [goodsType.breathe]: "100台；15000+2000元",
    [goodsType.ultrasound]: "80台；30000+2000元",
  },
  {
    key: 2,
    [goodsType.hocus]: "150台；9800+1200元",
    [goodsType.breathe]: "150台；14800+1200元",
    [goodsType.ultrasound]: "100台；29500+1500元",
  },
  {
    key: 3,
    [goodsType.hocus]: "200台；9500+1000元",
    [goodsType.breathe]: "200台；14500+1000元",
    [goodsType.ultrasound]: "120台；29000+1000元",
  },
  {
    key: 4,
    [goodsType.hocus]: "300台；9000+1000元",
    [goodsType.breathe]: "300台；14000+1000元",
    [goodsType.ultrasound]: "150台；28000+1000元",
  },
];

export enum User {
  me,
  other,
}

export enum TradeStatue {
  waiting,
  success,
  fail,
}

export interface TradeRecode {
  id: number;
  type: goodsType;
  role: Role;
  price: number;
  count: number;
  owner: User;
  statue: TradeStatue;
  round: number;
  time: number;
}
export interface IPageTradeState {
  inited: boolean;
  tradeRecodes: TradeRecode[];
  leftTime: number;
  round: number;
  myAccount: {
    money: number;
    have: Record<goodsType, number>;
  };
}
export interface rankDataItem {
  name: string;
  count: number;
  money: number;
}
export interface IPageTradeResultState {
  inited: boolean;
  rankData: rankDataItem[];
}
export const TradeStatueToTag = {
  [TradeStatue.waiting]: "挂牌中",
  [TradeStatue.success]: "已完成",
  [TradeStatue.fail]: "已撤回",
};
