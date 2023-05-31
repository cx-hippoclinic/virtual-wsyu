import { Env, useApiPlay } from "@ancademy/vse-client";
import { ColorDerived, Theme } from "@client";
import { css, injectGlobal } from "@emotion/css";
import { Button, Divider, Input, Modal, Radio, Space } from "antd";
import { getLuminance } from "polished";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import { IPlayerState } from "../Phase1/config";

export function ThemeTest() {
  useEffect(() => {
    injectGlobal`
      .footer_2VwE{
        display: none;
      }
      .logo_mMQ-{
        opacity: 0;
      }
    `;
  }, []);
  const [visible, setVisible] = useState(false),
    hideModal = () => setVisible(false);
  if (Env.isProd) {
    return null;
  }
  const { apiState: apiPlayState } = useApiPlay<IPlayerState>();
  console.log(apiPlayState, 233);
  return (
    <section
      className={css`
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        z-index: 1000;
        color: white;
      `}
    >
      {/*<Button id={"233"} className={Theme.Btn.light.xs} onClick={() => setVisible(!visible)}>*/}
      {/*  主题测试*/}
      {/*</Button>*/}
      <Modal
        visible={visible}
        centered
        closable
        width="80vw"
        closeIcon={<></>}
        onCancel={hideModal}
        onOk={hideModal}
        className={Theme.Modal}
        okButtonProps={{ className: Theme.Btn.primary.sm }}
        cancelButtonProps={{ className: Theme.Btn.light.sm }}
      >
        <>
          <Divider>DeriveColor</Divider>
          <Space direction={"vertical"}>
            {Object.entries(ColorDerived).map(([source, deriveList]) => (
              <Space key={source}>
                <div
                  className={css`
                    width: 6rem;
                  `}
                >
                  {source}
                </div>
                {Object.entries(deriveList).map(([derive, color]) => (
                  <div
                    key={derive}
                    className={css`
                      width: 3rem;
                      height: 3rem;
                      border-radius: 50%;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      background: ${color};
                      color: ${getLuminance(color) > 0.5 ? "black" : "white"};
                    `}
                  >
                    {derive.toUpperCase()}
                  </div>
                ))}
              </Space>
            ))}
          </Space>
        </>
        <>
          <Divider>Button</Divider>
          <Space direction={"vertical"}>
            {Object.entries(Theme.Btn).map(([color, BtnSize]) => (
              <Space key={color}>
                {Object.entries(BtnSize).map(([size, cls]) => (
                  <Button className={cls} key={size}>
                    Btn-{color}-{size}
                  </Button>
                ))}
              </Space>
            ))}
          </Space>
        </>
        <>
          <Divider>Link</Divider>
          <Space direction={"vertical"}>
            {Object.entries(Theme.Link).map(([color, BtnSize]) => (
              <Space key={color}>
                {Object.entries(BtnSize).map(([size, cls]) => (
                  <Button className={cls} key={size}>
                    Link-{color}-{size}
                  </Button>
                ))}
              </Space>
            ))}
          </Space>
        </>
        <>
          <Divider>Input</Divider>
          <Space>
            {Object.entries(Theme.Input).map(([size, cls]) => (
              <Input key={size} className={cls} placeholder={`Input-${size}`} />
            ))}
          </Space>
        </>
        <>
          <Divider>Radio</Divider>
          <Space>
            <Radio.Group>
              {Object.entries(Theme.Radio).map(([size, cls]) => (
                <Radio key={size} className={cls} value={size}>
                  Radio-{size}
                </Radio>
              ))}
            </Radio.Group>
          </Space>
        </>
      </Modal>
    </section>
  );
}

export function testTheme() {
  const themeTestContainer = document.body.appendChild(document.createElement("div"));
  render(<ThemeTest />, themeTestContainer);
}
