import React from "react";
import GpayLogo from "../../public/assets/icons/g_pay.svg"
import CDCLogo from "../../public/assets/icons/CDC.svg"
import ApplepayLogo from "../../public/assets/icons/apple_pay.svg"  
import CircleTickIcon from "../../public/assets/icons/choose.svg"
import CircleTickEmpty from "../../public/assets/icons/tick-circle-empty.svg"
import MastercardIcon from "../../public/assets/icons/mastercard.svg"


const PAYMENT_OPTIONS = [
  { id: "gpay", label: "Google Pay", Logo: GpayLogo },
  { id: "apple", label: "Apple Pay", Logo: ApplepayLogo },
  { id: "card", label: "Credit/Debit Cards", Logo: CDCLogo },
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
    <div style={{ marginBottom: 14 }}>
      <span
        style={{
          fontSize: 16,
          fontWeight: 400,
          color: "#333333",
          letterSpacing: "0px",
          fontFamily: "'Montserrat', sans-serif",
          display: "block",
          marginBottom: 2,
        }}
      >
        Payment Methods
      </span>
      {hasCard ? (
        <div style={{ padding: "8px 2px 14px 0" }}>
          <div
            style={{
              width: "100%",
              height:"100px",
              border: "1.5px solid #E8E8E8",
              borderRadius: 8,
              padding: "12px 10px 14px",
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
              <div style={{display:"flex", flexDirection:"column", gap:4}}>

              <span
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: "var(--text)",
                  letterSpacing: 0,
                }}
              >
                Master Card
              </span>
                    {/* Row 2: masked card number */}
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 400,
                        color: "#A4A4A4",
                        margin: "0 0 10px",
                        fontFamily: "'Montserrat', sans-serif",
                        letterSpacing: 0,
                      }}
                    >
                      {savedCard.first4} **** {savedCard.last4} ****
                    </p>
                      </div>
              <div style={{ display: "flex", alignItems: "center", gap: 2, position: "relative", width: 32, height: 28 }}>
                <MastercardIcon alt="MasterCard" />
              </div>
            </div>
            {/* Row 3: Card Holder | Expires | CVV */}
            <div
              style={{
                display: "flex",
                gap: 0,
                // borderTop: "1px solid var(--border-subtle)",
                // paddingTop: 10,
              }}
            >
              {[
                { label: "Card Holder", value: savedCard.cardHolder, flex: "0 0 35%" },
                { label: "Expires", value: savedCard.expiry, flex: "0 0 25%" },
                { label: "CVV", value: savedCard.cvv || "***", flex: "0 0 25%" },
              ].map((col) => (
                <div
                  key={col.label}
                  style={{
                    flex: col.flex,
                  }}
                >
                  <p style={{ fontSize: 12, color: "#333333", margin: "0 0 3px", fontWeight: 400 }}>
                    {col.label}
                  </p>
                  <p style={{ fontSize: 12, fontWeight: 400, color: "#A4A4A4", margin: 0 }}>
                    {col.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        PAYMENT_OPTIONS.map((pm) => (
          <div key={pm.id}>
            <button
              type="button"
              onClick={() => {
                onSelect(pm.id);
                if (pm.id === "card") {
                  onAddCard?.();
                }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "10px 0px 4px 2px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: 38,
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
                  fontWeight: 400,
                  color: "#A4A4A4",
                }}
              >
                {pm.label}
              </span>
              {selectedId === pm.id ? (
                <CircleTickIcon width={18} height={18} alt="" />
              ) : (
                <CircleTickEmpty />
              )}
            </button>
          </div>
        ))
      )}
    </div>
  );
}
