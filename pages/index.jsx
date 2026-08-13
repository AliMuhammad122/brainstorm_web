import { useState } from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../src/screensFlow/Frame";
import { getRestaurantByName } from "../src/screensFlow/data";
import { HomeScreen } from "../src/screensFlow/screens";
import { AppChrome, Drawer, FilterModal } from "../src/screensFlow/ui";
import { useScreensFlow } from "../context/ScreensFlowContext";

export default function HomePage() {
  const router = useRouter();

  const { state, cartCount, applyFilter, clearFilter, setActiveRestaurant } =
    useScreensFlow();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const defaultResto = getRestaurantByName(state.activeRestaurantName);

  return (
    <ScreensFrame>
      {filterOpen && (
        <FilterModal
          onClose={() => setFilterOpen(false)}
          onApply={(cats, price) => applyFilter(cats, price)}
          initCats={state.activeCats}
          initPrice={state.activePrice}
        />
      )}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onHome={() => {
          setDrawerOpen(false);
          router.push("/");
        }}
        onOrdersHistory={() => {
          setDrawerOpen(false);
          router.push("/screens/order-history");
        }}
        onLoyaltyRewards={() => {
          setDrawerOpen(false);
          router.push("/screens/rewards");
        }}
        onMenuScreen={() => {
          setDrawerOpen(false);
          setActiveRestaurant(defaultResto.name, defaultResto.id, defaultResto.image);
          router.push("/menu");
        }}
        onCatScreen={() => {
          setDrawerOpen(false);
          router.push("/categories");
        }}
      />

      <AppChrome
        cart={cartCount}
        onMenu={() => setDrawerOpen(true)}
        onCartTap={() => router.push("/cart")}
      />

      <div
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <HomeScreen
          onFilter={() => setFilterOpen(true)}
          activeCats={state.activeCats}
          activePrice={state.activePrice}
          onClear={clearFilter}
          onCatScreen={() => router.push("/categories")}
          onRestoTap={(r) => {
            setActiveRestaurant(r.name, r.id, r.image);
            router.push("/menu");
          }}
        />
      </div>
    </ScreensFrame>
  );
}
