import { css } from "@emotion/css";
import { Color, ColorDerived } from "./theme";

export namespace Style {
  export const btnGroup = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem auto 1rem;
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

  export const header = css`
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    width: 100%;
    background: ${ColorDerived.primary.d1};
    font-size: 2rem;
    color: ${Color.light};
  `;
}
