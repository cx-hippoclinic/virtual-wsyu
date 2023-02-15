import { Style } from "@client";
import ViewStep from "@client/component/Header/ViewStep";
import { css } from "@emotion/css";
import { StartAnswerBtn } from "./";

export function IntroDetail({ nextPage }: { nextPage: () => void }) {
  return (
    <div
      style={Style.modelWrapperStyle}
      className={css`
        width: 94.85rem;
        padding: 2.8rem 2rem;
      `}
    >
      <ViewStep
        active={0}
        stepArr={[
          {
            name: "年奖",
            detail: `年金：一定时期内每期相等金额的收付款项。
分类：
后付年金：普通年金，从第一期开始，每期期末收付。先付年金：预付年金或者即付年金，从第一期开始，每期期初收付。递延年金：前面若干期不收付，后面若干期有等额的系列收付。永续年金：收付期限无穷，没有到期日。
            `,
          },
          {
            name: "先付年奖",
            detail:
              " 年金：一定时期内每期相等金额的收付款项。\n" +
              "分类：\n" +
              "后付年金：普通年金，从第一期开始，每期期末收付。先付年金：预付年金或者即付年金，从第一期开始，每期期初收付。递延年金：前面若干期不收付，后面若干期有等额的系列收付。永续年金：收付期限无穷，没有到期日。",
          },
          {
            name: "后付年奖",
            detail:
              " 年金：一定时期内每期相等金额的收付款项。\n" +
              "分类：\n" +
              "后付年金：普通年金，从第一期开始，每期期末收付。先付年金：预付年金或者即付年金，从第一期开始，每期期初收付。递延年金：前面若干期不收付，后面若干期有等额的系列收付。永续年金：收付期限无穷，没有到期日。",
          },
          {
            name: "递延年奖",
            detail:
              " 年金：一定时期内每期相等金额的收付款项。\n" +
              "分类：\n" +
              "后付年金：普通年金，从第一期开始，每期期末收付。先付年金：预付年金或者即付年金，从第一期开始，每期期初收付。递延年金：前面若干期不收付，后面若干期有等额的系列收付。永续年金：收付期限无穷，没有到期日。",
          },
          {
            name: "永延年奖",
            detail:
              " 年金：一定时期内每期相等金额的收付款项。\n" +
              "分类：\n" +
              "后付年金：普通年金，从第一期开始，每期期末收付。先付年金：预付年金或者即付年金，从第一期开始，每期期初收付。递延年金：前面若干期不收付，后面若干期有等额的系列收付。永续年金：收付期限无穷，没有到期日。",
          },
        ]}
        hasButton
      />
      <div className={Style.btnGroup}>
        <StartAnswerBtn nextPage={nextPage} />
      </div>
    </div>
  );
}
