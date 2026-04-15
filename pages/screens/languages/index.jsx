import React, { useState } from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader, RadioDot } from "../../../src/screensFlow/ui";

const suggested = ["English (US)", "English (UK)"];
const others = [
  "Mandarin",
  "Hindi",
  "Spanish",
  "French",
  "Arabic",
  "Russian",
  "Indonesia",
  "Vietnamese",
];

export default function LanguagesPage() {
  const router = useRouter();
  const [selected, setSelected] = useState("English (UK)");

  const Row = ({ label, muted }) => (
    <button
      type="button"
      onClick={() => setSelected(label)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        border: "none",
        background: "transparent",
        padding: "12px 0",
        cursor: "pointer",
        color: muted ? "#B0B0B0" : "#777",
        fontSize: 13,
      }}
    >
      <span>{label}</span>
      <RadioDot active={selected === label} activeColor="#D9142C" />
    </button>
  );

  return (
    <ScreensFrame>
      <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
        <PageHeader title="Languages" onBack={() => router.back()} />

        <div style={{ padding: "14px 20px" }}>
          <div style={{ fontSize: 13, color: "var(--text)", marginBottom: 6 }}>
            Suggested
          </div>
          {suggested.map((lang) => (
            <Row key={lang} label={lang} />
          ))}
          <div style={{ height: 1, background: "var(--border)", margin: "8px 0" }} />
          <div style={{ fontSize: 13, color: "var(--text)", margin: "6px 0" }}>
            Others
          </div>
          {others.map((lang) => (
            <Row key={lang} label={lang} muted />
          ))}
        </div>
      </div>
    </ScreensFrame>
  );
}
