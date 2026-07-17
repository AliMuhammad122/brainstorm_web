import React, { useEffect, useRef, useState } from "react";
import { IMG } from "./data";
import { useScreensFlow } from "../../context/ScreensFlowContext";
import { useGetMenuCategoriesQuery } from "../store/storeApiSlice";
import Skeleton from "../../components/Skeleton";
import { IcoBack, IcoSearchW } from "./icons";
import { ViewOrderFAB } from "./ui";
import { MdSearch } from "react-icons/md";

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
  const activeTab = selectedCategory || (allTabs.length > 0 ? allTabs[0] : "");

  const scrollRef = useRef(null);
  const sectionRefs = useRef({});
  const [heroVisible, setHeroVisible] = useState(true);
  const HERO_H = 260;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const st = scrollRef.current.scrollTop;
    setHeroVisible(st < HERO_H - 80);
  };

  const handleTabClick = (cat) => {
    setSelectedCategory(cat);
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
            padding: "12px 18px 14px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.35)",
          }}
        >
          <button
            onClick={onBack}
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "var(--surface-alt)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <IcoBack />
          </button>
          <div
            style={{
              flex: 1,
              height: 42,
              background: "var(--surface-alt)",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0 14px",
            }}
          >
            <MdSearch size={20} color="var(--subtle)" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search item"
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                fontSize: 14,
                color: "var(--text)",
                outline: "none",
                fontFamily: "inherit",
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
        <div
          style={{ position: "relative", height: HERO_H, overflow: "hidden" }}
        >
          <img
            src={heroImage}
            alt={restaurant?.name || "Restaurant Menu"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
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
                width: 38,
                height: 38,
                borderRadius: 12,
                background: "rgba(0,0,0,0.35)",
                backdropFilter: "blur(8px)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IcoBack c="#fff" />
            </button>
            <button
              onClick={() => {
                setHeroVisible(false);
                scrollRef.current?.scrollTo({ top: HERO_H, behavior: "smooth" });
              }}
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: "rgba(0,0,0,0.35)",
                backdropFilter: "blur(8px)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IcoSearchW />
            </button>
          </div>
        </div>

        <div
          style={{
            background: "var(--bg)",
            borderRadius: "24px 24px 0 0",
            marginTop: -22,
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
              <span style={{ fontSize: 42 }}>🍽️</span>
              <p style={{ fontSize: 14, color: "var(--subtle)", fontWeight: 500, margin: 0 }}>
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
                  boxShadow: heroVisible ? "none" : "0 2px 16px rgba(0,0,0,0.35)",
                }}
              >
                <p
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: "var(--text)",
                    margin: "0 0 14px",
                    padding: "0 20px",
                    letterSpacing: -0.3,
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
                          padding: "8px 18px",
                          borderRadius: 22,
                          border: `1.5px solid ${on ? "var(--primary)" : "var(--border)"}`,
                          cursor: "pointer",
                          fontFamily: "inherit",
                          fontSize: 13.5,
                          fontWeight: 700,
                          flexShrink: 0,
                          letterSpacing: -0.1,
                          transition: "all 0.2s",
                          background: on ? "var(--primary)" : "var(--surface-alt)",
                          color: on ? "var(--on-primary)" : "var(--muted)",
                        }}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
                <div style={{ height: 1, background: "var(--border-subtle)" }} />
              </div>

              {sections.map((sec) => (
                <div
                  key={sec.category}
                  ref={(el) => (sectionRefs.current[sec.category] = el)}
                  style={{ padding: "22px 0 0" }}
                >
                  <p
                    style={{
                      fontSize: 17,
                      fontWeight: 800,
                      color: "var(--text)",
                      margin: "0 0 14px",
                      padding: "0 20px",
                      letterSpacing: -0.3,
                    }}
                  >
                    {sec.category}
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
                          gap: 14,
                          padding: 12,
                          borderRadius: 16,
                          background: "var(--surface)",
                          marginBottom: 12,
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            width: 100,
                            height: 100,
                            borderRadius: 14,
                            overflow: "hidden",
                            flexShrink: 0,
                            background: "var(--surface-alt)",
                          }}
                        >
                          <img
                            src={it.img}
                            alt={it.name}
                            style={{
                              width: "100%",
                              height: "100%",
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
                          }}
                        >
                          <div>
                            <p
                              style={{
                                fontSize: 12.5,
                                fontWeight: 800,
                                color: "var(--text)",
                                margin: "0 0 5px",
                                letterSpacing: 0.3,
                                lineHeight: 1.3,
                                textTransform: "uppercase",
                              }}
                            >
                              {it.name}
                            </p>
                            <p
                              style={{
                                fontSize: 11,
                                color: "var(--subtle)",
                                margin: "0 0 10px",
                                lineHeight: 1.5,
                              }}
                            >
                              {it.desc}
                            </p>
                          </div>
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 800,
                              color: "var(--primary)",
                              letterSpacing: -0.3,
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

      {onViewOrder && (
        <ViewOrderFAB
          cartCount={cartCount}
          total={cartTotal}
          onTap={onViewOrder}
        />
      )}
    </div>
  );
}
