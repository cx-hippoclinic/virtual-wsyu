import { Asset, Style } from "@client";
import { css, cx, injectGlobal } from "@emotion/css";
import { Col, Modal, Row } from "antd";
import { useEffect } from "react";
import ProcessComp, { processProp } from "./ProcessComp";
import ViewStep from "./ViewStep";

interface HeaderPropsType {
  active?: number;
  processActive?: processProp;
  title: string;
}

export function Header({
  title,
  active = 0,
  processActive = { process: 0, subprocess: 0 },
}: HeaderPropsType): JSX.Element {
  useEffect(() => {
    injectGlobal`
      .ant-modal-wrap {
        z-index: 1031;
      }

      .ant-modal-content {
        border-radius: 1.2rem;
        background-color: unset;
        box-shadow: unset;
      }

      .ant-modal-close {
        top: 2.6rem;
        right: 1.6rem;
      }

      .ant-modal {
        padding-bottom: 0;
      }
    `;
  });
  return (
    <div>
      <img
        src={Asset.components_header_bg}
        alt=""
        className={css`
          width: 100%;
        `}
      />
      <Row
        className={css`
          position: absolute;
          top: 0;
          height: 6.2rem;
          display: flex;
          align-items: center;
          width: 100%;
          font-weight: 500;
          text-align: center;
          color: #fff;
        `}
      >
        <Col
          span={7}
          className={css`
            text-align: left;
          `}
        >
          <div
            className={cx(
              css`
                display: flex;
                align-items: center;
                width: 10rem;
                justify-content: space-between;
                margin-left: 4.8rem;
                cursor: pointer;
              `
            )}
            onClick={() => history.back()}
          >
            <img
              src={Asset.components_header_back}
              alt=""
              className={css`
                width: 4.35rem;
                height: 4.35rem;
              `}
            />
            <span
              className={css`
                font-size: 2.3rem;
                line-height: 3rem;
                font-weight: 500;
                margin-left: 0.6rem;
              `}
            >
              返回
            </span>
          </div>
        </Col>
        <Col
          span={10}
          className={css`
            text-align: center;
            font-size: 3rem;
          `}
        >
          {title}
        </Col>
        <Col
          span={7}
          className={css`
            display: flex;
            justify-content: right;
            padding-right: 4rem;
          `}
        >
          <div
            onClick={async () =>
              Modal.info({
                title: "",
                centered: true,
                mask: false,
                style: Style.modelWrapperStyle,
                width: "94rem",
                closable: false,
                okButtonProps: { style: { display: "none" } },
                icon: false,
                maskClosable: true,
                content: (
                  <ViewStep
                    active={active}
                    stepArr={[
                      { name: "帮助提示", detail: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" },
                      { name: "帮助提示", detail: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" },
                      { name: "帮助提示", detail: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" },
                    ]}
                  />
                ),
              })
            }
            className={css`
              cursor: pointer;
              font-size: 1.7rem;
              margin-right: 2rem;
            `}
          >
            <img
              src={Asset.components_header_Information}
              alt=""
              className={css`
                width: 3.1rem;
                height: 3.1rem;
              `}
            />
            知识库
          </div>
          <div
            className={css`
              cursor: pointer;
              font-size: 1.7rem;
              margin-right: 2rem;
            `}
            onClick={async () =>
              Modal.info({
                title: "",
                centered: true,
                width: "94rem",
                style: {
                  background: "radial-gradient(97.85% 318.81% at 99% 3.69%, #001E65 0%, #15002F 41.55%, #0D2654 100%)",
                  borderRadius: "1.14rem",
                },
                closable: false,
                okButtonProps: { style: { display: "none" } },
                icon: false,
                closeIcon: <img src={`deleteBtn.png`} alt="" width={40} height={40} />,
                maskClosable: true,
                content: <ProcessComp />,
              })
            }
          >
            <img
              src={Asset.components_header_process}
              alt=""
              className={css`
                width: 3.1rem;
                height: 3.1rem;
              `}
            />
            实验进度
          </div>
          <div
            className={css`
              cursor: pointer;
              font-size: 1.7rem;
            `}
            onClick={async () =>
              Modal.info({
                title: "",
                centered: true,
                width: "94rem",
                style: {
                  background: "radial-gradient(97.85% 318.81% at 99% 3.69%, #001E65 0%, #15002F 41.55%, #0D2654 100%)",
                  borderRadius: "1.14rem",
                },
                closable: false,
                okButtonProps: { style: { display: "none" } },
                icon: false,
                closeIcon: <img src={`deleteBtn.png`} alt="" width={40} height={40} />,
                maskClosable: true,
                content: <ProcessComp />,
              })
            }
          >
            <img
              src={Asset.components_header_text_snippet}
              alt=""
              className={css`
                width: 3.1rem;
                height: 3.1rem;
              `}
            />
            实验报告
          </div>
        </Col>
      </Row>
    </div>
  );
}
