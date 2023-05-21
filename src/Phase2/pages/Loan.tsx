import { Style } from "@client";
import { css } from "@emotion/css";
import { Table } from "antd";
import { useEffect } from "react";
import computer from "../../Phase3/animation/computer.json";
import tableHeaderClass = Style.tableHeaderClass;

const Column = Table.Column;
function Loan(props) {
  useEffect(() => {
    window.addEventListener("message", (event) => {
      console.log(event.data);
      if (event.data === "phase2") {
        history.back();
      }
    });
  }, []);
  return (
    <div
      className={css`
        width: 100rem;
        height: 55rem;
        border: 3px solid #0055a5;
        border-radius: 2.14rem;
        overflow: hidden;
      `}
    >
      <iframe src={"//localhost:8000/inner/stepTwo"} width="100%" height="100%" frameBorder={0} />
      <div
        className={css`
          position: absolute;
          left: 20rem;
          bottom: 0rem;
        `}
      >
        <Lottie options={{ animationData: computer }} width={400} height={400} />
      </div>
    </div>
  );
}

export default Loan;
