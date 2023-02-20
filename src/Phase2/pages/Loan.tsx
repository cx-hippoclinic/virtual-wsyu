import { Asset, getRowClassName, onMainCell, Style, Theme } from "@client";
import { css } from "@emotion/css";
import { Table } from "antd";
import { defaultLornData } from "../config";
import tableHeaderClass = Style.tableHeaderClass;

const Column = Table.Column;
function Loan(props) {
  return (
    <div
      className={css`
        background: radial-gradient(97.85% 318.81% at 99% 3.69%, #001e65 0%, #15002f 41.55%, #0d2654 100%);
        border: 3px solid #1d3175;
        padding: 3.8rem 12.85rem;
        border-radius: 16px;
      `}
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
          className={css`
            padding-left: 4.6rem !important;
          `}
        />
        <Column title="贷款期限" dataIndex="time" width="14rem" render={(_) => _ && _ + "年"} />
        <Column
          title="年利率"
          dataIndex="rate"
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
        <Column title="贷款额度" dataIndex="quota" width="18rem" render={(_) => _ && `现有资金${_}倍`} />
      </Table>
      <div className={Style.btnGroup}>
        <button
          className={Theme.Btn.primary.sm}
          onClick={() => {
            history.back();
          }}
        >
          切换角色
        </button>
      </div>
      <img
        src={Asset.play_phase2_lorn_bg}
        alt=""
        className={css`
          position: fixed;
          right: 0;
          bottom: 0;
        `}
      />
    </div>
  );
}

export default Loan;
