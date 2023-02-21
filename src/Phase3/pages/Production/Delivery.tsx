import { useApiPlay } from "@ancademy/vse-client";
import { getRowClassName, onMainCell, Style, Theme } from "@client";
import { css, cx } from "@emotion/css";
import { Table, Tabs } from "antd";
import Lottie from "lottie-react-web";
import { goodsType, GoodsTypeToTag } from "../../../common/config";
import bkk from "../../animation/bkk.json";
import { CardWrapper } from "../../components";
import { IPlayerState, mockOrder } from "../../config";
import tableHeaderClass = Style.tableHeaderClass;

const { TabPane } = Tabs;
const { Column } = Table;
export function Delivery({ nextPage }: { nextPage: () => void }) {
  const {
    apiState: {
      productionData: { choseOrder },
    },
    setApiState,
  } = useApiPlay<IPlayerState>();
  const orderData = Object.values(goodsType).map((it, index) => ({
    key: index + 1,
    type: GoodsTypeToTag[it],
    count: mockOrder[it],
    money: mockOrder[it] * 100,
  }));
  return (
    <CardWrapper
      title="生产经营——交货"
      className={css`
        width: 77.3rem;
        height: 50.35rem;
        padding: 1.5rem 9.3rem;
      `}
    >
      <Tabs
        centered
        type="card"
        className={css`
          margin-top: 3.6rem;
        `}
      >
        <TabPane tab="生产信息" key="info">
          <Table
            size="middle"
            dataSource={orderData}
            pagination={false}
            rowClassName={getRowClassName}
            className={tableHeaderClass}
          >
            <Column
              title="订单序号"
              align="center"
              width="14rem"
              onCell={onMainCell}
              render={(_, item, index) => index + 1}
            />
            <Column title="订单种类" dataIndex="type" width="14rem" align="center" />
            <Column title="订单数量" dataIndex="count" width="14rem" align="center" />
            <Column title="订单总金额" dataIndex="money" width="14rem" align="center" />
            <Column
              title="选择操作"
              dataIndex="key"
              width="14rem"
              align="center"
              render={(_) => (
                <div
                  className={css`
                    color: #0075ff;
                    font-size: 1.42rem;
                    cursor: pointer;
                  `}
                  onClick={() => {
                    setApiState((s) => (s.productionData.choseOrder = _));
                  }}
                >
                  {choseOrder === _ ? "取消选择" : "选择此方案"}
                </div>
              )}
            />
          </Table>
        </TabPane>
      </Tabs>
      <div
        className={css`
          position: absolute;
          left: 8rem;
          bottom: 0;
        `}
      >
        <Lottie options={{ animationData: bkk }} width={250} height={250} />
      </div>
      <div
        className={cx(
          Style.btnGroup,
          css`
            margin-top: 10rem;
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
