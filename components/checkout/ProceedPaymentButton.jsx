import React from "react";

const BTN_ACTIVE = "var(--primary)";
const BTN_DISABLED = "var(--disabled)";

/**
 * Floating bottom CTA for checkout.
 * Disabled: #D2D2D2, Active: #DA1A35
 */
export default function ProceedPaymentButton({
  totalItems,
  total,
  disabled,
  onClick,
}) {
  const isActive = !disabled;
  const bg = isActive ? BTN_ACTIVE : BTN_DISABLED;
  const textColor = isActive ? "var(--on-primary)" : "var(--subtle)";

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "10px 18px 26px",
        background: "linear-gradient(to top,var(--bg) 75%,rgba(0,0,0,0))",
        zIndex: 50,
      }}
    >
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        style={{
          width: "100%",
          height: 58,
          borderRadius: 29,
          background: bg,
          border: "none",
          cursor: disabled ? "default" : "pointer",
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
          boxShadow: isActive ? "0 10px 32px rgba(218,26,53,0.38)" : "none",
          fontFamily: "inherit",
          transition: "background 0.2s, box-shadow 0.2s",
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            background: "rgba(255,255,255,0.22)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 900,
              color: textColor,
            }}
          >
            {totalItems}
          </span>
        </div>
        <span
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 15,
            fontWeight: 800,
            color: textColor,
            letterSpacing: 0.2,
          }}
        >
          Proceed Payment
        </span>
        <span
          style={{
            fontSize: 15,
            fontWeight: 800,
            color: textColor,
            paddingRight: 8,
            flexShrink: 0,
          }}
        >
          €{typeof total === "number" ? total.toFixed(2) : total}
        </span>
      </button>
    </div>
  );
}
