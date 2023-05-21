import { ISubView, useApiPlay } from "@ancademy/vse-client";
import { Asset, Background, Header, Intra, PageContent } from "@client";
import { css } from "@emotion/css";
import { Skeleton } from "antd";
import { ReactNode, useEffect } from "react";
import { getSubGameConfig } from "../common/config";
import { IPlayerState, namespace, StepPages } from "./config";
import Loan from "./pages/Loan";

function Play(props) {
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

  const getNextPage = (page: StepPages) => {
    return () => {
      setApiState((s) => (s.pages = page));
    };
  };
  let content: ReactNode;
  switch (apiState.pages) {
    case StepPages.intra:
      content = <Intra title={label} content={intra} nextPage={getNextPage(StepPages.play)} />;
      break;
    case StepPages.play:
      content = <Loan />;
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
      <Background src={Asset.play_phase2_bg} />
      <Header title={label} />
      <PageContent>{content}</PageContent>
    </div>
  );
}

export const Phase2View: ISubView = {
  namespace,
  Play,
  label: getSubGameConfig(namespace).label,
};
