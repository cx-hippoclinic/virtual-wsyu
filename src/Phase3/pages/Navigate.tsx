import { Asset, Style, Theme } from "@client";
import { css } from "@emotion/css";
import { Space } from "antd";
import { SubPages } from "../config";

function NavigateItem({ name, english, src, link }: { name: string; english: string; src: string; link: () => void }) {
  return (
    <div
      onClick={link}
      className={css`
        background: linear-gradient(270deg, #01083a -14.84%, #011167 83.23%);
        opacity: 0.9;
        border: 1.5px solid #3454a7;
        width: 19.7rem;
        height: 10.85rem;
        cursor: pointer;
        padding-left: 2rem;
        padding-top: 1rem;
        display: flex;
        flex-flow: column;
        border-radius: 25px;
        &:hover {
          box-shadow: inset 0 0 17px #005fee, 0 0 17px 5px #005fee;
          border: 1.5px solid #2f69ff;
        }
      `}
    >
      <img
        src={src}
        alt=""
        className={css`
          width: 2.9rem;
          height: 2.9rem;
        `}
      />
      <span
        className={css`
          font-size: 1.43rem;
          color: #666c82;
          line-height: 2.8rem;
        `}
      >
        {english}
      </span>
      <span
        className={css`
          font-size: 2.28rem;
          color: #ffffff;
        `}
      >
        {name}
      </span>
    </div>
  );
}
export function Navigate({ setApiState }) {
  return (
    <div
      className={css`
        width: 96.78rem;
        height: 59.6rem;
        padding: 5.7rem 0;
        background: url(${Asset.play_phase3_nav_bg});
      `}
    >
      <div
        className={css`
          display: flex;
          justify-content: center;
        `}
      >
        <Space direction="vertical" size={79}>
          {[
            { name: "企业信息", english: "Enterprise information", src: Asset.play_phase3_nav1, link: SubPages.info },
            { name: "物料采购", english: "Material procurement", src: Asset.play_phase3_nav3, link: SubPages.material },
            {
              name: "库存信息",
              english: "Inventory information",
              src: Asset.play_phase3_nav5,
              link: SubPages.Inventory,
            },
          ].map((it) => {
            return (
              <NavigateItem
                name={it.name}
                english={it.english}
                src={it.src}
                link={() => setApiState((s) => (s.subPage = it.link))}
              />
            );
          })}
        </Space>
        <Space
          direction="vertical"
          size={79}
          className={css`
            margin-left: 25rem;
          `}
        >
          {[
            {
              name: "战略定制",
              english: "Strategic customization",
              src: Asset.play_phase3_nav2,
              link: SubPages.strategic,
            },
            { name: "银行贷款", english: "Bank loans", src: Asset.play_phase3_nav4, link: SubPages.Bank },
            { name: "生产经营", english: "Production", src: Asset.play_phase3_nav6, link: SubPages.Production },
          ].map((it) => {
            return (
              <NavigateItem
                name={it.name}
                english={it.english}
                src={it.src}
                link={() => setApiState((s) => (s.subPage = it.link))}
              />
            );
          })}
        </Space>
      </div>
      <div className={Style.btnGroup}>
        <button
          className={Theme.Btn.primary.sm}
          onClick={() => {
            history.back();
          }}
        >
          切换角色
        </button>
      </div>
    </div>
  );
}
