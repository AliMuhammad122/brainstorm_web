import React, { useState, useEffect } from "react";
import CloseIcon from "../../public/assets/icons/close.svg";
import RequiredIcon from "../../public/assets/icons/required.svg";
import { useTheme } from "../../context/ThemeContext";

// Helper to generate next 7 days starting from today
const getNext7Days = () => {
  const days = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    let label = "";
    if (i === 0) {
      label = "Today";
    } else if (i === 1) {
      label = "Tomorrow";
    } else {
      const options = { weekday: "short", month: "short", day: "numeric" };
      label = d.toLocaleDateString("en-US", options);
    }
    days.push({
      label,
      value: d.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }),
    });
  }
  return days;
};

/**
 * ScheduleModal: displays select day pills and static pickup/delivery time label.
 * Matches the Figma design layout exactly.
 */
export default function ScheduleModal({ open, orderType, onCancel, onConfirm, initialSchedule }) {
  const { isDark } = useTheme();
  const [selectedDay, setSelectedDay] = useState("");

  const daysList = getNext7Days();
  const isPickup = orderType === "pickup";

  const defaultTimeText = isPickup
    ? "Pickup is available from 12:00pm-10pm."
    : "Delivery is available from 12:00pm-10pm.";

  // Pre-fill initial values if they exist
  useEffect(() => {
    if (open) {
      setSelectedDay(initialSchedule?.day || "");
    }
  }, [open, initialSchedule]);

  if (!open) return null;

  const handleConfirm = () => {
    if (selectedDay) {
      onConfirm({
        day: selectedDay,
        time: defaultTimeText,
      });
    }
  };

  const labelStyle = {
    display: "flex",
    alignItems: "center",
    gap: 3,
    fontSize: 12,
    fontWeight: 400,
    color: isDark ? "#EAEAF2" : "#333333",
    marginBottom: 6,
    fontFamily: "'Montserrat', sans-serif",
  };

  const isFormValid = !!selectedDay;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onCancel}
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
          zIndex: 10000,
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
          background: isDark ? "#0D0D1A" : "#FFFFFF",
          borderRadius: 8,
          boxShadow: isDark ? "0 10px 40px rgba(0, 0, 0, 0.45)" : "0 10px 40px rgba(0, 0, 0, 0.2)",
          zIndex: 10001,
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
              color: isDark ? "#EAEAF2" : "#333333",
            }}
          >
            {isPickup ? "Schedule Pickup" : "Schedule Delivery"}
          </span>
          <button
            type="button"
            onClick={onCancel}
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

        {/* Divider */}
        <div style={{ height: 1, background: isDark ? "#2A2A40" : "#E8E8E8", marginBottom: 10 }} />

        {/* Date Selector */}
        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>
            Select Day <RequiredIcon style={{ width: 6, height: 10 }} color={isDark ? "#DA1A35" : "#FF5C02"} />
          </label>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {daysList.map((day) => {
              const isSelected = selectedDay === day.label;
              return (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => setSelectedDay(day.label)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: 8,
                    border: `1.5px solid ${isDark ? (isSelected ? "#DA1A351A" : "#2A2A40") : (isSelected ? "#DA1A351A" : "#F4F6F8")}`,
                    background: isDark ? (isSelected ? "#E52E4A1A" : "#0D0D1A") : (isSelected ? "#DA1A351A" : "#FFFFFF"),
                    color: isDark ? (isSelected ? "#E52E4A" : "#9595AA") : (isSelected ? "#DA1A35" : "#777777"),
                    fontSize: 8,
                    fontWeight:  400,
                    cursor: "pointer",
                    fontFamily: "'Montserrat', sans-serif",
                    transition: "all 0.15s ease-in-out",
                  }}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Input Field */}
        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>
            {isPickup ? "Pickup Time" : "Delivery Time"}{" "}
            <RequiredIcon style={{ width: 6, height: 10 }} color={isDark ? "#DA1A35" : "#FF5C02"} />
          </label>
          <div
            style={{
              width: "fit-content",
              padding: "6px 10px",
              border: `1px solid ${isDark ? "#2A2A40" : "#F4F6F8"}`,
              borderRadius: 8,
              fontSize: 8,
              color: isDark ? "#9595AA" : "#777777",
              background: isDark ? "#0D0D1A" : "#FFFFFF",
              fontFamily: "'Montserrat', sans-serif",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
            }}
          >
            {defaultTimeText}
          </div>
        </div>

        {/* Confirm Button */}
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!isFormValid}
          style={{
            width: "100%",
            height: 40,
            borderRadius: 22,
            border: "none",
            background: isFormValid ? (isDark ? "#E52E4A" : "#DA1A35") : (isDark ? "#353550" : "#DCDCDC"),
            color: isFormValid ? "#FFFFFF" : (isDark ? "#FFFFFF" : "#FFFFFF"),
            fontSize: 12,
            fontWeight: 500,
            cursor: isFormValid ? "pointer" : "default",
            fontFamily: "'Montserrat', sans-serif",
            transition: "background-color 0.15s ease-in-out",
          }}
        >
          Confirm
        </button>
      </div>
    </>
  );
}
