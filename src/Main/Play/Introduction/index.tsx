import { useApiPlay } from "@ancademy/vse-client";
import { introPhases, introSubPhases, IPlayerState } from "../../config";
import { Currency } from "./pages/Currency";
import { Risk } from "./pages/Risk";
import { Securities } from "./pages/Securities";

export function Introduction({ nextPage }: { nextPage: () => void }): JSX.Element {
  const { apiState, setApiState } = useApiPlay<IPlayerState>();
  const getNextPage = (page: introPhases) => {
    return () => {
      setApiState((s) => {
        s.introPhases.phases = page;
        s.introPhases.subPhases = introSubPhases.intro;
      });
    };
  };
  switch (apiState.introPhases.phases) {
    case introPhases.currency:
      return <Currency nextPage={getNextPage(introPhases.risk)} />;
    case introPhases.risk:
      return <Risk nextPage={getNextPage(introPhases.securities)} />;
    case introPhases.securities:
      return <Securities nextPage={nextPage} />;
  }
}
