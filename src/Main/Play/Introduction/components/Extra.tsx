import { css } from "@emotion/css";

function Extra() {
  return (
    <>
      <div
        className={css`
          width: 100%;
          height: 40rem;
          border: 3px solid #0055a5;
          border-radius: 2.14rem;
          overflow: hidden;
        `}
      >
        <iframe src={`http://wsyu.xkxy.xyz:8083/`} width="100%" height="100%" frameBorder={0} />
      </div>
    </>
  );
}

export default Extra;
