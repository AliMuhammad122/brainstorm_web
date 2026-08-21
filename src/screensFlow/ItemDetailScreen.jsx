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
import BackIcon from "../../public/assets/icons/back.svg";
import InfoIcon from "../../public/assets/icons/Prod_Info.svg"
import TickIcon from "../../public/assets/icons/tick-circle.svg"
import CircleTickIcon from "../../public/assets/icons/Choose.svg"
import PlusIcon from "../../public/assets/icons/plus.svg"
import MinusIcon from "../../public/assets/icons/minus.svg"
import CloseIcon from "../../public/assets/icons/close.svg"
import { useTheme } from "../../context/ThemeContext";

export function ItemDetailScreen({
  item,
  onBack,
  onAddToCart,
}) {
  const [qty, setQty] = useState(1);
  const [selectedChoices, setSelectedChoices] = useState({});
  const [notes, setNotes] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { isDark } = useTheme();

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
            borderRadius: "0px 0px 8px 8px",
          }}
        >
          <img
            src={displayImage}
            alt={displayName}
            style={{
              width: "100%",
              height: "95%",
              objectFit: "cover",
              display: "block",
              borderRadius: "0px 0px 8px 8px",
            }}
            onError={(e) => {
              e.target.parentNode.style.background = "var(--surface-alt)";
              e.target.style.display = "none";
            }}
          />
          <button
            onClick={onBack}
            style={{
              position: "absolute",
              top: 16,
              left: 18,
              width: 32,
              height: 32,
              borderRadius: 100000,
              background: isDark ? "#0D0D1A33" : "#FFFFFF33",
              backdropFilter: "blur(2px)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 6,
            }}
          >
            <BackIcon width={20} height={20} alt="" className="text-white" />
          </button>
        </div>

        <div
          style={{
            background: "var(--bg)",
            position: "relative",
            zIndex: 5,
            padding: "0px 20px 0px",
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
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 3,
                }}
              >
                <div className="w-full flex flex-col gap-2" >

                  <p
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      color: isDark ? "#EAEAF2" : "#333333",
                      margin: 0,
                      letterSpacing: "0px",
                      lineHeight: "100%",
                      flex: 1,
                    }}
                  >
                    {displayName}
                  </p>
                  <p
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      color: isDark ? "#E52E4A" : "#DA1A35",
                      margin: "0 0 2px",
                      letterSpacing: "0px",
                    }}
                  >
                    {displayPriceText}
                  </p>
                </div>
                <button
                  onClick={() => setShowInfoModal(true)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    marginTop: 0,
                    flexShrink: 0,
                  }}
                >
                  <InfoIcon width={24} height={24} alt="" className="text-white" />
                </button>
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: isDark ? "#6E6E85" : "#A4A4A4",
                  lineHeight: 1.6,
                  margin: "10px 0 14px",
                  fontWeight: 400,
                  fontFamily: "'Montserrat',sans-serif"
                }}
              >
                {displayDesc}
              </p>

              {detailedItem?.options?.map((opt, index) => (
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
                            padding: "8px 10px 8px 10px",
                            borderRadius: 20,
                            border: `1.5px solid ${isDark ? (on ? "#DA1A351A" : "#2A2A40") : (on ? "#DA1A351A" : "#F4F6F8")}`,
                            background: isDark ? (on ? "#E52E4A1A" : "#0D0D1A") : (on ? "#DA1A351A" : "#FFFFFF"),
                            cursor: "pointer",
                            fontFamily: "'Montserrat',sans-serif",
                            transition: "all 0.15s",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 400,
                              // color: on ? "var(--primary)" : "#A4A4A4"
                              color: isDark
                                ? (on ? "#E52E4A" : "#6E6E85")
                                : (on ? "#DA1A35" : "#A4A4A4"),
                            }}
                          >
                            {choice.name}{displayPrice}
                          </span>
                          {!on ? (
                            <span
                              style={{
                                width: 16,
                                height: 16,
                                borderRadius: "50%",
                                border: `1.5px solid ${isDark ? "#2A2A40" : "#E8E8E8"}`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                background: "transparent",
                              }}
                            />
                          ) : index < 3 ? (
                            <TickIcon width={16} height={16} style={{ flexShrink: 0 }} />
                          ) : (
                            <CircleTickIcon width={16} height={16} style={{ flexShrink: 0 }} />
                          )}
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
                  className="placeholder:text-[#8E8E8E]"
                  style={{
                    width: "100%",
                    minHeight: 50,
                    border: `1.5px solid ${isDark ? "#2A2A40" : "#F4F6F8"}`,
                    borderRadius: 8,
                    padding: "12px 14px",
                    fontSize: 10,
                    color: "var(--muted)",
                    fontFamily: "'Montserrat',sans-serif",
                    resize: "none",
                    outline: "none",
                    background: isDark ? "#0D0D1A" : "#FFFFFF",
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
          background: isDark ? "#0D0D1A" : "#FFFFFF",
          padding: "0px 20px 16px",
          zIndex: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: isDark ? "1.5px solid #2A2A40" : "1.5px solid #F4F6F8",
            borderRadius: 1000,
            padding: "8px 10px 8px 16px",
            background: isDark ? "#0D0D1A" : "#FFFFFF",
            boxSizing: "border-box",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              style={{
                width: 24,
                height: 24,
                borderRadius: "100%",
                background: isDark ? "#E52E4A1A" : "#DA1A351A",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
              }}
            >
              {String(qty).padStart(2, "0")}
            </span>
            <button
              onClick={() => setQty((q) => q + 1)}
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "#DA1A35",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PlusIcon />
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
              height: 48,
              borderRadius: 1000,
              background: isDark ? "#E52E4A" : "#DA1A35",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 14px",
              marginLeft: 16,
              transition: "transform 0.1s",
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "#FFFFFF",
                fontFamily: "'Montserrat',sans-serif",
              }}
            >
              Add to Cart
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "#FFFFFF",
                fontFamily: "'Montserrat',sans-serif",
              }}
            >
              €{total}
            </span>
          </button>
        </div>
      </div>


      {showInfoModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: 370,
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            background: isDark ? "#F0F0F580" : "#00000080",
            backdropFilter: "blur(2px)",
          }}
          onClick={() => setShowInfoModal(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 335,
              background: isDark ? "#0D0D1A" : "#ffffff",
              borderRadius: "8px",
              padding: "8px 16px 14px 16px",
              boxShadow: isDark ? "0 10px 30px rgba(0, 0, 0, 0.45)" : "0 10px 30px rgba(0, 0, 0, 0.15)",
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
                paddingBottom: 12,
                paddingTop: 12,
                borderBottom: `1px solid ${isDark ? "#2A2A40" : "#E2E8F0"}`,
                marginBottom: 14,

              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: isDark ? "#EAEAF2" : "#333333",
                }}
              >
                Product Info
              </span>
              <button
                onClick={() => setShowInfoModal(false)}
                style={{
                  position: "absolute",
                  right: 1,
                  top: "50%",
                  transform: "translateY(-48%)",
                  background: isDark ? "#161625" : "#F1F5F9",
                  border: "none",
                  borderRadius: "50%",
                  width: 20,
                  height: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                  lineHeight: 0,
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <CloseIcon alt="close" color={isDark ? "#555570" : "#333333"} />
              </button>
            </div>

            {/* Content */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Name & Desc */}
              <div>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: isDark ? "#EAEAF2" : "#333333",
                    margin: "0 0 6px",
                  }}
                >
                  {displayName}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    color: isDark ? "#6E6E85" : "#A4A4A4",
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
                    color: isDark ? "#EAEAF2" : "#333333",
                    margin: "0 0 6px",
                  }}
                >
                  Ingredients
                </p>
                <p
                  style={{
                    fontSize: 11,
                    color: isDark ? "#6E6E85" : "#A4A4A4",
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
                    color: isDark ? "#EAEAF2" : "#333333",
                    margin: "0 0 3px",
                  }}
                >
                  Allergens
                </p>
                <p
                  style={{
                    fontSize: 11,
                    color: isDark ? "#6E6E85" : "#A4A4A4",
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

const Section = ({ title, children }) => {
  const { isDark } = useTheme();
  return (
    <div style={{ marginBottom: 14 }}>
      <p
        style={{
          fontSize: 14,
          fontWeight: 400,
          color: isDark ? "#EAEAF2" : "#333333",
          margin: "0 0 10px",
          fontFamily: "'Montserrat',sans-serif",
        }}
      >
        {title}
      </p>
      {children}
    </div>

  )
};
