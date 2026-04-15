import React from "react";

export default function OrderSummaryCard({
  restaurantName,
  date,
  items,
  total,
}) {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "18px 20px 16px",
        marginBottom: 14,
        background: "var(--bg)", 
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 18,
        }}
      >
        <div>
          <p
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--text)",
              margin: "0 0 4px",
            }}
          >
            {restaurantName}
          </p>
          <p style={{ fontSize: 11, color: "var(--subtle)", margin: 0, fontWeight: 400 }}>
            Order Summary
          </p>
        </div>
        <span style={{ fontSize: 11, color: "var(--subtle)", fontWeight: 400 }}>
          {date}
        </span>
      </div>
      <div>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "4px 0",
            }}
          >
            <span style={{ fontSize: 12, color: "var(--subtle)", fontWeight: 400 }}>
              <span style={{ fontWeight: 600, color: "var(--text)" }}>{item.qty}x</span>{" "}
              {item.name}
            </span>
            <span style={{ fontSize: 12, color: "var(--subtle)", fontWeight: 400 }}>
              €{item.price.toFixed(2)}
            </span>
          </div>
        ))}
        <div style={{ height: 1, background: "var(--border)", margin: "14px 0 10px" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text)" }}>Total</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text)" }}>
            €{total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
