import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import Image from "next/image";
import {
  ALL_RESTAURANTS,
  CATEGORY_DATA,
  getMenuDataByRestaurantName,
} from "./data";
import {
  IcoBack,
  IcoPlus,
  IcoSearchW,
  IcoInfo,
  IcoMinus,
} from "./icons";

import { GiPathDistance } from "react-icons/gi";
import { FaStopwatch } from "react-icons/fa";

import { Carousel, PageHeader, ViewOrderFAB } from "./ui";
import { MdSearch } from "react-icons/md";
import FilterIcon from "../../public/assets/icons/filter.png";
import DeliveryShip from "../../public/assets/icons/delivery-icon.png";

export function HomeScreen({
  onFilter,
  activeCats,
  activePrice,
  onClear,
  onCatScreen,
  onRestoTap,
}) {
  const has = activeCats.length > 0 || activePrice !== "";
  const list = ALL_RESTAURANTS.filter((r) => {
    if (activeCats.length > 0 && !activeCats.includes(r.category)) return false;
    if (activePrice === "Low" && r.price !== "Low") return false;
    if (activePrice === "High" && r.price !== "High") return false;
    return true;
  }).sort((a, b) => {
    if (activePrice === "Low to High") return a.distNum - b.distNum;
    if (activePrice === "High to Low") return b.distNum - a.distNum;
    return 0;
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: 10,
          padding: "4px 20px 14px",
          background: "var(--bg)",
          flexShrink: 0,
          fontFamily: "'Montserrat',sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            height: 46,
            background: "var(--surface-alt)",
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 16px",
          }}
        >
          <MdSearch size={20} color="var(--subtle)" />
          <span style={{ fontSize: 14, color: "var(--subtle)" }}>
            Search restaurant etc
          </span>
        </div>
        <button
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: "var(--surface-alt)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
          onClick={onFilter}
        >
          <Image
            src={FilterIcon}
            width={18}
            height={18}
            alt="Filter"
            className="theme-icon"
          />
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
                fontSize: 19,
                fontWeight: 800,
                color: "var(--text)",
                margin: "0 0 6px",
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

          {list.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "48px 0",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 42 }}>🍽️</span>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--subtle)",
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                No restaurants match filters
              </p>
              <button
                onClick={onClear}
                style={{
                  background: "var(--text)",
                  color: "var(--on-primary)",
                  border: "none",
                  borderRadius: 20,
                  padding: "9px 22px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
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
                  borderRadius: 18,
                  overflow: "hidden",
                  marginBottom: 16,
                  boxShadow: "0 2px 14px rgba(0,0,0,0.2)",
                  cursor: "pointer",
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
                  <div
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
                    {/* {r.category} */}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "13px 15px 15px",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 14.5,
                        fontWeight: 800,
                        color: "var(--text)",
                        margin: "0 0 7px",
                        letterSpacing: -0.25,
                        lineHeight: 1.25,
                      }}
                    >
                      {r.name}
                    </p>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Image
                          src={DeliveryShip}
                          width={12}
                          height={12}
                          className="theme-icon"
                        />
                        <span
                          style={{
                            fontSize: 11.5,
                            color: "var(--muted)",
                            fontWeight: 500,
                          }}
                        >
                          {r.delivery}
                        </span>
                      </div>
                      <div
                        style={{
                          width: 3.5,
                          height: 3.5,
                          borderRadius: "50%",
                          background: "var(--border)",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <FaStopwatch size={20} color="var(--subtle)" />
                        <span
                          style={{
                            fontSize: 11.5,
                            color: "var(--muted)",
                            fontWeight: 500,
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
                    <GiPathDistance size={15} color="var(--subtle)" />
                    <span
                      style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)" }}
                    >
                      {r.distance}
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

export function CategoryScreen({ onBack, onSelectCat }) {
  const ref = useRef(null);
  const [sc, setSc] = useState(false);
  const { isDark } = useTheme();
  const onScroll = () => {
    if (ref.current) setSc(ref.current.scrollTop > 160);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
            background: sc ? "var(--bg)" : "transparent",
            boxShadow: sc
              ? isDark
                ? "0 2px 16px rgba(0,0,0,0.45)"
                : "0 2px 16px rgba(0,0,0,0.08)"
              : "none",
          transition: "all 0.3s",
          padding: "15px 20px 10px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          pointerEvents: sc ? "auto" : "none",
          opacity: sc ? 1 : 0,
        }}
      >
        <button
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
          }}
          onClick={onBack}
        >
          <IcoBack />
        </button>
          <span style={{ fontSize: 17, fontWeight: 800, color: "var(--text)" }}>
            All Categories
          </span>
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 49,
          padding: "15px 20px 10px",
          display: "flex",
          alignItems: "center",
          opacity: sc ? 0 : 1,
          transition: "opacity 0.3s",
          pointerEvents: sc ? "none" : "auto",
        }}
      >
        <button
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
              background: isDark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.85)",
            backdropFilter: "blur(8px)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={onBack}
        >
          <IcoBack />
        </button>
      </div>

      <div
        ref={ref}
        onScroll={onScroll}
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none",
        }}
      >
        <Carousel />
          <div style={{ padding: "20px 16px 0", background: "var(--bg)" }}>
          <p
            style={{
              fontSize: 19,
              fontWeight: 800,
              color: "var(--text)",
              margin: "0 0 16px",
            }}
          >
            All Categories
          </p>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
          >
            {CATEGORY_DATA.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCat(cat.name)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                    background: "var(--surface)",
                  borderRadius: 20,
                  padding: "16px 12px",
                  border: "none",
                  cursor: "pointer",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: 16,
                    overflow: "hidden",
                    background: cat.color + "22",
                  }}
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
                <p
                  style={{
                    fontSize: 13.5,
                    fontWeight: 700,
                      color: "var(--text)",
                    margin: 0,
                  }}
                >
                  {cat.name}
                </p>
              </button>
            ))}
          </div>
          <div style={{ height: 28 }} />
        </div>
      </div>
    </div>
  );
}

/* Item detail / select screen (same as original) */
export function ItemDetailScreen({
  item,
  restaurantName,
  onBack,
  onAddToCart,
}) {
  const [qty, setQty] = useState(1);
  const [selIngr, setSelIngr] = useState([]);
  const [selRemove, setSelRemove] = useState([]);
  const [selDrink, setSelDrink] = useState("");
  const [notes, setNotes] = useState("");

  const toggleIngr = (n) =>
    setSelIngr((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));
  const toggleRemove = (n) =>
    setSelRemove((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  const extraCost = item.ingredients
    .filter((i) => selIngr.includes(i.name))
    .reduce((acc, i) => acc + parseFloat(i.price.replace("€", "")), 0);

  const total = ((item.priceNum + extraCost) * qty).toFixed(2);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "var(--bg)",
        fontFamily: "'Montserrat',sans-serif",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none",
        }}
      >
        <div
          style={{
            position: "relative",
            height: 260,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={item.img}
            alt={item.name}
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
                "linear-gradient(to bottom,rgba(0,0,0,0.35) 0%,rgba(0,0,0,0) 45%,rgba(0,0,0,0.05) 100%)",
            }}
          />
          <button
            onClick={onBack}
            style={{
              position: "absolute",
              top: 16,
              left: 18,
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
              zIndex: 6,
            }}
          >
            <IcoBack c="#fff" />
          </button>
        </div>

        <div
          style={{
            background: "var(--bg)",
            borderRadius: "22px 22px 0 0",
            marginTop: -20,
            position: "relative",
            zIndex: 5,
            padding: "22px 20px 120px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <p
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: "var(--text)",
                margin: 0,
                letterSpacing: 0.2,
                lineHeight: 1.2,
                flex: 1,
                paddingRight: 10,
              }}
            >
              {item.name}
            </p>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 2,
                marginTop: 2,
                flexShrink: 0,
              }}
            >
              <IcoInfo />
            </button>
          </div>
          <p
            style={{
              fontSize: 20,
              fontWeight: 900,
              color: "var(--primary)",
              margin: "0 0 12px",
              letterSpacing: -0.3,
            }}
          >
            {item.price}
          </p>
          <p
            style={{
              fontSize: 13,
              color: "var(--muted)",
              lineHeight: 1.6,
              margin: "0 0 24px",
              fontWeight: 400,
            }}
          >
            {item.desc}
          </p>

          <Section title="Ingredients">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {item.ingredients.map((ing) => {
                const on = selIngr.includes(ing.name);
                return (
                  <button
                    key={ing.name}
                    onClick={() => toggleIngr(ing.name)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "7px 12px 7px 14px",
                      borderRadius: 20,
                      border: `1.5px solid ${on ? "var(--primary)" : "var(--border)"}`,
                      background: on ? "var(--primary-soft)" : "var(--surface)",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "all 0.15s",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: on ? "var(--primary)" : "var(--muted)",
                      }}
                    >
                      {ing.name} {ing.price}
                    </span>
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        border: `1.5px solid ${on ? "var(--primary)" : "var(--border)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        background: on ? "var(--primary)" : "transparent",
                      }}
                    >
                      {on && (
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "var(--on-primary)",
                            display: "block",
                          }}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title="Removeable Ingredients">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {item.removeable.map((r) => {
                const on = selRemove.includes(r.name);
                return (
                  <button
                    key={r.name}
                    onClick={() => toggleRemove(r.name)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "7px 12px 7px 14px",
                      borderRadius: 20,
                      border: `1.5px solid ${on ? "var(--primary)" : "var(--border)"}`,
                      background: on ? "var(--primary-soft)" : "var(--surface)",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "all 0.15s",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: on ? "var(--primary)" : "var(--muted)",
                      }}
                    >
                      {r.name}
                    </span>
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        border: `1.5px solid ${on ? "var(--primary)" : "var(--border)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        background: on ? "var(--primary)" : "transparent",
                      }}
                    >
                      {on && (
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "var(--on-primary)",
                            display: "block",
                          }}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title="Choose your Drink">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {item.drinks.map((d) => {
                const on = selDrink === d.name;
                return (
                  <button
                    key={d.name}
                    onClick={() => setSelDrink(on ? "" : d.name)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "7px 12px 7px 14px",
                      borderRadius: 20,
                      border: `1.5px solid ${on ? "var(--primary)" : "var(--border)"}`,
                      background: on ? "var(--primary-soft)" : "var(--surface)",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "all 0.15s",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: on ? "var(--primary)" : "var(--muted)",
                      }}
                    >
                      {d.name}
                    </span>
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        border: `1.5px solid ${on ? "var(--primary)" : "var(--border)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        background: on ? "var(--primary)" : "transparent",
                      }}
                    >
                      {on && (
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "var(--on-primary)",
                            display: "block",
                          }}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title="Optional Notes">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes on your request"
              style={{
                width: "100%",
                minHeight: 80,
                border: "1.5px solid var(--border)",
                borderRadius: 14,
                padding: "12px 14px",
                fontSize: 12.5,
                color: "var(--muted)",
                fontFamily: "inherit",
                resize: "none",
                outline: "none",
                background: "var(--surface)",
                lineHeight: 1.5,
                boxSizing: "border-box",
              }}
            />
          </Section>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "var(--bg)",
          borderTop: "1px solid var(--border-subtle)",
          padding: "12px 18px 18px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          zIndex: 30,
          boxShadow: "0 -4px 24px rgba(0,0,0,0.08)",
        }}
      >

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "var(--surface-alt)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IcoMinus />
          </button>
          <span
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: "var(--text)",
              minWidth: 22,
              textAlign: "center",
            }}
          >
            {String(qty).padStart(2, "0")}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "var(--primary)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 3px 10px rgba(218,26,53,0.4)",
            }}
          >
            <IcoPlus c="var(--on-primary)" size={12} />
          </button>
        </div>
        <button
          onClick={() =>
            onAddToCart({ ...item, qty, selIngr, selRemove, selDrink, notes })
          }
          style={{
            flex: 1,
            height: 50,
            borderRadius: 25,
            background: "var(--primary)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 18px",
            boxShadow: "0 6px 20px rgba(218,26,53,0.4)",
            transition: "transform 0.1s",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: "var(--on-primary)",
              letterSpacing: 0.1,
            }}
          >
            Add to Cart
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: "var(--on-primary)",
              letterSpacing: 0.1,
            }}
          >
            €{total}
          </span>
        </button>
      </div>
    </div>
  );
}

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 22 }}>
    <p
      style={{
        fontSize: 15,
        fontWeight: 800,
        color: "var(--text)",
        margin: "0 0 12px",
        letterSpacing: -0.2,
      }}
    >
      {title}
    </p>
    {children}
  </div>
);

export function MenuScreen({
  restaurant,
  onBack,
  onItemTap,
  cartCount = 0,
  cartTotal = 0,
  onViewOrder,
}) {
  const menuData = getMenuDataByRestaurantName(restaurant.name);
  const sections = menuData.sections;
  const catNames = sections.map((s) => s.category);
  const [activeTab, setActiveTab] = useState(catNames[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef(null);
  const sectionRefs = useRef({});
  const [heroVisible, setHeroVisible] = useState(true);
  const HERO_H = 260;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const st = scrollRef.current.scrollTop;
    setHeroVisible(st < HERO_H - 80);
    let cur = catNames[0];
    catNames.forEach((cat) => {
      const el = sectionRefs.current[cat];
      if (el && st >= el.offsetTop - 130) cur = cat;
    });
    setActiveTab(cur);
  };

  const scrollTo = (cat) => {
    setActiveTab(cat);
    const el = sectionRefs.current[cat];
    if (el && scrollRef.current)
      scrollRef.current.scrollTo({
        top: el.offsetTop - 120,
        behavior: "smooth",
      });
  };

  const filteredSections = searchQuery.trim()
    ? sections.map((sec) => ({
        ...sec,
        items: sec.items.filter(
          (it) =>
            it.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (it.desc && it.desc.toLowerCase().includes(searchQuery.toLowerCase()))
        ),
      })).filter((s) => s.items.length > 0)
    : sections;

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
            src={menuData.hero}
            alt={restaurant.name}
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
                "linear-gradient(to bottom,rgba(0,0,0,0.3) 0%,rgba(0,0,0,0) 40%,rgba(0,0,0,0.08) 100%)",
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
              {catNames.map((cat) => {
                const on = activeTab === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => scrollTo(cat)}
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

          {filteredSections.map((sec) => (
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
              {sec.items.map((it, idx) => (
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

/* Cart + Checkout are unchanged (ported from original) but kept in pages for brevity */
export function CartScreenShell({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "var(--bg)",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}
