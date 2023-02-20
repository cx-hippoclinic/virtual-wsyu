import { useApiPlay, useApiState } from "@ancademy/vse-client";
import { getRowClassName, onMainCell, Style, Theme } from "@client";
import { css } from "@emotion/css";
import { Table } from "antd";
import { useEffect } from "react";
import { IPageTradeResultState, IPlayerState } from "../config";
import { TPlayPageProps } from "../interface";
import { randomCount } from "../util";
import tableHeaderClass = Style.tableHeaderClass;

const Column = Table.Column;
export function Result({ ...props }: TPlayPageProps & { nextPage: () => void }) {
  const { game, nextPage } = props;
  const gameId = game.id;
  const { apiState: apiPlayState } = useApiPlay<IPlayerState>();
  const { loading, apiState, setApiState } = useApiState<IPageTradeResultState>(gameId, "resultKey");
  function gender() {
    const { money = 10000, myShoutsCount = 15 } = apiPlayState;
    const data = [
      {
        name: "用户",
        money,
        count: myShoutsCount,
      },
    ];
    for (let i = 0; i < 9; i++) {
      const m = randomCount(money - 5000, money + 5000);
      const c = randomCount(myShoutsCount - 10, myShoutsCount + 10);
      data.push({
        name: `机器人${i + 1}`,
        money: m,
        count: c,
      });
    }
    return data.sort((a, b) => b.money - a.money);
  }
  useEffect(() => {
    if (loading) {
      return;
    }
    if (apiState.inited) {
      return;
    }
    setApiState((s) => {
      s.inited = true;
      s.rankData = gender();
    });
  }, [loading]);

  if (loading || !apiState.inited) {
    return null;
  }

  return (
    <div>
      <header
        className={css`
          font-size: 2.28rem;
          color: #ffffff;
          text-align: center;
          margin-bottom: 3rem;
        `}
      >
        结算排名
      </header>
      <Table
        size="middle"
        dataSource={apiState.rankData}
        pagination={false}
        rowClassName={getRowClassName}
        className={tableHeaderClass}
      >
        <Column title="姓名" dataIndex="name" align="center" width="12rem" onCell={onMainCell} />
        <Column
          title="交易笔数"
          dataIndex="count"
          width="50rem"
          className={css`
            padding-left: 4.6rem !important;
          `}
        />
        <Column title="最终获利" dataIndex="money" width="12rem" />
      </Table>
      <div className={Style.btnGroup}>
        <button className={Theme.Btn.primary.sm} onClick={nextPage}>
          下一步
        </button>
      </div>
    </div>
  );
}
