import React from "react";
import { useTheme } from "../../context/ThemeContext";

/**
 * Order summary: Sub Total, Tax, Discount, Tip, Total.
 */
export default function SummarySection({
  subtotal,
  discount,
  total,
}) {
  const {isDark}=useTheme();
  const rows = [
    { label: "Sub Total", val: `€${subtotal.toFixed(2)}`, bold: false },
    { label: "Tax", val: "€0.00", bold: false },
    {
      label: "Discount",
      val: discount > 0 ? `-€${discount.toFixed(2)}` : "€0.00",
      bold: false,
      red: discount > 0,
    },
    { label: "Tip", val: "€0.00", bold: false },
    { label: "Total", val: `€${total.toFixed(2)}`, bold: true },
  ];

  return (
    <div style={{ marginBottom: 0, borderTop: `1px solid ${isDark?"#2A2A40":"#E8E8E8"}`, paddingTop: "9px" }}>
      <span
        style={{
          fontSize: 12,
          fontWeight: 400,
          color: isDark?"#EAEAF2":"#333333",
          letterSpacing: "0px",
          fontFamily: "'Montserrat', sans-serif",
          display: "block",
          marginBottom: 4,
        }}
      >
        Summary
      </span>
      <p
        style={{
          fontSize: 12,
          color: isDark?"#6E6E85":"#A4A4A4",
          margin: "6px 0 6px",
          fontWeight: 400,
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        incl. all taxes (if applicable)
      </p>
      {rows.map((row) => (
        <div
          key={row.label}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: row.bold ? "6px 0 2px" : "6px 0",
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 400,
              color: row.bold
                ? (isDark ? "#EAEAF2" : "#333333")
                : (row.red
                  ? (isDark ? "#E52E4A" : "#DA1A35")
                  : (isDark ? "#6E6E85" : "#A4A4A4")),
              letterSpacing: 0,
            }}
          >
            {row.label}
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 400,
              color: row.red
                ? (isDark ? "#E52E4A" : "#DA1A35")
                : (isDark ? "#EAEAF2" : "#333333"),
              letterSpacing: 0,
            }}
          >
            {row.val}
          </span>
        </div>
      ))}
    </div>
  );
}
