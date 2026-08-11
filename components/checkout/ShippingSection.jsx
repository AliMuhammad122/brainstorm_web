import React from "react";

/**
 * Shipping To: either "Add New Shipping Address" CTA (dotted border, pink bg, red text)
 * or address card + "Change Address". Both open AddAddressModal.
 */
export default function ShippingSection({ address, onAddOrChange }) {
  const hasAddress = address && (address.fullName || address.address);

  return (
    <div style={{ marginBottom: 16 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 400,
            color: "#333333",
            letterSpacing: "0px",
            fontFamily: "'Montserrat', sans-serif",
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
            // padding: "16px 18px",
            height: "68px",
            background: "#DA1A351A",
            border: "1px dashed var(--primary)",
            borderRadius: 8,
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
              fontWeight: 400,
              color: "#DA1A35",
              letterSpacing: "0px",
              fontFamily: "'Montserrat', sans-serif",
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
