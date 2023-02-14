import { Theme } from "@client";
import { css, cx } from "@emotion/css";

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

export function Intro({ nextPage }: { nextPage: () => void }): JSX.Element {
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
        <p className={cx(contextStyle)}>
          您在一家医疗企业工作，最近企业想要购买一批原材料进行医疗器械生产，想要去银行获得一笔贷款，当你来到银行之后，发现银行发布了一项新的贷款套餐，银行对于该套餐有多种计息还款方式去针对不同人群的客户，你选择需要计算在贷款额度、贷款期限固定的情况下选择哪种方案去使得利息最少，计息还款方式的不同会导致不同的结果。
          以下是一个简单的例子：
          某银行开发了一项新的贷款套餐，贷款额度、贷款期限、贷款的名义年利率均固定，客户有两种计息还款方式可选择：
          方式一:贷款按月复利计息，客户按月等额本息还款； 方式二:贷款按月复利计息，客户按月等额本息还款。
        </p>
      </div>
      <div
        className={css`
          text-align: center;
          margin-top: 2rem;
        `}
      >
        <button className={Theme.Btn.primary.sm} onClick={nextPage}>
          下一步
        </button>
      </div>
    </div>
  );
}
