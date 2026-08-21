import React from "react";
import { useTheme } from "../../context/ThemeContext";

/**
 * Floating bottom CTA for checkout.
 * Style, design, and alignment match the 'Continue to Checkout' button.
 */
export default function ProceedPaymentButton({
  totalItems,
  total,
  disabled,
  onClick,
}) {
  const { isDark } = useTheme();
  const isActive = !disabled;
  const bg = isActive ? "var(--primary)" : isDark ? "#353550" : "#D2D2D2";
  const textColor = isActive ? "#FFFFFF" : "#FFFFFF";
  const badgeBg = isActive ? "#FFFFFF" : "#FFFFFF";
  const badgeTextColor = isActive ? "var(--primary)" : isDark ? "#505065" : "#D2D2D2";

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "10px 18px 12px",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        style={{
          width: 335,
          height: 48,
          borderRadius: 28,
          background: bg,
          border: "none",
          cursor: disabled ? "default" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          fontFamily: "'Montserrat',sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: badgeBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: badgeTextColor,
                fontFamily: "'Montserrat',sans-serif",
                lineHeight: 1,
              }}
            >
              {totalItems}
            </span>
          </div>
          <span
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: textColor,
              fontFamily: "'Montserrat',sans-serif",
            }}
          >
            Proceed Payment
          </span>
        </div>
        <span
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: textColor,
            fontFamily: "'Montserrat',sans-serif",
          }}
        >
          €{typeof total === "number" ? total.toFixed(2) : total}
        </span>
      </button>
    </div>
  );
}
