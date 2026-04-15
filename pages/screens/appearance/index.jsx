import React from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader } from "../../../src/screensFlow/ui";
import { useTheme } from "../../../context/ThemeContext";

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
        background: preview.background,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        padding: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        // subtle border only when active OR if light/automatic needs definition
        border: active ? "1.5px solid var(--primary)" : "1.5px solid transparent",
        outline: !active && preview.needsOutline ? "1px solid var(--border-subtle)" : "none",
        borderOffset: -1.5,
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          border: `2px solid ${active ? "var(--primary)" : "var(--border)"}`,
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {active && (
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "var(--primary)",
            }}
          />
        )}
      </div>
    </div>
    <div style={{ marginTop: 12, fontSize: 13, color: "var(--text)", fontWeight: 400 }}>{label}</div>
  </button>
);

export default function AppearancePage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <ScreensFrame>
      <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
        <PageHeader title="App Appearance" onBack={() => router.back()} />

        <div style={{ padding: "24px 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
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
                // Left half dark, Right half light matching Figma
                background: "linear-gradient(to right, #333333 50%, #ffffff 50%)",
                needsOutline: true,
              }}
            />
          </div>
        </div>
      </div>
    </ScreensFrame>
  );
}
