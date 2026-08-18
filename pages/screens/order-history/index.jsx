import React, { useState } from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader } from "../../../src/screensFlow/ui";
import OrderIcon from "../../../public/assets/icons/No_active_order.svg"
import ActiveOrderIcon from "../../../public/assets/icons/ActiveOrder.svg"
import OpenDetailsIcon from "../../../public/assets/icons/OpenDetails.svg"
import TimerIcon from "../../../public/assets/icons/active_timer.svg"
import CalenderIcon from "../../../public/assets/icons/active_calendar.svg"

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

const historyOrders = [
  {
    id: "Order #1262",
    status: "Completed",
    restaurant: "TGI Friday's",
    time: "10:30",
    date: "23-11-2025",
  },
  {
    id: "Order #1261",
    status: "Canceled",
    restaurant: "Olive Garden",
    time: "18:15",
    date: "22-11-2025",
  },
  {
    id: "Order #1260",
    status: "Completed",
    restaurant: "Cheesecake Factory",
    time: "11:00",
    date: "21-11-2025",
  },
];

const getStatusStyles = (status) => {
  switch (status) {
      case "Completed":
        return {
          color: "#1FC16B",
          background: "#1FC16B1A",
        };
      case "Canceled":
        return {
          color: "#D00416",
          background: "#D004161A",
        };
      case "Active Order":
    default:
      return {
        color: "#D9142C",
        background: "#FFE7EB",
      };
  }
};

const getStatusIconBg = (status) => {
  switch (status) {
    case "Completed":
      return "#E8F5E9";
    case "Canceled":
      return "#F4F6F8";
    case "Active Order":
    default:
      return "#FFE7EB";
  }
};

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

        <div style={{ padding: "12px 20px 12px", borderBottom: "1px solid #F4F6F8" }}>
          <div
            style={{
              background: "var(--surface)",
              borderRadius: 10000,
              // padding: 4,
              display: "flex",
              gap: 6,
              // border: "1px solid var(--border)",
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
                    height: 40,
                    borderRadius: 1000,
                    border: "none",
                    background: isActive ? "#DA1A35" : "transparent",
                    color: isActive ? "#fff" : "#333333",
                    fontSize: 14,
                    fontWeight: 400,
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
          <div style={{ flex: 1, padding: "2px 20px 40px" }}>
            {activeOrders.map((order) => {
              const statusStyle = getStatusStyles(order.status);
              return (
                <button
                  key={order.id}
                  type="button"
                  onClick={() =>
                    router.push({
                      pathname: "/screens/order-details",
                      query: {
                        id: order.id,
                        status: order.status,
                        restaurant: order.restaurant,
                        date: order.date,
                        time: order.time,
                      },
                    })
                  }
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    padding: "10px 4px 10px",
                    borderBottom: "1px solid #EFEFEF",
                    background: "transparent",
                    borderLeft: "none",
                    borderRight: "none",
                    borderTop: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 100000,
                        background: getStatusIconBg(order.status),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <ActiveOrderIcon />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <div
                        style={{
                          fontSize: 8,
                          color: statusStyle.color,
                          background: statusStyle.background,
                          padding: "2px 10px",
                          borderRadius: 1000,
                          width: "fit-content",
                          fontWeight: 400,
                          fontFamily: "'Montserrat'",
                        }}
                      >
                        {order.status}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 7,
                          color: "#333333",
                          fontWeight: 400,
                          fontSize: 12,
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        <span>{order.restaurant}</span>
                        <span style={{ fontSize: 12, color: "#A4A4A4", fontWeight: 500 }}>•</span>
                        <span style={{ fontSize: 10, color: "#A4A4A4", fontWeight: 600, lineHeight: "1px" }}>
                          {order.id?.includes("#") ? order.id.replace("#", "# ") : order.id}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: 4, color: "#A4A4A4" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 8,
                          }}
                        >
                          <TimerIcon />
                          {order.time}
                        </div>
                        <span style={{ fontSize: 8, color: "#A4A4A4" }}>•</span>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 8,
                          }}
                        >
                          <CalenderIcon />
                          {order.date}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <OpenDetailsIcon />
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div style={{ flex: 1, padding: "2px 20px 40px" }}>
            {historyOrders.length > 0 ? (
              historyOrders.map((order) => {
                const statusStyle = getStatusStyles(order.status);
                return (
                  <button
                    key={order.id}
                    type="button"
                    onClick={() =>
                      router.push({
                        pathname: "/screens/order-details",
                        query: {
                          id: order.id,
                          status: order.status,
                          restaurant: order.restaurant,
                          date: order.date,
                          time: order.time,
                        },
                      })
                    }
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "10px 4px 10px",
                      borderBottom: "1px solid #EFEFEF",
                      background: "transparent",
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 100000,
                          background: getStatusIconBg(order.status),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <ActiveOrderIcon />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <div
                          style={{
                            fontSize: 8,
                            color: statusStyle.color,
                            background: statusStyle.background,
                            padding: "2px 10px",
                            borderRadius: 1000,
                            width: "fit-content",
                            fontWeight: 400,
                            fontFamily: "'Montserrat'",
                          }}
                        >
                          {order.status}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 7,
                            color: "#333333",
                            fontWeight: 400,
                            fontSize: 12,
                            fontFamily: "'Montserrat', sans-serif",
                          }}
                        >
                          <span>{order.restaurant}</span>
                          <span style={{ fontSize: 12, color: "#A4A4A4", fontWeight: 500 }}>•</span>
                          <span style={{ fontSize: 10, color: "#A4A4A4", fontWeight: 600, lineHeight: "1px" }}>
                            {order.id?.includes("#") ? order.id.replace("#", "# ") : order.id}
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: 4, color: "#A4A4A4" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: 8,
                            }}
                          >
                            <TimerIcon />
                            {order.time}
                          </div>
                          <span style={{ fontSize: 8, color: "#A4A4A4" }}>•</span>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: 8,
                            }}
                          >
                            <CalenderIcon />
                            {order.date}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <OpenDetailsIcon />
                    </div>
                  </button>
                );
              })
            ) : (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "24px 20px 60px",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    borderRadius: 60,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#9B9B9B",
                  }}
                >
                  <OrderIcon />
                </div>
                <p
                  style={{
                    margin: 0,
                    color: "#333333",
                    fontSize: 14,
                    fontWeight: 400,
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  {emptyState.title}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </ScreensFrame>
  );
}

