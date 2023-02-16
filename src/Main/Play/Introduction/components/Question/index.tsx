import { useApiPlay } from "@ancademy/vse-client";
import { Asset, Color, Style, Theme } from "@client";
import { css, cx } from "@emotion/css";
import { Button, Divider } from "antd";
import { useEffect, useState } from "react";
import { IPlayerState, questionState } from "../../../../config";
import { QuestionItem } from "./QuestionItem";

interface questionProps {
  questionList: questionState[];
  questionChose: number[];
  nextPage: () => void;
  isReview?: boolean;
}

export function Question({ questionChose, questionList, nextPage, isReview }: questionProps): JSX.Element {
  const inited = questionChose?.length;
  const questionLen = questionList?.length;
  const { apiState, setApiState } = useApiPlay<IPlayerState>();
  useEffect(() => {
    if (!inited) {
      setApiState(
        (s) =>
          (s.introPhases.questionChose[apiState.introPhases.phases] = new Array<number>(questionList.length).fill(-1))
      );
    }
  }, []);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    setCurrent(0);
  }, [isReview]);
  const currentChoose = apiState.introPhases.questionChose[apiState.introPhases.phases][current];
  return (
    <div className={Style.contentWrapper}>
      <div
        className={css`
          width: 85.35rem;
          background: ${Color.primary};
          height: 44.57rem;
          border-radius: 1rem;
          padding-top: 2.7rem;
          display: flex;
          flex-flow: column;
          padding-bottom: 1rem;
        `}
      >
        <div
          className={css`
            height: 0.78rem;
            width: 76.78rem;
            background: #000000;
            border-radius: 4.3rem;
            border: 1.5px solid #0075ff;
            margin: 0 auto;
            overflow: hidden;
          `}
        >
          <div
            style={{ width: `${((current + 1) / questionLen) * 100}%` }}
            className={css`
              background: linear-gradient(90deg, #00c2ff 0.6%, #0038ff 98.98%);
              height: 100%;
            `}
          ></div>
        </div>
        <div
          className={css`
            color: #ffffff;
            line-height: 3rem;
            text-align: center;
          `}
        >
          ({current + 1}/{questionList.length})
        </div>
        <QuestionItem
          data={questionList[current]}
          onChange={(e) => {
            setApiState((s) => (s.introPhases.questionChose[apiState.introPhases.phases][current] = e));
          }}
          chose={currentChoose}
          isReview={isReview}
        />
        {isReview && (
          <div
            className={css`
              background: #0c275a;
              padding: 0 4rem;
              width: 65.7rem;
              flex: 1;
              height: 0;
              margin: 0 auto;
              max-height: 10.7rem;
              color: #ffffff;
              line-height: 1.57rem;
              font-size: 1.14rem;
              border-radius: 1rem;
              overflow: auto;
            `}
          >
            <header
              className={css`
                text-align: center;
                margin: 1rem auto 0;
              `}
            >
              <img
                src={Asset.play_Introduction_WarningWhite}
                alt=""
                className={css`
                  margin-right: 0.64rem;
                `}
              />
              本题解答
            </header>
            <Divider
              className={css`
                margin: 0.6rem 0;
                background-color: rgba(0, 0, 0, 0.15);
                height: 2px;
              `}
            />
            <div
              className={css`
                overflow: auto;
              `}
            >
              {questionList[current].analyze}
            </div>
          </div>
        )}
      </div>
      <div className={Style.btnGroup}>
        {current !== 0 && (
          <Button
            className={cx(Theme.Btn.light.sm)}
            onClick={async () => {
              setCurrent(current - 1);
            }}
          >
            上一题
          </Button>
        )}
        <Button
          className={cx(
            Theme.Btn.primary.sm,
            css`
              margin-left: 3.14rem;
            `
          )}
          onClick={async () => {
            if (current < questionLen - 1) {
              setCurrent(current + 1);
            } else {
              nextPage();
            }
          }}
          disabled={currentChoose === -1}
        >
          {current < questionLen - 1 ? "下一题" : "提交"}
        </Button>
      </div>
    </div>
  );
}
