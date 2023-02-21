import { useApiPlay } from "@ancademy/vse-client";
import { IPlayerState, ProductionStep } from "../../config";
import { Construction } from "./Construction";
import { Delivery } from "./Delivery";
import { Materials } from "./Materials";
import { NextPay, Pay } from "./Pay";

export function Production({ backNav }: { backNav: () => void }) {
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
      return <Materials nextPage={getNextPage(ProductionStep.delivery)} />;
    case ProductionStep.delivery:
      return <Delivery nextPage={getNextPage(ProductionStep.pay)} />;
    case ProductionStep.pay:
      return <Pay nextPage={getNextPage(ProductionStep.nextPay)} />;
    case ProductionStep.nextPay:
      return <NextPay nextPage={backNav} />;
  }
}
