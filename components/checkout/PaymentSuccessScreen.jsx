import React from "react";
import SuccessIcon from "../../public/assets/icons/payment_success.svg"
import { useTheme } from "../../context/ThemeContext";

/**
 * Payment success screen: green checkmark icon, success message, Back to Home link.
 * Matches the Figma design layout exactly.
 */
export default function PaymentSuccessScreen({ onBackToHome, onTrackOrder }) {
  const {isDark}= useTheme()
  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        background: isDark?"#161625":"#f4f6f8",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* Success Icon */}
      <div style={{ marginBottom: 16 }}>
        <SuccessIcon width={152} height={152} />
      </div>

      {/* Message */}
      <p
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: isDark?"#EAEAF2":"#333333",
          margin: "0 48px 16px",
          textAlign: "center",
          lineHeight: "20px",
        }}
      >
        Payment Process is Successfully Done
      </p>
      <button
        type="button"
        onClick={onTrackOrder}
        style={{
          width: "100%",
          maxWidth: 160,
          padding: "15px 24px",
          borderRadius: 10000,
          border: "none",
          background: "var(--primary)",
          color: "var(--on-primary)",
          fontSize: 14,
          fontWeight: 400,
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
          fontSize: 14,
          fontWeight: 500,
          color: isDark?"#E52E4A":"#DA1A35",
          textDecoration: "none",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        Back to Home
      </button>
    </div>
  );
}
