import React from "react";

/**
 * Order summary: Sub Total, Tax, Discount, Tip, Total.
 */
export default function SummarySection({
  subtotal,
  discount,
  total,
  useLoyalty,
  loyaltyPts,
}) {
  const discountVal = useLoyalty ? loyaltyPts / 20 : 0;
  const rows = [
    { label: "Sub Total", val: `€${subtotal.toFixed(2)}`, bold: false },
    { label: "Tax", val: "€0.00", bold: false },
    {
      label: "Discount",
      val: useLoyalty && loyaltyPts > 0 ? `-€${discountVal.toFixed(2)}` : "€0.00",
      bold: false,
      red: useLoyalty && loyaltyPts > 0,
    },
    { label: "Tip", val: "€0.00", bold: false },
    { label: "Total", val: `€${total.toFixed(2)}`, bold: true },
  ];

  return (
    <div style={{ marginBottom: 16 }}>
      <span
        style={{
          fontSize: 16,
          fontWeight: 800,
          color: "var(--text)",
          letterSpacing: -0.35,
          display: "block",
          marginBottom: 4,
        }}
      >
        Summary
      </span>
      <p
        style={{
          fontSize: 12,
          color: "var(--subtle)",
          margin: "0 0 12px",
          fontWeight: 400,
        }}
      >
        incl. all taxes (if applicable)
      </p>
      {rows.map((row, i) => (
        <div
          key={row.label}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: row.bold ? "13px 0 2px" : "9px 0",
            borderTop:
              row.bold ? "1.5px solid var(--border-subtle)" : i > 0 ? "1px solid var(--border-subtle)" : "none",
          }}
        >
          <span
            style={{
              fontSize: row.bold ? 15 : 13.5,
              fontWeight: row.bold ? 800 : 400,
              color: row.bold ? "var(--text)" : "var(--muted)",
              letterSpacing: row.bold ? -0.3 : 0,
            }}
          >
            {row.label}
          </span>
          <span
            style={{
              fontSize: row.bold ? 15 : 13.5,
              fontWeight: row.bold ? 800 : 600,
              color: row.red ? "var(--primary)" : row.bold ? "var(--text)" : "var(--muted)",
              letterSpacing: row.bold ? -0.3 : 0,
            }}
          >
            {row.val}
          </span>
        </div>
      ))}
    </div>
  );
}
