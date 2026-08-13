import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IMG } from "./data";
import { useScreensFlow } from "../../context/ScreensFlowContext";
import { useGetStoresQuery } from "../store/storeApiSlice";
import Skeleton from "../../components/Skeleton";
import { FaStopwatch } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import { Carousel } from "./ui";
import FilterIcon from "../../public/assets/icons/filter.svg"
import SearchIcon from "../../public/assets/icons/search.svg"     
import TimerIcon from "../../public/assets/icons/time.svg"
import DistanceIcon from "../../public/assets/icons/distance.svg"

export function HomeScreen({
  onFilter,
  activeCats,
  activePrice,
  onClear,
  onRestoTap,
}) {
  const { state } = useScreensFlow();
  const selectedLocation = state?.selectedLocation || { latitude: 34.6786, longitude: 33.0413, address: "Limassol, Cyprus" };

  const [searchVal, setSearchVal] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchVal);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchVal]);

  const mapPriceRange = (uiPrice) => {
    if (uiPrice === "Low to High") return "low_to_high";
    if (uiPrice === "High to Low") return "high_to_low";
    if (uiPrice === "Low") return "low";
    if (uiPrice === "High") return "high";
    return undefined;
  };

  const { data: storesRes, isLoading } = useGetStoresQuery({
    offset: 0,
    limit: 20,
    latitude: selectedLocation.latitude,
    longitude: selectedLocation.longitude,
    search: debouncedSearch || undefined,
    price_range: activePrice ? mapPriceRange(activePrice) : undefined,
    category: activeCats.length > 0 ? activeCats[0] : undefined,
  });

  const stores = storesRes?.data?.rows || [];

  // Map API response to UI model
  const list = stores.map((store) => {
    return {
      id: store.id,
      name: store.name || "Restaurant",
      image: store.media?.media_url || IMG.r1,
      delivery: "N/A",
      hours: store.opening_hours && store.closing_hours
        ? `${store.opening_hours}-${store.closing_hours}`
        : "N/A",
      distance: store.distance,
      distNum: store.distance,
      category: store.city || "Cyprus",
      price: "Low"
    };
  });

  // Preserve local sorting behavior
  if (activePrice === "Low to High") {
    list.sort((a, b) => a.distNum - b.distNum);
  } else if (activePrice === "High to Low") {
    list.sort((a, b) => b.distNum - a.distNum);
  }

  const has = activeCats.length > 0 || activePrice !== "";

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: 10,
          padding: "14px 20px 10px",
          background: "var(--bg)",
          flexShrink: 0,
          fontFamily: "'Montserrat',sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            height: 48,
            background: "var(--bg)",
            border: "1px solid var(--border)",
            borderRadius: 1000,
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "0 14px",
          }}
        >
          <SearchIcon width={20} height={20} alt="Search" color="var(--text)" className="theme-icon"/>
          <input
            type="text"
            placeholder="Search restaurant etc"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="placeholder:text-gray-400"
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              fontSize: 14,
              color: "var(--text)",
              fontFamily: "'Montserrat'",
            }}
          />
        <button
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            // background: "var(--surface-alt)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            right:"-15px"
          }}
          onClick={onFilter}
        >
          <FilterIcon width={20} height={20} alt="Filter" className="theme-icon"/>
          {has && (
            <div
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                width: 7,
                height: 7,
                background: "var(--primary)",
                borderRadius: "50%",
                border: "1.5px solid var(--bg)",
              }}
              />
          )}
        </button>
              </div>
      </div>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none",
        }}
      >
        <Carousel />

        <div style={{ padding: "18px 16px 0" }}>
          <div style={{ marginBottom: 14 }}>
            <p
              style={{
                fontSize: 16,
                fontWeight: 400,
                color: "#333333",
                margin: "0 0 6px",
                fontFamily:"'Montserrat',sans-serif"
              }}
            >
              Nearby Restaurants
            </p>
            {has && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {activeCats.length > 0 && (
                  <span
                    style={{
                      background: "var(--surface-alt)",
                      color: "var(--text)",
                      fontSize: 10.5,
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: 20,
                    }}
                  >
                    {activeCats.join(", ")}
                  </span>
                )}
                {activePrice && (
                  <span
                    style={{
                      background: "var(--surface-alt)",
                      color: "var(--text)",
                      fontSize: 10.5,
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: 20,
                    }}
                  >
                    {activePrice}
                  </span>
                )}
                <button
                  onClick={onClear}
                  style={{
                    background: "none",
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                    fontSize: 10.5,
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: 20,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {"\u2715"} Clear
                </button>
              </div>
            )}
          </div>

          {isLoading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--surface)",
                    borderRadius: 18,
                    padding: 12,
                    marginBottom: 16,
                    boxShadow: "0 2px 14px rgba(0,0,0,0.1)",
                  }}
                >
                  <Skeleton height={170} borderRadius={18} style={{ marginBottom: 12 }} />
                  <Skeleton height={20} width="60%" style={{ marginBottom: 8 }} />
                  <Skeleton height={15} width="40%" />
                </div>
              ))}
            </div>
          ) : list.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "48px 0",
                gap: 12,
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  color: "#BBBBBB",
                  fontWeight: 400,
                  margin: 0,
                }}
              >
                No restaurants match filters
              </p>
              <button
                onClick={onClear}
                style={{
                  background: "#DA1A35",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 20,
                  padding: "8px 18px",
                  fontSize: 14,
                  fontWeight: 400,
                  cursor: "pointer",
                  fontFamily: "'Montserrat'",
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            list.map((r) => (
              <div
                key={r.id}
                onClick={() => onRestoTap(r)}
                style={{
                  background: "var(--surface)",
                  borderRadius: 8,
                  overflow: "hidden",
                  marginBottom: 16,
                  // boxShadow: "0 2px 14px rgba(0,0,0,0.2)",
                  cursor: "pointer",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: 170,
                    overflow: "hidden",
                    background: "var(--surface-alt)",
                    position: "relative",
                  }}
                >
                  <img
                    src={r.image}
                    alt={r.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  {/* <div
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 12,
                      background: "rgba(0,0,0,0.52)",
                      backdropFilter: "blur(4px)",
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: 20,
                    }}
                  >
                  </div> */}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "13px 8px 8px",
                    backgroundColor: "var(--bg)"
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: "var(--text)",
                        margin: "0 0 7px",
                        fontFamily:"'Montserrat',sans-serif",
                        lineHeight:"100%"
 
                      }}
                    >
                      {r.name}
                    </p>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 0, marginTop:8 }}
                    >
                      {/* <div
                        style={{
                          width: 3.5,
                          height: 3.5,
                          borderRadius: "50%",
                          background: "var(--border)",
                        }}
                      /> */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                        }}
                      >
                        <TimerIcon width={16} height={16} alt="Timer" color="#BBBBBB" />
                        <span
                          style={{
                            fontSize: 12,
                            color: "#BBBBBB",
                            fontWeight: 400,
                            fontFamily:"'Montserrat',sans-serif"
                          }}
                        >
                          {r.hours}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      flexShrink: 0,
                      marginLeft: 8,
                    }}
                  >
                    <DistanceIcon width={16} height={16} alt="Distance" color="#BBBBBB" />
                    <span
                      style={{ fontSize: 12, fontWeight: 400, color: "#BBBBBB",fontFamily:"'Montserrat',sans-serif" }}
                    >
                      {r.distance + " Km"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
          <div style={{ height: 28 }} />
        </div>
      </div>
    </>
  );
}
