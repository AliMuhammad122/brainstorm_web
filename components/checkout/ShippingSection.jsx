import React from "react";

/**
 * Shipping To: either "Add New Shipping Address" CTA (dotted border, pink bg, red text)
 * or address card + "Change Address". Both open AddAddressModal.
 */
export default function ShippingSection({ address, onAddOrChange }) {
  const hasAddress = address && (address.fullName || address.address);

  return (
    <div style={{ marginBottom: 22 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: "var(--text)",
            letterSpacing: -0.35,
          }}
        >
          Shipping To
        </span>
        {hasAddress && (
          <button
            type="button"
            onClick={onAddOrChange}
            style={{
              padding: 0,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--primary)",
              fontFamily: "inherit",
              letterSpacing: 0.05,
              textDecoration: "underline",
            }}
          >
            Change Address
          </button>
        )}
      </div>
      {!hasAddress ? (
        <button
          type="button"
          onClick={onAddOrChange}
          style={{
            width: "100%",
            padding: "16px 18px",
            background: "var(--primary-soft)",
            border: "2px dashed var(--primary)",
            borderRadius: 16,
            cursor: "pointer",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--primary)",
              letterSpacing: 0.1,
            }}
          >
            Add New Shipping Address
          </span>
        </button>
      ) : (
        <div
          style={{
            border: "1.5px solid var(--border)",
            borderRadius: 16,
            padding: "14px 16px",
          }}
        >
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "var(--text)",
              margin: "0 0 6px",
              letterSpacing: -0.2,
            }}
          >
            {address.fullName}
          </p>
          <p
            style={{
              fontSize: 12.5,
              color: "var(--muted)",
              margin: "0 0 4px",
              lineHeight: 1.4,
            }}
          >
            {address.address}
            {address.postalCode ? `, ${address.postalCode}` : ""}
          </p>
          {address.phone && (
            <p style={{ fontSize: 12, color: "var(--subtle)", margin: 0 }}>
              {address.phone}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
