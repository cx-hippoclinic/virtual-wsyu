import { api, useApiPlay } from "@ancademy/vse-client";
import { ISubGame, TAddSubGameInput } from "@ancademy/vse-share";
import { Skeleton } from "antd";
import { useEffect } from "react";
import { subGameConfigList } from "../../common/config";
import { introPhases, introSubPhases, IPlayerState, Page } from "../config";
import { Introduction } from "./Introduction";
import { Report } from "./Report";
import { ResultRank } from "./ResultRank";
import { SubgameList } from "./SubgameList";

async function initState(mainGameId: string): Promise<{}> {
  const subGameParams: TAddSubGameInput<{}>[] = [];
  for (const { namespace } of subGameConfigList) {
    subGameParams.push({ mainGameId, namespace, params: {} });
  }
  const subGameList = (await api.addManySubGame(mainGameId, subGameParams)) as ISubGame<{}>[];
  // const user = await api.getUser();
  // const isExpert = user.role === Role.expert;
  return {
    inited: true,
    subGameList: subGameList.map(({ id, namespace }, i) => ({
      id,
      namespace,
    })),
    page: Page.intro,
    introPhases: {
      phases: introPhases.currency,
      subPhases: introSubPhases.intro,
      questionChose: {
        [introPhases.currency]: [],
        [introPhases.risk]: [],
        [introPhases.securities]: [],
      },
    },
  };
}
export function Play({ game }: any) {
  const { apiState, setApiState } = useApiPlay<IPlayerState>();
  useEffect(() => {
    if (apiState.inited) {
      return;
    }
    initState(game.id).then(setApiState);
  }, []);
  if (!apiState.inited) {
    return <Skeleton />;
  }
  switch (apiState.page) {
    case Page.intro:
      return <Introduction nextPage={() => setApiState({ page: Page.play })} />;
    case Page.play:
      return <SubgameList nextPage={() => setApiState({ page: Page.result })} />;
    case Page.result:
      return <ResultRank nextPage={() => setApiState({ page: Page.report })} />;
    case Page.report:
      return <Report nextPage={() => setApiState({ page: Page.play })} gameId={game.id} />;
  }
}
