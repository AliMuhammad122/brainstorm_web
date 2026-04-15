import React from "react";

export default function DeliveryAddressCard({ name, phone, address }) {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "18px 20px",
        marginBottom: 14,
        background: "var(--bg)", 
      }}
    >
      <div style={{ paddingBottom: 14, borderBottom: "1px solid var(--border)", marginBottom: 14 }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "var(--text)",
            margin: 0,
          }}
        >
          {name} | +{phone}
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: "var(--subtle)",
            marginTop: 2,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 2L12 4M12 20L12 22M2 12L4 12M20 12L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <p
          style={{
            fontSize: 12,
            color: "var(--subtle)",
            margin: 0,
            lineHeight: 1.5,
            fontWeight: 400,
            flex: 1,
          }}
        >
          {address}
        </p>
      </div>
    </div>
  );
}
