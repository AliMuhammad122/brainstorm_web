import React, { useState } from "react";
import parsePhoneNumberFromString from "libphonenumber-js";
import CountrySelect, { COUNTRY_OPTIONS } from "../CountrySelect";
import CloseIcon from "../../public/assets/icons/close.svg";
import CircleTickIcon from "../../public/assets/icons/selected-circle.svg";
import CircleTickEmpty from "../../public/assets/icons/unselected-circle.svg";
import LocationIcon from "../../public/assets/icons/address.svg";
import ScheduleModal from "./ScheduleModal";
import { useTheme } from "../../context/ThemeContext";

/**
 * Add New Address modal: Order Type (Delivery/Pickup), Full Name, Phone, Address, Postal Code,
 * Delivery/Pickup type (Standard/Schedule), Add button.
 * Matches the Figma design layout exactly.
 */
export default function AddAddressModal({
  open,
  onClose,
  onAdd,
  orderType = "delivery",
  onChangeOrderType,
}) {
  const [deliveryType, setDeliveryType] = useState("standard");
  const [scheduleData, setScheduleData] = useState(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const { isDark } = useTheme();

  const [fullName, setFullName] = useState("");
  const [phoneCode, setPhoneCode] = useState("+357");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const validatePhone = (code, number) => {
    if (!code) {
      setPhoneError("Country code is required");
      return false;
    }
    if (!number) {
      setPhoneError("Phone number is required");
      return false;
    }
    const country = COUNTRY_OPTIONS.find((c) => c.dialCode === code);
    if (country) {
      try {
        const fullNumber = code + number;
        const parsed = parsePhoneNumberFromString(fullNumber, country.value);
        if (parsed && !parsed.isValid()) {
          setPhoneError("Please enter a valid phone number for the selected country.");
          return false;
        }
      } catch {
        setPhoneError("Please enter a valid phone number.");
        return false;
      }
    } else {
      if (number.length < 7 || number.length > 15) {
        setPhoneError("Enter a valid phone number");
        return false;
      }
    }
    setPhoneError("");
    return true;
  };

  const handleCountryChange = (option) => {
    const nextCode = option ? option.dialCode : "+357";
    setPhoneCode(nextCode);
    validatePhone(nextCode, phone);
  };

  const handlePhoneChange = (val) => {
    const digitsOnly = val.replace(/\D/g, "");
    setPhone(digitsOnly);
    validatePhone(phoneCode, digitsOnly);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isPhoneValid = validatePhone(phoneCode, phone);
    if (!isPhoneValid) return;

    onAdd({
      orderType,
      deliveryType,
      scheduleData,
      fullName: fullName.trim(),
      phone: `${phoneCode} ${phone.trim()}`,
      address: orderType === "delivery" ? address.trim() : "",
      postalCode: orderType === "delivery" ? postalCode.trim() : "",
    });
    setFullName("");
    setPhone("");
    setPhoneError("");
    setAddress("");
    setPostalCode("");
    setScheduleData(null);
    setDeliveryType("standard");
    onClose();
  };

  const handleScheduleConfirm = (data) => {
    setScheduleData(data);
    setScheduleOpen(false);
  };

  const handleScheduleCancel = () => {
    if (!scheduleData) {
      setDeliveryType("standard");
    }
    setScheduleOpen(false);
  };

  if (!open) return null;

  const inputStyle = {
    width: "100%",
    height: "40px",
    padding: "12px 10px",
    border: `1px solid ${isDark? "#161625" : "#F4F6F8"}`,
    borderRadius: 8,
    fontSize: 10,
    color: isDark?"#EAEAF2":"#333333",
    background: isDark? "#161625" : "#F4F6F8",
    fontFamily: "'Montserrat', sans-serif",
    boxSizing: "border-box",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontSize: 12,
    fontWeight: 400,
    color: isDark?"#EAEAF2":"#333333",
    marginBottom: 4,
    fontFamily: "'Montserrat', sans-serif",
  };

  return (
    <>
      {/* Overlay */}
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

      {/* Modal Container */}
      <div
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "calc(100% - 32px)",
          maxWidth: 335,
          maxHeight: "90vh",
          overflowY: "auto",
          background: isDark ? "#0D0D1A" : "#FFFFFF",
          borderRadius: 8,
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
          zIndex: 9999,
          padding: "20px 14px 18px",
          fontFamily: "'Montserrat', sans-serif",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
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
              color: isDark?"#EAEAF2":"#333333",
            }}
          >
            Add New Address
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
              background: isDark?"#161625": "#F4F6F8",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#8E8E8E",
            }}
          >
            <CloseIcon color={isDark?"#555570":"#333333"} />
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: isDark?"#2A2A40":"#E8E8E8", marginBottom: 12 }} />

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Order Type Toggle (Top) */}
          <div style={{ marginBottom: 10 }}>
            <span style={labelStyle}>Order Type</span>
            <div style={{ display: "flex", gap: 16, paddingTop: 5 }}>
              <button
                type="button"
                onClick={() => onChangeOrderType?.("delivery")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 10,
                  fontWeight: 400,
                  color: orderType === "delivery" ? "#DA1A35" : isDark?"#6E6E85":"#A4A4A4",
                }}
              >
                {orderType === "delivery" ? <CircleTickIcon /> : <CircleTickEmpty color={isDark ? "#2A2A40" : "#E8E8E8"} />}
                Delivery
              </button>
              <button
                type="button"
                onClick={() => onChangeOrderType?.("pickup")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 10,
                  fontWeight: 400,
                  color: orderType === "pickup" ? "#DA1A35" : isDark?"#6E6E85":"#A4A4A4",
                }}
              >
                {orderType === "pickup" ? <CircleTickIcon /> : <CircleTickEmpty color={isDark ? "#2A2A40" : "#E8E8E8"}/>}
                Pickup
              </button>
            </div>
          </div>

          {/* Divider below Order Type */}
          <div style={{ height: 1, background: isDark?"#2A2A40":"#E8E8E8", margin: "-1px 0 14px" }} />

          {/* Address Details Section */}
          <div style={{ marginBottom: 14 }}>
            <span
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 400,
                color: isDark?"#EAEAF2":"#333333",
                marginBottom: 10,
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              {orderType === "delivery" ? "Shipping address" : "Pickup address"}
            </span>

            {/* Full Name */}
            <div className="gap-0.5 flex flex-col" style={{ marginBottom: 8 }}>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter full name"
                className={`${isDark?"placeholder:text-[#9595AA]":"placeholder:text-[#777777]"}`}
                style={inputStyle}
              />
            </div>

            {/* Phone Number */}
            <div style={{ marginBottom: orderType === "delivery" ? 8 : 0 }}>
              <label style={labelStyle}>Phone Number</label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "40px",
                  border: isDark?"1px solid #161625":"1px solid #F4F6F8",
                  borderRadius: 8,
                  paddingLeft: 10,
                  background: isDark?"#161625":"#F4F6F8",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", shrink: 0 }}>
                  <CountrySelect value={phoneCode} onChange={handleCountryChange} isModal={true} />
                </div>

                {/* Divider line */}
                <div
                  style={{
                    height: 28,
                    width: 1,
                    backgroundColor: isDark?"#2A2A40":"#E9EAEB",
                    flexShrink: 0,
                    margin: "0 4px",
                  }}
                />

                <input
                  type="tel"
                  name="phone"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="(444) 1234-5678"
                className={`${isDark?"placeholder:text-[#9595AA]":"placeholder:text-[#777777]"}`}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    height: "100%",
                    padding: "0 4px",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 10,
                    color: isDark ? "#EAEAF2" : "#333333",
                  }}
                />
              </div>
              {phoneError && (
                <p
                  style={{
                    color: "#DA1A35",
                    fontSize: 10,
                    marginTop: 4,
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  {phoneError}
                </p>
              )}
            </div>

            {/* Address & Postal Code (Only for Delivery) */}
            {orderType === "delivery" && (
              <>
                <div style={{ marginBottom: 8 }}>
                  <label style={labelStyle}>Address</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter address"
                      className={`${isDark?"placeholder:text-[#9595AA]":"placeholder:text-[#777777]"}`}
                      style={inputStyle}
                    />
                    <div
                      style={{
                        position: "absolute",
                        right: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#DA1A35",
                        pointerEvents: "none",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <LocationIcon alt="Location" />
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
                className={`${isDark?"placeholder:text-[#9595AA]":"placeholder:text-[#777777]"}`}
                    style={inputStyle}
                  />
                </div>
              </>
            )}
          </div>

          {/* Divider prior to bottom Order Type */}
          <div style={{ height: 1, background: isDark?"#2A2A40":"#E8E8E8", margin: "10px 0" }} />

          {/* Bottom Delivery / Pickup Toggles */}
          <div style={{ marginBottom: 22 }}>
            <span style={labelStyle}>Order Type</span>
            <div style={{ display: "flex", gap: 16, paddingTop: 5 }}>
              <button
                type="button"
                onClick={() => {
                  setDeliveryType("standard");
                  setScheduleData(null);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 10,
                  fontWeight: 400,
                  color: deliveryType === "standard" ? "#DA1A35" : isDark?"#6E6E85":"#A4A4A4",
                }}
              >
                {deliveryType === "standard" ? <CircleTickIcon /> : <CircleTickEmpty color={isDark ? "#2A2A40" : "#E8E8E8"}/>}
                {orderType === "delivery" ? "Standard Delivery" : "Standard Pickup"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setDeliveryType("schedule");
                  setScheduleOpen(true);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 10,
                  fontWeight: 400,
                  color: deliveryType === "schedule" ? "#DA1A35" : isDark?"#6E6E85":"#A4A4A4",
                }}
              >
                {deliveryType === "schedule" ? <CircleTickIcon /> : <CircleTickEmpty color={isDark ? "#2A2A40" : "#E8E8E8"}/>}
                {orderType === "delivery" ? "Schedule Delivery" : "Schedule Pickup"}
              </button>
            </div>
            {scheduleData && (
              <p
                style={{
                  fontSize: 10,
                  color: "#DA1A35",
                  marginTop: 6,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Scheduled for: {scheduleData.day} ({scheduleData.time})
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            style={{
              width: "100%",
              height: 40,
              borderRadius: 22,
              border: "none",
              background:isDark?"#E52E4A": "#DA1A35",
              color: "#FFFFFF",
              fontSize: 12,
              fontWeight: 400,
              cursor: "pointer",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Add Address
          </button>
        </form>
      </div>

      <ScheduleModal
        open={scheduleOpen}
        orderType={orderType}
        initialSchedule={scheduleData}
        onCancel={handleScheduleCancel}
        onConfirm={handleScheduleConfirm}
      />
    </>
  );
}
