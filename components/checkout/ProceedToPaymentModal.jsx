import React from "react";
import LoadingIcon from "../../public/assets/icons/loading.svg"
import { useTheme } from "../../context/ThemeContext";

/**
 * Proceed to Payment confirmation modal with spinner, message, Cancel and Pay Now.
 * Matches the Figma design layout exactly.
 */
export default function ProceedToPaymentModal({ open, amount, onCancel, onPayNow }) {
  const { isDark } = useTheme();

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onCancel}
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 370,
          background: isDark ? "#F0F0F580" : "#00000080",
          backdropFilter: "blur(2px)",
          zIndex: 9998,
        }}
      />

      {/* Modal Container */}
      <div
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "calc(100% - 32px)",
          maxWidth: 335,
          background: isDark ? "#0D0D1A" : "#FFFFFF",
          borderRadius: 8,
          // boxShadow: isDark ? "0 10px 40px rgba(0, 0, 0, 0.45)" : "0 10px 40px rgba(0, 0, 0, 0.15)",
          zIndex: 9999,
          padding: "14px 20px 16px",
          fontFamily: "'Montserrat', sans-serif",
          boxSizing: "border-box",
        }}
      >
        {/* Spinner Loader */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <LoadingIcon color={isDark ? "#E52E4A":"#DA1A35"}/>
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: isDark ? "#EAEAF2" : "#000000",
            margin: "0 0 10px",
            textAlign: "center",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Procced to Payment
        </h2>

        {/* Message */}
        <p
          style={{
            fontSize: 14,
            color: isDark ? "#A4A4A4" : "#A4A4A4",
            margin: "0 0 20px",
            textAlign: "center",
            lineHeight: "20px",
            fontWeight: 400,
          }}
        >
          Are you sure you want to pay{" "}
          <span style={{ color: isDark ? "#DA1A35" : "#DA1A35", fontWeight: 500 }}>€{amount}</span> for these items
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              paddingLeft: "34px",
              paddingRight: "34px",
              height: 40,
              borderRadius: 22,
              border: `1px solid ${isDark ? "#2A2A40" : "#E8E8E8"}`,
              background: isDark ? "#0D0D1A" : "#FFFFFF",
              color: isDark ? "#EAEAF2" : "#333333",
              fontSize: 12,
              fontWeight: 400,
              cursor: "pointer",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onPayNow}
            style={{
              flex: 1,
              width: 180,
              height: 40,
              borderRadius: 22,
              border: "none",
              background: isDark ? "#E52E4A" : "#DA1A35",
              color: "#FFFFFF",
              fontSize: 12,
              fontWeight: 400,
              cursor: "pointer",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
}
