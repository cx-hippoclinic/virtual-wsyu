import { IMainLogic, ISubLogic, MainLogic, SubLogic } from "@ancademy/vse-server";
import { IActor, IMoveCallback, TGameState, TPlayerState } from "@ancademy/vse-share";
import { subGameConfigList } from "../common/config";
import {
  ICreateParams,
  IGameState,
  IMoveParams,
  IPlayerState,
  IPushParams,
  MoveType,
  PushType,
  ROOM_SIZE,
  SubGameStatus,
} from "./config";

export const subLogicList: ISubLogic[] = subGameConfigList.map(({ namespace }) => ({
  namespace,
  Logic: SubLogic,
}));

export class Logic extends MainLogic<
  ICreateParams,
  IGameState,
  IPlayerState,
  MoveType,
  PushType,
  IMoveParams,
  IPushParams
> {
  async initGameState(): Promise<TGameState<IGameState>> {
    const gameState = await super.initGameState();
    gameState.matching = new Map();
    subLogicList.forEach(({ namespace }) => gameState.matching.set(namespace, new Set()));
    return gameState;
  }

  async initPlayerState(actor: IActor): Promise<TPlayerState<IPlayerState>> {
    const playerState = await super.initPlayerState(actor);
    playerState.subGameList = subLogicList.map(({ namespace }) => ({ namespace, status: SubGameStatus.init }));
    return playerState;
  }

  protected async playerMoveReducer(
    actor: IActor,
    type: MoveType,
    params: IMoveParams,
    cb: IMoveCallback
  ): Promise<void> {
    const gameState = await this.stateManager.getGameState(),
      playerState = await this.stateManager.getPlayerState(actor),
      playerStates = await this.stateManager.getPlayerStates();
    const { namespace } = params;
    switch (type) {
      case MoveType.match:
        {
          const playerSubgame = playerState.subGameList.find((s) => s.namespace === namespace);
          const matchingSet = gameState.matching.get(namespace);
          playerSubgame.status = SubGameStatus.match;
          matchingSet.add(actor.token);
          if (matchingSet.size >= ROOM_SIZE) {
            const { id } = await this.createSubGame(namespace);
            this.broadcast(PushType.locateToSubgame, { matchingSet: matchingSet, namespace, subGameId: id });
            matchingSet.forEach((token) => {
              const subGame = playerStates[token].subGameList.find((s) => s.namespace === namespace);
              subGame.id = id;
              subGame.status = SubGameStatus.play;
            });
            matchingSet.clear();
          }
        }
        break;
    }
  }

  async subGameOver(actor: IActor, subGameId: string) {
    const playerState = await this.stateManager.getPlayerState(actor);
    playerState.subGameList.find(({ id }) => id === subGameId).status = SubGameStatus.over;
    await this.stateManager.syncState();
  }
}

export const mainLogic: IMainLogic = {
  Logic,
};
