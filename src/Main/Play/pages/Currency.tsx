import { useApiPlay } from "@ancademy/vse-client";
import { Asset, Background, Header, PageContent } from "@client";
import { css } from "@emotion/css";
import { introSubPhases, IPlayerState } from "../../config";
import { Intro, IntroDetail, Quesition } from "../components";

export function Currency(props) {
  const { apiState, setApiState } = useApiPlay<IPlayerState>();
  const nextPage = () => {
    setApiState((data) => (data.introPhases.subPhases = introSubPhases.question));
  };
  let content;
  switch (apiState.introPhases.subPhases) {
    case introSubPhases.intro:
      content = <Intro nextPage={nextPage} />;
    case introSubPhases.introDetail:
      content = <IntroDetail nextPage={nextPage} />;
    case introSubPhases.question:
      content = <Quesition nextPage={nextPage} />;
  }
  return (
    <div
      className={css`
        height: 100vh;
        overflow: hidden;
      `}
    >
      <Background src={Asset.play_currency_bg} />
      <Header title={"货币价值"} />
      <PageContent>{content}</PageContent>
    </div>
  );
}
