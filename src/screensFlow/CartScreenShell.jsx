import React from "react";

export function CartScreenShell({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "var(--bg)",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}
