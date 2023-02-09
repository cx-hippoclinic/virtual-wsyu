import { Env } from "@ancademy/vse-client";
import { Style } from "@client";
import { css } from "@emotion/css";
import { Button, Divider, Input, Modal, Radio, Space } from "antd";
import { useState } from "react";

export function StyleTest() {
  const [visible, setVisible] = useState(true),
    hideModal = () => setVisible(false);
  if (Env.isProd) {
    return null;
  }
  return (
    <section
      className={css`
        position: fixed;
        bottom: 1rem;
        right: 1rem;
      `}
    >
      <Button onClick={() => setVisible(!visible)}>组件样式测试</Button>
      <Modal visible={visible} centered closable width="80vw" closeIcon={<></>} onCancel={hideModal} onOk={hideModal}>
        <>
          <Divider>Button</Divider>
          <Space direction={"vertical"}>
            {Object.entries(Style.Btn).map(([color, BtnSize]) => (
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
            {Object.entries(Style.Link).map(([color, BtnSize]) => (
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
            {Object.entries(Style.Input).map(([size, cls]) => (
              <Input key={size} className={cls} placeholder={size} />
            ))}
          </Space>
        </>
        <>
          <Divider>Radio</Divider>
          <Space>
            {Object.entries(Style.Radio).map(([size, cls]) => (
              <>
                <Radio key={size} className={cls} />
                {size}
              </>
            ))}
          </Space>
        </>
      </Modal>
    </section>
  );
}
