import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const BRAND_RED = "var(--primary)";

const STATUS_LABELS = [
  "Your Order is Confirmed",
  "Your Order is Processed",
  "Your Order is Shipped",
  "Your Order is Delivered",
];

/**
 * Minimized bottom bar - rendered via Portal so it's always visible on all devices.
 * Dark bar per design, safe-area aware, large tap target for Pixel/Android.
 */
export default function OrderStatusBar({ activeStep = 0, onTap }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bar = (
    <div
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.preventDefault();
        onTap?.();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onTap?.();
      }}
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 430,
        zIndex: 9999,
        background: "var(--status-bar-bg)",
        borderTop: "1px solid var(--status-bar-border)",
        display: "flex",
        alignItems: "center",
        padding: "20px 24px",
        paddingBottom: "calc(20px + env(safe-area-inset-bottom, 0px))",
        minHeight: 64,
        cursor: "pointer",
        fontFamily: "inherit",
        gap: 12,
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
      }}
    >
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: BRAND_RED,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "var(--status-bar-text)",
          flex: 1,
          textAlign: "left",
        }}
      >
        {STATUS_LABELS[activeStep] || STATUS_LABELS[0]}
      </span>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "var(--status-bar-chip)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: "var(--status-bar-text)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 14 8" fill="none">
          <path
            d="M1 7l6-6 6 6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );

  if (typeof document !== "undefined" && mounted) {
    return createPortal(bar, document.body);
  }
  return bar;
}
