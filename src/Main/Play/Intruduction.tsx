import { useApiPlay } from "@ancademy/vse-client";
import { css } from "@emotion/css";
import { introPhases, IPlayerState } from "../config";
import { Currency } from "./pages/Currency";
import { Risk } from "./pages/Risk";
import { Securities } from "./pages/Securities";

const titleStyle = css`
  height: 4rem;
  font-size: 2.2rem;
  color: #ffffff;
  margin-bottom: 2.8rem;
  font-weight: 500;
`;
const contextStyle = css`
  font-weight: 400;
  color: #ffffff;
  font-size: 1.7rem;
  line-height: 3.4rem;
`;

export function Introduction({ nextPage }: { nextPage: () => void }): JSX.Element {
  const { apiState } = useApiPlay<IPlayerState>();
  switch (apiState.introPhases.phases) {
    case introPhases.currency:
      return <Currency />;
    case introPhases.risk:
      return <Risk />;
    case introPhases.securities:
      return <Securities />;
  }
}
