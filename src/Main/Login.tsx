import { AsExpertModal, LoginModal, RegisterModal } from "@ancademy/vse-client";
import { Asset, Background, Theme } from "@client";
import { css } from "@emotion/css";
import { Button, Space } from "antd";

export function Login() {
  return (
    <>
      <Background src={Asset.login_bg} />
      <div
        className={css`
          padding: 2rem;
          text-align: right;
        `}
      >
        <img alt="logo" src={Asset.login_logo} />
      </div>
      <div
        className={css`
          padding: 2rem;
          text-align: center;
        `}
      >
        <img alt="title" src={Asset.login_title} />
      </div>
      <div
        className={css`
          padding-top: 10rem;
          text-align: center;
        `}
      >
        <Space size="large">
          <RegisterModal>
            <Button className={Theme.Btn.light.md}>学生注册</Button>
          </RegisterModal>
          <LoginModal>
            <Button className={Theme.Btn.light.md}>账号登录</Button>
          </LoginModal>
          <AsExpertModal>
            <Button className={Theme.Btn.primary.md}>专家评审</Button>
          </AsExpertModal>
        </Space>
      </div>
    </>
  );
}
