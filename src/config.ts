import { TStepResult } from "@ancademy/vse-share";

export const stepConfigList: Omit<TStepResult, "seq" | "score" | "startTime" | "endTime">[] = Array(10).fill({
  title: "Mock步骤数据",
  expectTime: 3 * 60,
  scoringModel: "未完成：0分；完成：10分",
  maxScore: 10,
});
