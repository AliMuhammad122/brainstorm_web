import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader } from "../../../src/screensFlow/ui";
import TrackOrderBottomSheet from "../../../components/track-order/TrackOrderBottomSheet";
import OrderStatusBar from "../../../components/track-order/OrderStatusBar";
import OrderCompletedScreen from "../../../components/order-completed/OrderCompletedScreen";
import { useScreensFlow } from "../../../context/ScreensFlowContext";

const TrackOrderMap = dynamic(
  () => import("../../../components/track-order/TrackOrderMap"),
  { ssr: false },
);

const DUMMY_ITEMS = [
  { name: "Wicked Chicken", qty: 1, price: 14.5 },
  { name: "Friday Shrimp", qty: 1, price: 14.5 },
];
const DUMMY_TOTAL = 29.0;

const STEP_CYCLE_MS = 10000;

export default function TrackOrderPage() {
  const router = useRouter();
  const { state } = useScreensFlow();

  const [activeStep, setActiveStep] = useState(0);
  const [viewMode, setViewMode] = useState("sheet");

  const cartItems = useMemo(
    () =>
      state.cartItems.length > 0
        ? state.cartItems.map((i) => ({
            name: i.name,
            qty: i.qty,
            price: i.priceNum,
          }))
        : DUMMY_ITEMS,
    [state.cartItems],
  );

  const total = useMemo(
    () =>
      state.cartItems.length > 0
        ? state.cartItems.reduce((s, i) => s + i.priceNum * i.qty, 0)
        : DUMMY_TOTAL,
    [state.cartItems],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= 3) return 3;
        return prev + 1;
      });
    }, STEP_CYCLE_MS);
    return () => clearInterval(timer);
  }, []);

  const toggleView = () => {
    setViewMode((v) => (v === "sheet" ? "fullmap" : "sheet"));
  };

  const orderCompleted = activeStep >= 3;

  if (orderCompleted) {
    return (
      <ScreensFrame>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8F8F8" }}>
          <OrderCompletedScreen onBackToHome={() => router.push("/")} />
        </div>
      </ScreensFrame>
    );
  }

  return (
    <ScreensFrame>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          background: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Header - transparent over map */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 30 }}>
          <PageHeader title="Track Order" onBack={() => router.push("/")} transparent />
        </div>

        {/* Map area - full height so header overlays it */}
        <div
          style={{
            flex: 1,
            position: "relative",
            minHeight: 0,
            marginTop: 0,
          }}
        >
          <TrackOrderMap height="100%" />
        </div>

        {/* Bottom sheet OR collapsed status bar */}
        {viewMode === "sheet" ? (
          <TrackOrderBottomSheet
            orderNumber="#29182"
            estTime="30 Minutes"
            activeStep={activeStep}
            restaurantName="TGI FRIDAY'S"
            orderDate="20 November 2025"
            items={cartItems}
            total={total}
            customerName="David Miller"
            customerPhone="357 345236521"
            deliveryAddress="Ammochostou Block-Ground Floor Main Road Limassol, Cyprus"
            onMinimize={() => setViewMode("fullmap")}
          />
        ) : (
          <OrderStatusBar activeStep={activeStep} onTap={toggleView} />
        )}
      </div>
    </ScreensFrame>
  );
}
