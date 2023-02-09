import { api, Core, Env, Match, TMatchContentProps } from "@ancademy/vse-client";
import { ErrorMsg, MS, Role } from "@ancademy/vse-share";
import { Asset, Background, Color, ColorDerived, Theme } from "@client";
import { css, cx } from "@emotion/css";
import { Divider, message, Space } from "antd";
import moment from "moment";
import { rgba } from "polished";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const titleStyle = css`
  color: ${Color.primary};
  width: 100%;
  text-align: center;
  font-size: 2rem;
  padding-bottom: 1.6rem;
  margin-bottom: 1.6rem;
`;

const lobbyContext = createContext<Core.ILobbyProps>(null);

function MatchContent({ status, matchTimer, mainGameId, fnMatch, fnRematch }: TMatchContentProps) {
  switch (status) {
    case MS.PlayerStatus.init:
      return (
        <button className={Theme.Btn.primary.sm} onClick={fnMatch}>
          新的实验
        </button>
      );
    case MS.PlayerStatus.matching:
      return <p>匹配中，预计{matchTimer}秒...</p>;
    case MS.PlayerStatus.matched:
      return (
        <Space>
          <button className={Theme.Btn.primary.sm} onClick={fnRematch}>
            重新开始
          </button>
          <button
            className={Theme.Btn.primary.sm}
            onClick={() => (location.href = `${Env.basePath}/play/${mainGameId}`)}
          >
            进入实验
          </button>
        </Space>
      );
  }
}

function HistoryList() {
  const navigate = useNavigate();
  const { historyMainGameList, user } = useContext(lobbyContext);
  return (
    <div
      className={css`
        display: flex;
        flex-flow: column;
        min-width: 48rem;
        align-items: center;
        overflow: auto;
        margin-top: 4rem;
        margin-bottom: 2.8rem;
        position: relative;
        max-height: 40rem;

        &::-webkit-scrollbar {
          width: 0.8rem;
        }

        &::-webkit-scrollbar-track {
          background-color: ${ColorDerived.light.d1};
          border-radius: 0.4rem;
        }

        &::-webkit-scrollbar-thumb {
          background-color: ${Color.primary};
          border-radius: 0.4rem;
        }
      `}
    >
      <h1
        className={cx(
          titleStyle,
          css`
            background-color: ${Color.light};
            position: sticky;
            top: 0;
          `
        )}
      >
        最近实验
      </h1>
      <ul
        className={css`
          padding: 0 2rem;
        `}
      >
        {historyMainGameList.map(({ id, title, createdAt }, i) => (
          <li>
            {i > 0 && (
              <Divider
                className={css`
                  margin: 1rem 0 !important;
                  color: #e9e9e9;
                `}
              />
            )}
            <Space size={40} align={"center"}>
              <div
                className={css`
                  width: 24rem;
                  color: ${ColorDerived.primary.d1};
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  font-size: 1.5rem;
                `}
              >
                {title}
              </div>
              <a className={Theme.Link.primary.sm} onClick={() => navigate(`/play/${id}`)}>
                进入实验
              </a>
            </Space>
            <div
              className={css`
                text-align: right;
                color: rgba(91, 91, 91, 0.4);
                font-size: 1.5rem;
                line-height: 2.8rem;
                margin-top: 0.5rem;
              `}
            >
              {moment(createdAt).format(moment.HTML5_FMT.DATETIME_LOCAL)}
            </div>
          </li>
        ))}
      </ul>
      <div
        className={css`
          position: sticky;
          bottom: 0;
          background: ${Color.light};
          text-align: center;
          width: 100%;
          padding: 1rem;
        `}
      >
        {user.role === Role.student ? null : <Match>{MatchContent}</Match>}
      </div>
    </div>
  );
}

function JoinKeyboard() {
  const inputItem = css`
    color: ${Color.primary};
    height: 4rem;
    font-size: 2rem;
    line-height: 4.8rem;
    padding-bottom: 1rem;
    width: 3rem;
    position: relative;
    text-align: center;

    &::after {
      content: " ";
      width: 3rem;
      height: 0.4rem;
      border-radius: 0.3rem;
      background-color: ${ColorDerived.light.d1};
      position: absolute;
      bottom: 0;
      left: 0;
    }
  `;
  const keyBordData = [1, 2, 3, 4, 5, 6, 7, 8, 9, "重置", 0, "删除"];
  const navigate = useNavigate();
  const [password, setPassword] = useState(new Array(6).fill(undefined));

  return (
    <Space
      direction="vertical"
      size={0}
      className={css`
        align-items: center;
        display: flex;
        width: 36rem;
        margin: 3.6rem auto;
      `}
    >
      <h2 className={titleStyle}>
        输入邀请码
        <span
          className={css`
            padding-left: 1rem;
            font-size: 1.5rem;
          `}
        >
          (加入指定场次)
        </span>
      </h2>
      <Space size={24}>
        {password.map((it, index) => (
          <div className={inputItem} key={index}>
            {it}
          </div>
        ))}
      </Space>
      <div
        className={css`
          margin-top: 4rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        `}
      >
        {keyBordData.map((it) => (
          <div
            className={css`
              width: 10rem;
              flex-grow: 0;
              height: 6rem;
              margin-right: 0.4rem;
              margin-bottom: 0.4rem;
              display: flex;
              border-radius: 0.4rem;
              justify-content: center;
              cursor: pointer;
              align-items: center;
              user-select: none;
              transition: all 0.2s linear;

              &:hover {
                background-color: ${rgba(Color.primary, 0.2)};
                transform: scale(1.1);
              }
            `}
            onClick={async () => {
              const newArr = new Array(6).fill(undefined);
              if (typeof it === "number") {
                for (let i = 0; i < password.length; i++) {
                  if (password[i] === undefined) {
                    newArr[i] = it;
                    break;
                  } else {
                    newArr[i] = password[i];
                  }
                }
              } else if (it === "delete") {
                for (let i = 0; i < password.length; i++) {
                  if (password[i + 1] === undefined) {
                    newArr[i] = undefined;
                    break;
                  } else {
                    newArr[i] = password[i];
                  }
                }
              }
              setPassword(newArr);
              if (newArr.some((d) => d === undefined)) {
                return;
              }
              try {
                const mainGame = await api.getMainGameByPassword(newArr.join(""));
                navigate(`/play/${mainGame.id}`);
              } catch (err) {
                switch (err) {
                  case ErrorMsg.MAIN_GAME_NOT_FOUND:
                    message.warning("邀请码不存在，请检查输入！");
                    break;
                }
              }
            }}
          >
            <div
              className={css`
                color: ${Color.primary};
                line-height: 4rem;
                font-size: 2rem;
              `}
            >
              {it}
            </div>
          </div>
        ))}
      </div>
      `
    </Space>
  );
}

export function Lobby(props: Core.ILobbyProps) {
  return (
    <lobbyContext.Provider value={props}>
      <section
        className={css`
          height: 100vh;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <Background src={Asset.lobby_bg} />
        <button
          className={cx(
            Theme.Btn.light.xs,
            css`
              position: fixed;
              top: 1rem;
              left: 1rem;
            `
          )}
          onClick={async () => {
            await api.logout();
            location.href = Env.basePath;
          }}
        >
          退出
        </button>
        <div
          className={cx(
            Theme.Shadow.md,
            css`
              background: ${Color.light};
              display: flex;
              border-radius: 1.6rem;
            `
          )}
        >
          <HistoryList />
          <JoinKeyboard />
        </div>
      </section>
    </lobbyContext.Provider>
  );
}
