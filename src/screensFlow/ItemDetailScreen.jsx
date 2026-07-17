import React, { useState } from "react";
import { IMG } from "./data";
import { useGetItemDetailsQuery } from "../store/storeApiSlice";
import Skeleton from "../../components/Skeleton";
import {
  IcoBack,
  IcoInfo,
  IcoMinus,
  IcoPlus,
} from "./icons";

export function ItemDetailScreen({
  item,
  onBack,
  onAddToCart,
}) {
  const [qty, setQty] = useState(1);
  const [selectedChoices, setSelectedChoices] = useState({});
  const [notes, setNotes] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);

  const { data: itemDetailsRes, isLoading } = useGetItemDetailsQuery({
    categoryId: item.categoryId || 69,
    itemId: item.id,
  });

  const detailedItem = itemDetailsRes?.data;
  console.log("Item Details", detailedItem);

  const handleChoiceClick = (option, choice) => {
    if (option.type === "SingleChoice") {
      setSelectedChoices((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((key) => {
          if (next[key].option_id === option.id) {
            delete next[key];
          }
        });
        next[choice.id] = choice;
        return next;
      });
    } else {
      setSelectedChoices((prev) => {
        const next = { ...prev };
        if (next[choice.id]) {
          delete next[choice.id];
        } else {
          const count = Object.values(next).filter((c) => c.option_id === option.id).length;
          if (option.max === null || option.max === undefined || count < option.max) {
            next[choice.id] = choice;
          }
        }
        return next;
      });
    }
  };

  const basePriceNum = detailedItem?.price ? parseFloat(detailedItem.price) : item.priceNum;
  const extraCost = Object.values(selectedChoices).reduce(
    (sum, c) => sum + parseFloat(c.price || 0),
    0
  );
  const total = ((basePriceNum + extraCost) * qty).toFixed(2);

  const displayImage = detailedItem?.image_url || item.img || IMG.mc1;
  const displayName = detailedItem?.name || item.name;
  const displayPriceText = detailedItem?.price 
    ? `€${parseFloat(detailedItem.price).toFixed(2)}` 
    : item.price;
  const displayDesc = detailedItem?.description || item.desc;

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
            src={displayImage}
            alt={displayName}
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
          {isLoading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <Skeleton height={26} width="60%" style={{ marginBottom: 12 }} />
                <Skeleton height={20} width="30%" style={{ marginBottom: 12 }} />
                <Skeleton height={14} width="100%" style={{ marginBottom: 6 }} />
                <Skeleton height={14} width="85%" />
              </div>
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} style={{ marginTop: 10 }}>
                  <Skeleton height={18} width="40%" style={{ marginBottom: 14 }} />
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <Skeleton height={32} width={120} borderRadius={20} />
                    <Skeleton height={32} width={140} borderRadius={20} />
                    <Skeleton height={32} width={100} borderRadius={20} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
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
                  {displayName}
                </p>
                <button
                  onClick={() => setShowInfoModal(true)}
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
                {displayPriceText}
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
                {displayDesc}
              </p>

              {detailedItem?.options?.map((opt) => (
                <Section key={opt.id} title={opt.name}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {opt.option_choices?.map((choice) => {
                      const on = !!selectedChoices[choice.id];
                      const choicePriceVal = parseFloat(choice.price || 0);
                      const displayPrice = choicePriceVal > 0 
                        ? ` +€${choicePriceVal.toFixed(2)}` 
                        : "";
                      return (
                        <button
                          key={choice.id}
                          onClick={() => handleChoiceClick(opt, choice)}
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
                            {choice.name}{displayPrice}
                          </span>
                          <span
                            style={{
                              width: 16,
                              height: 16,
                              borderRadius: opt.type === "SingleChoice" ? "50%" : "4px",
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
                                  borderRadius: opt.type === "SingleChoice" ? "50%" : "1px",
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
              ))}

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
            </>
          )}
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
          onClick={() => {
            const selIngrList = [];
            let selDrinkVal = "";
            Object.values(selectedChoices).forEach((choice) => {
              const option = detailedItem?.options?.find((o) => o.id === choice.option_id);
              if (option) {
                if (option.type === "SingleChoice") {
                  if (!selDrinkVal) {
                    selDrinkVal = choice.name;
                  } else {
                    selIngrList.push(choice.name);
                  }
                } else {
                  selIngrList.push(choice.name);
                }
              }
            });

            onAddToCart({
              ...item,
              qty,
              selIngr: selIngrList,
              selRemove: [],
              selDrink: selDrinkVal,
              notes,
              priceNum: basePriceNum + extraCost,
            });
          }}
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

      {showInfoModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            background: "rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setShowInfoModal(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 380,
              background: "#ffffff",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
              position: "relative",
              fontFamily: "'Montserrat', sans-serif",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                paddingBottom: 16,
                paddingTop: 16,
                borderBottom: "1px solid #E2E8F0",
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#333333",
                }}
              >
                Product Info
              </span>
              <button
                onClick={() => setShowInfoModal(false)}
                style={{
                  position: "absolute",
                  right: 0,
                  top: "37%",
                  transform: "translateY(-60%)",
                  background: "#F1F5F9",
                  border: "none",
                  borderRadius: "50%",
                  width: 26,
                  height: 26,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "black",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div style={{ display: "flex", flexDirection: "column", gap:14 }}>
              {/* Name & Desc */}
              <div>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: "#333333",
                    margin: "0 0 6px",
                  }}
                >
                  {displayName}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    color: "#A4A4A4",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {displayDesc || "No description available."}
                </p>
              </div>

              {/* Ingredients */}
              <div>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: "#333333",
                    margin: "0 0 6px",
                  }}
                >
                  Ingredients
                </p>
                <p
                  style={{
                    fontSize: 11,
                    color: "#A4A4A4",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {detailedItem?.ingredients 
                    ? (Array.isArray(detailedItem.ingredients) ? detailedItem.ingredients.join(", ") : detailedItem.ingredients)
                    : "N/A"}
                </p>
              </div>

              {/* Allergens */}
              <div>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: "#333333",
                    margin: "0 0 3px",
                  }}
                >
                  Allergens
                </p>
                <p
                  style={{
                    fontSize: 11,
                    color: "#A4A4A4",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {detailedItem?.allergens
                    ? (Array.isArray(detailedItem.allergens) ? detailedItem.allergens.join(", ") : detailedItem.allergens)
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
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
