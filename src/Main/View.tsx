import { Core, Env, IMainView, ISubView } from "@ancademy/vse-client";
import { Button, Card, List, Spin, Tag } from "antd";
import { useEffect } from "react";
import {
  ICreateParams,
  IGameState,
  IMoveParams,
  IPlayerState,
  IPushParams,
  MoveType,
  PushType,
  SubGameStatus,
} from "./config";

export function Play({
  gameState: {},
  playerState: {
    subGameList,
    actor: { token },
  },
  frameEmitter,
}: Core.IPlayProps<ICreateParams, IGameState, IPlayerState, MoveType, PushType, IMoveParams, IPushParams>) {
  useEffect(() => {
    frameEmitter.on(PushType.locateToSubgame, ({ matchingSet, namespace, subGameId }) => {
      if (!matchingSet.has(token)) {
        return;
      }
      location.href = `${Env.basePath}/${namespace}/${subGameId}?token=${token}`;
    });
  }, []);
  return (
    <Card title="SubGameList" style={{ maxWidth: "24rem", margin: "auto" }}>
      <List
        dataSource={subGameList}
        renderItem={(subGame, i) => {
          const { namespace, status } = subGameList[i];
          return (
            <List.Item
              extra={
                {
                  [SubGameStatus.init]: (
                    <Button type={"primary"} onClick={() => frameEmitter.emit(MoveType.match, { namespace })}>
                      匹配玩家
                    </Button>
                  ),
                  [SubGameStatus.match]: (
                    <>
                      <Spin /> &nbsp; 匹配中
                    </>
                  ),
                  [SubGameStatus.play]: (
                    <a href={`${Env.basePath}/${subGame.namespace}/${subGame.id}?token=${token}`}>进入实验</a>
                  ),
                  [SubGameStatus.over]: <Tag>已完成</Tag>,
                }[status]
              }
              actions={[]}
            >
              <List.Item.Meta title={`【子实验${i + 1}】${subGame.namespace}`} />
            </List.Item>
          );
        }}
      />
    </Card>
  );
}

export const mainView: IMainView = {
  Play,
};

export const subViewList: ISubView[] = [];
