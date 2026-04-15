import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "screensFlowState:v1";

const ScreensFlowContext = createContext(null);

const defaultState = {
  // restaurant
  activeRestaurantName: "TGI FRIDAY'S",

  // item detail selection
  activeItem: null, // { restaurantName, item }

  // cart
  cartItems: [],

  // filters (home)
  activeCats: [],
  activePrice: "",
};

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json);
    return v && typeof v === "object" ? v : fallback;
  } catch {
    return fallback;
  }
}

export function ScreensFlowProvider({ children }) {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const parsed = safeParse(saved, null);
    if (!parsed) return;
    setState((prev) => ({ ...prev, ...parsed }));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const api = useMemo(() => {
    const cartCount = state.cartItems.reduce((s, i) => s + (i.qty || 0), 0);

    return {
      state,
      cartCount,

      // restaurant
      setActiveRestaurantName: (name) =>
        setState((p) => ({ ...p, activeRestaurantName: name })),

      // item detail
      setActiveItem: (payload) => setState((p) => ({ ...p, activeItem: payload })),
      clearActiveItem: () => setState((p) => ({ ...p, activeItem: null })),

      // filters
      applyFilter: (cats, price) =>
        setState((p) => ({ ...p, activeCats: cats, activePrice: price })),
      clearFilter: () => setState((p) => ({ ...p, activeCats: [], activePrice: "" })),

      // cart
      addToCart: (cartItem) =>
        setState((p) => ({
          ...p,
          cartItems: [
            ...p.cartItems,
            { ...cartItem, cartId: Date.now() + Math.random() },
          ],
        })),
      removeCartItem: (idx) =>
        setState((p) => ({
          ...p,
          cartItems: p.cartItems.filter((_, i) => i !== idx),
        })),
      setCartItemQty: (idx, qty) =>
        setState((p) => {
          if (qty < 1) {
            return {
              ...p,
              cartItems: p.cartItems.filter((_, i) => i !== idx),
            };
          }
          return {
            ...p,
            cartItems: p.cartItems.map((it, i) => (i === idx ? { ...it, qty } : it)),
          };
        }),
      clearCart: () => setState((p) => ({ ...p, cartItems: [] })),
    };
  }, [state]);

  return (
    <ScreensFlowContext.Provider value={api}>
      {children}
    </ScreensFlowContext.Provider>
  );
}

export function useScreensFlow() {
  const ctx = useContext(ScreensFlowContext);
  if (!ctx) {
    throw new Error("useScreensFlow must be used within ScreensFlowProvider");
  }
  return ctx;
}

