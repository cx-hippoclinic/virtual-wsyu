import { css } from "@emotion/css";
import { ReportContent } from "../../../Main/Play/Report";

export interface processProp {
  process: number;
  subprocess: number;
}

function ProcessComp(): JSX.Element {
  return (
    <div
      className={css`
        display: flex;
        flex-flow: column;
        align-items: center;
        color: #ffffff;
      `}
    >
      <ReportContent />
    </div>
  );
}

export default ProcessComp;
