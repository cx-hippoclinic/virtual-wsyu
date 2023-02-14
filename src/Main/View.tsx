import { IMainView, ISubView } from "@ancademy/vse-client";
import { Lobby } from "./Lobby";
import { Login } from "./Login";
import { Play } from "./Play";

export const mainView: IMainView = {
  Login,
  Lobby,
  Play,
};

export const subViewList: ISubView[] = [];
