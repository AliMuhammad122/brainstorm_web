import React from "react";

export default function DeliveryAddressCard({ name, phone }) {
  return (
    <div
      style={{
        border: "1.5px solid #E8E8E8",
        borderRadius: 8,
        padding: "10px 12px",
        marginBottom: 14,
        background: "var(--bg)", 
        display: "flex",
        alignItems: "center",
      }}
    >
      <p
        style={{
          fontSize: 12,
          fontWeight: 400,
          color: "#333333",
          margin: 0,
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        {name}{phone ? ` | +${phone.replace(/^\+/, "")}` : ""}
      </p>
    </div>
  );
}
