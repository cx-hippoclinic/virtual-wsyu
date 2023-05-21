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
    label: "信息转换与存储",
    intra:
      "该部分的实验为市场交易实验，每个交易期分为3个阶段，分别是：持续时间15秒的准备阶段、持续时间150秒的交易阶段和持续时间15秒的回顾阶段。\n" +
      "在每个交易期中，您将在模拟交易市场中交易虚拟物品。每个交易期的市场里有若干位买家和卖家，您会在市场开始前选择作为买家还是卖家。如果您选择的角色是买家，您的任务是在市场上买入虚拟物品以赚取利润；如果您选择的角色是卖家，您的任务是在市场上卖出虚拟物品以赚取利润。      ",
  },
  {
    namespace: SubNamespace.phase2,
    label: "校验码编解码",
    intra:
      "供应商角色包括国外供应商和国内供应商两种，国外供应商可以提供国内供应商所没有的精密仪器，在原材料种类上和国内供应商有所区别，而国内供应商可以享受税收优惠政策，在相应的材料采购成本上更具优势。选择供应商角色的学生可以自行决定上架物品种类和物品价格。",
  },
  {
    namespace: SubNamespace.phase3,
    label: "信息传输",
    intra:
      "要在激烈竞争的市场上生存，不但要有正确的策略和长期规划，还要使由各部门组成的经营团队能协调合作，一切为企业整体策略和长期目标而齐心努力。制定年度计划这一环节非常重要，能提升高层管理者宏观且系统化的思维能力、长期规划能力、决策能力，强化企业各部门间的协调合作，提升企业竞争力，长短期规划与计划的结合能力，从而创造高利润以及高回报的成功企业。\n",
  },
];

export function getSubGameConfig(namespace: SubNamespace) {
  return subGameConfigList.find((s) => s.namespace === namespace);
}

export enum goodsType {
  hocus = "hocus",
  breathe = "breathe",
  ultrasound = "ultrasound",
}
export const GoodsTypeToTag = {
  [goodsType.hocus]: "麻醉机",
  [goodsType.breathe]: "呼吸机",
  [goodsType.ultrasound]: "超声仪",
};

export const ViewStepData: { name: string; detail: string }[] = [
  {
    name: "信息表示",
    detail:
      "计算机中的信息是以二进制的形式进行表示的。二进制是一种由0和1组成的数字系统，每一位数字被称为一个比特（bit），8个比特组成一个字节（byte）。计算机使用二进制来表示数字、字符、图像、声音、视频等各种信息",
  },
  {
    name: "机内码",
    detail:
      "机内码是计算机内部用于表示字符、数字和符号的编码方式，也称为计算机字符编码。它将每个字符、数字和符号映射为计算机内部的二进制代码，使计算机能够识别和处理这些信息。",
  },
  {
    name: "国标码",
    detail:
      "国际码是一种用于编码和表示字符集的标准，也称为国际字符集。它包括了几乎所有的语言和符号，使得不同语言的计算机可以互相通信和交换信息。国际码的主要作用是解决不同语言之间的字符编码不兼容问题。",
  },
  {
    name: "海明码",
    detail:
      "海明码是一种用于检测和纠正数据传输错误的编码方式。海明码通过添加冗余的校验码来检测和纠正数据传输中的错误。它将数据分成若干个数据块，并为每个数据块添加一定数量的校验位。校验位的数量取决于数据块的大小和需要检测和纠正的错误数量。当数据传输时，接收方会检查校验位来确定数据是否存在错误，并尝试纠正错误。",
  },
  {
    name: "信息传输",
    detail:
      "信息传输是指通过某种媒介将信息从一个地方传输到另一个地方的过程。在信息传输中，信息可以是任何形式的数据，例如文本、声音、图像等。在信息传输中，数据通常会经历三个过程：采集、编码和传输。采集是指将原始数据转换为数字信号的过程，例如将声音转换为数字音频信号。编码是指将数字信号转换为一种可以在传输中使用的格式，例如将数字信号转换为二进制码。传输是指将编码后的数据从发送方传输到接收方的过程，传输的方式可以是有线或无线，也可以是通过互联网等网络进行传输。",
  },
];
