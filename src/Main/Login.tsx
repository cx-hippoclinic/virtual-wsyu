import { AsExpertModal, LoginModal, RegisterModal } from "@ancademy/vse-client";
import { Asset, Style } from "@client";
import { css } from "@emotion/css";
import { Button, Space } from "antd";
import { StyleTest } from "./StyleTest";

export function Login() {
  return (
    <section
      className={css`
        background: url(${Asset.login_bg}) center no-repeat;
        height: 100vh;
        background-size: cover;
        position: relative;
      `}
    >
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
            <Button className={Style.Btn.light.sm}>学生注册</Button>
          </RegisterModal>
          <LoginModal>
            <Button className={Style.Btn.light.sm}>账号登录</Button>
          </LoginModal>
          <AsExpertModal>
            <Button className={Style.Btn.primary.sm}>专家评审</Button>
          </AsExpertModal>
        </Space>
      </div>
      <StyleTest />
    </section>
  );
}
