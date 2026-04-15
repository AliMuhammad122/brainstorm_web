import React from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader } from "../../../src/screensFlow/ui";

const order = {
  id: "Order #1265",
  status: "Active Order",
  address: "Ammochostou Block-Ground Floor Main Road Limassol, Cyprus",
  items: [
    { name: "Wicked Chicken", price: "EUR 14.50" },
    { name: "Friday Shrimp", price: "EUR 14.50" },
  ],
  total: "EUR 29.00",
  details: [
    { label: "Customer Name", value: "David Miller" },
    { label: "Phone Number", value: "+357 345236521" },
    { label: "Venue", value: "TGI FRIDAY'S" },
    { label: "Payment Method", value: "Credit Card" },
    { label: "Delivery Date", value: "24/11/2025" },
  ],
};

export default function OrderDetailsPage() {
  const router = useRouter();

  return (
    <ScreensFrame>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          background: "var(--bg)",
          color: "var(--text)",
        }}
      >
        <PageHeader title="Order Details" onBack={() => router.back()} />

        <div style={{ padding: "12px 20px 24px", flex: 1 }}>
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: 16,
              background: "var(--surface)",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 18, fontWeight: 600, color: "var(--text)" }}>
                {order.id}
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: "#D9142C",
                  background: "#FDE8EA",
                  padding: "6px 14px",
                  borderRadius: 18,
                  fontWeight: 600,
                }}
              >
                {order.status}
              </span>
            </div>

            <div style={{ height: 1, background: "var(--border)", margin: "14px 0" }} />

            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  background: "#FDE8EA",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 2,
                  flexShrink: 0,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M12 21s6-6.1 6-11a6 6 0 0 0-12 0c0 4.9 6 11 6 11Z"
                    stroke="#D9142C"
                    strokeWidth="1.5"
                  />
                  <circle cx="12" cy="10" r="2.3" fill="#D9142C" />
                </svg>
              </div>
              <span style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.4 }}>
                {order.address}
              </span>
            </div>

            <div
              style={{
                background: "var(--surface)",
                borderRadius: 12,
                padding: 14,
                marginTop: 16,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: 10,
                }}
              >
                Item Names
              </div>
              <div
                style={{
                  height: 1,
                background: "var(--border)",
                marginBottom: 10,
              }}
            />
              {order.items.map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: 0.4,
                    marginBottom: 10,
                  }}
                >
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                </div>
              ))}
              <div
                style={{
                  height: 1,
                background: "var(--border)",
                margin: "6px 0 10px",
              }}
            />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 14,
                  color: "var(--text)",
                  fontWeight: 600,
                }}
              >
                <span>Total</span>
                <span>{order.total}</span>
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: 10,
                }}
              >
                Details
              </div>
              <div style={{ height: 1, background: "var(--border)" }} />
              {order.details.map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: "1px solid var(--border)",
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: "var(--muted)" }}>{row.label}</span>
                  <span style={{ color: "var(--text)", fontWeight: 500 }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: "0 20px 24px" }}>
          <button
            type="button"
            onClick={() => router.push("/screens/track-order")}
            style={{
              width: "100%",
              height: 58,
              borderRadius: 29,
              border: "none",
              background: "#D9142C",
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Track Order
          </button>
        </div>
      </div>
    </ScreensFrame>
  );
}
