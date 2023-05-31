import { Asset, Background, Header, PageContent, Style, Theme } from "@client";
import { css, injectGlobal } from "@emotion/css";
import { Table } from "antd";
import { useEffect } from "react";

const { Column } = Table;

export function ResultRank({ nextPage }: { nextPage: () => void }) {
  useEffect(() => {
    injectGlobal`
      .ant-table{
        background: transparent !important;
      }
      .ant-table table{
        border-spacing:  0 0.78rem!important;
      }
      .ant-table-thead tr th {
        background: transparent !important;
        color: #ffffff; !important;
      }
      .ant-table-row.ant-table-row-level-0{
        background: linear-gradient(180deg, #111B33B3 0%, #343B41B3 100%)!important;
        border-radius: 0.6rem!important;
        & .ant-table-cell{
          padding-top: 0.5rem!important;
          padding-bottom: 0.5rem!important;
        }
      }

      .ant-table-tbody tr td ,.ant-table-tbody tr td:hover {
        background: transparent !important;
        color: #ffffff; !important;
      }
      .ant-table-cell-scrollbar:not([rowspan]) {
         box-shadow: unset!important;
      }
      .ant-table-placeholder .ant-table-cell {
        background: transparent !important;
      }
    `;
  }, []);
  return (
    <div
      className={css`
        height: 100vh;
        overflow: hidden;
      `}
    >
      <Background src={Asset.play_result_bg} />
      <Header title="实验总结" />
      <PageContent
        className={css`
          align-items: start !important;
        `}
      >
        <div
          className={css`
            display: flex;
            flex-flow: column;
            align-items: center;
          `}
        >
          <h2
            className={css`
              text-align: center;
              font-size: 2.3rem;
              color: #ffffff;
            `}
          >
            实验达人
          </h2>
          <div
            className={css`
              margin-top: 3rem;
              display: flex;
            `}
          >
            <div
              className={css`
                margin-top: 1.5rem;
                display: flex;
                flex-flow: column;
                align-items: center;
                color: #ffffff;
              `}
            >
              <img src={Asset.play_result_Vector_2} alt="" />
              <p
                className={css`
                  line-height: 3.57rem;
                  font-size: 2.57rem;
                `}
              >
                大强
              </p>
              <p>实验得分</p>
              <p
                className={css`
                  font-size: 1.2rem;
                  color: #d1c661;
                `}
              >
                70
              </p>
            </div>
            <div
              className={css`
                margin: 0 7rem;
                display: flex;
                flex-flow: column;
                align-items: center;
                color: #ffffff;
              `}
            >
              <img src={Asset.play_result_Vector_1} alt="" />
              <p
                className={css`
                  line-height: 3.57rem;
                  font-size: 2.57rem;
                `}
              >
                大强
              </p>
              <p>实验得分</p>
              <p
                className={css`
                  font-size: 1.2rem;
                  color: #d1c661;
                `}
              >
                60
              </p>
            </div>
            <div
              className={css`
                margin-top: 1.5rem;
                display: flex;
                flex-flow: column;
                align-items: center;
                color: #ffffff;
              `}
            >
              <img src={Asset.play_result_Vector_3} alt="" />
              <p
                className={css`
                  line-height: 3.57rem;
                  font-size: 2.57rem;
                `}
              >
                大强
              </p>
              <p>实验得分</p>
              <p
                className={css`
                  font-size: 1.2rem;
                  color: #d1c661;
                `}
              >
                50
              </p>
            </div>
          </div>
          <Table
            size="middle"
            dataSource={[{}, {}, {}, {}, {}, {}, {}]}
            pagination={false}
            className={css`
              margin-top: 2.2rem;
            `}
          >
            <Column title="排名" dataIndex="money" width="7rem" render={(_, item, index) => index + 4} />
            <Column title="姓名" dataIndex="rate" width="14rem" render={() => "小美"} />
            <Column title="实验时间" dataIndex="pay" width="18rem" />
            <Column title="实验得分" dataIndex="lastMoney" width="14rem" />
          </Table>
          <div className={Style.btnGroup}>
            <button className={Theme.Btn.primary.sm} onClick={nextPage}>
              下一步
            </button>
          </div>
        </div>
      </PageContent>
    </div>
  );
}
