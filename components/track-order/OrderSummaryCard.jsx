import React from "react";
import { useTheme } from "../../context/ThemeContext";

export default function OrderSummaryCard({
  restaurantName,
  date,
  items,
  total,
}) {
  const {isDark} = useTheme();
  return (
    <div
      style={{
        border: `1px solid ${isDark ?"#2A2A40": "#E8E8E8"}`,
        borderRadius: 8,
        padding: "10px 12px 14px",
        marginBottom: 14,
        background: isDark ?"#0D0D1A": "#FFFFFF", 
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 6,
          borderBottom: isDark?"1px solid #2A2A40":"1px solid #E8E8E8",
          paddingBottom: 8,
        }}
      >
        <div >
          <p
            style={{
              fontSize: 12,
              fontWeight: 400,
              color: isDark?"#EAEAF2":"#333333",
              margin: "0 0 7px",
            }}
          >
            {restaurantName}
          </p>
          <p style={{ fontSize: 10, color: isDark?"#6E6E85":"#A4A4A4", margin: 0, fontWeight: 400, fontFamily:"'Montserrat'" }}>
            Order Summary
          </p>
        </div>
        <div>
        <p style={{ fontSize: 10, color: isDark?"#6E6E85":"#A4A4A4", fontWeight: 400, fontFamily:"'Montserrat'" }}>
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
            <span style={{ fontSize: 10, color: isDark?"#6E6E85":"#A4A4A4", fontWeight: 400 }}>
              <span style={{ fontWeight: 600, color: isDark?"#6E6E85":"#A4A4A4" }}>{item.qty}x</span>{" "}
              {item.name}
            </span>
            <span style={{ fontSize: 10, color: isDark?"#EAEAF2":"#333333", fontWeight: 400 }}>
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
          <span style={{ fontSize: 10, fontWeight: 400, color: isDark?"#EAEAF2":"#333333" }}>Total</span>
          <span style={{ fontSize: 10, fontWeight: 400, color: isDark?"#EAEAF2":"#333333" }}>
            €{total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
