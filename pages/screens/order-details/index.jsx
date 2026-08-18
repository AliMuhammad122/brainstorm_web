import React from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader } from "../../../src/screensFlow/ui";
import LocationIcon from "../../../public/assets/icons/location.svg"
import DocumentDownloadIcon from "../../../public/assets/icons/document-download.svg"

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
  const { id, status, restaurant, date, time, orderType } = router.query;

  const currentOrderId = id || order.id;
  const currentStatus = status || order.status;
  const currentRestaurant = restaurant || "TGI Friday's";
  const currentDeliveryDate = date ? date.replace(/-/g, "/") : "24/11/2025";

  const getStatusBadgeStyles = (statusVal) => {
    switch (statusVal) {
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
          background: "#DA1A351A",
        };
    }
  };

  const statusStyle = getStatusBadgeStyles(currentStatus);

  const currentDetails = [
    { label: "Customer Name", value: "David Miller" },
    { label: "Phone Number", value: "+357 345236521" },
    { label: "Venue", value: currentRestaurant.toUpperCase() },
    { label: "Payment Method", value: "Credit Card" },
    { label: "Delivery Date", value: currentDeliveryDate },
  ];

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
        <style>{`
          @media print {
            body * {
              visibility: hidden;
            }
            #printable-order-card,
            #printable-order-card * {
              visibility: visible;
            }
            #printable-order-card {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              border: none !important;
              box-shadow: none !important;
              padding: 0 !important;
              margin: 0 !important;
            }
          }
        `}</style>

        <PageHeader
          title="Order Details"
          onBack={() => router.back()}
          rightElement={
            (currentStatus === "Completed" || currentStatus === "Canceled") ? (
              <button
                type="button"
                onClick={() => window.print()}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10000,
                  background: "#F4F6F8",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <DocumentDownloadIcon />
              </button>
            ) : null
          }
        />

        <div style={{ padding: "10px 20px 24px", flex: 1 }}>
          <div
            id="printable-order-card"
            style={{
              border: "1px solid #E8E8E8",
              borderRadius: 8,
              padding: "12px 12px 4px 12px",
              background: "#FFFFFF",
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
              <span style={{ fontSize: 16, fontWeight: 400, color: "#333333", fontFamily: "'Montserrat', sans-serif" }}>
                {currentOrderId?.includes("#") ? currentOrderId.replace("#", "# ") : currentOrderId}
              </span>
              <span
                style={{
                  width: 83,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  color: statusStyle.color,
                  background: statusStyle.background,
                  borderRadius: 100,
                  fontWeight: 400,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {currentStatus}
              </span>
            </div>

            <div style={{ height: 1, background: "#E8E8E8", margin: "11px 0" }} />

            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
              <div style={{ marginTop: 0, flexShrink: 0 }}>
                <LocationIcon />
              </div>
              <span style={{ fontSize: 12, color: "#8E8E8E", fontFamily: "'Montserrat', sans-serif", fontWeight: 400, lineHeight: 1.3 }}>
                {order.address}
              </span>
            </div>

            <div
              style={{
                background: "#F4F6F8",
                borderRadius: 8,
                padding: "12px 12px 10px 12px",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: "#333333",
                  fontFamily: "'Montserrat', sans-serif",
                  marginBottom: 8,
                }}
              >
                Item Names
              </div>
              <div
                style={{
                  height: 1,
                  background: "#E8E8E8",
                  marginBottom: 12,
                }}
              />
              {order.items.map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 10,
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 400,
                    textTransform: "uppercase",
                    letterSpacing: 0.4,
                    marginBottom: 10,
                  }}
                >
                  <span className="text-[#8E8E8E]">{item.name}</span>
                  <span className="text-[#333333]">{item.price ? item.price.replace("EUR", "€") : ""}</span>
                </div>
              ))}
              <div
                style={{
                  height: 1,
                  background: "#E8E8E8",
                  margin: "6px 0 12px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "var(--text)",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 400,
                }}
              >
                <span className="text-xs">Total</span>
                <span className="text-[10px]">{order.total ? order.total.replace("EUR", "€") : ""}</span>
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: "#333333",
                  fontFamily: "'Montserrat', sans-serif",
                  marginBottom: 7,
                }}
              >
                Details
              </div>
              <div style={{ height: 1, background: "#E8E8E8", marginBottom: 4 }} />
              {currentDetails.map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    fontSize: 12,
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  <span style={{ color: "#A4A4A4", fontWeight: 400 }}>{row.label}</span>
                  <span style={{ color: "#333333", fontWeight: 400 }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {currentStatus === "Active Order" && (
          <div style={{ padding: "0 20px 24px" }}>
            <button
              type="button"
              onClick={() =>
                router.push({
                  pathname: "/screens/track-order",
                  query: {
                    id: currentOrderId,
                    restaurant: currentRestaurant,
                    orderType: orderType || (currentRestaurant.toLowerCase().includes("friday") ? "pickup" : "delivery"),
                  },
                })
              }
              style={{
                width: "100%",
                height: 48,
                borderRadius: 2000,
                border: "none",
                background: "#DA1A35",
                color: "#fff",
                fontSize: 14,
                fontWeight: 400,
                fontFamily: "'Montserrat', sans-serif",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Track Order
            </button>
          </div>
        )}
      </div>
    </ScreensFrame>
  );
}
