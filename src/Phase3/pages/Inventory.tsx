import { css } from "@emotion/css";
import { Space } from "antd";
import { CardWrapper } from "../components";

export function Inventory(props) {
  const boxStyle = css`
    background: rgba(23, 21, 126, 0.12);
    border: 1px solid #0888ff;
    height: 31rem;
    width: 17.35rem;
    border-radius: 0.7rem;
    color: #ffffff;
  `;
  return (
    <CardWrapper
      title="库存信息"
      className={css`
        height: 49rem;
      `}
    >
      <Space
        className={css`
          margin-top: 3.7rem;
        `}
      >
        <div className={boxStyle}>
          <p
            className={css`
              height: 1.42rem;
            `}
          >
            原材料数量
          </p>
        </div>
        <div></div>
        <div className={boxStyle}>
          <p
            className={css`
              height: 1.42rem;
            `}
          >
            产品种类数量
          </p>
        </div>
      </Space>
    </CardWrapper>
  );
}
