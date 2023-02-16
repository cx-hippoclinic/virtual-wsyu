import { ISubView, useApiPlay } from "@ancademy/vse-client";
import { IUser } from "@ancademy/vse-share";
import { Asset, Background, Header, Intra, PageContent } from "@client";
import { css } from "@emotion/css";
import { Skeleton } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { getSubGameConfig, SubNamespace } from "../common/config";
import { IPlayerState, namespace, StepPages } from "./config";
import { TPlayPageProps } from "./interface";
import { Trade } from "./pages/Trade";

function Play(props: TPlayPageProps) {
  // const [mainGame, setMainGame] = useState(null);
  // useEffect(() => {
  //   api.getMainGame((game as ISubGame<any>).mainGameId).then(setMainGame);
  // }, []);
  const { apiState, setApiState } = useApiPlay<IPlayerState>();
  useEffect(() => {
    if (apiState.inited) {
      return;
    } else {
      setApiState((s) => {
        s.inited = true;
        s.pages = StepPages.intra;
      });
    }
  }, []);
  const { intra, label } = getSubGameConfig(namespace);
  const [user, setUser] = useState(null as IUser);

  const getNextPage = (page: StepPages) => {
    return () => {
      setApiState((s) => (s.pages = page));
    };
  };
  let content: ReactNode;
  switch (apiState.pages) {
    case StepPages.intra:
      content = <Intra content={intra} nextPage={getNextPage(StepPages.play)} />;
      break;
    case StepPages.play:
      content = <Trade {...props} />;
      break;
    case StepPages.result:
      content = <div></div>;
      break;
  }
  if (!apiState.inited) {
    return <Skeleton />;
  }
  return (
    <div
      className={css`
        height: 100vh;
        overflow: hidden;
      `}
    >
      <Background src={Asset.play_phase1_bg} />
      <Header title={label} />
      <PageContent>{content}</PageContent>
    </div>
  );
}

export const Phase1View: ISubView = {
  namespace,
  Play,
  label: getSubGameConfig(namespace).label,
};
export type TSubGameConfig = {
  namespace: SubNamespace;
} & Partial<{
  with_αβ: boolean;
  with_S: boolean;
  with_t: boolean;
  with_trade: boolean;
}>;
