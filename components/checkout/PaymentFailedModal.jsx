import React from "react";

const BRAND_RED = "var(--primary)";

/**
 * Payment Failed modal with red X icon, title, message, Cancel and Try Again.
 */
export default function PaymentFailedModal({ open, onCancel, onTryAgain }) {
  if (!open) return null;

  return (
    <>
      <div
        onClick={onCancel}
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--overlay)",
          zIndex: 9998,
        }}
      />
      <div
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "calc(100% - 40px)",
          maxWidth: 340,
          background: "var(--surface)",
          borderRadius: 20,
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          zIndex: 9999,
          padding: "28px 24px 24px",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: BRAND_RED,
            margin: "0 auto 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "var(--on-primary)", fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{"\u2715"}</span>
        </div>
        <h2
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "var(--text)",
            margin: "0 0 10px",
            textAlign: "center",
          }}
        >
          Payment Failed
        </h2>
        <p
          style={{
            fontSize: 14,
            color: "var(--muted)",
            margin: "0 0 24px",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Your payment has been failed; please try again.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: 14,
              border: "1.5px solid var(--border)",
              background: "var(--surface)",
              color: "var(--muted)",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onTryAgain}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: 14,
              border: "none",
              background: BRAND_RED,
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  );
}
