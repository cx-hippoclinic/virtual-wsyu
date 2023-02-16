export enum SubNamespace {
  phase1 = "phase1",
  phase2 = "phase2",
  phase3 = "phase3",
}
export interface ISubGameConfig {
  namespace: SubNamespace;
  label: string;
  intra: string;
}

export const subGameConfigList: ISubGameConfig[] = [
  {
    namespace: SubNamespace.phase1,
    label: "物料交易市场",
    intra:
      "该部分的实验为市场交易实验，每个交易期分为3个阶段，分别是：持续时间15秒的准备阶段、持续时间150秒的交易阶段和持续时间15秒的回顾阶段。\n" +
      "在每个交易期中，您将在模拟交易市场中交易虚拟物品。每个交易期的市场里有若干位买家和卖家，您会在市场开始前选择作为买家还是卖家。如果您选择的角色是买家，您的任务是在市场上买入虚拟物品以赚取利润；如果您选择的角色是卖家，您的任务是在市场上卖出虚拟物品以赚取利润。      ",
  },
  {
    namespace: SubNamespace.phase2,
    label: "银行信贷",
    intra:
      "供应商角色包括国外供应商和国内供应商两种，国外供应商可以提供国内供应商所没有的精密仪器，在原材料种类上和国内供应商有所区别，而国内供应商可以享受税收优惠政策，在相应的材料采购成本上更具优势。选择供应商角色的学生可以自行决定上架物品种类和物品价格。",
  },
  {
    namespace: SubNamespace.phase3,
    label: "医疗企业",
    intra:
      "要在激烈竞争的市场上生存，不但要有正确的策略和长期规划，还要使由各部门组成的经营团队能协调合作，一切为企业整体策略和长期目标而齐心努力。制定年度计划这一环节非常重要，能提升高层管理者宏观且系统化的思维能力、长期规划能力、决策能力，强化企业各部门间的协调合作，提升企业竞争力，长短期规划与计划的结合能力，从而创造高利润以及高回报的成功企业。\n",
  },
];

export function getSubGameConfig(namespace: SubNamespace) {
  return subGameConfigList.find((s) => s.namespace === namespace);
}
