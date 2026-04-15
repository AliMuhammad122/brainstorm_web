import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../src/screensFlow/Frame";
import { getRestaurantByName } from "../../src/screensFlow/data";
import { MenuScreen } from "../../src/screensFlow/screens";
import { useScreensFlow } from "../../context/ScreensFlowContext";

export default function MenuPage() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/select");
    router.prefetch("/cart");
    router.prefetch("/");
  }, [router]);
  const { state, setActiveItem } = useScreensFlow();

  const restaurant = useMemo(
    () => getRestaurantByName(state.activeRestaurantName),
    [state.activeRestaurantName],
  );

  const cartTotal = useMemo(
    () => state.cartItems.reduce((s, i) => s + i.priceNum * i.qty, 0),
    [state.cartItems],
  );
  const cartCount = state.cartItems.reduce((s, i) => s + i.qty, 0);

  return (
    <ScreensFrame>
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>
        <MenuScreen
          restaurant={restaurant}
          onBack={() => router.push("/")}
          onItemTap={(item) => {
            setActiveItem({ restaurantName: restaurant.name, item });
            router.push("/select");
          }}
          cartCount={cartCount}
          cartTotal={cartTotal}
          onViewOrder={() => router.push("/cart")}
        />
      </div>
    </ScreensFrame>
  );
}
