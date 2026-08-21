import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader } from "../../../src/screensFlow/ui";
import TrackOrderBottomSheet from "../../../components/track-order/TrackOrderBottomSheet";
import OrderStatusBar from "../../../components/track-order/OrderStatusBar";
import OrderCompletedScreen from "../../../components/order-completed/OrderCompletedScreen";
import { useScreensFlow } from "../../../context/ScreensFlowContext";
import { useGetStoresQuery } from "../../../src/store/storeApiSlice";

const TrackOrderMap = dynamic(
  () => import("../../../components/track-order/TrackOrderMap"),
  { ssr: false },
);

const DUMMY_ITEMS = [
  { name: "Wicked Chicken", qty: 1, price: 14.5 },
  { name: "Friday Shrimp", qty: 1, price: 14.5 },
];
const DUMMY_TOTAL = 29.0;

const STEP_CYCLE_MS = 1000000000;

export default function TrackOrderPage() {
  const router = useRouter();
  const { state } = useScreensFlow();
  const { orderType: queryOrderType, restaurant: queryRestaurant, id: queryId } = router.query;

  const orderType = queryOrderType || "delivery";
  const restaurantName = queryRestaurant || "TGI FRIDAY'S";
  const orderNumber = queryId || "#29182";

  const selectedLocation = state?.selectedLocation || { latitude: 34.6786, longitude: 33.0413, address: "Limassol, Cyprus" };

  const { data: storesRes } = useGetStoresQuery({
    latitude: selectedLocation.latitude,
    longitude: selectedLocation.longitude,
  });

  const stores = storesRes?.data?.rows || [];
  const matchedStore = useMemo(() => {
    if (!stores.length) return null;
    const nameToMatch = restaurantName.toLowerCase().replace(/['s]/g, "");
    return stores.find((s) => {
      const storeName = s.name.toLowerCase().replace(/['s]/g, "");
      return storeName.includes(nameToMatch) || nameToMatch.includes(storeName);
    });
  }, [stores, restaurantName]);

  const storeLocation = useMemo(() => {
    if (matchedStore && matchedStore.latitude && matchedStore.longitude) {
      return {
        latitude: parseFloat(matchedStore.latitude),
        longitude: parseFloat(matchedStore.longitude),
        address: matchedStore.address || matchedStore.city || "Cyprus",
      };
    }
    if (restaurantName.toLowerCase().includes("friday")) {
      return { latitude: 34.684, longitude: 33.037, address: "TGI FRIDAY'S Mall, Limassol, Cyprus" };
    }
    if (restaurantName.toLowerCase().includes("olive")) {
      return { latitude: 34.681, longitude: 33.042, address: "Olive Garden, Limassol, Cyprus" };
    }
    return { latitude: 34.684, longitude: 33.037, address: "Limassol, Cyprus" };
  }, [matchedStore, restaurantName]);

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
        const maxStep = orderType === "pickup" ? 2 : 3;
        if (prev >= maxStep) return maxStep;
        return prev + 1;
      });
    }, STEP_CYCLE_MS);
    return () => clearInterval(timer);
  }, [orderType]);

  const toggleView = () => {
    setViewMode((v) => (v === "sheet" ? "fullmap" : "sheet"));
  };

  const maxStep = orderType === "pickup" ? 2 : 3;
  const orderCompleted = activeStep >= maxStep;

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
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1010 }}>
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
          <TrackOrderMap
            height="100%"
            orderType={orderType}
            storeLocation={storeLocation}
            userLocation={selectedLocation}
          />
        </div>

        {/* Bottom sheet OR collapsed status bar */}
        {viewMode === "sheet" ? (
          <TrackOrderBottomSheet
            orderNumber={orderNumber}
            estTime={orderType === "pickup" ? "15 Minutes" : "30 Minutes"}
            activeStep={activeStep}
            restaurantName={restaurantName}
            orderDate="20 November 2025"
            items={cartItems}
            total={total}
            customerName="David Miller"
            customerPhone="357 345236521"
            deliveryAddress={selectedLocation.address}
            orderType={orderType}
            storeAddress={storeLocation.address}
            onMinimize={() => setViewMode("fullmap")}
          />
        ) : (
          <OrderStatusBar activeStep={activeStep} onTap={toggleView} orderType={orderType} />
        )}
      </div>
    </ScreensFrame>
  );
}
