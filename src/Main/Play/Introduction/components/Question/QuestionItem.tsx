import { Asset, ColorDerived, Theme } from "@client";
import { css, cx } from "@emotion/css";
import { Radio, Space } from "antd";
import { questionState } from "../../../../config";

interface propType {
  data: questionState;
  chose: Number;
  onChange: (number) => void;
  isReview?: boolean;
}

export function QuestionItem({ data, chose, onChange, isReview }: propType) {
  const activeStyle = css`
    border: 1.5px solid #2352cc;
    box-shadow: inset 0 0 14px rgba(111, 151, 255, 0.25);
    background: #1553cf;
  `;
  const normalStyle = css`
    background: rgba(60, 100, 201, 0.44);
    border: 1.5px solid #042a8e;
  `;
  const errorStyle = css`
    border: 1.5px solid ${ColorDerived.error.d2};
    color: ${ColorDerived.error.d2};
  `;
  console.log(isReview);
  return (
    <div
      className={css`
        border-radius: 1.2rem;
        font-size: 1.7rem;
        color: #ffffff;
        width: 47.8rem;
        line-height: 3rem;
        margin: 0.5rem auto 1.4rem;
      `}
    >
      <Space
        size={24}
        align={"start"}
        className={css`
          width: 100%;
        `}
      >
        {data.question}
      </Space>
      <Radio.Group
        onChange={(e) => onChange(e.target.value)}
        value={chose}
        className={css`
          margin-left: 4rem;
          margin-top: 1.8rem;
        `}
      >
        <Space direction="vertical" size={11}>
          {data.answer.map((it, i) => {
            const resultRender =
              i === data.current ? (
                <img src={Asset.play_Introduction_true} alt="" />
              ) : (
                i === chose && <img src={Asset.play_Introduction_error} alt="" />
              );
            return (
              <div
                key={it}
                className={css`
                  position: relative;
                `}
              >
                <div
                  className={cx(
                    css`
                      font-size: 1.28rem;
                      color: #ffffff;
                      line-height: 1.78rem;
                      width: 36.57rem;
                      min-height: 3.43rem;
                      border-radius: 4px;
                      display: flex;
                      align-items: center;
                      padding: 0.71rem 0 0.71rem 1.43rem;
                    `,
                    i === chose ? activeStyle : normalStyle,
                    isReview && i === chose && chose !== data.current && errorStyle
                  )}
                >
                  <span
                    className={css`
                      flex: 1;
                    `}
                  >
                    {" "}
                    {it}{" "}
                  </span>
                  {!isReview ? (
                    <Radio className={Theme.Radio.lg} value={i} />
                  ) : (
                    <div
                      className={css`
                        margin-right: 1.57rem;
                        width: 1.78rem;
                      `}
                    >
                      {resultRender}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
}
