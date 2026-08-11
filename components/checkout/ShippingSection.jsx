import React from "react";

/**
 * Shipping To: either "Add New Shipping Address" CTA (dotted border, pink bg, red text)
 * or address card + "Change Address". Both open AddAddressModal.
 */
export default function ShippingSection({ address, onAddOrChange, orderType }) {
  const hasAddress = address && (address.fullName || address.address);
  const isPickup = orderType === "pickup";

  const titleText = isPickup ? "Pickup Restaurants" : "Shipping To";
  const buttonText = isPickup ? "Add New Pickup Address" : "Add New Shipping Address";

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
          {titleText}
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
              fontSize: 10,
              fontWeight: 400,
              color: "#DA1A35",
              fontFamily: "inherit",
              letterSpacing: 0.05,
              textDecoration: "none",
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
            {buttonText}
          </span>
        </button>
      ) : (
        <div
          style={{
            border: "1.5px solid #E8E8E8",
            borderRadius: 8,
            padding: "10px 14px",
            height  : "fit-content"
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 400,
              color: "#A4A4A4",
              margin: "0 0 5px",
              letterSpacing: 0,
            }}
          >
            {address.fullName}
          </p>
          {address.phone && (
            <p style={{ fontSize: 12, color: "#A4A4A4", margin: "0 0 4px" }}>
              {address.phone}
            </p>
          )}
          <p
            style={{
              fontSize: 12,
              color: "#A4A4A4",
              margin: "0 0 4px",
              lineHeight: 1.24,
            }}
          >
            {address.address}
            {address.postalCode ? `, ${address.postalCode}` : ""}
          </p>
          {address.scheduleData && (
            <p
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "#DA1A35",
                margin: "4px 0 0",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Scheduled: {address.scheduleData.day} ({address.scheduleData.time})
            </p>
          )}
        </div>
      )}
    </div>
  );
}
