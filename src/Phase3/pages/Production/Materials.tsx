import { useApiPlay } from "@ancademy/vse-client";
import { getRowClassName, onMainCell, Style, Theme } from "@client";
import { css, cx } from "@emotion/css";
import { Table, Tabs } from "antd";
import Lottie from "lottie-react-web";
import { goodsType, GoodsTypeToTag } from "../../../common/config";
import payment from "../../animation/payment.json";
import { CardWrapper } from "../../components";
import { IPlayerState, mockOrder, productionCapacity, productionLineSize } from "../../config";
import tableHeaderClass = Style.tableHeaderClass;

const { TabPane } = Tabs;
const { Column } = Table;
export function Materials({ nextPage }: { nextPage: () => void }) {
  const {
    apiState: {
      productionData: { choseSize },
    },
  } = useApiPlay<IPlayerState>();
  const ProductionData = Object.values(goodsType).map((it) => ({
    name: it,
    production: choseSize,
    account: productionCapacity[choseSize][it],
  }));

  const orderDetail = [mockOrder];

  return (
    <CardWrapper
      title="生产经营——取材"
      className={css`
        width: 77.3rem;
        height: 50.35rem;
        padding: 1.5rem 9.3rem;
      `}
    >
      <Tabs centered type="card">
        <TabPane tab="生产信息" key="info">
          <Table
            size="middle"
            dataSource={ProductionData}
            pagination={false}
            rowClassName={getRowClassName}
            className={tableHeaderClass}
          >
            <Column
              title="生产产品"
              dataIndex="name"
              align="center"
              width="14rem"
              onCell={onMainCell}
              render={(_) => GoodsTypeToTag[_]}
            />
            <Column
              title="生产线"
              dataIndex="production"
              width="14rem"
              align="center"
              render={(_) => {
                switch (_) {
                  case productionLineSize.small:
                    return "小";
                  case productionLineSize.middle:
                    return "中";
                  case productionLineSize.large:
                    return "大";
                }
              }}
            />
            <Column title="生产数量" dataIndex="account" width="14rem" align="center" />
          </Table>
        </TabPane>
      </Tabs>
      <Tabs
        centered
        type="card"
        className={css`
          margin-top: 1.64rem;
        `}
      >
        <TabPane tab="订单详情" key="detail">
          <Table
            size="middle"
            dataSource={orderDetail}
            pagination={false}
            rowClassName={getRowClassName}
            className={tableHeaderClass}
          >
            <Column title="麻醉机" dataIndex={goodsType.hocus} align="center" width="14rem" />
            <Column title="呼吸机" dataIndex={goodsType.breathe} width="14rem" align="center" />
            <Column title="超声仪" dataIndex={goodsType.ultrasound} width="14rem" align="center" />
          </Table>
        </TabPane>
      </Tabs>
      <div
        className={css`
          position: absolute;
          right: 8rem;
          bottom: 0;
        `}
      >
        <Lottie options={{ animationData: payment }} width={250} height={250} />
      </div>
      <div
        className={cx(
          Style.btnGroup,
          css`
            margin-top: 6rem;
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
