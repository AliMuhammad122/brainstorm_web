import React from "react";
import { RadioDot } from "../../src/screensFlow/ui";

/**
 * Loyalty Points: Total Points stepper + "Use my loyalty point for payment" checkbox.
 */
export default function LoyaltyPointsSection({
  loyaltyPts,
  onLoyaltyPtsChange,
  useLoyalty,
  onUseLoyaltyChange,
}) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: "var(--text)",
            letterSpacing: -0.35,
          }}
        >
          Loyalty Points
        </span>
        <span style={{ fontSize: 11.5, color: "var(--subtle)", fontWeight: 400 }}>
          20 Point equals to €1
        </span>
      </div>
      <div
        style={{
          border: "1.5px solid var(--border)",
          borderRadius: 14,
          padding: "14px 16px",
          marginBottom: 14,
          background: "var(--surface)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--text)",
                margin: "0 0 2px",
                letterSpacing: -0.2,
              }}
            >
              Total Points
            </p>
            <p
              style={{
                fontSize: 11.5,
                color: "var(--subtle)",
                margin: 0,
                fontWeight: 400,
              }}
            >
              0 Points Available
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid var(--border)",
              borderRadius: 8,
              overflow: "hidden",
              background: "var(--surface)",
            }}
          >
            <button
              type="button"
              onClick={() => onLoyaltyPtsChange(loyaltyPts + 20)}
              style={{
                width: 34,
                height: 34,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: 16,
                color: "var(--muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "inherit",
              }}
            >
              {"\u2191"}
            </button>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--text)",
                minWidth: 28,
                textAlign: "center",
              }}
            >
              {String(loyaltyPts).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => onLoyaltyPtsChange(Math.max(0, loyaltyPts - 20))}
              style={{
                width: 34,
                height: 34,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: 16,
                color: "var(--muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "inherit",
              }}
            >
              {"\u2193"}
            </button>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onUseLoyaltyChange(!useLoyalty)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          fontFamily: "inherit",
        }}
      >
        <RadioDot active={useLoyalty} activeColor="var(--primary)" />
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--primary)",
            letterSpacing: 0.1,
          }}
        >
          Use my loyalty point for payment
        </span>
      </button>
    </div>
  );
}
