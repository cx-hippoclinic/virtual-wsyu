import { css } from "@emotion/css";
import { useState } from "react";
const subGameConfigList = [
  {
    namespace: 1,
    label: "生产阶段",
  },
  {
    namespace: 2,
    label: "技术投资",
    withTechInvest: true,
  },
  {
    namespace: 3,
    label: "适应能力投资",
    withAdaptInvest: true,
  },
];

export interface processProp {
  process: number;
  subprocess: number;
}

const processArr = subGameConfigList.map((it) => ({ name: it.label }));
const subprocessArr = [{ name: "知识学习" }, { name: "知识巩固" }, { name: "实验" }];

function ProcessComp({ processActive }: { processActive: processProp }): JSX.Element {
  const [chooseIndex, setChooseIndex] = useState(processActive.process);
  return (
    <div
      className={css`
        padding: 3.4rem 3.8rem;
      `}
    >
      <ul
        className={css`
          margin: 0 12.4rem 9.2rem;
          display: flex;
          align-items: center;
        `}
      >
        {processArr.map((it, index) => {
          const bgColor =
            index <= processActive.process ? "linear-gradient(180deg, #39dac3 0%, #2c7f7c 100%)" : "#A8B2AA";
          const boxShadow =
            index <= processActive.process
              ? "inset 0 -0.4rem 0 0 rgba(0, 0, 0, 0.07)"
              : "inset 0 -0.4rem 0 0 rgba(0,0,0,0.07);";
          const completeImg = processArr.length - 1 === processActive.process ? `complete.png` : `uncomplete.png`;
          return (
            <li
              key={it.name}
              className={css`
                display: flex;
                align-items: center;
              `}
            >
              <div
                className={css`
                  width: 7.6rem;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-radius: 50%;
                  height: 7.6rem;
                  cursor: pointer;
                  position: relative;

                  &:after {
                    position: absolute;
                    top: -0.6rem;
                    left: -0.6rem;
                    border-radius: 50%;
                    content: "";
                    height: 8.8rem;
                    width: 8.8rem;
                    border: ${chooseIndex === index ? "0.4rem solid #38D0BB;" : "0"};
                  }
                `}
                onClick={() => setChooseIndex(index)}
              >
                <div
                  className={css`
                    width: 7.6rem;
                    height: 7.6rem;
                    border-radius: 50%;
                    background: ${bgColor};
                    box-shadow: ${boxShadow};
                    font-size: 2.8rem;
                    color: #ffffff;
                    line-height: 4rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;

                    &:after {
                      content: "${it.name}";
                      position: absolute;
                      bottom: -4rem;
                      color: #2c7f7c;
                      width: 14rem;
                      text-align: center;
                      font-size: 2.2rem;
                      line-height: 3.2rem;
                      height: 3.2rem;
                    }
                  `}
                >
                  {index !== processArr.length - 1 ? (
                    index + 1
                  ) : (
                    <img
                      src={completeImg}
                      alt=""
                      className={css`
                        width: 100%;
                      `}
                    />
                  )}
                </div>
              </div>

              {index !== processArr.length - 1 ? (
                <div
                  className={css`
                    width: 10.8rem;
                    height: 0.2rem;
                    margin-left: 2.2rem;
                    margin-right: 1.6rem;
                    border-radius: 0.6rem;
                    border: 0.4rem solid #3fae9e;
                  `}
                />
              ) : (
                ""
              )}
            </li>
          );
        })}
      </ul>
      <div>
        {subprocessArr.map((it, index) => {
          let imgUrl = "ABU";
          let imgDescribe = "";
          if (chooseIndex < processActive.process) {
            imgUrl += "learn.png";
            imgDescribe = "已完成";
          } else if (chooseIndex === processActive.process) {
            if (index < processActive.subprocess) {
              imgUrl += "learn.png";
              imgDescribe = "已完成";
            } else if (index === processActive.subprocess) {
              imgUrl += "review.png";
              imgDescribe = "进行中";
            } else {
              imgUrl += "experiment.png";
              imgDescribe = "未开始";
            }
          } else {
            imgUrl += "experiment.png";
            imgDescribe = "未开始";
          }

          return (
            <div
              className={css`
                width: 122.4rem;
                height: 14rem;
                border-radius: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 4.4rem 0 3.2rem;
                margin-bottom: 2.4rem;
                background: #fcfffd;
                border: 1px solid #57a3a0;
              `}
              key={it.name}
            >
              <span
                className={css`
                  font-size: 2.8rem;
                  font-weight: 500;
                  color: #327471;
                `}
              >
                {it.name}
              </span>
              <div
                className={css`
                  display: flex;
                  flex-flow: column;
                  align-items: center;
                  justify-content: center;
                `}
              >
                <img
                  src={imgUrl}
                  alt=""
                  className={css`
                    width: 7.2rem;
                  `}
                />
                <span
                  className={css`
                    font-size: 1.6rem;
                    color: #6cafab;
                    margin-top: 0.4rem;
                    line-height: 2.2rem;
                  `}
                >
                  {imgDescribe}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProcessComp;
