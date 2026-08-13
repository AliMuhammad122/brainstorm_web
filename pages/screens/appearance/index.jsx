import React from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader } from "../../../src/screensFlow/ui";
import { useTheme } from "../../../context/ThemeContext";
import EmptyCircleIcon from "../../../public/assets/icons/emptymode.svg"
import FillCircleIcon from "../../../public/assets/icons/fillcircle.svg"

const ThemeCard = ({ label, active, preview, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      border: "none",
      background: "transparent",
      padding: 0,
      cursor: "pointer",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    }}
  >
    <div
      style={{
        width: "100%",
        aspectRatio: "1.6",
        borderRadius: 8,
        background: preview.split ? "#ffffff" : preview.background,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        padding: 12,
        // subtle border only when active OR if light/automatic needs definition
        border: "1px solid #E9EAEB" ,
        outline: !active && preview.needsOutline ? "1px solid var(--border-subtle)" : "none",
        borderOffset: -1.5,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {preview.split && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "52%",
            background: "#333333",
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          }}
        />
      )}
      <div style={{ zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {active ? <FillCircleIcon /> : <EmptyCircleIcon />}
      </div>
    </div>
    <div style={{ marginTop: 12, fontSize: 16, color: "#333333", fontWeight: 400 }}>{label}</div>
  </button>
);

export default function AppearancePage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <ScreensFrame>
      <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
        <PageHeader title="App Appearance" onBack={() => router.back()} />

        <div style={{ padding: "16px 20px" }}>
          <div className="grid gap-x-3 gap-y-4" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <ThemeCard
              label="Light"
              active={theme === "light"}
              onClick={() => setTheme("light")}
              preview={{
                background: "#ffffff",
                needsOutline: true,
              }}
            />
            <ThemeCard
              label="Dark"
              active={theme === "dark"}
              onClick={() => setTheme("dark")}
              preview={{
                background: "#333333", // Matched Figma dark square gray
              }}
            />
            <ThemeCard
              label="Automatic"
              active={theme === "system"}
              onClick={() => setTheme("system")}
              preview={{
                split: true,
              }}
            />
          </div>
        </div>
      </div>
    </ScreensFrame>
  );
}
