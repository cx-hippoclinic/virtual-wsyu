import { css } from "@emotion/css";

export function Background({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt="bg"
      className={css`
        position: fixed;
        z-index: -10;
        width: 100vw;
        height: 100vh;
        object-fit: cover;
      `}
    />
  );
}
