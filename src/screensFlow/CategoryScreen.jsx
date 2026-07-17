import React, { useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { CATEGORY_DATA } from "./data";
import { IcoBack } from "./icons";
import { Carousel } from "./ui";

export function CategoryScreen({ onBack, onSelectCat }) {
  const ref = useRef(null);
  const [sc, setSc] = useState(false);
  const { isDark } = useTheme();
  console.log("onSelectCat", onSelectCat);
  const onScroll = () => {
    if (ref.current) setSc(ref.current.scrollTop > 160);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: sc ? "var(--bg)" : "transparent",
          boxShadow: sc
            ? isDark
              ? "0 2px 16px rgba(0,0,0,0.45)"
              : "0 2px 16px rgba(0,0,0,0.08)"
            : "none",
          transition: "all 0.3s",
          padding: "15px 20px 10px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          pointerEvents: sc ? "auto" : "none",
          opacity: sc ? 1 : 0,
        }}
      >
        <button
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            background: "var(--surface-alt)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={onBack}
        >
          <IcoBack />
        </button>
        <span style={{ fontSize: 17, fontWeight: 800, color: "var(--text)" }}>
          All Categories
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 49,
          padding: "15px 20px 10px",
          display: "flex",
          alignItems: "center",
          opacity: sc ? 0 : 1,
          transition: "opacity 0.3s",
          pointerEvents: sc ? "none" : "auto",
        }}
      >
        <button
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            background: isDark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.85)",
            backdropFilter: "blur(8px)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={onBack}
        >
          <IcoBack />
        </button>
      </div>

      <div
        ref={ref}
        onScroll={onScroll}
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none",
        }}
      >
        <Carousel />
        <div style={{ padding: "20px 16px 0", background: "var(--bg)" }}>
          <p
            style={{
              fontSize: 19,
              fontWeight: 800,
              color: "var(--text)",
              margin: "0 0 16px",
            }}
          >
            All Categories
          </p>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
          >
            {CATEGORY_DATA.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCat(cat.name)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  background: "var(--surface)",
                  borderRadius: 20,
                  padding: "16px 12px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: 16,
                    overflow: "hidden",
                    background: cat.color + "22",
                  }}
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
                <p
                  style={{
                    fontSize: 13.5,
                    fontWeight: 700,
                    color: "var(--text)",
                    margin: 0,
                  }}
                >
                  {cat.name}
                </p>
              </button>
            ))}
          </div>
          <div style={{ height: 28 }} />
        </div>
      </div>
    </div>
  );
}
