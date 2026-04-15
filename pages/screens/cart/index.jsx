import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { getRestaurantByName } from "../../../src/screensFlow/data";
import { PageHeader } from "../../../src/screensFlow/ui";
import { useScreensFlow } from "../../../context/ScreensFlowContext";

function SwipeCartItem({ item, onRemove, onQtyChange }) {
  const REVEAL = 88;
  const SNAP_AT = REVEAL * 0.38;

  const [offsetX, setOffsetX] = useState(0);
  const [snapped, setSnapped] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const baseOff = useRef(0);

  const snapOpen = () => {
    setOffsetX(-REVEAL);
    setSnapped(true);
  };
  const snapClose = () => {
    setOffsetX(0);
    setSnapped(false);
  };
  const settle = (cur) => (Math.abs(cur) >= SNAP_AT ? snapOpen() : snapClose());

  const onTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    baseOff.current = offsetX;
  };
  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    const d = e.touches[0].clientX - startX.current;
    setOffsetX(Math.max(-REVEAL, Math.min(0, baseOff.current + d)));
  };
  const onTouchEnd = () => {
    isDragging.current = false;
    settle(offsetX);
  };

  const onMouseDown = (e) => {
    e.preventDefault();
    isDragging.current = true;
    startX.current = e.clientX;
    baseOff.current = offsetX;
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const d = e.clientX - startX.current;
    setOffsetX(Math.max(-REVEAL, Math.min(0, baseOff.current + d)));
  };
  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    settle(offsetX);
  };

  const ratio = Math.min(1, Math.abs(offsetX) / REVEAL);
  const isMinQty = item.qty <= 1;
  const extras =
    [
      ...(item.selIngr || []),
      ...(item.selRemove || []),
      ...((item.selDrink ? [item.selDrink] : []) || []),
    ]
      .filter(Boolean)
      .join(", ") || "Cheese, Salad, Onion, Garlic";

  const CARD_RADIUS = 16;
  const RED = "var(--primary)";

  return (
    <div
      style={{
        position: "relative",
        marginBottom: 14,
        borderRadius: CARD_RADIUS,
        overflow: "hidden",
        flexShrink: 0,
      }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div
        onClick={onRemove}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: REVEAL,
          background: RED,
          borderRadius: `0 ${CARD_RADIUS}px ${CARD_RADIUS}px 0`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          opacity: 0.15 + 0.85 * ratio,
        }}
      >
        <span
          style={{
            color: "var(--on-primary)",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 0.3,
            transform: `scale(${0.65 + 0.35 * ratio})`,
            transition: isDragging.current ? "none" : "transform 0.25s ease",
          }}
        >
          Remove
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          background: "var(--surface-alt)",
          borderRadius: CARD_RADIUS,
          overflow: "hidden",
          boxShadow: snapped
            ? "0 4px 20px rgba(0,0,0,0.08), -2px 0 12px rgba(218,26,53,0.08)"
            : "0 4px 20px rgba(0,0,0,0.06)",
          transform: `translateX(${offsetX}px)`,
          transition: isDragging.current
            ? "none"
            : "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          position: "relative",
          zIndex: 1,
          cursor: isDragging.current ? "grabbing" : "grab",
          userSelect: "none",
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
      >
        <div
          style={{
            width: 96,
            height: 96,
            flexShrink: 0,
            background: "var(--surface-alt)",
            overflow: "hidden",
            borderRadius: 12,
            margin: 12,
            marginRight: 0,
          }}
        >
          <img
            src={item.img}
            alt={item.name}
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              pointerEvents: "none",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "14px 14px 14px 16px",
            minWidth: 0,
          }}
        >
          <p
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: "var(--text)",
              margin: "0 0 4px",
              letterSpacing: 0.4,
              textTransform: "uppercase",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.name}
          </p>
          <p
            style={{
              fontSize: 11.5,
              color: "var(--muted)",
              margin: "0 0 8px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontWeight: 400,
            }}
          >
            {extras}
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: 2 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: RED, margin: 0, letterSpacing: -0.2 }}>
              {"\u20AC"}{(item.priceNum * item.qty).toFixed(2)}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isMinQty) onQtyChange(item.qty - 1);
                }}
                disabled={isMinQty}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: isMinQty ? "var(--border)" : "var(--primary-soft)",
                  border: "none",
                  cursor: isMinQty ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  opacity: isMinQty ? 0.7 : 1,
                }}
              >
                <svg width="10" height="2" viewBox="0 0 12 2">
                  <line x1="0" y1="1" x2="12" y2="1" stroke={isMinQty ? "var(--subtle)" : RED} strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--muted)",
                  minWidth: 20,
                  textAlign: "center",
                  flexShrink: 0,
                }}
              >
                {String(item.qty).padStart(2, "0")}
              </span>
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  onQtyChange(item.qty + 1);
                }}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: RED,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 2px 8px rgba(218,26,53,0.35)",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 12 12">
                  <line x1="6" y1="0" x2="6" y2="12" stroke="var(--on-primary)" strokeWidth="2" strokeLinecap="round" />
                  <line x1="0" y1="6" x2="12" y2="6" stroke="var(--on-primary)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScreensCartPage() {
  const router = useRouter();
  const { state, setCartItemQty, removeCartItem } = useScreensFlow();

  useEffect(() => {
    router.prefetch("/checkout");
    router.prefetch("/menu");
  }, [router]);

  const restaurantName = state.activeRestaurantName;
  const restaurant = useMemo(() => getRestaurantByName(restaurantName), [restaurantName]);
  const cartItems = state.cartItems;

  const subtotal = cartItems.reduce((s, i) => s + i.priceNum * i.qty, 0);
  const totalItems = cartItems.reduce((s, i) => s + i.qty, 0);

  return (
    <ScreensFrame>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--bg)", position: "relative" }}>
        <PageHeader title="Your Cart" onBack={() => router.back()} />
        <div style={{ height: 1, background: "var(--border-subtle)" }} />

        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", scrollbarWidth: "none", padding: "0 20px" }}>
          {cartItems.length === 0 ? (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 40,
                paddingBottom: 40,
              }}
            >
              <img
                src="/assets/icons/empty_cart.png"
                alt="Empty cart"
                style={{
                  width: 120,
                  height: "auto",
                  display: "block",
                  marginBottom: 32,
                  opacity: 0.9,
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--subtle)",
                  margin: 0,
                  textAlign: "center",
                }}
              >
                You haven't added anything to the cart yet
              </p>
            </div>
          ) : (
            <>
              <div style={{ paddingTop: 16, paddingBottom: 8 }}>
                {cartItems.map((item, idx) => (
                  <SwipeCartItem
                    key={item.cartId ?? idx}
                    item={item}
                    onRemove={() => removeCartItem(idx)}
                    onQtyChange={(qty) => setCartItemQty(idx, qty)}
                  />
                ))}
              </div>
              <button
                onClick={() => router.push("/menu")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "16px 0 24px",
                  fontFamily: "inherit",
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <line x1="6" y1="0" x2="6" y2="12" stroke="var(--on-primary)" strokeWidth="2" strokeLinecap="round" />
                    <line x1="0" y1="6" x2="12" y2="6" stroke="var(--on-primary)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--primary)" }}>Add More Items</span>
              </button>
            </>
          )}
          <div style={{ height: 100 }} />
        </div>

        {cartItems.length > 0 && (
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "16px 20px 28px",
              background: "linear-gradient(to top, var(--bg) 70%, rgba(0,0,0,0))",
              zIndex: 50,
            }}
          >
            <button
              onClick={() => router.push("/checkout")}
              style={{
                width: "100%",
                height: 56,
                borderRadius: 28,
                background: "var(--primary)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                padding: "0 6px 0 4px",
                boxShadow: "0 6px 24px rgba(218,26,53,0.35)",
                fontFamily: "inherit",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  background: "var(--on-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginRight: 12,
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 800, color: "var(--primary)" }}>{totalItems}</span>
              </div>
              <span style={{ flex: 1, textAlign: "center", fontSize: 15, fontWeight: 700, color: "var(--on-primary)", letterSpacing: 0.2 }}>
                Continue to Checkout
              </span>
              <span style={{ fontSize: 15, fontWeight: 700, color: "var(--on-primary)", paddingRight: 6, flexShrink: 0 }}>
                {"\u20AC"}{subtotal.toFixed(2)}
              </span>
            </button>
          </div>
        )}
      </div>
    </ScreensFrame>
  );
}

