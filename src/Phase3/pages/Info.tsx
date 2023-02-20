import { Style, Theme } from "@client";
import { css, cx } from "@emotion/css";
import { CardWrapper } from "../components";

export function Info({ backNav }: { backNav: () => void }) {
  const titleBase = css`
    font-size: 1.7rem;
    color: #0075ff;
  `;
  const contentBase = css`
    font-size: 1.43rem;
    color: #ffffff;
  `;
  return (
    <CardWrapper title="企业信息">
      <p className={titleBase}>xxx医疗企业</p>
      <p
        className={cx(
          titleBase,
          css`
            margin-bottom: 2rem;
          `
        )}
      >
        股票代码：123456
      </p>
      <p className={contentBase}>注册资本 （万元） 1000</p>
      <p
        className={cx(
          contentBase,
          css`
            margin-bottom: 3rem;
          `
        )}
      >
        主营业务产品 麻醉机，呼吸机，超声仪等医疗器械
      </p>
      <p className={titleBase}>2022年经营业绩概览</p>
      <p className={contentBase}>营业收入（万元） 20 净利润（万元）</p>
      <p className={contentBase}>扣非净利润（万元） 20 经营现金流（万元）</p>
      <p className={contentBase}>净资产收益率（%） 10 基本每股收益（元）</p>
      <p
        className={cx(
          contentBase,
          css`
            margin-bottom: 3rem;
          `
        )}
      >
        资产负债率（%） 1
      </p>
      <div className={Style.btnGroup}>
        <button className={Theme.Btn.primary.sm} onClick={backNav}>
          {" "}
          确定{" "}
        </button>
      </div>
    </CardWrapper>
  );
}
