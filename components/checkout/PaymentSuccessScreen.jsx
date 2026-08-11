import React from "react";
import SuccessIcon from "../../public/assets/icons/payment_success.svg"

/**
 * Payment success screen: green checkmark icon, success message, Back to Home link.
 * Matches the Figma design layout exactly.
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
        padding: "40px 24px",
        background: "#F9FAFC",
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
          color: "#333333",
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
          color: "#DA1A35",
          textDecoration: "none",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        Back to Home
      </button>
    </div>
  );
}
