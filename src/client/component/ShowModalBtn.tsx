import { Asset, Theme } from "@client";
import { css, injectGlobal } from "@emotion/css";
import { Modal } from "antd";
import { useEffect } from "react";

export function ShowModalBtn({ nextPage, content, text }: { nextPage?: () => void; content: string; text: string }) {
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
          icon: <img src={Asset.play_Introduction_Warning} />,
          width: 534,
          style: {
            backgroundColor: "#A378FF",
            border: "3px solid #4553CF",
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
              {content}
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
      {text}
    </button>
  );
}
