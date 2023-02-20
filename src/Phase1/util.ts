import { goodsType } from "../common/config";

export function randomCount(start, end) {
  return Math.floor(Math.random() * (end - start) + start);
}

export const goodPriceRefer = {
  [goodsType.hocus]: {
    minPrice: 10000,
    maxPrice: 12000,
    minCount: 100,
    maxCount: 300,
  },
  [goodsType.breathe]: {
    minPrice: 15000,
    maxPrice: 17000,
    minCount: 100,
    maxCount: 300,
  },
  [goodsType.ultrasound]: {
    minPrice: 29000,
    maxPrice: 32000,
    minCount: 80,
    maxCount: 150,
  },
};

export function mockTradeRecode(during, setApiState) {
  return;
}
export function calcBuySuccess(goodsType, price) {
  const data = goodPriceRefer[goodsType];
  if (price < data.minPrice) {
    return false;
  } else if (price === data.minPrice) {
    return Math.random() > 0.5;
  } else {
    return Math.random() > 0.5 - ((price - data.minPrice) / (data.maxPrice - data.minPrice)) * 0.5;
  }
}
export function calcSellSuccess(goodsType, price) {
  const data = goodPriceRefer[goodsType];
  if (price < data.minPrice) {
    return true;
  } else if (price === data.minPrice) {
    return Math.random() > 0.5;
  } else {
    return Math.random() > 0.5 + ((price - data.minPrice) / (data.maxPrice - data.minPrice)) * 0.5;
  }
}
