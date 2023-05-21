import { Color, ColorDerived } from "@client";
import { css, cx } from "@emotion/css";
import { useState } from "react";

function ViewStep({
  active,
  stepArr,
  hasButton,
}: {
  active: number;
  stepArr: { name: string; detail: string }[];
  hasButton?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(active);
  return (
    <div
      className={css`
        display: flex;
        padding: 1rem 1.5rem;
      `}
    >
      <div
        className={css`
          display: flex;
          flex-flow: column;
        `}
      >
        {stepArr.map((it, index) => {
          const style =
            index === activeIndex
              ? css`
                  box-shadow: inset 0 0 28px #1581ff;
                  border: 2px solid ${ColorDerived.primary.l3};
                  background: ${ColorDerived.primary.l1};
                  color: #fff;
                `
              : ``;
          return (
            <button
              key={it.name}
              className={cx(
                css`
                  width: 12.8rem;
                  height: 4.7rem;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background: ${Color.primary};
                  border-radius: 1.2rem;
                  font-weight: 500;
                  color: #ffffff;
                  font-size: 1.7rem;
                  margin-bottom: 2.8rem;
                  border: 2px solid ${ColorDerived.primary.l1};
                  cursor: pointer;

                  &:hover,
                  &:active,
                  &:focus {
                    box-shadow: inset 0 0 28px #1581ff;
                    border: 2px solid ${ColorDerived.primary.l3};
                    background: ${ColorDerived.primary.l1};
                    color: #fff;
                  }
                `,
                style
              )}
              onClick={() => {
                setActiveIndex(index);
              }}
            >
              {it.name}
            </button>
          );
        })}
      </div>
      <div
        className={css`
          font-size: 1.7rem;
          height: ${hasButton ? "44rem" : "48.7rem"};
          margin-left: 2.6rem;
          border-radius: 1rem;
          width: 101.6rem;
          padding: 3rem;
          background-color: ${Color.primary};
          color: #ffffff;
        `}
      >
        {stepArr[activeIndex].detail}
      </div>
    </div>
  );
}

export default ViewStep;
