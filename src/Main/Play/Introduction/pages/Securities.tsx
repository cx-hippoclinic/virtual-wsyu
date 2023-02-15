import { Common } from "./Common";

export function Securities({ nextPage }: { nextPage: () => void }) {
  return <Common nextPage={nextPage} />;
}
