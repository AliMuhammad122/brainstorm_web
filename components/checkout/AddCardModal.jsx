import React, { useState } from "react";
import RequiredIcon from "../../public/assets/icons/required.svg"
import CloseIcon from "../../public/assets/icons/close.svg"
import { useTheme } from "../../context/ThemeContext";

/**
 * Add Card Details modal: Card Number, Expiry Date, CVV, Add Card button.
 */
export default function AddCardModal({ open, onClose, onAdd }) {
  const { isDark } = useTheme();
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
    height: "40px",
    padding: "12px 10px",
    border: `1px solid ${isDark ? "#2A2A40" : "#F4F6F8"}`,
    borderRadius: 8,
    fontSize: 10,
    color: isDark ? "#EAEAF2" : "#333333",
    background: isDark ? "#0D0D1A" : "#FFFFFF",
    fontFamily: "'Montserrat', sans-serif",
    boxSizing: "border-box",
    outline: "none",
  };

  const labelStyle = {
    display: "flex",
    alignItems: "center",
    gap: 2,
    fontSize: 12,
    fontWeight: 400,
    color: isDark ? "#EAEAF2" : "#333333",
    marginBottom: 2,
    fontFamily: "'Montserrat', sans-serif",
  };

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 370,
          background: isDark ? "#F0F0F580" : "#00000080",
          backdropFilter: "blur(2px)",
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
          maxWidth: 335,
          background: isDark ? "#0D0D1A" : "#FFFFFF",
          borderRadius: 8,
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
          zIndex: 9999,
          padding: "20px 14px 18px",
          fontFamily: "'Montserrat', sans-serif",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: isDark ? "#EAEAF2" : "#333333",
            }}
          >
            Add Card Details
          </span>
          <button
            type="button"
            onClick={onClose}
            style={{
              position: "absolute",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              background: isDark ? "#161625" : "#F4F6F8",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#8E8E8E",
            }}
          >
            <CloseIcon color={isDark ? "#555570" : "#333333"} />
          </button>
        </div>

        <div style={{ height: 1, background: isDark ? "#2A2A40" : "#E8E8E8", marginBottom: 16 }} />

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>
              Card Number <RequiredIcon style={{ width: 6, height: 10 }} color={`${isDark?"#DA1A35":"#FF5C02"}`}/>
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="**** **** **** ****"
              className={isDark ? "placeholder:text-[#6E6E85]" : "placeholder:text-[#A4A4A4]"}
              maxLength={19}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>
              Card Holder Name <RequiredIcon style={{ width: 6, height: 10 }} color={`${isDark?"#DA1A35":"#FF5C02"}`}/>
            </label>
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              placeholder="Enter Card Holder Name"
              className={isDark ? "placeholder:text-[#6E6E85]" : "placeholder:text-[#A4A4A4]"}
              style={inputStyle}
            />
          </div>

          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>
                Expiry Date <RequiredIcon style={{ width: 6, height: 10 }} color={`${isDark?"#DA1A35":"#FF5C02"}`}/>
              </label>
              <input
                type="text"
                value={expiry}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                className={isDark ? "placeholder:text-[#6E6E85]" : "placeholder:text-[#A4A4A4]"}
                maxLength={5}
                style={inputStyle}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={labelStyle}>
                CVV <RequiredIcon style={{ width: 6, height: 10 }} color={`${isDark?"#DA1A35":"#FF5C02"}`}/>
              </label>
              <input
                type="text"
                value={cvv}
                onChange={handleCvvChange}
                placeholder="***"
                className={isDark ? "placeholder:text-[#6E6E85]" : "placeholder:text-[#A4A4A4]"}
                maxLength={3}
                style={inputStyle}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              height: 40,
              borderRadius: 22,
              border: "none",
              background: isDark ? "#E52E4A" : "#DA1A35",
              color: "#FFFFFF",
              fontSize: 12,
              fontWeight: 400,
              cursor: "pointer",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Add Card
          </button>
        </form>
      </div>
    </>
  );
}
