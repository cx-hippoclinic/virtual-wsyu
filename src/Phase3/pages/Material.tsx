import { useApiPlay } from "@ancademy/vse-client";
import { Asset, getRowClassName, Style, Theme } from "@client";
import { css, cx } from "@emotion/css";
import { InputNumber, Space, Table } from "antd";
import _ from "lodash";
import Lottie from "lottie-react-web";
import { useState } from "react";
import { goodsType, GoodsTypeToTag } from "../../common/config";
import machine from "../animation/machine.json";
import paymentAnimation from "../animation/payment.json";
import { CardWrapper } from "../components";
import { IPlayerState, materialDetail, materialPrice } from "../config";

const { Column, ColumnGroup } = Table;

enum MaterialPart {
  part1,
  part2,
}
export function Material({ backNav }: { backNav: () => void }) {
  const [step, setStep] = useState<MaterialPart>(MaterialPart.part1);
  if (step === MaterialPart.part1) {
    return <MaterialPartOne nextPage={() => setStep(MaterialPart.part2)} />;
  } else {
    return <MaterialPartTwo backNav={backNav} />;
  }
}

function MaterialPartOne({ nextPage }: { nextPage: () => void }) {
  const {
    apiState: {
      strategicData: { material },
    },
    setApiState,
  } = useApiPlay<IPlayerState>();
  const goodsTypeValues = Object.values(goodsType);
  const totalPay = _.sum(goodsTypeValues.map((it) => material[it] * materialPrice[it]));
  return (
    <CardWrapper
      title="物料采购"
      bg={Asset.play_phase3_nav3_bg}
      className={css`
        width: 71rem;
        height: 45.5rem;
      `}
    >
      <div
        className={css`
          font-size: 1.43rem;
          color: #ffffff;
        `}
      >
        <p
          className={css`
            text-align: center;
            margin-bottom: 1.64rem;
          `}
        >
          医疗器械原料材料
        </p>
        <div
          className={css`
            z-index: 150;
            position: relative;
            display: flex;
            justify-content: space-around;
          `}
        >
          {Object.values(goodsType).map((it) => (
            <Space direction={"vertical"} align="center" key={it}>
              <div
                className={css`
                  background: rgba(23, 21, 126, 0.12);
                  border: 1px solid #0888ff;
                  border-radius: 10px;
                  padding: 1.35rem 0 2.28rem;
                  width: 17.36rem;
                  text-align: center;
                `}
              >
                <p
                  className={css`
                    margin-bottom: 2.2rem;
                  `}
                >
                  {GoodsTypeToTag[it]}原料
                </p>
                {materialDetail[it]?.map((it) => (
                  <p
                    className={css`
                      font-size: 1.14rem;
                      line-height: 2.3rem;
                      margin-top: 0.5rem;
                    `}
                  >
                    <span
                      className={css`
                        min-width: 5.86rem;
                        display: inline-block;
                        text-align: start;
                        margin-right: 1rem;
                      `}
                    >
                      {it.name}
                    </span>
                    {it.price}元/件
                  </p>
                ))}
              </div>
              <InputNumber
                value={material[it]}
                onChange={(value) => {
                  setApiState((s) => {
                    s.strategicData.material[it] = value;
                  });
                }}
                className={css`
                  margin-top: 1rem;
                  background: #00154b;
                  border: 1.5px solid #2352cc;
                  border-radius: 4px;
                  color: #ffffff;
                `}
                precision={0}
              />
            </Space>
          ))}
        </div>
        <div
          className={css`
            position: absolute;
            left: 4rem;
            bottom: -5rem;
            width: 22rem;
            height: 16em;
          `}
        >
          <Lottie
            options={{
              animationData: paymentAnimation,
            }}
          />
        </div>
        <p
          className={css`
            text-align: center;
            margin-top: 4.3rem;
          `}
        >
          <span
            className={css`
              color: #0075ff;
              margin-right: 1rem;
            `}
          >
            总价
          </span>
          {totalPay}
        </p>
        <div className={Style.btnGroup}>
          <button className={Theme.Btn.primary.sm} onClick={nextPage}>
            确定下单
          </button>
        </div>
      </div>
    </CardWrapper>
  );
}
function MaterialPartTwo({ backNav }: { backNav: () => void }) {
  const tableHeaderStyle = css`
    background: linear-gradient(180deg, #3074fd 0%, #2a64bb 100%);
    font-size: 1.43rem;
    color: #ffffff;
    line-height: 2rem;
    text-align: center;
    padding: 0.3rem;
  `;
  return (
    <CardWrapper
      title="物料采购——生产线信息"
      bg={Asset.play_phase3_nav3_bg_2}
      wrapperClassName={css`
        width: 86.6rem;
        height: 59.8rem;
      `}
      className={css`
        width: 71rem;
        height: 45.5rem;
      `}
    >
      <div
        className={css`
          border: 2px solid #2b66bf;
          border-radius: 1.14rem;
          overflow: hidden;
          margin-top: 3.36rem;
        `}
      >
        <div className={tableHeaderStyle}>生产线</div>
        <Table
          size="middle"
          dataSource={[
            { data1: "大型生产线（300万/条）", data2: "中型生产线（200万/条）", data3: "小型生产线（100万/条）" },
          ]}
          pagination={false}
          rowClassName={getRowClassName}
          showHeader={false}
        >
          <Column dataIndex="data1" width="14rem" align="center" />
          <Column dataIndex="data2" width="14rem" align="center" />
          <Column dataIndex="data3" width="14rem" align="center" />
        </Table>
        <div className={tableHeaderStyle}>产能</div>
        <Table
          size="middle"
          dataSource={[
            { data1: "麻醉机（180万/条）", data2: "麻醉机（150万/条）", data3: "麻醉机（120万/条）" },
            { data1: "呼吸机（150万/条）", data2: "呼吸机（120万/条）", data3: "麻醉机（90万/条）" },
            { data1: "超声仪（100万/条）", data2: "麻醉机（80万/条）", data3: "麻醉机（40万/条）" },
          ]}
          pagination={false}
          rowClassName={getRowClassName}
          showHeader={false}
        >
          <Column dataIndex="data1" width="14rem" align="center" />
          <Column dataIndex="data2" width="14rem" align="center" />
          <Column dataIndex="data3" width="14rem" align="center" />
        </Table>
      </div>
      <Lottie
        options={{
          animationData: machine,
        }}
        width={252}
        height={154}
      />
      <div
        className={cx(
          Style.btnGroup,
          css`
            margin-top: 0.5rem;
          `
        )}
      >
        <button className={Theme.Btn.primary.sm} onClick={backNav}>
          确定
        </button>
      </div>
    </CardWrapper>
  );
}
