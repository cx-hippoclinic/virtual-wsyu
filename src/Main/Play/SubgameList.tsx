import { Env, useApiPlay } from "@ancademy/vse-client";
import { Asset, Background, Header, PageContent, Style, Theme } from "@client";
import { css, cx } from "@emotion/css";
import { Space } from "antd";
import { IPlayerState } from "../config";
import Btn = Theme.Btn;

const SubgameItme = ({ txt, img, link }: { txt: string; img: string; link: string }) => {
  return (
    <div
      className={css`
        width: 27rem;
        height: 38.8rem;
        background: linear-gradient(0deg, #553c8f, #1b3c8f);
        border: 3px solid #0055a5;
        border-radius: 2.14rem;
        text-align: center;
        position: relative;
        &:hover {
          background: linear-gradient(192.12deg, #30619b 9.57%, #084571 52.59%, #221576 92.17%);
          border: 4px solid #1ef1ff;
          box-shadow: inset 0px 0px 34px #4891ff;
        }
      `}
    >
      <img
        src={txt}
        alt=""
        className={css`
          margin: 3.92rem auto 0;
        `}
      />
      <img
        src={img}
        alt=""
        className={css`
          width: 23.7rem;
          height: 26.1rem;
        `}
      />
      <button
        className={cx(
          Btn.primary.sm,
          css`
            position: absolute;
            bottom: 2.14rem;
            left: calc(50% - 6rem);
            border: 3px solid #0066ff;
            box-shadow: inset 0px 0px 14px #b5dcff;
            border-radius: 10px;
          `
        )}
        onClick={() => {
          location.href = link;
        }}
      >
        进入角色
      </button>
    </div>
  );
};
export function SubgameList({ nextPage }: { nextPage: () => void }) {
  const { apiState } = useApiPlay<IPlayerState>();
  console.log(apiState);
  const { subGameList } = apiState;
  console.log(subGameList, 2223);
  return (
    <div
      className={css`
        height: 100vh;
        overflow: hidden;
      `}
    >
      <Background src={Asset.play_subgameList_bg} />
      <Header title="虚拟仿真实验" />
      <PageContent>
        <Space direction="vertical" size={90}>
          <Space size={92}>
            <SubgameItme
              txt={Asset.play_subgameList_phase1Txt}
              img={Asset.play_subgameList_phase1Img}
              link={`${Env.basePath}/${subGameList[0].namespace}/${subGameList[0].id}`}
            />
            <SubgameItme
              txt={Asset.play_subgameList_phase2Txt}
              img={Asset.play_subgameList_phase2Img}
              link={`${Env.basePath}/${subGameList[1].namespace}/${subGameList[1].id}`}
            />
            <SubgameItme
              txt={Asset.play_subgameList_phase3Txt}
              img={Asset.play_subgameList_phase3Img}
              link={`${Env.basePath}/${subGameList[2].namespace}/${subGameList[2].id}`}
            />
          </Space>
          <div className={Style.btnGroup}>
            <button className={Btn.disabled.sm} onClick={nextPage}>
              完成
            </button>
          </div>
        </Space>
      </PageContent>
    </div>
  );
}
