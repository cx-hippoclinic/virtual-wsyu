import { Core } from "@ancademy/vse-client";
import { IMoveParams, IPushParams, MoveType, PushType } from "../Main/config";
import { ICreateParams, IGameState, IPlayerState } from "./config";

type TPlayProps = Core.IPlayProps<
  ICreateParams,
  IGameState,
  IPlayerState,
  MoveType,
  PushType,
  IMoveParams,
  IPushParams
>;

export type TPlayPageProps = TPlayProps;
