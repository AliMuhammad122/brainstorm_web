import React from "react";

const BRAND_RED = "var(--primary)";

/**
 * Proceed to Payment confirmation modal with spinner, message, Cancel and Pay Now.
 */
export default function ProceedToPaymentModal({ open, amount, onCancel, onPayNow }) {
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
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              border: `3px solid ${BRAND_RED}`,
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <h2
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "var(--text)",
            margin: "0 0 10px",
            textAlign: "center",
          }}
        >
          Proceed to Payment
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
          Are you sure you want to pay{" "}
          <span style={{ color: BRAND_RED, fontWeight: 700 }}>€{amount}</span> for these items?
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
            onClick={onPayNow}
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
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
}
