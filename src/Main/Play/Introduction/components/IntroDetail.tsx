import { Asset, Style } from "@client";
import ViewStep from "@client/component/Header/ViewStep";
import { css } from "@emotion/css";
import { ViewStepData } from "../../../../common/config";
import { StartAnswerBtn } from "./";

export function IntroDetail({ nextPage }: { nextPage: () => void }) {
  return (
    <div
      style={Style.modelWrapperStyle}
      className={css`
        width: 94.85rem;
        position: relative;
        padding: 2.8rem 2rem;
      `}
    >
      <div
        className={css`
          position: absolute;
          right: 20px;
          bottom: 20px;
        `}
      >
        <img src={Asset.play_Introduction_introDetailImg} />
      </div>
      <ViewStep active={0} stepArr={ViewStepData} hasButton />
      <div className={Style.btnGroup}>
        <StartAnswerBtn nextPage={nextPage} />
      </div>
    </div>
  );
}
