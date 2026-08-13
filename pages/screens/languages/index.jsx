import React, { useState } from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader, RadioDot } from "../../../src/screensFlow/ui";
import EmptyCircleIcon from "../../../public/assets/icons/emptycircle.svg"
import FilledCircleIcon from "../../../public/assets/icons/fillcircle.svg"

const suggested = ["Greek (GK)", "English (UK)"];
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
        padding: "8px 0",
        cursor: "pointer",
        color: muted ? "#A4A4A4" : "#A4A4A4",
        fontSize: 14,
        fontWeight: 400,
      }}
    >
      <span>{label}</span>
      {selected === label ? <FilledCircleIcon /> : <EmptyCircleIcon />}
    </button>
  );

  return (
    <ScreensFrame>
      <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
        <PageHeader title="Languages" onBack={() => router.back()} />

        <div style={{ padding: "14px 20px" }}>
          <div style={{ fontSize: 16, color: "var(--text)", marginBottom: 8 }}>
            Suggested
          </div>
          {suggested.map((lang) => (
            <Row key={lang} label={lang} />
          ))}
          <div style={{ height: 1, borderBottom: "1px solid #E9EAEB", margin: "12px 0px 24px 0px" }} />
          <div style={{ fontSize: 16, color: "var(--text)", margin: "6px 0" }}>
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
