import { useEffect, useState } from "react";
export function useTimer(seconds: number) {
  if (!seconds) {
    return null;
  }
  const [t, setT] = useState(seconds);
  useEffect(() => {
    const interval = window.setInterval(() => {
      setT((t) => {
        if (t <= 0) {
          return seconds;
        }
        return t - 1;
      });
    }, 1e3);
    return () => window.clearInterval(interval);
  }, []);
  return t;
}
export function Countdown({ todo, initCount }: { todo: () => void; initCount: number }) {
  const t = useTimer(initCount);
  useEffect(() => {
    if (t <= 0) {
      todo();
    }
  }, [t]);
  return t && <span>&nbsp;({t}s)</span>;
}
