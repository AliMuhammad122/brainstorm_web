import React from "react";
import SuccessIcon from "../../public/assets/icons/payment_success.svg";
import { useTheme } from "../../context/ThemeContext";

/**
 * Order Completed screen: green success icon, message, Back to Home.
 * Matches the Figma design layout exactly.
 */
export default function OrderCompletedScreen({ onBackToHome }) {
    const {isDark}= useTheme()
  
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
        background: isDark?"#161625":"#f4f6f8",
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
          color: isDark?"#EAEAF2":"#333333",
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
