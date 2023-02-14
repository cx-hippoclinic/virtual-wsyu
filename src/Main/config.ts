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
}
export interface IPlayerState {
  inited: Boolean;
  page: Page;
  subGameList: { namespace: string; status: SubGameStatus; id?: string }[];
  introPhases: {
    phases: introPhases;
    subPhases: introSubPhases;
  };
}

export enum SubNamespace {
  phase1 = "phase1",
  phase2 = "phase2",
  phase3 = "phase3",
}
export interface ISubGameConfig {
  namespace: SubNamespace;
  label: string;
}

export const subGameConfigList: ISubGameConfig[] = [
  {
    namespace: SubNamespace.phase1,
    label: "材料供应商",
  },
  {
    namespace: SubNamespace.phase2,
    label: "银行信贷",
  },
  {
    namespace: SubNamespace.phase3,
    label: "医疗企业",
  },
];
