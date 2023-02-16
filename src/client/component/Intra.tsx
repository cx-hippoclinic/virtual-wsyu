import { Asset, ShowModalBtn, Theme } from "@client";
import { css, cx } from "@emotion/css";
import { ReactNode } from "react";
function StartAnswerBtn({ nextPage }: { nextPage: () => void }) {
  return (
    <ShowModalBtn
      text="开始答题"
      nextPage={nextPage}
      content="在答题过程中不显示对错，且答题算入报告分数，请认真检查回答后确定提交，提交后将跳转答错题目并显示题目解析。"
    />
  );
}
const titleStyle = css`
  height: 4rem;
  font-size: 2.2rem;
  color: #ffffff;
  margin-bottom: 2.8rem;
  font-weight: 500;
`;
const contextStyle = css`
  font-weight: 400;
  color: #ffffff;
  font-size: 1.7rem;
  line-height: 3.4rem;
`;

export function Intra({
  nextPage,
  content,
  showAnswer = false,
}: {
  nextPage: () => void;
  content: ReactNode;
  showAnswer?: Boolean;
}): JSX.Element {
  return (
    <div
      className={css`
        width: 94.8rem;
        position: relative;
        border-radius: 1.1rem;
        padding: 6rem 10.4rem;
        border: 3px solid #1d3175;
        background: url("${Asset.components_Intro_bg}");
      `}
    >
      <div
        className={css`
          background: radial-gradient(97.85% 318.81% at 99% 3.69%, #202a42 0%, #2b344a 45.76%, #202a42 100%);
          opacity: 1;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        `}
      />
      <div>
        <p className={cx(titleStyle)}>交易规则介绍</p>
        <p className={cx(contextStyle)}>{content}</p>
      </div>
      <div
        className={css`
          text-align: center;
          margin-top: 2rem;
        `}
      >
        {showAnswer ? (
          <StartAnswerBtn nextPage={nextPage} />
        ) : (
          <button className={Theme.Btn.primary.sm} onClick={nextPage}>
            下一步
          </button>
        )}
      </div>
    </div>
  );
}
