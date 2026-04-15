import React from "react";

/**
 * Order Completed screen: green success icon with rings, message, Back to Home.
 * Shown when order is delivered / completed.
 */
export default function OrderCompletedScreen({ onBackToHome }) {
  return (
    <div
      style={{
        flex: 1,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        background: "var(--bg)",
      }}
    >
      {/* Success icon: outer rings + green circle + checkmark */}
      <div
        style={{
          position: "relative",
          width: 120,
          height: 120,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "var(--success-soft)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 12,
            borderRadius: "50%",
            background: "var(--success-soft-strong)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 24,
            borderRadius: "50%",
            background: "var(--success)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px var(--success-shadow)",
          }}
        >
          <span
            style={{
              color: "var(--on-primary)",
              fontSize: 44,
              fontWeight: 300,
              lineHeight: 1,
            }}
          >
            {"\u2713"}
          </span>
        </div>
      </div>

      <p
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "var(--text)",
          margin: "0 0 32px",
          textAlign: "center",
          lineHeight: 1.4,
          maxWidth: 280,
        }}
      >
        Your order has been completed successfully
      </p>

      <button
        type="button"
        onClick={onBackToHome}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          fontFamily: "inherit",
          fontSize: 15,
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

