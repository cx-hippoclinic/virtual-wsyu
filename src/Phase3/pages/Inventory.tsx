import { useApiPlay } from "@ancademy/vse-client";
import { Asset, ShowModalBtn, Style } from "@client";
import { css } from "@emotion/css";
import { InputNumber, Space } from "antd";
import { goodsType, GoodsTypeToTag } from "../../common/config";
import { CardWrapper } from "../components";
import { IPlayerState, materialDetail } from "../config";

export function Inventory({ backNav }: { backNav: () => void }) {
  const goodsTypeValue = Object.values(goodsType);
  const {
    apiState: {
      strategicData: { material },
      enableStoreCount,
    },
    setApiState,
  } = useApiPlay<IPlayerState>();
  console.log(material);
  const boxStyle = css`
    background: rgba(23, 21, 126, 0.12);
    border: 1px solid #0888ff;
    height: 31rem;
    width: 17.35rem;
    border-radius: 0.7rem;
    color: #ffffff;
    padding-top: 0.86rem;
    display: flex;
    flex-flow: column;
    align-items: center;
  `;
  return (
    <CardWrapper
      title="库存信息"
      className={css`
        height: 49rem;
        width: 66.7rem;
      `}
    >
      <Space
        className={css`
          margin-top: 3.7rem;
          display: flex;
          justify-content: center;
        `}
      >
        <div className={boxStyle}>
          <p
            className={css`
              font-size: 1.42rem;
              margin-bottom: 0.7rem;
            `}
          >
            原材料数量
          </p>
          <p>
            {goodsTypeValue.map((it) =>
              materialDetail[it].map((item) => (
                <p
                  key={item.name}
                  className={css`
                    font-size: 1.14rem;
                    line-height: 2.28rem;
                    margin-bottom: 0.5rem;
                  `}
                >
                  <span
                    className={css`
                      width: 5.86rem;
                      display: inline-block;
                      margin-right: 1rem;
                    `}
                  >
                    {item.name}
                  </span>
                  {material[it]}件
                </p>
              ))
            )}
          </p>
        </div>
        <div>
          <p
            className={css`
              background: rgba(10, 123, 255, 0.24);
              border: 1px solid #0888ff;
              width: 14.2rem;
              height: 9.6rem;
              display: flex;
              flex-flow: column;
              justify-content: center;
              align-items: center;
              border-radius: 0.7rem;
              margin: 0 3.86rem;
              color: #ffffff;
            `}
          >
            <img
              src={Asset.play_phase3_nav5}
              alt=""
              className={css`
                width: 2.28rem;
                height: 2.28rem;
              `}
            />
            <p
              className={css`
                font-size: 1.43rem;
                line-height: 2.3rem;
              `}
            >
              当前仓库容量
            </p>
            <p
              className={css`
                font-size: 1.14rem;
                line-height: 2.3rem;
              `}
            >
              <span
                className={css`
                  font-size: 1.7rem;
                  color: #0063d8;
                `}
              >
                {enableStoreCount}
              </span>
              件
            </p>
          </p>
          <p
            className={css`
              text-align: center;
              margin-top: 2.3rem;
              font-size: 1.14rem;
              color: #ffffff;
            `}
          >
            扩充仓库容量：
            <InputNumber
              value={enableStoreCount}
              onChange={(e) => {
                const newVal = Math.floor(e / 100) * 100;
                setApiState((s) => (s.enableStoreCount = newVal));
              }}
              className={css`
                margin-top: 1rem;
                background: #00154b;
                border: 1.5px solid #2352cc;
                border-radius: 4px;
                color: #ffffff;
              `}
              step={100}
            />
          </p>
        </div>
        <div className={boxStyle}>
          <p
            className={css`
              font-size: 1.42rem;
              margin-bottom: 0.7rem;
            `}
          >
            产品种类数量
          </p>
          <p>
            {goodsTypeValue.map((it) => (
              <p
                key={it}
                className={css`
                  font-size: 1.14rem;
                  line-height: 2.28rem;
                  margin-bottom: 0.5rem;
                `}
              >
                <span
                  className={css`
                    width: 5.86rem;
                    display: inline-block;
                    margin-right: 1rem;
                  `}
                >
                  {GoodsTypeToTag[it]}
                </span>
                {material[it]}件
              </p>
            ))}
          </p>
        </div>
      </Space>
      <div className={Style.btnGroup}>
        <ShowModalBtn
          text={"确定"}
          content={`扩容仓库${enableStoreCount}件需要${enableStoreCount}万元，是否继续扩容？`}
          nextPage={backNav}
        />
      </div>
    </CardWrapper>
  );
}
