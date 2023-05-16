import { AsExpertModal, LoginModal, RegisterModal } from "@ancademy/vse-client";
import { Asset, Background, Theme } from "@client";
import { css, cx } from "@emotion/css";
import { Button, Space } from "antd";
import { useEffect } from "react";

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
          <AsExpertModal>
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
          </AsExpertModal>
        </Space>
      </div>
    </>
  );
}
