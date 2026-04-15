import React from "react";

/**
 * Payment success screen: green checkmark, message, Back to Home link.
 */
export default function PaymentSuccessScreen({ onBackToHome, onTrackOrder }) {
  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "var(--success)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
          boxShadow: "0 0 0 8px var(--success-soft-strong)",
        }}
      >
        <span style={{ color: "var(--on-primary)", fontSize: 48, fontWeight: 300, lineHeight: 1 }}>{"\u2713"}</span>
      </div>
      <p
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: "var(--text)",
          margin: "0 0 28px",
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        Payment Process is Successfully Done
      </p>
      <button
        type="button"
        onClick={onTrackOrder}
        style={{
          width: "100%",
          maxWidth: 260,
          padding: "15px 24px",
          borderRadius: 14,
          border: "none",
          background: "var(--primary)",
          color: "var(--on-primary)",
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "inherit",
          letterSpacing: 0.2,
          marginBottom: 14,
        }}
      >
        Track Order
      </button>
      <button
        type="button"
        onClick={onBackToHome}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          fontFamily: "inherit",
          fontSize: 14,
          fontWeight: 600,
          color: "var(--primary)",
          textDecoration: "underline",
        }}
      >
        Back to Home
      </button>
    </div>
  );
}
