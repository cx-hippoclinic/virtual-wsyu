import { useApiState } from "@ancademy/vse-client";
import { Asset, Color, Style, Theme } from "@client";
import { css, cx, injectGlobal } from "@emotion/css";
import { Button, Col, Divider, Form, InputNumber, message, Popover, Radio, Row, Space, Spin, Table, Tabs } from "antd";
import { Chart, LineAdvance } from "bizcharts";
import _, { mean, sum } from "lodash";
import { useEffect, useState } from "react";
import { fmtTime } from "../../common/util";

import { Countdown } from "@client/component/Countdown";
import {
  fmtN,
  goodsType,
  GoodsTypeToTag,
  IPageTradeState,
  orderDetailData,
  Role,
  TradeRecode,
  TradeStatue,
  TradeStatueToTag,
  User,
} from "../config";
import { TPlayPageProps } from "../interface";
import { calcTradeSuccess, goodPriceRefer, randomCount } from "../util";

const Column = Table.Column;
const TabPane = Tabs.TabPane;

export function Trade({ ...props }: TPlayPageProps) {
  const { game } = props;
  const gameId = game.id;
  const { loading, apiState, setApiState } = useApiState<IPageTradeState>(gameId, "schedulerKey");
  useEffect(() => {
    if (loading) {
      return;
    }
    if (apiState.inited) {
      return;
    }
    setApiState({
      inited: true,
      tradeRecodes: [],
      leftTime: 60,
      round: 1,
      myAccount: {
        money: 1000000,
        have: {
          [goodsType.hocus]: 0,
          [goodsType.breathe]: 0,
          [goodsType.ultrasound]: 0,
        },
      },
    });
  }, [loading]);
  const [role, setRole] = useState(Role.buyer),
    [price, setPrice] = useState(null as number),
    [count, setAmount] = useState(null as number),
    [type, setType] = useState<goodsType>(goodsType.hocus),
    totalAmount = price * count;
  const [showPopover, setShowPopover] = useState(false),
    hidePopover = () => {
      setShowPopover(false);
      setPrice(null);
      setAmount(null);
    };
  const disabled =
    (role === Role.buyer && totalAmount > apiState?.myAccount?.money) ||
    (role === Role.seller && count > apiState?.myAccount?.have?.[type]);
  const myActiveShoutList = apiState?.tradeRecodes?.filter(
    (it) => it.owner === User.me && it.statue === TradeStatue.waiting
  );
  useEffect(() => {
    injectGlobal`
      .ant-table{
        background: transparent !important;
      }
      
      .ant-table-thead tr th {
        background: transparent !important;
        color: #ffffff; !important;
      }

      .ant-table-tbody tr td ,.ant-table-tbody tr td:hover {
        background: transparent !important;
        color: #ffffff; !important;
      }
      .ant-table-placeholder .ant-table-cell {
        background: transparent!important;
      }
      .ant-tabs-nav {
        margin: 0 !important;
        .ant-tabs-tab {
          padding: 0.7rem 3.14rem;
          color: #ffffff !important;
          background: #2b4c7d !important;
          border-bottom-color: #23549e !important;
          border-radius: 1rem 1rem 0 0 !important;
          &.ant-tabs-tab-active {
            background: #2e6ee0!important;
            box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
            & .ant-tabs-tab-btn {
              color: #ffffff !important;
            }
          }
        }
      }
    `;
  }, []);
  const publishSell = () => {
    const type = _.sample(Object.values(goodsType)) as goodsType;
    const data = goodPriceRefer[type];
    setApiState((s) => {
      s.tradeRecodes = [
        ...s.tradeRecodes,
        {
          id: s.tradeRecodes.length + 1,
          owner: User.other,
          count: randomCount(data.minCount, data.maxCount),
          price: Math.floor(randomCount(data.minPrice, data.maxPrice) / 100) * 100,
          type,
          statue: TradeStatue.waiting,
          role: Role.seller,
        },
      ];
    });
  };
  useEffect(() => {
    if (!setApiState || loading) {
      return;
    }
    if (apiState.tradeRecodes.filter((it) => it.owner === User.other).length === apiState.round) {
      return;
    }
    publishSell();
  }, [loading]);
  if (loading || !apiState.inited) {
    return null;
  }
  return (
    <div>
      <Row
        className={css`
          color: ${Color.light};
        `}
      >
        <Col span={14}>
          <Space
            direction={"vertical"}
            size={"large"}
            className={css`
              width: 100%;
              align-items: center;
            `}
          >
            <div
              className={css`
                width: 32rem;
                height: 16rem;
                padding: 2rem;
                margin: auto;
                box-shadow: inset 0 1px 1rem ${Color.disabled};
                display: flex;
                align-items: center;
              `}
            >
              <MarketChart {...props} />
            </div>
            <Tabs
              centered
              type="card"
              className={css`
                min-width: 36rem;
                margin-left: -2rem;
              `}
            >
              <TabPane tab="订单详情" key="orderDetail">
                <Table size="small" dataSource={orderDetailData} pagination={false}>
                  <Table.Column title="麻醉机：（数量/单价）" dataIndex={goodsType.hocus} />
                  <Table.Column title="呼吸机：（数量/单价）" dataIndex={goodsType.breathe} />
                  <Table.Column title="超声仪：（数量/单价）" dataIndex={goodsType.ultrasound} />
                </Table>
              </TabPane>
            </Tabs>
            {/*
              <Button className={Style.darkButton} onClick={() => frameEmitter.emit(MoveType.callAuction)}>
                集合竞价
              </Button>
              */}
          </Space>
        </Col>
        <Col span={6}>
          <Space size="large" direction="vertical">
            <MarketTable shoutRecord={apiState.tradeRecodes} />
            <div className={Style.btnGroup}>
              {myActiveShoutList?.length ? (
                <span
                  className={css`
                    font-size: 1.2rem;
                  `}
                >
                  已挂牌，等待系统撮合成交 &nbsp;
                  <Spin />
                </span>
              ) : (
                <Popover
                  visible={showPopover}
                  onVisibleChange={setShowPopover}
                  trigger="click"
                  content={
                    <div
                      className={css`
                        padding: 1rem;
                      `}
                    >
                      <Form.Item label="挂牌类型">
                        <Radio.Group
                          value={role}
                          onChange={({ target: { value } }) => setRole(value)}
                          options={[
                            { label: "买入", value: Role.buyer },
                            { label: "卖出", value: Role.seller },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item label="商品种类">
                        <Radio.Group
                          value={type}
                          onChange={({ target: { value } }) => setType(value)}
                          options={[
                            { label: "麻醉机", value: goodsType.hocus },
                            { label: "呼吸机", value: goodsType.breathe },
                            { label: "超声仪", value: goodsType.ultrasound },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item label="单价">
                        <InputNumber min={1} step={1} value={price} onChange={(value) => setPrice(value)} />
                      </Form.Item>
                      <Form.Item label="数量">
                        <InputNumber min={1} step={1} value={count} onChange={(value) => setAmount(value)} />
                      </Form.Item>
                      <Form.Item label="总价(单价*数量)">{totalAmount || " -- "}</Form.Item>
                      <Space>
                        <Button
                          size="small"
                          className={Theme.Btn.disabled.sm}
                          disabled={disabled}
                          onClick={() => {
                            message.success("挂牌成功！").then();
                            const id = apiState.tradeRecodes.length + 1;
                            setApiState((s) => {
                              s.tradeRecodes = [
                                ...s.tradeRecodes,
                                {
                                  id,
                                  owner: User.me,
                                  count,
                                  price,
                                  type,
                                  statue: TradeStatue.waiting,
                                  role,
                                },
                              ];
                            });
                            setTimeout(() => {
                              const res = calcTradeSuccess(type, price);
                              setApiState((s) => {
                                const data = s.tradeRecodes.find((it) => it.id === apiState.tradeRecodes.length + 1);
                                s.tradeRecodes = s.tradeRecodes
                                  .filter((it) => it.id !== id)
                                  .concat({ ...data, statue: res ? TradeStatue.success : TradeStatue.fail });
                                if (res) {
                                  s.myAccount.money -= price * count;
                                }
                              });
                            }, 5000);
                            hidePopover();
                          }}
                        >
                          提交
                        </Button>
                        <Button size="small" className={Theme.Btn.disabled.sm} onClick={hidePopover}>
                          取消
                        </Button>
                      </Space>
                    </div>
                  }
                >
                  <Button
                    className={cx(
                      Theme.Btn.primary.sm,
                      css`
                        border: 3px solid #0066ff;
                        box-shadow: inset 0 0 14px #b5dcff;
                        border-radius: 10px;
                        font-size: 1.14rem;
                      `
                    )}
                  >
                    <img
                      src={Asset.play_phase1_person}
                      alt=""
                      className={css`
                        margin-right: 1rem;
                      `}
                    />
                    挂牌交易
                  </Button>
                </Popover>
              )}
              <Button
                className={cx(
                  Theme.Btn.primary.sm,
                  css`
                    border: 3px solid #0066ff;
                    box-shadow: inset 0 0 14px #b5dcff;
                    border-radius: 10px;
                    font-size: 1.14rem;
                  `
                )}
                onClick={() => {}}
              >
                <img
                  src={Asset.play_phase1_leave}
                  alt=""
                  className={css`
                    margin-right: 1rem;
                  `}
                />
                退出交易市场
              </Button>
            </div>
            {/*<p>预计{fmtTime(timeLeft)}后关闭</p>*/}
          </Space>
        </Col>
      </Row>
      <GameDataComp
        gameState={apiState}
        nextRound={() => {
          setApiState((s) => {
            s.round = s.round + 1;
          });
          publishSell();
        }}
      />
    </div>
  );
}

function MarketChart({ gameState: { shouts = [] } }: TPlayPageProps) {
  const data = shouts
    .filter((s) => !s.closeTime)
    .map(({ price, count, role }) => ({
      price,
      count,
      role: role === Role.buyer ? "买家" : "卖家",
    }))
    .sort((m, n) => m.count - n.count);
  return (
    <Chart autoFit height={200} data={[...data]}>
      <LineAdvance shape="smooth" point area position="count*price" color="role" />
    </Chart>
  );
}

const sortShoutRecord = (a: TradeRecode, b: TradeRecode) => {
  return a.id - b.id;
};

function MarketTable({ shoutRecord }: { shoutRecord: TradeRecode[] }) {
  const sellData = shoutRecord?.filter(({ role }) => role === Role.seller).sort(sortShoutRecord),
    buyData = shoutRecord?.filter(({ role }) => role === Role.buyer).sort(sortShoutRecord);
  const titleCls = css`
      width: 1.7rem;
      font-size: 1.7rem;
      padding-right: 1rem;
      text-align: right;
      color: #00ff94;
    `,
    tableProps: any = {
      pagination: false,
      size: "small",
      className: css`
        width: 16rem;
      `,
    };
  return (
    <div
      className={css`
        .ant-empty {
          opacity: 0;
          height: 2rem;
        }
      `}
    >
      <Space
        className={css`
          background: linear-gradient(180deg, #06132a 0%, #081837 100%);
          border: 5px solid #23549e;
          padding: 1rem;
          border-radius: 15px;
          margin-bottom: 1.35rem;
        `}
        direction="vertical"
      >
        <Space size={30}>
          <p className={titleCls}>卖盘</p>
          <Table
            bordered={false}
            scroll={{ y: 120 }}
            {...tableProps}
            dataSource={sellData}
            className={css`
              width: 30.6rem;
            `}
          >
            <Column
              title="均卖价"
              dataIndex="type"
              render={(_, item) => {
                return GoodsTypeToTag[_];
              }}
            />
            <Column
              title={
                fmtN(mean(sellData?.filter((i) => i.statue === TradeStatue.success).map((s) => s.price))) || " -- "
              }
              dataIndex="price"
            />
            <Column title="总卖量" />
            <Column title={sum(sellData?.map((s) => s.count)) || " -- "} dataIndex="count" />
            <Column
              title="状态"
              dataIndex="statue"
              render={(_, item) => {
                return TradeStatueToTag[_];
              }}
            />
          </Table>
        </Space>
        <Divider
          className={css`
            margin: 1rem 0 !important;
            background: rgba(71, 71, 71, 0.16);
          `}
        />
        <Space size={30}>
          <p
            className={cx(
              titleCls,
              css`
                color: #0085ff;
              `
            )}
          >
            买盘
          </p>
          <Table
            bordered={false}
            align="center"
            {...tableProps}
            scroll={{ y: 120 }}
            dataSource={buyData}
            className={css`
              width: 30.6rem;
              .ant-table-thead {
                display: table-footer-group;
              }
            `}
          >
            <Column
              title="均卖价"
              dataIndex="type"
              render={(_, item) => {
                return GoodsTypeToTag[_];
              }}
            />
            <Column
              title={fmtN(mean(buyData?.filter((i) => i.statue === TradeStatue.success).map((s) => s.price))) || " -- "}
              dataIndex="price"
            />
            <Column title="总卖量" />
            <Column title={sum(buyData?.map((s) => s.count)) || " -- "} dataIndex="count" />
            <Column
              title="状态"
              dataIndex="statue"
              render={(_, item) => {
                return TradeStatueToTag[_];
              }}
            />
          </Table>
        </Space>
      </Space>
      <Tabs type="card" size="middle" centered>
        <TabPane tab="超声机" key="ultrasound">
          <Space
            className={css`
              background: linear-gradient(180deg, #06132a 0%, #081837 100%);
              border: 5px solid #23549e;
              padding: 1rem;
              border-radius: 15px;
            `}
          >
            <Table
              {...tableProps}
              // dataSource={tradeRecord}
              className={css`
                height: 15rem;
                width: 34.5rem;
              `}
            >
              <Column title="时间" dataIndex="time" render={fmtTime} align="center" />
              <Column title="单价" dataIndex="price" align="center" />
              <Column title="成交量" dataIndex="count" align="center" />
            </Table>
          </Space>
        </TabPane>
        <TabPane tab="呼吸机" key="breathe">
          <Space
            className={css`
              background: linear-gradient(180deg, #06132a 0%, #081837 100%);
              border: 5px solid #23549e;
              padding: 1rem;
              border-radius: 15px;
            `}
          >
            <Table
              {...tableProps}
              // dataSource={tradeRecord}
              className={css`
                height: 15rem;
                width: 34.5rem;
              `}
            >
              <Column title="时间" dataIndex="time" render={fmtTime} align="center" />
              <Column title="单价" dataIndex="price" align="center" />
              <Column title="成交量" dataIndex="count" align="center" />
            </Table>
          </Space>
        </TabPane>
      </Tabs>
    </div>
  );
}

function GameDataComp({ gameState, nextRound }: { gameState: IPageTradeState; nextRound: () => void }) {
  const [update, setUpdate] = useState(false);
  const boxStyles = css`
    background: rgba(20, 98, 171, 0.63);
    border: 2px solid #0063d8;
    width: 11.7rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
  `;
  return (
    <Space
      size={10}
      direction="vertical"
      className={css`
        position: absolute;
        right: 2rem;
        top: 1rem;
      `}
    >
      <div className={boxStyles}>
        <img src={Asset.play_phase1_moneyIcon} alt="" />
        <span
          className={css`
            font-size: 1.6rem;
            color: #ffffff;
          `}
        >
          {Math.floor(gameState?.myAccount?.money / 10000)}
          <span
            className={css`
              font-size: 1rem;
            `}
          >
            万元
          </span>
        </span>
      </div>
      <div className={boxStyles}>
        <span
          className={css`
            font-size: 1rem;
            color: #ffffff;
          `}
        >
          轮次 {gameState.round}/12
        </span>
      </div>
      <div className={boxStyles}>
        <span
          className={css`
            font-size: 1rem;
            color: #ffffff;
          `}
        >
          本轮剩余时间{" "}
          <Countdown
            initCount={gameState.leftTime}
            todo={() => {
              nextRound();
              setUpdate(!update);
            }}
            update={update}
          />
        </span>
      </div>
    </Space>
  );
}
