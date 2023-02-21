import { useApiPlay } from "@ancademy/vse-client";
import { getRowClassName, onMainCell, Style, Theme } from "@client";
import { css, cx } from "@emotion/css";
import { Radio, Table } from "antd";
import Lottie from "lottie-react-web";
import loading from "../../animation/evolution.json";
import { CardWrapper } from "../../components";
import { IPlayerState, productionLineSize, productionLineToTag } from "../../config";
import tableHeaderClass = Style.tableHeaderClass;

const { Column } = Table;
const ProductionLineData = [
  {
    name: "生产线投入（万）",
    [productionLineSize.large]: 300,
    [productionLineSize.middle]: 200,
    [productionLineSize.small]: 100,
  },
  {
    name: "厂房投入（万）",
    [productionLineSize.large]: 100,
    [productionLineSize.middle]: 100,
    small: 100,
  },
  {
    name: "总投入（万）",
    [productionLineSize.large]: 400,
    [productionLineSize.middle]: 300,
    [productionLineSize.small]: 200,
  },
];

export function Construction({ nextPage }: { nextPage: () => void }) {
  const { apiState, setApiState } = useApiPlay<IPlayerState>();
  return (
    <CardWrapper
      title="生产经营——厂房与生产线建造"
      className={css`
        width: 77.3rem;
        height: 45.2rem;
        padding-left: 9.2rem;
        padding-right: 9.2rem;
      `}
    >
      <Table
        size="middle"
        dataSource={ProductionLineData}
        pagination={false}
        rowClassName={getRowClassName}
        className={cx(
          tableHeaderClass,
          css`
            margin-top: 3.7rem;
          `
        )}
      >
        <Column title="生产线建造" dataIndex="name" align="center" width="14rem" onCell={onMainCell} />
        <Column title="大型生产线" dataIndex="large" width="12rem" align="center" />
        <Column title="中型生产线" dataIndex="middle" width="12rem" align="center" />
        <Column title="小型生产线" dataIndex="small" width="12rem" align="center" />
      </Table>
      <div
        className={css`
          background: linear-gradient(180deg, rgba(59, 66, 239, 0.11) 0%, rgba(59, 66, 239, 0) 100%);
          border: 1px solid #0888ff;
          margin-top: 2rem;
          border-radius: 0.7rem;
          padding-top: 0.7rem;
          padding-bottom: 2rem;
          color: #ffffff;
        `}
      >
        <p
          className={css`
            font-size: 1.42rem;
            text-align: center;
          `}
        >
          请选择生产线种类
        </p>
        <p
          className={css`
            text-align: center;
            margin-top: 0.85rem;
          `}
        >
          <Radio.Group
            value={apiState.productionData.choseSize}
            onChange={(e) => setApiState((s) => (s.productionData.choseSize = e.target.value))}
          >
            {Object.values(productionLineSize).map((it, index) => (
              <Radio.Button
                key={it}
                className={css`
                  margin-left: ${index > 0 && "2.86rem"};
                  background: #234797;
                  border: 1.5px solid #042a8e;
                  border-radius: 4px;
                  height: 2rem !important;
                  color: #ffffff;
                  line-height: 2rem !important;
                `}
                value={it}
              >
                {productionLineToTag[it]}
              </Radio.Button>
            ))}
          </Radio.Group>
        </p>
      </div>
      <div
        className={css`
          position: absolute;
          left: 8.9rem;
          bottom: 0rem;
        `}
      >
        <Lottie options={{ animationData: loading }} width={200} height={200} />
      </div>
      <div
        className={cx(
          Style.btnGroup,
          css`
            margin-top: 3.85rem;
          `
        )}
      >
        <button className={Theme.Btn.primary.sm} onClick={nextPage}>
          下一步
        </button>
      </div>
    </CardWrapper>
  );
}
