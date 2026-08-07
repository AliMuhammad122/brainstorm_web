import React, { useEffect, useRef, useState } from "react";
import { IMG } from "./data";
import { useScreensFlow } from "../../context/ScreensFlowContext";
import { useGetMenuCategoriesQuery } from "../store/storeApiSlice";
import Skeleton from "../../components/Skeleton";
import { IcoSearchW } from "./icons";
import { ViewOrderFAB } from "./ui";
import { MdSearch } from "react-icons/md";
import BackIcon from "../../public/assets/icons/back.svg"
import SearchIcon from "../../public/assets/icons/search.svg"
import SearchIcon2 from "../../public/assets/icons/search2.svg"

const formatCategoryName = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function MenuScreen({
  restaurant,
  onBack,
  onItemTap,
  cartCount = 0,
  cartTotal = 0,
  onViewOrder,
}) {
  const { state } = useScreensFlow();
  const storeId = state?.activeRestaurantId || 555;

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch all categories to populate category tabs bar
  const { data: allCatsRes } = useGetMenuCategoriesQuery({ storeId });
  const allTabs = allCatsRes?.data?.rows?.map((c) => c.name) || [];

  // Fetch items based on active search text or category tab click
  const { data: catRes, isLoading } = useGetMenuCategoriesQuery({
    storeId,
    search: debouncedSearch ? debouncedSearch : (selectedCategory || undefined),
  });

  const rawCategories = catRes?.data?.rows || [];

  const sections = rawCategories.map((cat) => ({
    category: cat.name,
    items: (cat.items || []).map((it) => ({
      id: it.id,
      categoryId: cat.id,
      name: it.name,
      desc: it.description || "",
      img: it.image_url || IMG.mc1,
      price: `€${parseFloat(it.price || 0).toFixed(2)}`,
      priceNum: parseFloat(it.price || 0),
      ingredients: [],
      removeable: [],
      drinks: [],
    })),
  }));

 

  const catNames = sections.map((s) => s.category);
  const activeTab = selectedCategory;

  const scrollRef = useRef(null);
  const sectionRefs = useRef({});
  const [heroVisible, setHeroVisible] = useState(true);
  const HERO_H = 260;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const st = scrollRef.current.scrollTop;
    if (heroVisible && st >= HERO_H - 80) {
      setHeroVisible(false);
    }
  };
  const HeroVisibleOn = () => {
    setHeroVisible(true);
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleTabClick = (cat) => {
    setSelectedCategory((prev) => (prev === cat ? "" : cat));
    setSearchQuery(""); // Clear text search when selecting category tab
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: HERO_H - 50,
        behavior: "smooth",
      });
    }
  };

  const heroImage = state?.activeRestaurantImage || restaurant?.image || IMG.h1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        background: "var(--bg)",
        fontFamily: "'Montserrat',sans-serif",
      }}
    >
      {!heroVisible && (
        <div
          style={{
            position: "sticky",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: "var(--bg)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 18px 10px",
            // boxShadow: "0 2px 16px rgba(0,0,0,0.35)",
            borderBottom:"1px solid #F4F6F8"
          }}
        >
          <button
            onClick={HeroVisibleOn}
            style={{
              width: 32,
              height: 32,
              borderRadius: 1000000,
              background: "#F4F6F8",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <BackIcon width={20} height={20} alt="" className="text-black" />
          </button>
          <div
            style={{
              flex: 1,
              height: 32,
              background: "#F4F6F8",
              borderRadius: 1000000,
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0 14px",
            }}
          >
            <SearchIcon2  alt="" className="text-[#A4A4A4]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search item"
              className="placeholder:text-gray-400"
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                fontSize: 10,
                // color: "red",
                outline: "none",
                fontFamily: "'Montserrat',sans-serif",
              }}
            />
          </div>
        </div>
      )}

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none",
          position: "relative",

        }}
      >
        {heroVisible && (
          <div
            style={{ position: "relative", height: HERO_H, overflow: "hidden",borderBottomLeftRadius: "10px",borderBottomRightRadius: "10px", }}
          >
            <img
              src={heroImage}
              alt={restaurant?.name || "Restaurant Menu"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                // borderRadius: "24px 24px 10px 10px",
              }}
              onError={(e) => {
                e.target.parentNode.style.background = "var(--surface-alt)";
                e.target.style.display = "none";
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
              background:
                "linear-gradient(to bottom,rgba(0,0,0,0.3) 0%,rgba(0,0,0,0) 45%,rgba(0,0,0,0.08) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                padding: "16px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                zIndex: 4,
              }}
            >
              <button
                onClick={onBack}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10000,
                  background: "#FFFFFF33",
                  backdropFilter: "blur(4px)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BackIcon width={20} height={20} alt="" className="text-white" />
              </button>
              <button
                onClick={() => {
                  setHeroVisible(false);
                }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10000,
                  background: "#FFFFFF33",
                  backdropFilter: "blur(4px)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SearchIcon width={20} height={20} alt="" className="text-white" />
              </button>
            </div>
          </div>
        )}

        <div
          style={{
            background: "var(--bg)",
            borderRadius: "24px 24px 0 0",
            // marginTop: 12,
            position: "relative",
            zIndex: 5,
            paddingBottom: 100,
          }}
        >
          {isLoading ? (
            <div style={{ padding: "20px" }}>
              <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 16, marginBottom: 16 }}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} width={80} height={32} borderRadius={22} style={{ flexShrink: 0 }} />
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, padding: 12, background: "var(--surface)", borderRadius: 16 }}>
                    <Skeleton width={100} height={100} borderRadius={14} style={{ flexShrink: 0 }} />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <Skeleton height={18} width="70%" style={{ marginBottom: 8 }} />
                        <Skeleton height={14} width="50%" />
                      </div>
                      <Skeleton height={16} width="30%" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : sections.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 20px", gap: 12 }}>
              <p style={{ fontSize: 14, color: "var(--subtle)", fontWeight: 400, margin: 0, fontFamily: "'Montserrat',sans-serif" }}>
                No items found
              </p>
            </div>
          ) : (
            <>
              <div
                style={{
                  position: "sticky",
                  top: 0,
                  background: "var(--bg)",
                  zIndex: 10,
                  paddingTop: 20,
                  // boxShadow: heroVisible ? "none" : "0 2px 16px rgba(0,0,0,0.35)",
                }}
              >
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: "#333333",
                    margin: "0 0 14px",
                    padding: "0 20px",
                    fontFamily: "'Montserrat',sans-serif",
                    letterSpacing:"0px"
                  }}
                >
                  Categories
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    overflowX: "auto",
                    scrollbarWidth: "none",
                    padding: "0 20px 16px",
                  }}
                >
                  {(allTabs.length > 0 ? allTabs : catNames).map((cat) => {
                    const on = activeTab === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => handleTabClick(cat)}
                        style={{
                          padding: "11px 14px",
                          borderRadius: 32,
                          border: `1.5px solid ${on ? "#DA1A351A" : "#F4F6F8"}`,
                          cursor: "pointer",
                          fontFamily: "'Montserrat',sans-serif",
                          fontSize: 14,
                          fontWeight: on? 500 : 400,
                          flexShrink: 0,
                          transition: "all 0.2s",
                          background: on ? "#fbe8eb" : "#FFFFFF",
                          color: on ? "#DA1A35" : "#A4A4A4",
                        }}
                      >
                        {formatCategoryName(cat)}
                      </button>
                    );
                  })}
                </div>
                {/* <div style={{ height: 1, background: "var(--border-subtle)" }} /> */}
              </div>

              {sections.map((sec) => (
                <div
                  key={sec.category}
                  ref={(el) => (sectionRefs.current[sec.category] = el)}
                >
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: 400,
                      color: "#333333",
                      margin: "0 0 14px",
                      padding: "0 20px",
                      letterSpacing: 0,
                      fontFamily:"'Montserrat',sans-serif",
                    }}
                  >
                    {formatCategoryName(sec.category)}
                  </p>
                  {sec.items.map((it) => (
                    <div key={it.id} style={{ padding: "0 20px" }}>
                      <div
                        onClick={() => onItemTap(it)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && onItemTap(it)}
                        style={{
                          display: "flex",
                          height: 97,
                          background: "#FFFFFF",
                          border: "1.5px solid #F4F6F8",
                          borderRadius: 8,
                          marginBottom: 10,
                          cursor: "pointer",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: 120,
                            height: 97,
                            flexShrink: 0,
                            borderRadius:8,
                            background: "#F4F6F8",
                          }}
                        >
                          <img
                            src={it.img}
                            alt={it.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius:8,
                              objectFit: "cover",
                              display: "block",
                            }}
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        </div>
                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            minWidth: 0,
                            padding: "8px 10px",
                            
                          }}
                        >
                          <div>
                            <p
                              style={{
                                fontSize: 14,
                                fontWeight: 400,
                                color: "#333333",
                                margin: "0 0 2px",
                                fontFamily: "'Montserrat',sans-serif",
                                lineHeight: 1.2,
                                letterSpacing: "0px",
                                textTransform: "uppercase",
                              }}
                            >
                              {it.name}
                            </p>
                            <p
                              style={{
                                fontSize: 10,
                                color: "#A4A4A4",
                                margin: "4px 0px 4px",
                                lineHeight: 1.2,
                                fontFamily: "'Montserrat',sans-serif",
                                fontWeight: 400,
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {it.desc}
                            </p>
                          </div>
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              color: "#DA1A35",
                              fontFamily: "'Montserrat',sans-serif",
                            }}
                          >
                            {it.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {onViewOrder && cartCount > 0 && (
        <ViewOrderFAB
          cartCount={cartCount}
          total={cartTotal}
          onTap={onViewOrder}
        />
      )}
    </div>
  );
}
