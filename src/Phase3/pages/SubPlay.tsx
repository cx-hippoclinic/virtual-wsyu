import { useApiPlay } from "@ancademy/vse-client";
import { IPlayerState, SubPages } from "../config";
import { Bank, Info, Inventory, Material, Navigate, Production, Strategic } from "./";

export function SubPlay(props) {
  const { apiState, setApiState } = useApiPlay<IPlayerState>();
  const backNav = () => {
    setApiState((s) => (s.subPage = SubPages.nav));
  };
  switch (apiState.subPage) {
    case SubPages.nav:
      return <Navigate setApiState={setApiState} />;
    case SubPages.info:
      return <Info backNav={backNav} />;
    case SubPages.strategic:
      return <Strategic backNav={backNav} />;
    case SubPages.material:
      return <Material backNav={backNav} />;
    case SubPages.Bank:
      return <Bank backNav={backNav} />;
    case SubPages.Inventory:
      return <Inventory backNav={backNav} />;
    case SubPages.Production:
      return <Production backNav={backNav} />;
  }
}
