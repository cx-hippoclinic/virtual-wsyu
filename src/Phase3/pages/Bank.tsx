import { useApiPlay } from "@ancademy/vse-client";
import { Asset, getRowClassName, onMainCell, Style, Theme } from "@client";
import { css, cx } from "@emotion/css";
import { Table } from "antd";
import { defaultLornData } from "../../Phase2/config";
import { IPlayerState } from "../config";
import tableHeaderClass = Style.tableHeaderClass;

const Column = Table.Column;
export function Bank({ backNav }: { backNav: () => void }) {
  const {
    apiState: { loanPlan },
    setApiState,
  } = useApiPlay<IPlayerState>();
  return (
    <div
      className={cx(
        css`
          width: 96.78rem;
          height: 55.6rem;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          background: url(${Asset.play_phase3_nav1_bg}) no-repeat;
          background-size: contain;
        `
      )}
    >
      <Table
        size="middle"
        dataSource={defaultLornData}
        pagination={false}
        rowClassName={getRowClassName}
        className={tableHeaderClass}
      >
        <Column title="贷款方案" dataIndex="name" align="center" width="14rem" onCell={onMainCell} />
        <Column
          title="贷款类型"
          dataIndex="type"
          width="14rem"
          align="center"
          className={css`
            padding-left: 4.6rem !important;
          `}
        />
        <Column title="贷款期限" dataIndex="time" width="14rem" align="center" render={(_) => _ && _ + "年"} />
        <Column
          title="年利率"
          dataIndex="rate"
          align="center"
          width="14rem"
          render={(_) =>
            _ ? (
              _ + "%"
            ) : (
              <div
                className={css`
                  height: 1.5rem;
                `}
              ></div>
            )
          }
        />
        <Column title="贷款额度" dataIndex="quota" width="14rem" align="center" render={(_) => _ && `现有资金${_}倍`} />
        <Column
          title="方案选择"
          dataIndex="key"
          width="14rem"
          align="center"
          render={(_) =>
            _ !== undefined && (
              <div
                className={css`
                  color: #0075ff;
                  font-size: 1.42rem;
                  cursor: pointer;
                `}
                onClick={() => {
                  setApiState((s) => (s.loanPlan = _));
                }}
              >
                {loanPlan === _ ? "取消选择" : "选择此方案"}
              </div>
            )
          }
        />
      </Table>
      <div className={Style.btnGroup}>
        <button className={Theme.Btn.primary.sm} onClick={backNav}>
          确定
        </button>
      </div>
    </div>
  );
}
