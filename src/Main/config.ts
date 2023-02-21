import { ReactNode } from "react";
export enum MoveType {
  match,
}

export enum PushType {
  locateToSubgame,
}

export interface IMoveParams {
  namespace: string;
}

export interface IPushParams {
  matchingSet: Set<string>;
  namespace: string;
  subGameId: string;
}

export interface ICreateParams {}

export const ROOM_SIZE = 2;

export interface IGameState {
  matching: Map<string, Set<string>>;
}

export enum SubGameStatus {
  init,
  match,
  play,
  over,
}

export enum Page {
  intro,
  play,
  result,
  report,
}

export enum introPhases {
  currency,
  risk,
  securities,
}
export enum introSubPhases {
  intro,
  introDetail,
  question,
  reviewQuestion,
}

export interface IPlayerState {
  inited: Boolean;
  page: Page;
  subGameList: { namespace: string; status: SubGameStatus; id?: string }[];
  introPhases: {
    phases: introPhases;
    subPhases: introSubPhases;
    questionChose: Record<introPhases, number[]>;
  };
}

export interface introPhasesViewConfig {
  namespace: introPhases;
  intro: ReactNode;
  hasIntroDetail?: boolean;
  title: string;
  defQuestionList: questionState[];
}
export interface questionState {
  question: string;
  answer: string[];
  current: number;
  analyze: string;
}
const questionList: Record<introPhases, questionState[]> = {
  [introPhases.currency]: [
    {
      question: "1.关于递延年金，下列说法错误的是()。",
      answer: [
        "A.递延年金是指隔若干期以后才开始发生的系列等额收付款项",
        "B.递延年金没有终值",
        "C.递延年金现值的大小与递延期有关，递延期越长，现值越小",
        "D.递延年金终值与递延期无关",
      ],
      current: 1,
      analyze:
        "递延年金是指隔若干期以后才开始发生的系列等额收付款项，递延年金存在终值，其终值的计算与普通年金是相同的，终值的大小与递延期无关;但是递延年金的现值与递延期是有关的，递延期越长，递延年金的现值越小，所以选项B的说法是错误的。",
    },
    {
      question:
        "2.某人现在从银行取得借款20000元，贷款利率为3%，要想在5年内还清，每年应该等额归还()元。(P/A，3%，5)=4.5797",
      answer: ["A.4003.17", "B.4803.81", "C.4367.10", "D.5204.13"],
      current: 2,
      analyze: "本题是已知现值求年金,即计算年资本回收额：A=20000/(P/A，3%，5)=20000/4.5797=4367.10(元)。",
    },
    {
      question: "3.某一项年金前4年没有流入，后5年每年年初流入4000元，则该项年金的递延期是()年。",
      answer: ["A.4", "B.3", "C.2", "D.5"],
      current: 1,
      analyze:
        "前4年没有流入，后5年指的是从第5年开始的，第5年年初相当于第4年年末，这项年金相当于是从第4年末开始流入的，所以，递延期为3年。",
    },
    {
      question:
        "4.某人分期购买一套住房，每年年末支付50000元，分10次付清，假设年利率为3%，则该项分期付款相当于现在一次性支付()元。(P/A，3%，10)=8.5302",
      answer: ["A.469161", "B.387736", "C.426510", "D.504057"],
      current: 2,
      analyze: "本题是是己知年金求现值，P=50000X8.5302=426510(元)",
    },
    {
      question:
        "5.甲希望在10年后获得80000元，已知银行存款利率为2%，那么为了达到这个目标，甲从现在开始，共计存10次，每年末应该存入()元。(F/A，2%，10)=10.95",
      answer: ["A.8706.24", "B.6697.11", "C.8036.53", "D.7305.94"],
      current: 3,
      analyze: "这是已知终值求年金，即计算偿债基金。A=80000/(F/A，2%，10)=80000/10.95=7305.94(元)。",
    },
  ],
  [introPhases.risk]: [
    {
      question: "1.投资者中于冒风险进行投资而获得的超过无风险收益率的额外收益，称为投资的()。",
      answer: ["A.实际收益率", "B.期望报酬率", "C.风险报酬率", "D.必要报酬率"],
      current: 2,
      analyze:
        "实际收益率是已经实现或确定可以实现的收益率，期望报酬率是在不确定条件下，预测的某项资产未来可能实现的收益率;风险报酬率是持有者因承担资产的风险而要求的超过无风险收益率的额外收益;必要报酬率是投资者对某资产合理要求的最低收益率。",
    },
    {
      question:
        "2.企业某新产品开发成功的概率为80%，成功后的投资报酬率为40%，开发失败的概率为20%，失败后的投资报酬率为-100%，则该产品开发方案的预期投资报酬率为()。",
      answer: ["A.18%", "B.20%", "C.12%", "D.40%"],
      current: 2,
      analyze: "80%X40%+20%X(-100%)=12%。",
    },
    {
      question: "3.投资者甘冒风险进行投资的诱因是()。",
      answer: ["A.可获得投资收益", "B.可获得时间价值回报", "C.可获得风险报酬率", "D.可一定程度抵御风险"],
      current: 2,
      analyze: "投资者愿意冒风险进行投资是为了获得超过时间价值的那部分收益，即风险报酬率。",
    },
    {
      question:
        "4.某企业拟进行一项存在一定风险的完整工业项目投资，有甲、乙两个方案可供选择:已知甲方案净现值的期望值为1000万元，标准离差为300万元;乙方案净现值的期望值为1200万元，标准离差为330万元。下列结论中正确的是()。",
      answer: [
        "A.甲方案优于乙方案",
        "B.甲方案的风险大于乙方案",
        "C.甲方案的风险小于乙方案",
        "D.无法评价甲乙方案的风险大小",
      ],
      current: 1,
      analyze:
        "在期望值不等的时候，采用标准离差率来衡量风险，甲的标准离差率为0.3(300/1000)，乙的标准离差率为0.275(330/1200)。",
    },
    {
      question:
        "5.已知甲方案投资收益率的期望值为15%，乙方案投资收益率的期望值为12%，两个方案都存在投资风险。比较甲乙两方案风险大小应采用的指标是()。",
      answer: ["A.方差", "B.净现值", "C.标准离差", "D.标准离差率"],
      current: 3,
      analyze: "在期望值相等的时候，可采用标准离差、方差衡量风险大小;在期望值不等的时候，采用标准离差率来衡量风险。",
    },
  ],
  [introPhases.securities]: [
    {
      question: "1.一般认为，企业进行短期债券投资的主要目的是()。",
      answer: ["A.控制被投资企业", "B.调剂现金余额", "C.获得稳定收益", "D.增强资产流动性"],
      current: 1,
      analyze:
        "企业进行短期债券投资的目的主要是为了调剂现金余额;进行长期债券投资的目的主要是为了获得稳定的收益;而企业进行股票投资的目的主要有两种:一是获利;二是控股",
    },
    {
      question:
        "2.甲公司于2009年11月1日投资95000元,购进乙公司发行的面值为1000元，票面利率为8%，短期债券100张。该债券每年付息一次，甲公司预计于2010年10月30日以面值出售，则该债券的投资收益率为()。",
      answer: ["A.5.26%", "B.8.42%", "C.13%", "D.13. 68%"],
      current: 3,
      analyze:
        "仅持有一年出售，属于短期持有，不考虑资金的时间价值。短期债券投资收益率=(100000-95000+100000X8%)/95000X100%=13.68%",
    },
    {
      question:
        "3.甲公司准备投资购买某信托股份有限公司的股票，该股票刚刚支付的股利为每股3元，预计以后每年以2%的增长率增长，该公司期望投资报酬率10%，则该股票的市场价格( ) 元时才值得购买。",
      answer: ["A.大于等于30元", "B.大于等于25.45元", "C.小于等于40元", "D.小于等于38.25元"],
      current: 3,
      analyze:
        "根据股票的估价模型公式可得，V=3X(1+2%)/(10%-2%)=38.25(元)。只有当股票的市场价格小于等于内在价值时才值得购买。",
    },
    {
      question: "4.下列选项中，流动性风险最小的是()。",
      answer: ["A.公司债券", "B.公司股票", "C.国库券", "D.地方政府债券"],
      current: 2,
      analyze: "购买国库券，几乎可以立即出售，因此，流动性风险小。",
    },
    {
      question: "5.股票投资较之债券投资而言，其特点是()。",
      answer: [
        "A.股票投资的求偿权居前",
        "B.股票投资的购买力风险大",
        "C.股票投资的收益比较稳定",
        "D.股票投资的变现能力较差",
      ],
      current: 3,
      analyze: "股票投资的求偿权居后，购买力风险较小，价格不稳定，收益不稳定。",
    },
  ],
};

export const subGameViewConfigList: introPhasesViewConfig[] = [
  {
    namespace: introPhases.currency,
    intro:
      "您在一家医疗企业工作，最近企业想要购买一批原材料进行医疗器械生产，想要去银行获得一笔贷款，当你来到银行之后，发现银行发布了一项新的贷款套餐，银行对于该套餐有多种计息还款方式去针对不同人群的客户，你选择需要计算在贷款额度、贷款期限固定的情况下选择哪种方案去使得利息最少，计息还款方式的不同会导致不同的结果。\n" +
      "以下是一个简单的例子：\n" +
      "某银行开发了一项新的贷款套餐，贷款额度、贷款期限、贷款的名义年利率均固定，客户有两种计息还款方式可选择：\n" +
      "方式一:贷款按月复利计息，客户按月等额本息还款；\n" +
      "方式二:贷款按月复利计息，客户按月等额本息还款。",
    title: "货币价值",
    hasIntroDetail: true,
    defQuestionList: questionList[introPhases.currency],
  },
  {
    namespace: introPhases.risk,
    intro:
      "风险是一种非确定性，区别于确定性和不确定性。未来不确定，但是各种可能的情形及其发生的概率已知或者可以估计。（确定性：未来的情况完全确定，100%的发生某种特定情况，不确定性：未来的情况不确定，且可能发生的情形或者概率无法估计。）\n" +
      "风险的分类：\n" +
      "可分散风险：也被称为非系统风险或者公司特有风险。可以通过投资组合消除。通常产生于个别公司的特有事件，不对所有企业或投资项目产生普遍的影响。",
    title: "风险收益",
    defQuestionList: questionList[introPhases.risk],
  },
  {
    namespace: introPhases.securities,
    intro:
      "凭证证券：单纯证明一定事实的证券，如借据、收条等。\n" +
      "有价证券：有价格，可流通，转让过程中权益会增减。\n" +
      "商品证券：一般包括提货单、货栈单等。\n" +
      "货币证券：货币证券主要指汇票、本票、支票。\n" +
      "资本证券：主要有股票、债券、基金。\n" +
      "债券定义：由公司、金融机构或者政府发行的，表明发行人对其承担还本付息义务的一种债务性凭证。属于债务融资的主要方式之一，是一种重要的有价证券，发行者、购买者通过债券契约固定双方权利义务",
    title: "证券估值",
    defQuestionList: questionList[introPhases.securities],
  },
];

export function getSubGameViewConfig(namespace: introPhases) {
  return subGameViewConfigList.find((s) => s.namespace === namespace);
}
