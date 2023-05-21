// @ts-ignore
import { CheckCircleOutlined } from "@ant-design/icons";
import { Asset } from "@client";
import { css, injectGlobal } from "@emotion/css";
import { Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];
export interface processProp {
  process: number;
  subprocess: number;
}

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("知识学习", "sub1", null, [
    getItem(
      <div
        className={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <span style={{ fontSize: "1.2rem" }}>实验介绍</span>
        <CheckCircleOutlined style={{ fontSize: "1.8rem" }} />
      </div>,
      "1"
    ),
    getItem("信息融合", "2"),
    getItem("海明码", "3"),
    getItem("校验传输", "4"),
  ]),

  getItem("仿真虚拟实验", "sub2", null, [
    getItem("实验介绍", "5"),
    getItem("信息融合", "6"),
    getItem("海明码", "sub3", null),
  ]),

  getItem("实验总结", "sub3", null, [getItem("实验总结", "9")]),
];

function ProcessItem(): JSX.Element {
  const [current, setCurrent] = useState("1");
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };
  useEffect(() => {
    injectGlobal`
      .ant-menu-item.ant-menu-item-only-child{
        background: #1c2a84;
        margin: 0!important;
        padding-top: 0.3rem!important;
        padding-bottom: 0.3rem!important;
      }
    `;
  }, []);
  return (
    <Menu
      theme={"dark"}
      style={{ fontSize: "1.4rem", background: "transparent" }}
      onClick={onClick}
      selectedKeys={[current]}
      defaultOpenKeys={["sub1", "sub2", "sub3"]}
      mode="inline"
      items={items}
    />
  );
}

function ProcessComp(): JSX.Element {
  return (
    <div
      className={css`
        display: flex;
        width: 100%;
      `}
    >
      <div
        className={css`
          width: 31rem;
          height: 48rem;
          background: linear-gradient(107.56deg, #4553cf 0%, #001665 100%);
        `}
      >
        <ProcessItem />
      </div>
      <div
        className={css`
          flex-grow: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <img src={Asset.components_header_rightImg} alt="" />
      </div>
    </div>
  );
}

export default ProcessComp;
