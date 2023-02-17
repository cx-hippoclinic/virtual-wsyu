import { useApiPlay, useApiState } from "@ancademy/vse-client";
import { Style, Theme } from "@client";
import { css } from "@emotion/css";
import { Table } from "antd";
import { useEffect } from "react";
import { IPageTradeResultState, IPlayerState } from "../config";
import { TPlayPageProps } from "../interface";
import { randomCount } from "../util";

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
  const getRowClassName = (record, index) => {
    let className = "";
    className =
      index % 2 === 0
        ? css`background:#020711; color: #ffffff; & .ant-table-cell.ant-table-cell-row-hover{background:#0c275a!important; color: #ffffff;`
        : css`
            background: #12151d;
            color: #ffffff;
            & .ant-table-cell.ant-table-cell-row-hover {
              background: #071f4c !important;
              color: #ffffff;
            }
          `;
    return className;
  };

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
        className={css`
          .ant-table-thead > tr > th {
            background: linear-gradient(180deg, #3074FD 0%, #2A64BB 100%); !important;
            color: #ffffff;
          }
        `}
      >
        <Column
          title="姓名"
          dataIndex="name"
          align="center"
          width="12rem"
          onCell={(record, rowIndex) => {
            if (rowIndex % 2 === 0) {
              return {
                style: {
                  backgroundColor: "#0c275a",
                },
              };
            } else {
              return {
                style: {
                  backgroundColor: "#071F4C",
                },
              };
            }
          }}
        />
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
