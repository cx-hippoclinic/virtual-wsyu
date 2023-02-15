import { Theme } from "@client";
import { css, cx } from "@emotion/css";
import { ReactNode } from "react";
import { useViewConfig } from "../../../../common/util/hooks";
import { StartAnswerBtn } from "./";

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

export function Intro({ nextPage, content }: { nextPage: () => void; content: ReactNode }): JSX.Element {
  const { hasIntroDetail } = useViewConfig();
  return (
    <div
      className={css`
        width: 94.8rem;
        position: relative;
        border-radius: 1.1rem;
        padding: 6rem 10.4rem;
        border: 3px solid #1d3175;
      `}
    >
      <div
        className={css`
          background: linear-gradient(180deg, #0b1f55 0%, #0e2a53 83.58%);
          opacity: 0.8;
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
        {hasIntroDetail ? (
          <button className={Theme.Btn.primary.sm} onClick={nextPage}>
            下一步
          </button>
        ) : (
          <StartAnswerBtn nextPage={nextPage} />
        )}
      </div>
    </div>
  );
}
