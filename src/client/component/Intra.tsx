import { Asset, ShowModalBtn, Theme } from "@client";
import { css, cx } from "@emotion/css";
import { ReactNode } from "react";
import Extra from "../../Main/Play/Introduction/components/Extra";
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
  title,
  showAnswer = false,
  showDownLoad,
}: {
  nextPage: () => void;
  content: ReactNode;
  title: string;
  showAnswer?: Boolean;
  showDownLoad?: Boolean;
}): JSX.Element {
  return (
    <div
      className={css`
        width: 94.8rem;
        position: relative;
        border-radius: 1.1rem;
        padding: ${!showAnswer ? "3rem 5.2rem" : "6rem 10.4rem"};
        border: 3px solid #1d3175;
        background: url("${Asset.components_Intro_bg}");
      `}
    >
      <div
        className={css`
          //background: radial-gradient(97.85% 318.81% at 99% 3.69%, #202a42 0%, #2b344a 45.76%, #202a42 100%);
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
        <div
          className={css`
            position: absolute;
            color: white;
            top: 5rem;
            right: 5rem;
          `}
        >
          {showDownLoad && (
            <>
              <div
                className={css`
                  width: 10rem;
                  display: flex;
                  justify-content: space-between;
                `}
              >
                实验报告格式
                <a
                  className={css`
                    color: blueviolet;
                    font-size: 1.1rem;
                  `}
                  href={"https://cdn.chenxv.link/wsyu-info/%E5%AE%9E%E9%AA%8C%E6%8A%A5%E5%91%8A%E6%A0%BC%E5%BC%8F.docx"}
                  download
                >
                  下载
                </a>
              </div>
              <div
                className={css`
                  width: 10rem;
                  display: flex;
                  justify-content: space-between;
                `}
              >
                实验指导书
                <a
                  className={css`
                    color: blueviolet;
                    font-size: 1.1rem;
                  `}
                  href={"https://cdn.chenxv.link/wsyu-info/%E5%AE%9E%E9%AA%8C%E6%8C%87%E5%AF%BC%E4%B9%A65-26.docx"}
                  download
                >
                  下载
                </a>
              </div>
            </>
          )}
        </div>
        <p className={cx(titleStyle)}>{title}介绍</p>
        <p
          className={cx(
            contextStyle,
            css`
              display: flex;
            `
          )}
        >
          {!showAnswer ? (
            <>
              <p
                className={css`
                  width: 50%;
                `}
              >
                {content}
              </p>
              <div
                className={css`
                  width: 50%;
                `}
              >
                {!showAnswer && <Extra />}
              </div>
            </>
          ) : (
            content
          )}
        </p>
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
