import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function Skeleton({
  width,
  height,
  circle = false,
  borderRadius,
  className = "",
  style = {},
  ...props
}) {
  const { isDark } = useTheme();

  const customStyle = {
    width: width !== undefined ? width : "100%",
    height: height !== undefined ? height : "16px",
    borderRadius: circle ? "50%" : (borderRadius !== undefined ? borderRadius : "8px"),
    background: isDark ? "#2A2A40" : "#E8E8E8",
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
