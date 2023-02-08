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

export interface IPlayerState {
  subGameList: { namespace: string; status: SubGameStatus; id?: string }[];
}
