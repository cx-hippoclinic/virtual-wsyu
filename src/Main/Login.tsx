import { api, LoginModal, RegisterModal } from "@ancademy/vse-client";
import style from "@ancademy/vse-client/src/view/style.scss";
import { Asset, Background, Theme } from "@client";
import { css, cx } from "@emotion/css";
import { Button, message, Modal, Space } from "antd";
import React, { useEffect, useState } from "react";
function AsExpertModales({
  onSuccess = () => {
    message.success("以评审专家身份访问！");
    location.reload();
  },
  children = <button className={`${style.btnLogin} ${style.expert}`}>专家评审</button>,
}: {
  onSuccess?: () => void;
  children?: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div onClick={() => setVisible(true)}>{children}</div>
      <Modal
        title="以评审专家身份访问"
        centered
        okText="确定"
        cancelText="取消"
        width="36rem"
        closeIcon={<></>}
        visible={visible}
        onOk={async () => {
          await api.asExpert();
          onSuccess();
        }}
        onCancel={() => setVisible(false)}
      >
        以评审专家身份访问本系统，本次实验数据将会被记录在后台
      </Modal>
    </>
  );
}
export function Login() {
  useEffect(() => {
    const faviconurl = "https://cdn.chenxv.link/ico.png"; //这里可以是动态的获取的favicon的地址
    const link = document.querySelector("link[rel*='icon']") || document.createElement("link");
    // @ts-ignore
    link.href = faviconurl;
    document.getElementsByTagName("head")[0].appendChild(link);
  });
  return (
    <>
      <Background src={Asset.login_bg} />
      <div
        className={css`
          padding: 2rem 0 0 9rem;
          text-align: left;
        `}
      >
        <img alt="logo" src={Asset.login_logo} />
      </div>
      <div
        className={css`
          padding: 3.5rem 0 0 9rem;
        `}
      >
        <img alt="title" src={Asset.login_title} />
      </div>
      <div
        className={css`
          padding-top: 20rem;
          text-align: center;
        `}
      >
        <Space size={60}>
          <RegisterModal>
            <Button className={Theme.Btn.light.md}>学生注册</Button>
          </RegisterModal>
          <LoginModal>
            <Button className={Theme.Btn.light.md}>账号登录</Button>
          </LoginModal>
          <AsExpertModales>
            <Button
              className={cx(
                Theme.Btn.primary.md,
                css`
                  background: linear-gradient(95.36deg, #7d82ff 0.5%, #2f82ff 104.46%) !important;
                `
              )}
            >
              专家评审
            </Button>
          </AsExpertModales>
        </Space>
      </div>
    </>
  );
}
