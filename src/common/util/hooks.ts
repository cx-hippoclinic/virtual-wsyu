import { useApiPlay } from "@ancademy/vse-client";
import { getSubGameViewConfig, IPlayerState } from "../../Main/config";

export function useViewConfig() {
  const { apiState } = useApiPlay<IPlayerState>();
  return getSubGameViewConfig(apiState.introPhases.phases);
}
