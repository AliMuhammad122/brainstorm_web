import { useEffect } from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { ItemDetailScreen } from "../../../src/screensFlow/screens";
import { useScreensFlow } from "../../../context/ScreensFlowContext";

export default function ScreensSelectPage() {
  const router = useRouter();
  const { state, addToCart, clearActiveItem } = useScreensFlow();

  useEffect(() => {
    router.prefetch("/cart");
    router.prefetch("/menu");
  }, [router]);

  useEffect(() => {
    if (!state.activeItem) router.replace("/menu");
  }, [router, state.activeItem]);

  if (!state.activeItem) return null;

  const { restaurantName, item } = state.activeItem;

  return (
    <ScreensFrame>
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>
        <ItemDetailScreen
          item={item}
          restaurantName={restaurantName}
          onBack={() => router.back()}
          onAddToCart={(cartItem) => {
            addToCart(cartItem);
            clearActiveItem();
            router.push("/cart");
          }}
        />
      </div>
    </ScreensFrame>
  );
}

