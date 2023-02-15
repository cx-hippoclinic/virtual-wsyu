import { Asset, Theme } from "@client";
import { css, injectGlobal } from "@emotion/css";
import { Modal } from "antd";
import { useEffect } from "react";

export function StartAnswerBtn({ nextPage }: { nextPage: () => void }) {
  useEffect(() => {
    injectGlobal`
  .ant-modal-confirm-body .ant-modal-confirm-title{
    color: #ffffff;!important;
    font-size: 24px;!important;
    margin: 8px 0;!important;
  }
`;
  }, []);
  return (
    <button
      className={Theme.Btn.primary.sm}
      onClick={() => {
        Modal.confirm({
          icon: <img src={Asset.play_components_Warning} />,
          width: 534,
          style: {
            backgroundColor: "rgba(13, 89, 203, 0.48)",
            border: "3px solid #2796FC",
            backdropFilter: "blur(9.5px)",
            textAlign: "center",
            color: "#ffffff",
          },
          content: (
            <div
              className={css`
                color: #ffffff;
                font-size: 1.42rem;
                text-align: start;
              `}
            >
              在答题过程中不显示对错，且答题算入报告分数，请认真检查回答后确定提交，提交后将跳转答错题目并显示题目解析。
            </div>
          ),
          title: "提示",
          onOk: nextPage,
          centered: true,
          okText: "确定",
          cancelText: "取消",
        });
      }}
    >
      开始答题
    </button>
  );
}
