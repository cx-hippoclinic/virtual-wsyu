import { useApiPlay, useApiState } from "@ancademy/vse-client";
import { css, injectGlobal } from "@emotion/css";
import { Table, Tabs } from "antd";
import _ from "lodash";
import { useEffect, useState } from "react";

import { useTimer } from "@client/component/Countdown";
import { goodsType } from "../../common/config";
import { IPageTradeState, IPlayerState, Role, TradeStatue, User } from "../config";
import { TPlayPageProps } from "../interface";
import { goodPriceRefer, randomCount } from "../util";

const Column = Table.Column;
const TabPane = Tabs.TabPane;
const maxRound = 12;
const roundTime = 60;

export function Trade({ ...props }: TPlayPageProps & { nextPage: () => void; prePage: () => void }) {
  const { game, nextPage, prePage } = props;
  const gameId = game.id;
  const { loading, apiState, setApiState } = useApiState<IPageTradeState>(gameId, "schedulerKey");
  const { setApiState: setApiPlayState } = useApiPlay<IPlayerState>();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (apiState.inited) {
      return;
    }
    setApiState({
      inited: true,
      tradeRecodes: [getTradeRecodes()],
      leftTime: roundTime,
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
      .ant-table-cell-scrollbar:not([rowspan]) {
         box-shadow: unset!important;
      }
      .ant-table-placeholder .ant-table-cell {
        background: transparent!important;
      }
    `;
    window.addEventListener("message", (event) => {
      if (event.data === "phase1") {
        nextPage();
      }
    });
  }, []);
  const getTradeRecodes = () => {
    const type = _.sample(Object.values(goodsType)) as goodsType;
    const data = goodPriceRefer[type];
    return {
      id: (apiState?.tradeRecodes?.length || 0) + 1,
      owner: User.other,
      count: randomCount(data.minCount, data.maxCount),
      price: Math.floor(randomCount(data.minPrice, data.maxPrice) / 100) * 100,
      type,
      statue: TradeStatue.waiting,
      role: Role.seller,
      round: apiState.round,
      time: roundTime,
    };
  };
  const publishSell = () => {
    setApiState((s) => {
      s.tradeRecodes = [...s.tradeRecodes, getTradeRecodes()];
    });
  };
  const t = useTimer(apiState?.leftTime || roundTime);
  if (loading || !apiState.inited) {
    return null;
  }
  return (
    <div
      className={css`
        width: 100rem;
        height: 55rem;
        border: 3px solid #0055a5;
        border-radius: 2.14rem;
        overflow: hidden;
      `}
    >
      <iframe src={"//localhost:8000"} width="100%" height="100%" frameBorder={0} />
    </div>
  );
}
