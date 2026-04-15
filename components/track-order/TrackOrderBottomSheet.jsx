import React, { useState, useRef, useCallback } from "react";
import OrderProgressStepper from "./OrderProgressStepper";
import OrderSummaryCard from "./OrderSummaryCard";
import DeliveryAddressCard from "./DeliveryAddressCard";

export default function TrackOrderBottomSheet({
  orderNumber = "#29182",
  estTime = "30 Minutes",
  activeStep = 1,
  restaurantName = "TGI FRIDAY'S",
  orderDate = "20 November 2025",
  items = [],
  total = 0,
  customerName = "David Miller",
  customerPhone = "357 345236521",
  deliveryAddress = "Ammochostou Block-Ground Floor Main Road Limassol, Cyprus",
  onMinimize,
}) {
  const COLLAPSED_HEIGHT = 380; // Enough to show Stepper
  const EXPANDED_EXTRA = 220; // Enough to show rest of the scroll

  const [sheetHeight, setSheetHeight] = useState(COLLAPSED_HEIGHT);
  const dragStartY = useRef(null);
  const dragStartH = useRef(null);

  const swipeThresholdToClose = COLLAPSED_HEIGHT - 60;

  const handlePointerDown = (clientY) => {
    dragStartY.current = clientY;
    dragStartH.current = sheetHeight;
  };

  const handlePointerMove = (clientY) => {
    if (dragStartY.current == null) return;
    const dy = dragStartY.current - clientY;
    // Allow dragging slightly below collapsed to trigger close
    let newH = dragStartH.current + dy;
    if (newH > COLLAPSED_HEIGHT + EXPANDED_EXTRA) newH = COLLAPSED_HEIGHT + EXPANDED_EXTRA;
    setSheetHeight(newH);
  };

  const handlePointerUp = () => {
    if (dragStartY.current == null) return;

    if (sheetHeight < swipeThresholdToClose) {
      // Swiped down far enough to hide completely
      if (onMinimize) onMinimize();
      setSheetHeight(COLLAPSED_HEIGHT); // reset for next open
    } else {
      // Snap to either collapsed or expanded
      const mid = COLLAPSED_HEIGHT + EXPANDED_EXTRA / 2;
      if (sheetHeight > mid) {
        setSheetHeight(COLLAPSED_HEIGHT + EXPANDED_EXTRA);
      } else {
        setSheetHeight(COLLAPSED_HEIGHT);
      }
    }
    dragStartY.current = null;
  };

  const onTouchStart = useCallback((e) => handlePointerDown(e.touches[0].clientY), [sheetHeight]);
  const onTouchMove = useCallback((e) => handlePointerMove(e.touches[0].clientY), [sheetHeight]);
  const onTouchEnd = useCallback(handlePointerUp, [sheetHeight, onMinimize]);

  const onMouseDown = useCallback((e) => {
    handlePointerDown(e.clientY);
    const onMove = (ev) => handlePointerMove(ev.clientY);
    const onUp = () => {
      handlePointerUp();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [sheetHeight, onMinimize]);

  return (
    <div
      style={{
        position: "fixed",
        // Using larger margin + safe-area variable (or fallback) to avoid browser nav bars
        bottom: "max(16px, env(safe-area-inset-bottom, 16px))",
        left: 16,
        right: 16,
        height: Math.max(0, sheetHeight),
        background: "var(--surface)",
        borderRadius: 20,
        boxShadow: "0 -4px 30px rgba(0,0,0,0.15)",
        transition: dragStartY.current != null ? "none" : "height 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Drag handle */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        style={{
          padding: "12px 0 8px",
          cursor: "grab",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
          position: "relative",
          touchAction: "none"
        }}
      >
        <div
          style={{
            width: 44,
            height: 4,
            borderRadius: 2,
            background: "var(--border)",
          }}
        />
        {/* The chevron close button as seen in design (in the pill view it's up, here we can keep it as a close button or just omit it since swipe handles it. Original had a button here.) */}
        <button
          type="button"
          onClick={onMinimize}
          style={{
            position: "absolute",
            right: 14,
            top: 6,
            width: 30,
            height: 30,
            borderRadius: "50%",
            border: "none",
            background: "var(--surface-alt)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--subtle)",
          }}
          aria-label="Minimize order details"
        >
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
            <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 24px 24px",
        }}
        onPointerDown={(e) => e.stopPropagation()} // Prevent content drag interfering
      >
        {/* Order number + EST time */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 500, color: "var(--text)" }}>
            {orderNumber}
          </span>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 11, fontWeight: 500, color: "var(--text)", margin: "0 0 2px", letterSpacing: 0.5 }}>
              EST.TIME
            </p>
            <p style={{ fontSize: 13, fontWeight: 400, color: "var(--subtle)", margin: 0 }}>
              {estTime}
            </p>
          </div>
        </div>

        <div style={{ height: 1, background: "var(--border-subtle)", marginBottom: 26 }} />

        {/* Progress stepper */}
        <div style={{ marginBottom: 30 }}>
          <OrderProgressStepper activeStep={activeStep} />
        </div>

        {/* Order summary */}
        <OrderSummaryCard
          restaurantName={restaurantName}
          date={orderDate}
          items={items}
          total={total}
        />

        {/* Delivery address */}
        <DeliveryAddressCard
          name={customerName}
          phone={customerPhone}
          address={deliveryAddress}
        />
      </div>
    </div>
  );
}
