import React from "react";

export const PageContent: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) => {
  return (
    <div
      className={className}
      style={{
        height: `calc(100% -  6.43rem)`,
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};
