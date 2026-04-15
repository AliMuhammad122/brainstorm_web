import React, { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { IcoClose } from "../../src/screensFlow/icons";
import { RadioDot } from "../../src/screensFlow/ui";

const BRAND_RED = "var(--primary)";

/**
 * Add New Address modal: Order Type (Delivery/Pickup), Full Name, Phone, Address, Postal Code,
 * Delivery type (Standard/Schedule), Add Address button.
 */
export default function AddAddressModal({ open, onClose, onAdd }) {
  const [orderType, setOrderType] = useState("delivery");
  const [deliveryType, setDeliveryType] = useState("standard");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      orderType,
      deliveryType,
      fullName: fullName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      postalCode: postalCode.trim(),
    });
    setFullName("");
    setPhone("");
    setAddress("");
    setPostalCode("");
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
          maxHeight: "90vh",
          overflow: "auto",
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
            Add New Address
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
          <div style={{ marginBottom: 18 }}>
            <span style={labelStyle}>Order Type</span>
            <div style={{ display: "flex", gap: 16 }}>
              <button
                type="button"
                onClick={() => setOrderType("delivery")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 14,
                  fontWeight: 500,
                  color: orderType === "delivery" ? BRAND_RED : "var(--muted)",
                }}
              >
                <RadioDot active={orderType === "delivery"} activeColor={BRAND_RED} />
                Delivery
              </button>
              <button
                type="button"
                onClick={() => setOrderType("pickup")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 14,
                  fontWeight: 500,
                  color: orderType === "pickup" ? BRAND_RED : "var(--muted)",
                }}
              >
                <RadioDot active={orderType === "pickup"} activeColor={BRAND_RED} />
                Pickup
              </button>
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <span style={{ ...labelStyle, fontSize: 14, fontWeight: 700 }}>
              Shipping address
            </span>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter full name"
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Phone Number</label>
              <div
                style={{
                  display: "flex",
                  border: "1.5px solid var(--border)",
                  borderRadius: 14,
                  overflow: "hidden",
                  background: "var(--surface)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "0 12px",
                    borderRight: "1px solid var(--border)",
                    background: "var(--surface-alt)",
                  }}
                >
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>{"\u2713"}</span>
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>{"\u25BC"}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
                    +357
                  </span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(444) 1234-5678"
                  style={{ ...inputStyle, border: "none", background: "transparent" }}
                />
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Address</label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter address"
                  style={inputStyle}
                />
                <div
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: BRAND_RED,
                    pointerEvents: "none",
                  }}
                >
                  <MdLocationOn size={20} />
                </div>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Postal Code</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Enter postal code"
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginBottom: 22 }}>
            <span style={labelStyle}>Order Type</span>
            <div style={{ display: "flex", gap: 16 }}>
              <button
                type="button"
                onClick={() => setDeliveryType("standard")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 14,
                  fontWeight: 500,
                  color: deliveryType === "standard" ? BRAND_RED : "var(--muted)",
                }}
              >
                <RadioDot active={deliveryType === "standard"} activeColor={BRAND_RED} />
                Standard Delivery
              </button>
              <button
                type="button"
                onClick={() => setDeliveryType("schedule")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 14,
                  fontWeight: 500,
                  color: deliveryType === "schedule" ? BRAND_RED : "var(--muted)",
                }}
              >
                <RadioDot active={deliveryType === "schedule"} activeColor={BRAND_RED} />
                Schedule Delivery
              </button>
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
            Add Address
          </button>
        </form>
      </div>
    </>
  );
}
