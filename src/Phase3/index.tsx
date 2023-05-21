import { ISubView, useApiPlay } from "@ancademy/vse-client";
import { Asset, Background, Header, Intra, PageContent } from "@client";
import { css } from "@emotion/css";
import { Skeleton } from "antd";
import { ReactNode, useEffect } from "react";
import { getSubGameConfig, goodsType } from "../common/config";
import { IPlayerState, namespace, productionLineSize, ProductionStep, StepPages, SubPages } from "./config";
import { SubPlay } from "./pages";

function Play(props) {
  const { apiState, setApiState } = useApiPlay<IPlayerState>();
  useEffect(() => {
    if (apiState.inited) {
      return;
    } else {
      setApiState((s) => {
        s.inited = true;
        s.pages = StepPages.intra;
        s.subPage = SubPages.nav;
        s.strategicData = {
          productionLine: {
            [goodsType.hocus]: 0,
            [goodsType.ultrasound]: 0,
            [goodsType.breathe]: 0,
          },
          material: {
            [goodsType.hocus]: 0,
            [goodsType.ultrasound]: 0,
            [goodsType.breathe]: 0,
          },
        };
        s.loanPlan = -1;
        s.productionData = {
          choseSize: productionLineSize.small,
          step: ProductionStep.construction,
          choseOrder: 0,
        };
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
      content = <SubPlay />;
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
      <Background src={Asset.play_phase3_bg} />
      <Header title={label} />
      <PageContent>{content}</PageContent>
    </div>
  );
}

export const Phase3View: ISubView = {
  namespace,
  Play,
  label: getSubGameConfig(namespace).label,
};
