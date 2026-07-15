import React from "react";

export default function Skeleton({
  width,
  height,
  circle = false,
  borderRadius,
  className = "",
  style = {},
  ...props
}) {
  const customStyle = {
    width: width !== undefined ? width : "100%",
    height: height !== undefined ? height : "16px",
    borderRadius: circle ? "50%" : (borderRadius !== undefined ? borderRadius : "8px"),
    background: "var(--surface-alt)",
    ...style,
  };

  return (
    <div
      className={`animate-pulse ${className}`}
      style={customStyle}
      {...props}
    />
  );
}
