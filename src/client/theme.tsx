import { deriveObject, pickObject } from "@client/util";
import { css, cx } from "@emotion/css";
import { ConfigProvider } from "antd";
import { darken, getLuminance, lighten } from "polished";

//region Color
export enum Color {
  primary = "#103171",
  warn = "#f6a829",
  disabled = "#cad1d0",
  light = "#f5f5f5",
  error = "#e96758",
  transparent = "transparent",
}

const colorDeriveDef = {
  d3: (color: Color) => darken(0.3, color),
  d2: (color: Color) => darken(0.2, color),
  d1: (color: Color) => darken(0.1, color),
  d0: (color: Color) => color,
  l1: (color: Color) => lighten(0.1, color),
  l2: (color: Color) => lighten(0.2, color),
  l3: (color: Color) => lighten(0.3, color),
};

export const ColorDerived = deriveObject(pickObject(Color, "primary", "warn", "error", "light"), (color: Color) =>
  deriveObject(colorDeriveDef, (fn) => fn(color))
);
//endregion

export namespace Theme {
  //region Util
  export const Shadow = {
    md: css`
      box-shadow: 0 0 0.8rem 0 rgba(100, 100, 100, 0.3);
    `,
  };

  export const Transition = {
    md: css`
      transition: all 0.2s linear;
    `,
  };
  //endregion

  //region Btn
  const BtnColorDef = pickObject(Color, "primary", "warn", "disabled", "light", "error");

  const calcBtnSize = (n: number) => css`
    min-width: ${n}rem;
    height: ${0.5 + n / 4}rem;
    font-size: ${0.8 + n / 20}rem;
    border-radius: ${-0.1 + n / 40}rem;
  `;

  const BtnSizeDef = {
    lg: calcBtnSize(20),
    md: calcBtnSize(16),
    sm: calcBtnSize(12),
    xs: calcBtnSize(8),
  };

  const baseBtn = css`
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
    margin: auto;

    &:hover {
      transform: scale(1.1);
    }
  `;

  export const Btn = deriveObject(BtnColorDef, (bgColor: Color) => {
    const fontColor = getLuminance(bgColor) > 0.5 ? Color.primary : Color.light;
    const colorStyle = css`
      background: ${bgColor}!important;
      color: ${fontColor}!important;
    `;
    return deriveObject(BtnSizeDef, (sizeStyle) => cx(baseBtn, sizeStyle, colorStyle));
  });
  //endregion

  //region Link
  const LinkColorDef = pickObject(Color, "primary", "warn", "disabled", "error");

  const LinkSizeDef = {
    md: css`
      font-size: 2rem;
      line-height: 2rem;
      height: 4rem;
    `,
    sm: css`
      font-size: 1.5rem;
      line-height: 1.5rem;
      height: 3rem;
    `,
  };

  const baseLink = css`
    letter-spacing: 0.2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s linear;
    cursor: pointer;
    text-decoration: underline !important;
    background: ${Color.transparent}!important;
    border-width: 0;
    &:hover {
      transform: scale(1.2);
    }
  `;

  export const Link = deriveObject(LinkColorDef, (color: Color) => {
    const colorStyle = css`
      color: ${color}!important;
    `;
    return deriveObject(LinkSizeDef, (sizeStyle) => cx(baseLink, sizeStyle, colorStyle));
  });
  //endregion

  //region Input
  const InputSizeDef = {
    lg: css`
      max-width: 48rem;
      min-width: 24rem;
      font-size: 2.2rem;
      padding: 1rem 2rem;
    `,
    md: css`
      max-width: 40rem;
      min-width: 20rem;
      font-size: 1.8rem;
      padding: 0.5rem 1.5rem;
    `,
    sm: css`
      max-width: 32rem;
      min-width: 16rem;
      font-size: 1.4rem;
      padding: 0.25rem 0.5rem;
    `,
  };
  const baseInput = css`
    margin: 0.5rem;
    width: unset;
    border-radius: 0.6rem;
    color: ${Color.primary};
    box-shadow: none;
    overflow: hidden;
    border: 1px solid rgba(197, 197, 197, 0.72) !important;

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
  export const Input = deriveObject(InputSizeDef, (sizeStyle) => cx(baseInput, sizeStyle));
  //endregion

  //region Radio
  const calcRadioSize = (n: number) => css`
    &.ant-radio-wrapper {
      margin-left: ${0.5 * n}rem;
      margin-right: ${0.5 * n}rem;
      font-size: ${n}rem;
      line-height: ${n}rem;
      align-items: center;
    }
    .ant-radio-inner {
      width: ${n}rem;
      height: ${n}rem;
    }

    .ant-radio-checked .ant-radio-inner:after {
      width: ${n}rem;
      height: ${n}rem;
      margin-left: ${n * -0.5}rem;
      margin-top: ${n * -0.5}rem;
      border-radius: 50%;
    }
  `;

  const RadioSizeConfig = {
    lg: calcRadioSize(2),
    md: calcRadioSize(1.6),
    sm: calcRadioSize(1.2),
  };
  const baseRadio = css`
    .ant-radio-inner {
      border-color: ${Color.primary};
    }

    .ant-radio-checked .ant-radio-inner:after {
      background-color: ${Color.primary};
    }
  `;
  export const Radio = deriveObject(RadioSizeConfig, (sizeStyle) => cx(baseRadio, sizeStyle));
  //endregion

  //region Modal
  export const Modal = css`
    padding: 2rem;
    border-radius: 2rem;

    .ant-modal-body {
      background-size: cover;
      border-radius: 1.5rem;
      padding: 4rem 8rem;
      box-shadow: ${Shadow.md};
    }

    .ant-modal-footer {
      border: none;
    }
  `;
  //endregion
}

export function initTheme() {
  //region Color
  ConfigProvider.config({
    theme: {
      primaryColor: Color.primary,
    },
  });
  //endregion
  //region Size
  const fitRem = () => (document.documentElement.style.fontSize = "0.7vw");
  fitRem();
  window.addEventListener("resize", fitRem);
  //endregion
}
