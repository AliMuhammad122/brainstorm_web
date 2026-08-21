import React from "react";
import { useTheme } from "../../context/ThemeContext";
export default function DeliveryAddressCard({ name, phone }) {
  const {isDark} = useTheme();
  return (
    <div
      style={{
        border: `1.5px solid ${isDark?"#2A2A40":"#E8E8E8"}`,
        borderRadius: 8,
        padding: "10px 12px",
        marginBottom: 14,
        background: isDark?"#0D0D1A":"#FFFFFF", 
        display: "flex",
        alignItems: "center",
      }}
    >
      <p
        style={{
          fontSize: 12,
          fontWeight: 400,
          color: isDark?"#EAEAF2":"#333333",
          margin: 0,
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        {name}{phone ? ` |+${phone.replace(/^\+/, "")}` : ""}
      </p>
    </div>
  );
}
