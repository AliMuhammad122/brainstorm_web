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
        border: "1px solid #E8E8E8",
        borderRadius: 8,
        padding: "10px 12px 14px",
        marginBottom: 14,
        background: "var(--bg)", 
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 6,
          borderBottom: "1px solid #E8E8E8",
          paddingBottom: 8,
        }}
      >
        <div >
          <p
            style={{
              fontSize: 12,
              fontWeight: 400,
              color: "#333333",
              margin: "0 0 7px",
            }}
          >
            {restaurantName}
          </p>
          <p style={{ fontSize: 10, color: "#A4A4A4", margin: 0, fontWeight: 400, fontFamily:"'Montserrat'" }}>
            Order Summary
          </p>
        </div>
        <div>
        <p style={{ fontSize: 10, color: "#A4A4A4", fontWeight: 400, fontFamily:"'Montserrat'" }}>
          {date}
        </p>
        </div>
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
            <span style={{ fontSize: 10, color: "#A4A4A4", fontWeight: 400 }}>
              <span style={{ fontWeight: 600, color: "#A4A4A4" }}>{item.qty}x</span>{" "}
              {item.name}
            </span>
            <span style={{ fontSize: 10, color: "#333333", fontWeight: 400 }}>
              €{item.price.toFixed(2)}
            </span>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "4px",
          }}
        >
          <span style={{ fontSize: 10, fontWeight: 400, color: "#333333" }}>Total</span>
          <span style={{ fontSize: 10, fontWeight: 400, color: "#333333" }}>
            €{total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
