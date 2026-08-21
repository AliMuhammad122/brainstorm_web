import React, { useState } from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader } from "../../../src/screensFlow/ui";
import OrderIcon from "../../../public/assets/icons/No_active_order.svg"
import ActiveOrderIcon from "../../../public/assets/icons/ActiveOrder.svg"
import OpenDetailsIcon from "../../../public/assets/icons/OpenDetails.svg"
import TimerIcon from "../../../public/assets/icons/active_timer.svg"
import CalenderIcon from "../../../public/assets/icons/active_calendar.svg"
import { useTheme } from "../../../context/ThemeContext";

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
    orderType: "pickup",
  },
  {
    id: "Order #1266",
    status: "Active Order",
    restaurant: "Olive Garden",
    time: "13:15",
    date: "24-11-2025",
    orderType: "delivery",
  },
  {
    id: "Order #1267",
    status: "Active Order",
    restaurant: "Cheesecake Factory",
    time: "14:00",
    date: "24-11-2025",
    orderType: "pickup",
  },
];

const historyOrders = [
  {
    id: "Order #1262",
    status: "Completed",
    restaurant: "TGI Friday's",
    time: "10:30",
    date: "23-11-2025",
    orderType: "pickup",
  },
  {
    id: "Order #1261",
    status: "Canceled",
    restaurant: "Olive Garden",
    time: "18:15",
    date: "22-11-2025",
    orderType: "delivery",
  },
  {
    id: "Order #1260",
    status: "Completed",
    restaurant: "Cheesecake Factory",
    time: "11:00",
    date: "21-11-2025",
    orderType: "pickup",
  },
];
const getStatusStyles = (status, isDark) => {
  switch (status) {
      case "Completed":
        return {
          color: isDark ? "#1FC16B" : "#1FC16B",
          background: isDark ? "#25D4751A" : "#1FC16B1A",
        };
      case "Canceled":
        return {
          color: isDark ? "#DA1A35" : "#D00416",
          background: isDark ? "#C410301A" : "#D004161A",
        };
      case "Active Order":
    default:
      return {
        color: isDark ? "#DA1A35" : "#DA1A35",
        background: isDark ? "#E52E4A1A" : "#DA1A351A",
      };
  }
};

const getStatusIconBg = (status, isDark) => {
  switch (status) {
    case "Completed":
      return isDark ? "#E52E4A1A" : "#DA1A351A";
    case "Canceled":
      return isDark ? "#E52E4A1A" : "#DA1A351A";
    case "Active Order":
    default:
      return isDark ? "#E52E4A1A" : "#DA1A351A";
  }
};

export default function OrderHistoryPage() {
  const router = useRouter();
  const { isDark } = useTheme();
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

        <div style={{ padding: "12px 20px 12px", borderBottom: `1px solid ${isDark ?"#161625":"#F4F6F8"}` }}>
          <div
            style={{
              background: isDark ? "#2A2A40" : "var(--surface)",
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
                    background: isActive ? (isDark ? "#DA1A35" : "#DA1A35") : "transparent",
                    color: isDark ? "#fff" : (isActive ? "#fff" : "#333333"),
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
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "2px 20px 40px" }}>
            {activeOrders.length > 0 ? (
              activeOrders.map((order) => {
                const statusStyle = getStatusStyles(order.status, isDark);
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
                          orderType: order.orderType,
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
                      borderBottom: `1px solid ${isDark ? "#2A2A40" : "#EFEFEF"}`,
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
                          background: getStatusIconBg(order.status, isDark),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                         
                        }}
                      >
                        <ActiveOrderIcon color={isDark? "#E52E4A" : "#DA1A35"}/>
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
                            color: isDark ? "#EAEAF2" : "#333333",
                            fontWeight: 400,
                            fontSize: 12,
                            fontFamily: "'Montserrat', sans-serif",
                          }}
                        >
                          <span>{order.restaurant}</span>
                          <span style={{ fontSize: 12, color: isDark ? "#6E6E85" : "#A4A4A4", fontWeight: 500 }}>•</span>
                          <span style={{ fontSize: 10, color: isDark ? "#6E6E85" : "#A4A4A4", fontWeight: 600, lineHeight: "1px" }}>
                            {order.id?.includes("#") ? order.id.replace("#", "# ") : order.id}
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: 4, color: isDark ? "#6E6E85" : "#A4A4A4" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: 8,
                            }}
                          >
                            <TimerIcon color={isDark ? "#252332" : "#A4A4A4"} />
                            {order.time}
                          </div>
                          <span style={{ fontSize: 8, color: isDark ? "#6E6E85" : "#A4A4A4" }}>•</span>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: 8,
                            }}
                          >
                            <CalenderIcon color={isDark ? "#252332" : "#A4A4A4"}/>
                            {order.date}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ color: isDark ? "#252332" : "#A4A4A4" }}>
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
                    color: isDark ? "#2A2A40" : "#A4A4A4",
                  }}
                >
                  <OrderIcon />
                </div>
                <p
                  style={{
                    margin: 0,
                    color: isDark ? "#EAEAF2" : "#333333",
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
        ) : (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "2px 20px 40px" }}>
            {historyOrders.length > 0 ? (
              historyOrders.map((order) => {
                const statusStyle = getStatusStyles(order.status, isDark);
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
                          orderType: order.orderType,
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
                      borderBottom: `1px solid ${isDark ? "#2A2A40" : "#EFEFEF"}`,
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
                          background: getStatusIconBg(order.status, isDark),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <ActiveOrderIcon color={isDark ? "#E52E4A" : "#DA1A35"} />
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
                            color: isDark ? "#EAEAF2" : "#333333",
                            fontWeight: 400,
                            fontSize: 12,
                            fontFamily: "'Montserrat', sans-serif",
                          }}
                        >
                          <span>{order.restaurant}</span>
                          <span style={{ fontSize: 12, color: isDark ? "#6E6E85" : "#A4A4A4", fontWeight: 500 }}>•</span>
                          <span style={{ fontSize: 10, color: isDark ? "#6E6E85" : "#A4A4A4", fontWeight: 600, lineHeight: "1px" }}>
                            {order.id?.includes("#") ? order.id.replace("#", "# ") : order.id}
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: 4, color: isDark ? "#6E6E85" : "#A4A4A4" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: 8,
                            }}
                          >
                            <TimerIcon color={isDark ? "#252332" : "#A4A4A4"} />
                            {order.time}
                          </div>
                          <span style={{ fontSize: 8, color: isDark ? "#6E6E85" : "#A4A4A4" }}>•</span>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: 8,
                            }}
                          >
                            <CalenderIcon color={isDark ? "#252332" : "#A4A4A4"} />
                            {order.date}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ color: isDark ? "#252332" : "#A4A4A4" }}>
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
                    color: isDark?"#2A2A40" :"#A4A4A4",
                  }}
                >
                  <OrderIcon />
                </div>
                <p
                  style={{
                    margin: 0,
                    color: isDark ? "#EAEAF2" : "#333333",
                    fontSize: 14,
                    fontWeight: 400,
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  You have no order history yet
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </ScreensFrame>
  );
}

