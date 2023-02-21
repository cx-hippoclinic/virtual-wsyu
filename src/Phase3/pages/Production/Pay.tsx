import { getRowClassName, Style, Theme } from "@client";
import { css, cx } from "@emotion/css";
import { Table } from "antd";
import Lottie from "lottie-react-web";
import loading from "../../animation/loading1.json";
import { CardWrapper } from "../../components";
import tableHeaderClass = Style.tableHeaderClass;

const { Column } = Table;
export function Pay({ nextPage }: { nextPage: () => void }) {
  const data = [
    {
      money: 200,
      rate: 0.78,
      pay: 100,
      lastMoney: 100,
    },
  ];
  return (
    <CardWrapper
      title="生产经营——支付费用"
      className={css`
        padding: 1.5rem 9.3rem;
      `}
    >
      <Table
        size="middle"
        dataSource={data}
        pagination={false}
        rowClassName={getRowClassName}
        className={cx(
          tableHeaderClass,
          css`
            margin-top: 7.8rem;
          `
        )}
      >
        <Column title="当前现金" dataIndex="money" width="14rem" align="center" />
        <Column title="比例" dataIndex="rate" width="14rem" align="center" />
        <Column title="支付费用" dataIndex="pay" width="14rem" align="center" />
        <Column title="剩余现金" dataIndex="lastMoney" width="14rem" align="center" />
      </Table>
      <Lottie options={{ animationData: loading }} width={250} height={200} />
      <div
        className={cx(
          Style.btnGroup,
          css`
            margin-top: 3rem;
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

export function NextPay({ nextPage }: { nextPage: () => void }) {
  const data = [
    {
      money: 200,
      rate: 0.78,
      pay: 100,
      lastMoney: 100,
    },
  ];
  return (
    <CardWrapper
      title="生产经营——支付费用"
      className={css`
        padding: 1.5rem 9.3rem;
      `}
    >
      <Table
        size="middle"
        dataSource={data}
        pagination={false}
        rowClassName={getRowClassName}
        className={cx(
          tableHeaderClass,
          css`
            margin-top: 7.8rem;
          `
        )}
      >
        <Column title="当前现金" dataIndex="money" width="14rem" align="center" />
        <Column title="员工人数" dataIndex="rate" width="14rem" align="center" />
        <Column title="支工资福利" dataIndex="pay" width="14rem" align="center" />
        <Column title="剩余现金" dataIndex="lastMoney" width="14rem" align="center" />
      </Table>
      <Lottie options={{ animationData: loading }} width={250} height={200} />
      <div
        className={cx(
          Style.btnGroup,
          css`
            margin-top: 3rem;
          `
        )}
      >
        <button className={Theme.Btn.primary.sm} onClick={nextPage}>
          确定
        </button>
      </div>
    </CardWrapper>
  );
}
