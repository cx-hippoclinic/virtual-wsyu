import { css } from "@emotion/css";
import { useEffect } from "react";

export function Background({ src }: { src: string }) {
  useEffect(() => {
    const faviconurl = "https://cdn.chenxv.link/ico.png"; //这里可以是动态的获取的favicon的地址
    const link = document.querySelector("link[rel*='icon']") || document.createElement("link");
    // @ts-ignore
    link.href = faviconurl;
    document.getElementsByTagName("head")[0].appendChild(link);
  });
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
