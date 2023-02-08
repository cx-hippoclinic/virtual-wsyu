import { deriveObject, pickObject } from "@client/util";
import { css, cx } from "@emotion/css";
import { darken, getLuminance } from "polished";

const COLOR_DARKEN = 0.15;

export enum Color {
  primary = "#103171",
  warn = "#f6a829",
  disabled = "#cad1d0",
  light = "#f5f5f5",
  error = "#e96758",
  black = "#182624",
  transparent = "transparent",
}

export const ColorDark = deriveObject(Color, (color: Color) => darken(COLOR_DARKEN, color));

const BtnColor = pickObject(Color, "primary", "warn", "disabled", "light");

export namespace Style {
  export const btn = css`
    color: ${Color.primary} !important;
    font-size: 2rem;
    line-height: 2rem;
    height: 4rem;
    letter-spacing: 0.2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.2rem;
    border-width: 0 !important;
    min-width: 12rem;
    text-align: center;
    transition: all 0.2s linear;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  `;

  export const btnLink = cx(
    btn,
    css`
      text-decoration: underline;

      &:hover {
        transform: scale(1.2);
      }
    `
  );

  export const btnLinkDark = cx(
    btn,
    css`
      color: ${Color.light} !important;

      &:hover {
        transform: scale(1.2);
      }
    `
  );

  const BtnSizeCls = {
    md: css`
      border-radius: 0.3rem;
      font-size: 2rem;
      height: 5rem;
      min-width: 16rem;
    `,
    sm: css`
      min-width: 12rem;
      height: 3.5rem;
      font-size: 1.4rem;
      border-radius: 0.2rem;
    `,
    xs: css`
      min-width: 7rem;
      height: 2.5rem;
      font-size: 1.2rem;
      border-radius: 0.1rem;
    `,
  };

  const buildBtnClsGroup = (bgColor: Color) => {
    const fontColor = getLuminance(bgColor) > 0.5 ? Color.primary : Color.light;
    const patchCls = css`
      align-items: center;
      margin: auto;
      background: ${bgColor}!important;
      color: ${fontColor}!important;
    `;
    return deriveObject(BtnSizeCls, (sizeCls) => cx(btn, sizeCls, patchCls));
  };

  export const Btn = deriveObject(BtnColor, (color: Color) => buildBtnClsGroup(color));

  export const buttonGroup = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem auto 1rem;
  `;

  export const infoCard = css`
    min-width: 20rem;
    min-height: 6rem;
    padding: 1.5rem 3rem;
    border-radius: 0.8rem;
    background: rgba(28, 38, 74, 0.89);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16);
    border: 2px solid rgba(101, 170, 208, 0.56);
    font-weight: 500;
    color: #fff;
    font-size: 2rem;
    line-height: 1.6;
    margin: 1rem;
  `;

  export const infoCardFlex = cx(
    infoCard,
    css`
      display: flex;
      justify-content: space-around;
      align-items: center;
    `
  );

  export const shadowNormal = css`
    box-shadow: 0 0 0.8rem 0 rgba(100, 100, 100, 0.3);
  `;

  export const transitionNormal = css`
    transition: all 0.2s linear;
  `;

  export const modal = css`
    padding: 2rem;
    border-radius: 2rem;

    .ant-modal-body {
      background-size: cover;
      border-radius: 1.5rem;
      padding: 4rem 8rem;
      box-shadow: 0 0 0.8rem 0 rgba(100, 100, 100, 0.3);
    }

    .ant-modal-footer {
      border: none;
    }
  `;

  export const modalText = css`
    padding-top: 3rem;
    font-size: 2rem;
    text-align: center;
    color: ${Color.primary};
  `;

  export const modalAddition = css`
    background: #ffffff;
    border-radius: 1.2rem;
    border: 0.4rem solid ${Color.light};
  `;

  export const input = css`
    min-width: 24rem;
    padding: 1rem 2rem;
    border-radius: 0.6rem;
    font-size: 2.2rem;
    color: ${Color.primary};
    box-shadow: none;
    overflow: hidden;
    border: 1px solid rgba(197, 197, 197, 0.72);
  !important;

    &:hover {
      border-color: unset;
    }

    &:focus {
      border-color: ${Color.primary} !important;
      box-shadow: none;
    }

    &::placeholder {
      color: #bfbfbf;
    }
  `;

  export const inputSm = cx(
    input,
    css`
      min-width: 16rem;
      font-size: 1.5rem;
      padding: 0.25rem 0.5rem;
    `
  );

  export const radio = css`
    .ant-radio-inner {
      border-color: ${Color.primary};
    }

    .ant-radio-checked .ant-radio-inner:after {
      background-color: ${Color.primary};
    }
  `;
  export const radioMid = css`
    .ant-radio-wrapper {
      margin-right: 3rem;
    }
    .ant-radio-inner {
      width: 2rem;
      height: 2rem;
    }

    .ant-radio-checked .ant-radio-inner:after {
      top: 0.2rem;
      left: 0.2rem;
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 50%;
    }

    .ant-radio-wrapper span {
      font-size: 2rem;
    }
  `;

  export const tableInIntro = css`
    margin: 1rem auto;

    td {
      border: 1px solid;
      padding: 1rem;
    }
  `;

  export const header = css`
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    width: 100%;
    background: ${ColorDark.primary};
    font-size: 2rem;
    color: ${Color.light};
  `;
}

export function adjustRem() {
  document.documentElement.style.fontSize = "0.7vw";
  return adjustRem;
}
