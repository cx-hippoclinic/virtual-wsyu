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
  export const modelWrapperStyle = {
    background: "linear-gradient(107.56deg, #844AFF 0%, #4553CF 31.08%, #001665 100%)",
    // background: "linear-gradient(107.98deg, #844AFF 0.78%, #4553CF 20.12%, #001665 99.36%);",
    borderRadius: "1.14rem",
    height: "57.1rem",
  };
  export const contentWrapper = css`
    background: linear-gradient(107.56deg, #844aff 0%, #4553cf 31.08%, #001665 100%);
    border-radius: 1.14rem;
    width: 94.86rem;
    height: 57.1rem;
    border: 3px solid #1d3175;
    box-shadow: 0 4px 4px #000000;
    display: flex;
    flex-flow: column;
    align-items: center;
    padding-top: 5rem;
  `;
  export const tableHeaderClass = css`
    border-radius: 1.14rem;
    overflow: hidden;
    border: 2px solid #2B66BF;
          .ant-table-thead > tr > th {
            background: linear-gradient(180deg, #3074FD 0%, #2A64BB 100%); !important;
            color: #ffffff;
          }
        `;
}

export const getRowClassName = (record, index) => {
  let className = "";
  className =
    index % 2 === 0
      ? css`background:#020711; color: #ffffff; & .ant-table-cell.ant-table-cell-row-hover{background:#0c275a!important; color: #ffffff;`
      : css`
          background: #12151d;
          color: #ffffff;
          & .ant-table-cell.ant-table-cell-row-hover {
            background: #071f4c !important;
            color: #ffffff;
          }
        `;
  return className;
};
export const onMainCell = (record, rowIndex) => {
  if (rowIndex % 2 === 0) {
    return {
      style: {
        backgroundColor: "#0c275a",
      },
    };
  } else {
    return {
      style: {
        backgroundColor: "#071F4C",
      },
    };
  }
};
