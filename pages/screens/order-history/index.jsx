import React, { useState } from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader } from "../../../src/screensFlow/ui";

const emptyState = {
  title: "You haven't any active order yet",
};

const activeOrders = [
  {
    id: "Order #1265",
    status: "Active Order",
    restaurant: "TGI Friday's",
    time: "12:40",
    date: "24-11-2025",
  },
  {
    id: "Order #1266",
    status: "Active Order",
    restaurant: "Olive Garden",
    time: "13:15",
    date: "24-11-2025",
  },
  {
    id: "Order #1267",
    status: "Active Order",
    restaurant: "Cheesecake Factory",
    time: "14:00",
    date: "24-11-2025",
  },
];

export default function OrderHistoryPage() {
  const router = useRouter();
  const [tab, setTab] = useState("active");

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
        <PageHeader title="Order History" onBack={() => router.back()} />

        <div style={{ padding: "10px 20px 0" }}>
          <div
            style={{
              background: "var(--surface)",
              borderRadius: 18,
              padding: 4,
              display: "flex",
              gap: 6,
              border: "1px solid var(--border)",
            }}
          >
            {[
              { key: "active", label: "Active" },
              { key: "history", label: "History" },
            ].map((item) => {
              const isActive = tab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setTab(item.key)}
                  style={{
                    flex: 1,
                    height: 36,
                    borderRadius: 16,
                    border: "none",
                    background: isActive ? "#D9142C" : "transparent",
                    color: isActive ? "#fff" : "var(--muted)",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {tab === "active" ? (
  <div style={{ flex: 1, padding: "16px 20px 40px" }}>
    {activeOrders.map((order) => (
      <button
        key={order.id}
        type="button"
        onClick={() => router.push("/screens/order-details")}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "10px 4px 12px",
          borderBottom: "1px solid #EFEFEF",
          background: "transparent",
          borderLeft: "none",
          borderRight: "none",
          borderTop: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
                      background: "#FFE7EB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M7 4H17C19.2 4 20 4.8 20 7V19C20 21.2 19.2 22 17 22H7C4.8 22 4 21.2 4 19V7C4 4.8 4.8 4 7 4Z"
                stroke="#D9142C"
                strokeWidth="1.5"
              />
              <path
                d="M7 8H17"
                stroke="#D9142C"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M9 12H15"
                stroke="#D9142C"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                fontSize: 10,
                color: "#D9142C",
                background: "#FFE7EB",
                padding: "2px 8px",
                borderRadius: 12,
                width: "fit-content",
                fontWeight: 600,
              }}
            >
              {order.status}
            </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--text)",
                        fontWeight: 600,
                      }}
                    >
                      {order.restaurant}
                      <span style={{ color: "var(--muted)", fontWeight: 500 }}>
                        {" "}
                        - {order.id}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 10, color: "var(--muted)" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 10,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    background: "#9B9B9B",
                    display: "inline-block",
                  }}
                />
                {order.time}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 10,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    background: "#9B9B9B",
                    display: "inline-block",
                  }}
                />
                {order.date}
              </div>
            </div>
          </div>
        </div>
        <div style={{ color: "#999", fontSize: 18 }}>{">"}</div>
      </button>
    ))}
  </div>
) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px 20px 60px",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9B9B9B",
              }}
            >
              <svg
                width="92"
                height="92"
                viewBox="0 0 92 92"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  x="20"
                  y="14"
                  width="52"
                  height="66"
                  rx="6"
                  stroke="#9B9B9B"
                  strokeWidth="4"
                />
                <rect
                  x="34"
                  y="8"
                  width="24"
                  height="12"
                  rx="3"
                  stroke="#9B9B9B"
                  strokeWidth="4"
                  fill="#fff"
                />
                <path
                  d="M43 35L35 49H45L39 64"
                  stroke="#9B9B9B"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p
              style={{
                margin: 0,
                color: "#666",
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              {emptyState.title}
            </p>
          </div>
        )}
      </div>
    </ScreensFrame>
  );
}

