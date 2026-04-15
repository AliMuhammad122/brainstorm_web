import React, { useState } from "react";
import { IcoClose } from "../../src/screensFlow/icons";

const BRAND_RED = "var(--primary)";

/**
 * Add Card Details modal: Card Number, Expiry Date, CVV, Add Card button.
 */
export default function AddCardModal({ open, onClose, onAdd }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  const formatCardNumber = (val) => {
    const v = val.replace(/\D/g, "").slice(0, 16);
    return v.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val) => {
    const v = val.replace(/\D/g, "");
    if (v.length >= 2) return v.slice(0, 2) + "/" + v.slice(2, 4);
    return v;
  };

  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(formatCardNumber(raw));
  };

  const handleExpiryChange = (e) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, 4);
    setExpiry(formatExpiry(v));
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value.replace(/\D/g, "").slice(0, 4));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rawNumber = cardNumber.replace(/\s/g, "");
    if (rawNumber.length < 12 || !expiry || cvv.length < 3) return;
    onAdd({
      cardNumber: rawNumber,
      expiry,
      cvv,
      cardHolder: cardHolder.trim() || "Card Holder",
      last4: rawNumber.slice(-4),
      first4: rawNumber.slice(0, 4),
    });
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setCardHolder("");
    onClose();
  };

  if (!open) return null;

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    border: "1.5px solid var(--border)",
    borderRadius: 14,
    fontSize: 14,
    color: "var(--text)",
    background: "var(--surface)",
    fontFamily: "inherit",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "var(--text)",
    marginBottom: 8,
    letterSpacing: -0.1,
  };

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--overlay)",
          zIndex: 9998,
        }}
      />
      <div
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "calc(100% - 32px)",
          maxWidth: 400,
          background: "var(--surface)",
          borderRadius: 20,
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          zIndex: 9999,
          padding: "20px 20px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "var(--text)",
              margin: 0,
              letterSpacing: -0.3,
            }}
          >
            Add Card Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IcoClose />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>
              Card Number <span style={{ color: BRAND_RED }}>*</span>
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="**** **** **** ****"
              maxLength={19}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>
              Card Holder Name
            </label>
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              placeholder="David Miller"
              style={inputStyle}
            />
          </div>
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>
                Expiry Date <span style={{ color: BRAND_RED }}>*</span>
              </label>
              <input
                type="text"
                value={expiry}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                maxLength={5}
                style={inputStyle}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>
                CVV <span style={{ color: BRAND_RED }}>*</span>
              </label>
              <input
                type="password"
                value={cvv}
                onChange={handleCvvChange}
                placeholder="***"
                maxLength={4}
                style={inputStyle}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: 14,
              border: "none",
              background: BRAND_RED,
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              letterSpacing: 0.2,
            }}
          >
            Add Card
          </button>
        </form>
      </div>
    </>
  );
}
