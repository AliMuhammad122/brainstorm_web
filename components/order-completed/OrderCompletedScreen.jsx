import React from "react";
import SuccessIcon from "../../public/assets/icons/payment_success.svg";

/**
 * Order Completed screen: green success icon, message, Back to Home.
 * Matches the Figma design layout exactly.
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
        padding: "40px 24px",
        background: "#F9FAFC",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* Success Icon */}
      <div style={{ marginBottom: 16 }}>
        <SuccessIcon  />
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
        Your order has been complete sucessfully
      </p>

      {/* Back to Home Button */}
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
