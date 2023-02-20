import { Asset } from "@client";
import { css, cx } from "@emotion/css";
import { ReactNode } from "react";

export function CardWrapper({
  children,
  className,
  wrapperClassName,
  title,
  bg = Asset.play_phase3_nav1_bg,
}: {
  children: ReactNode;
  title: string;
  wrapperClassName?: string;
  className?: string;
  bg?: string;
}) {
  return (
    <div
      className={cx(
        css`
          width: 96.78rem;
          height: 55.6rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background: url(${bg}) no-repeat;
          background-size: contain;
        `,
        wrapperClassName
      )}
    >
      <div
        className={cx(
          css`
            width: 60rem;
            height: 43.6rem;
            background: linear-gradient(180deg, #06132a 0%, #081837 100%);
            border: 5px solid #23549e;
            padding: 1.5rem 3rem;
            border-radius: 1rem;
            margin: 0 auto;
            position: relative;
          `,
          className
        )}
      >
        <div
          className={css`
            font-size: 1.7rem;
            color: #ffffff;
            text-align: center;
            margin-bottom: 1rem;
          `}
        >
          {title}
        </div>
        {children}
      </div>
    </div>
  );
}
