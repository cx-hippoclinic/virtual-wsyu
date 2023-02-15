import { useApiPlay } from "@ancademy/vse-client";
import { Asset, Background, Header, PageContent } from "@client";
import { css } from "@emotion/css";
import { useViewConfig } from "../../../../common/util/hooks";
import { introSubPhases, IPlayerState } from "../../../config";
import { Intro, IntroDetail, Question } from "../components";

export function Common({ nextPage }: { nextPage: () => void }) {
  const { apiState, setApiState } = useApiPlay<IPlayerState>();
  const getNextPage = (page: introSubPhases) => {
    return () => {
      setApiState((s) => (s.introPhases.subPhases = page));
    };
  };
  let content;
  const { defQuestionList, intro, hasIntroDetail = false, namespace, title } = useViewConfig();
  switch (apiState.introPhases.subPhases) {
    case introSubPhases.intro:
      content = (
        <Intro
          content={intro}
          nextPage={getNextPage(hasIntroDetail ? introSubPhases.introDetail : introSubPhases.question)}
        />
      );
      break;
    case introSubPhases.introDetail:
      content = <IntroDetail nextPage={getNextPage(introSubPhases.question)} />;
      break;
    case introSubPhases.question:
      content = (
        <Question
          nextPage={getNextPage(introSubPhases.reviewQuestion)}
          questionList={defQuestionList}
          questionChose={apiState.introPhases.questionChose[namespace]}
        />
      );
      break;
    case introSubPhases.reviewQuestion:
      content = (
        <Question
          nextPage={nextPage}
          questionList={defQuestionList}
          questionChose={apiState.introPhases.questionChose[namespace]}
          isReview
        />
      );
      break;
  }
  return (
    <div
      className={css`
        height: 100vh;
        overflow: hidden;
      `}
    >
      <Background src={Asset.play_components_bg} />
      <Header title={title} />
      <PageContent>{content}</PageContent>
    </div>
  );
}
