import { useApiPlay } from "@ancademy/vse-client";
import { IPlayerState, ProductionStep } from "../../config";
import { Construction } from "./Construction";
import { Materials } from "./Materials";

export function Production(props) {
  const {
    apiState: { productionData },
    setApiState,
  } = useApiPlay<IPlayerState>();
  const getNextPage = (page) => {
    return () => {
      setApiState((s) => {
        s.productionData.step = page;
      });
    };
  };
  switch (productionData.step) {
    case ProductionStep.construction:
      return <Construction nextPage={getNextPage(ProductionStep.materials)} />;
    case ProductionStep.materials:
      return <Materials nextPage={getNextPage(ProductionStep.materials)} />;
  }
}
