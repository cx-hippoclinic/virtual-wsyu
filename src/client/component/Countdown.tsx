import { useTimer } from "@ancademy/vse-client";
import { useEffect } from "react";

export function Countdown({ todo, initCount, update }: { todo: () => void; initCount: number; update: boolean }) {
  const t = useTimer(initCount);
  useEffect(() => {
    if (t <= 0) {
      todo();
    }
  }, [t]);
  return t && <span>&nbsp;({t}s)</span>;
}
