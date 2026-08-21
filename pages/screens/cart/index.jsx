import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { getRestaurantByName } from "../../../src/screensFlow/data";
import { PageHeader } from "../../../src/screensFlow/ui";
import { useScreensFlow } from "../../../context/ScreensFlowContext";
import { useTheme } from "../../../context/ThemeContext";
import PlusIcon from "../../../public/assets/icons/plus16.svg";
import MinusIcon from "../../../public/assets/icons/minus16.svg";
import AddIcon from "../../../public/assets/icons/add.svg"
import EmptyCart from "../../../public/assets/icons/EmptyCart.svg"

function SwipeCartItem({ item, onRemove, onQtyChange, isDark }) {
  const REVEAL = 75;
  const SNAP_AT = REVEAL * 0.38;

  const [offsetX, setOffsetX] = useState(0);
  const [snapped, setSnapped] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const baseOff = useRef(0);

  const snapOpen = () => {
    setOffsetX(-REVEAL + 12);
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
      .join(", ") || "No Add-ons";

  const CARD_RADIUS = 8;
  const RED = isDark ? "#DA1A35" : "#D00416";

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
          // opacity: ratio,
        }}
      >
        <span
          style={{
            color: "#FFFFFF",
            fontSize: 10,
            fontWeight: 400,
            letterSpacing: '0px',
            transform: `scale(${0.65 + 0.35 * ratio})`,
            transition: isDragging.current ? "none" : "transform 0.25s ease",
            marginLeft:"10px"
          }}
        >
          Remove
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          background: isDark ? "#0D0D1A" : "#FFFFFF",
          border: `1.5px solid ${isDark ? "#2A2A40" : "#F4F6F8"}`,
          borderRadius: CARD_RADIUS,
          overflow: "hidden",
          transform: `translateX(${offsetX}px)`,
          transition: isDragging.current
            ? "none"
            : "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          position: "relative",
          zIndex: 1,
          cursor: isDragging.current ? "grabbing" : "grab",
          userSelect: "none",
          height: 87,
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
      >
        <div
          style={{
            width: 114,
            height: 86,
            flexShrink: 0,
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
              borderRadius: "8px"
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
            padding: "8px 10px",
            minWidth: 0,
            gap:"16px"
          }}
        >
          <div>
            <p
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: isDark ? "#EAEAF2" : "#333333",
                margin: "0 0 2px",
                fontFamily: "'Montserrat',sans-serif",
                lineHeight: 1.2,
                letterSpacing: "0px",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.name}
            </p>
            <p
              style={{
                fontSize: 10,
                color: isDark ? "#9595AA" : "#A4A4A4",
                marginTop: 6,
                lineHeight: 1.2,
                fontFamily: "'Montserrat',sans-serif",
                fontWeight: 400,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {extras}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <p style={{ fontSize: 14, fontWeight: 500, color: isDark ? "#E52E4A" : "#DA1A35", margin: 0, fontFamily: "'Montserrat',sans-serif" }}>
              {"\u20AC"}{(item.priceNum * item.qty).toFixed(2)}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isMinQty) onQtyChange(item.qty - 1);
                }}
                disabled={isMinQty}
                style={{
                  borderRadius: "100%",
                  border: "none",
                  cursor: isMinQty ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isDark ? "#E52E4A1A" : "#DA1A351A",
                  flexShrink: 0,
                }}
              >
              <MinusIcon color={isDark ? "#2A2A40" : "#F4F6F8"} />
              </button>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: isDark ? "#EAEAF2" : "#333333",
                  minWidth: 24,
                  textAlign: "center",
                  fontFamily: "'Montserrat',sans-serif",
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
                  borderRadius: "50%",
                  background: isDark ? "#E52E4A" : "#DA1A35",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <PlusIcon className="w-[16px] h-[16px]" />
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
  const { isDark } = useTheme();

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
        <div style={{ height: 1, background: isDark ? "#2A2A40" : "#F4F6F8" }} />

        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", scrollbarWidth: "none", padding: "0 20px", display: "flex", flexDirection: "column" }}>
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
              <EmptyCart width={136} height={136} color={isDark ? "#252332" : "#A4A4A4"}/>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: isDark ? "#EAEAF2" : "#333333",
                  marginTop: 16,
                  textAlign: "center",
                  fontFamily: "'Montserrat',sans-serif",
                }}
              >
                You haven’t anything cart yet
              </p>
            </div>
          ) : (
            <>
              <div style={{ paddingTop: 16}}>
                {cartItems.map((item, idx) => (
                  <SwipeCartItem
                    key={item.cartId ?? idx}
                    item={item}
                    isDark={isDark}
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
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: 12,
                  fontWeight: 400,
                  color: isDark ? "#E52E4A" : "#DA1A35",
                }}
              >
                <AddIcon />
                <span style={{ marginLeft: 4 }}>Add More Items</span>
              </button>
            </>
          )}
          <div style={{ height: 20 }} />
        </div>

        {cartItems.length > 0 && (
          <div
            style={{
              background: isDark ? "#0D0D1A" : "#FFFFFF",
              padding: "10px 20px 16px",
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
            }}
          >
            <button
              onClick={() => router.push("/checkout")}
              style={{
                width: "100%",
                height: 48,
                borderRadius: 28,
                background: isDark ? "#E52E4A" : "#DA1A35",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 16px",
                fontFamily: "'Montserrat',sans-serif",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: isDark ? "#E52E4A" : "#DA1A35",
                      fontFamily: "'Montserrat',sans-serif",
                      lineHeight: 1,
                    }}
                  >
                    {totalItems}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#FFFFFF",
                    fontFamily: "'Montserrat',sans-serif",
                  }}
                >
                  Continue to Checkout
                </span>
              </div>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#FFFFFF",
                  fontFamily: "'Montserrat',sans-serif",
                }}
              >
                {"\u20AC"}{subtotal.toFixed(2)}
              </span>
            </button>
          </div>
        )}
      </div>
    </ScreensFrame>
  );
}

