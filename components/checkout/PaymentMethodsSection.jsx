import React from "react";
import { RadioDot } from "../../src/screensFlow/ui";

const MCLogo = () => (
  <div style={{ position: "relative", width: 40, height: 24, flexShrink: 0 }}>
    <div
      style={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: "#EB001B",
        position: "absolute",
        left: 0,
        top: 0,
      }}
    />
    <div
      style={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: "#F79E1B",
        position: "absolute",
        left: 16,
        top: 0,
        mixBlendMode: "multiply",
      }}
    />
  </div>
);

const GPayLogo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
    <span style={{ fontSize: 12, fontWeight: 800, fontFamily: "Arial,sans-serif", letterSpacing: -0.3 }}>
      <span style={{ color: "#4285F4" }}>G</span>
      <span style={{ color: "#EA4335" }}>o</span>
      <span style={{ color: "#FBBC04" }}>o</span>
      <span style={{ color: "#4285F4" }}>g</span>
      <span style={{ color: "#34A853" }}>l</span>
      <span style={{ color: "#EA4335" }}>e</span>
    </span>
    <span style={{ fontSize: 12, fontWeight: 500, color: "var(--muted)", marginLeft: 3 }}> Pay</span>
  </div>
);

const APayLogo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--text)" }}>
    <svg width="13" height="16" viewBox="0 0 13 16" fill="none">
      <path d="M10.8 8.4c0-2.2 1.8-3.3 1.8-3.3S11.6 3.6 10 3.6c-1.1 0-2.1.7-2.7.7-.6 0-1.5-.7-2.4-.7C3.1 3.6 1.2 5.1 1.2 7.9 1.2 10.9 2.9 14 4.2 14c.8 0 1.5-.6 2.4-.6.9 0 1.3.6 2.4.6 1.4 0 3.1-3.2 3.1-3.2S10.8 10.4 10.8 8.4z" fill="currentColor" />
      <path d="M8.7 2.2c.5-.6.8-1.4.7-2.2C8.7 0 7.8.5 7.3 1c-.5.5-.8 1.2-.7 2 .7.1 1.6-.2 2.1-.8z" fill="currentColor" />
    </svg>
    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>Pay</span>
  </div>
);

const PAYMENT_OPTIONS = [
  { id: "gpay", label: "Google Pay", Logo: GPayLogo },
  { id: "apple", label: "Apple Pay", Logo: APayLogo },
  { id: "card", label: "Credit/Debit Cards", Logo: MCLogo },
];

/**
 * Payment method list with radio selection. When card selected, shows saved card or Add Card CTA.
 */
export default function PaymentMethodsSection({
  selectedId,
  onSelect,
  savedCard,
  onAddCard,
}) {
  const hasCard = savedCard && savedCard.last4;

  return (
    <div style={{ marginBottom: 22 }}>
      <span
        style={{
          fontSize: 16,
          fontWeight: 800,
          color: "var(--text)",
          letterSpacing: -0.35,
          display: "block",
          marginBottom: 14,
        }}
      >
        Payment Methods
      </span>
      {PAYMENT_OPTIONS.map((pm, i) => (
        <div
          key={pm.id}
          style={{
            borderBottom: i < PAYMENT_OPTIONS.length - 1 ? "1px solid var(--border-subtle)" : "none",
          }}
        >
          <button
            type="button"
            onClick={() => onSelect(pm.id)}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              padding: "14px 2px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              textAlign: "left",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexShrink: 0,
              }}
            >
              <pm.Logo />
            </div>
            <span
              style={{
                flex: 1,
                fontSize: 14,
                fontWeight: selectedId === pm.id ? 600 : 400,
                color: selectedId === pm.id ? "var(--text)" : "var(--muted)",
                letterSpacing: -0.1,
              }}
            >
              {pm.label}
            </span>
            <RadioDot active={selectedId === pm.id} activeColor="var(--primary)" />
          </button>
          {pm.id === "card" && selectedId === "card" && (
            <div style={{ padding: "0 2px 14px 0" }}>
              {hasCard ? (
                <div
                  style={{
                    width: "100%",
                    border: "1.5px solid var(--border)",
                    borderRadius: 16,
                    padding: "16px 16px 14px",
                    background: "var(--surface)",
                  }}
                >
                  {/* Row 1: Master Card label + MC logo */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "var(--text)",
                        letterSpacing: -0.2,
                      }}
                    >
                      Master Card
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: 2, position: "relative", width: 44, height: 28 }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: "#EB001B",
                          position: "absolute",
                          left: 0,
                          top: 0,
                        }}
                      />
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: "#F79E1B",
                          position: "absolute",
                          left: 16,
                          top: 0,
                          opacity: 0.85,
                        }}
                      />
                    </div>
                  </div>
                  {/* Row 2: masked card number */}
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "var(--muted)",
                      margin: "0 0 12px",
                      letterSpacing: 1,
                    }}
                  >
                    {savedCard.first4} **** {savedCard.last4} ****
                  </p>
                  {/* Row 3: Card Holder | Expires | CVV */}
                  <div
                    style={{
                      display: "flex",
                      gap: 0,
                      borderTop: "1px solid var(--border-subtle)",
                      paddingTop: 10,
                    }}
                  >
                    {[
                      { label: "Card Holder", value: savedCard.cardHolder },
                      { label: "Expires", value: savedCard.expiry },
                      { label: "CVV", value: savedCard.cvv },
                    ].map((col, i) => (
                      <div
                        key={col.label}
                        style={{
                          flex: 1,
                          borderLeft: i > 0 ? "1px solid var(--border-subtle)" : "none",
                          paddingLeft: i > 0 ? 12 : 0,
                        }}
                      >
                        <p style={{ fontSize: 10, color: "var(--subtle)", margin: "0 0 3px", fontWeight: 500 }}>
                          {col.label}
                        </p>
                        <p style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text)", margin: 0 }}>
                          {col.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onAddCard?.(); }}
                    style={{
                      marginTop: 12,
                      padding: 0,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--primary)",
                      fontFamily: "inherit",
                    }}
                  >
                    Change Card
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onAddCard?.(); }}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "var(--primary-soft)",
                    border: "2px dashed var(--primary)",
                    borderRadius: 14,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--primary)",
                  }}
                >
                  Add Card Details
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
