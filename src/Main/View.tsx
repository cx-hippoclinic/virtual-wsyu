import { IMainView, ISubView } from "@ancademy/vse-client";
import { injectGlobal } from "@emotion/css";
import { Phase1View } from "../Phase1";
import { Phase2View } from "../Phase2";
import { Lobby } from "./Lobby";
import { Login } from "./Login";
import { Play } from "./Play";
injectGlobal`
  *::-webkit-scrollbar {
    width: 0.5rem;
  }

  *::-webkit-scrollbar-track {
    background-color: #0C275A;
    border-radius: 0.4rem;
  }

  *::-webkit-scrollbar-thumb {
    background-color: rgba(217, 217, 217, 0.38);
    border-radius: 0.4rem;
  }`;

export const mainView: IMainView = {
  Login,
  Lobby,
  Play,
};

export const subViewList: ISubView[] = [Phase1View, Phase2View];
