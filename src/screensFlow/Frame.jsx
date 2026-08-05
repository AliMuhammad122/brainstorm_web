import React from "react";
import { useTheme } from "../../context/ThemeContext";

export default function ScreensFrame({ children }) {
  const { tokens, isDark } = useTheme();
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "0",
        background: tokens.bg,
        color: tokens.text,
        display: "flex",
        justifyContent: "center",
        ["--bg"]: tokens.bg,
        ["--surface"]: tokens.bgCard,
        ["--surface-alt"]: tokens.bgHeader,
        ["--text"]: tokens.text,
        ["--muted"]: tokens.textMuted,
        ["--subtle"]: tokens.textSubtle,
        ["--border"]: tokens.border,
        ["--primary"]: tokens.primary,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 385,
          minHeight: "100vh",
          background: tokens.bg,
          borderRadius: 0,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Montserrat',-apple-system,BlinkMacSystemFont,sans-serif",
          boxShadow: isDark ? "0 0 30px rgba(0,0,0,0.6)" : "0 0 30px rgba(0,0,0,0.12), 0 0 2px rgba(0,0,0,0.08)",
          position: "relative",
        }}
      >
        <style>{`
          *{box-sizing:border-box;}
          textarea{font-family:inherit;}
          ::-webkit-scrollbar{display:none;}
          @keyframes popIn{from{opacity:0;transform:scale(0.88)}to{opacity:1;transform:scale(1)}}
        `}</style>
        {children}
      </div>
    </div>
  );
}
