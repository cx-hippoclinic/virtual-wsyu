import { useApiPlay } from "@ancademy/vse-client";
import { Style, Theme } from "@client";
import { css } from "@emotion/css";
import { InputNumber, Radio, Space } from "antd";
import Lottie from "lottie-react-web";
import { useState } from "react";
import { goodsType, GoodsTypeToTag } from "../../common/config";
import ideaAnimation from "../animation/idea.json";
import { CardWrapper } from "../components";
import { IPlayerState, materialPrice } from "../config";

export function Strategic({ backNav }: { backNav: () => void }) {
  const {
    apiState: {
      strategicData: { material, productionLine },
    },
    setApiState,
  } = useApiPlay<IPlayerState>();
  const [option, setOption] = useState<goodsType>(goodsType.hocus);
  const goodsTypeValue = Object.values(goodsType);
  return (
    <CardWrapper
      title="年度战略定制"
      className={css`
        width: 83.3rem;
      `}
    >
      <Space>
        {goodsTypeValue.map((it, index) => {
          const name = GoodsTypeToTag[it];
          return (
            <div
              key={it}
              className={css`
                margin-top: 3.14rem;
                color: #ffffff;
                font-size: 1.43rem;
                margin-left: ${index > 0 && "6.43rem"};
              `}
            >
              {name}原料采购：
              <InputNumber
                value={material[it]}
                onChange={(value) => {
                  setApiState((s) => {
                    s.strategicData.material[it] = value;
                  });
                }}
                className={css`
                  margin-right: 1rem;
                `}
              />
              件
            </div>
          );
        })}
      </Space>
      <Space>
        {goodsTypeValue.map((it, index) => (
          <div
            key={it}
            className={css`
              margin-top: 3.14rem;
              color: #ffffff;
              font-size: 1.43rem;
              margin-left: ${index > 0 && "6.43rem"};
            `}
          >
            预计花费金额：
            <span
              className={css`
                min-width: 9rem;
                text-align: center;
                display: inline-block;
              `}
            >
              {materialPrice[it] * material[it]}
            </span>
            元
          </div>
        ))}
      </Space>

      <Space
        align={"center"}
        className={css`
          padding: 7rem 0 4rem 25rem;
        `}
      >
        <div
          className={css`
            color: #ffffff;
            font-size: 1.43rem;
          `}
        >
          采购生产线种类：
          <Radio.Group value={option} onChange={(e) => setOption(e.target.value)}>
            {goodsTypeValue.map((it, index) => (
              <Radio.Button
                key={it}
                className={css`
                  margin-left: ${index > 0 && "0.7rem"};
                `}
                value={it}
              >
                {GoodsTypeToTag[it]}
              </Radio.Button>
            ))}
          </Radio.Group>
          <div
            className={css`
              margin-top: 1rem;
            `}
          >
            数量：
            <InputNumber
              value={productionLine[option]}
              onChange={(value) => {
                setApiState((s) => {
                  s.strategicData.productionLine[option] = value;
                });
              }}
            />
          </div>
        </div>
      </Space>
      <div
        className={css`
          position: absolute;
          left: 4rem;
          bottom: 1rem;
          width: 18rem;
          height: 16em;
        `}
      >
        <Lottie
          options={{
            animationData: ideaAnimation,
          }}
        />
      </div>
      <div className={Style.btnGroup}>
        <button className={Theme.Btn.primary.sm} onClick={backNav}>
          确定
        </button>
      </div>
    </CardWrapper>
  );
}
