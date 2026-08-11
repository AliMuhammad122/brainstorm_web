import React from "react";
import CircleTickIcon from "../../public/assets/icons/selected-circle.svg";
import CircleTickEmpty from "../../public/assets/icons/unselected-circle.svg";

/**
 * Reward Vouchers Section component matching the Figma design.
 * Features a login card and selectable coupons/vouchers (Birthday Coupon, €20 Voucher).
 */
export default function RewardVouchersSection({
  selectedId,
  onSelect,
  onLoginClick,
  onLogoutClick,
  isLoggedIn,
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <span
        style={{
          fontSize: 16,
          fontWeight: 400,
          color: "#333333",
          letterSpacing: "0px",
          fontFamily: "'Montserrat', sans-serif",
          display: "block",
          marginBottom: 15,
        }}
      >
        Rewards Vouchers
      </span>

      {/* Login Promotion Card */}
      {!isLoggedIn ? (
        <div
          style={{
            border: "1px solid #F4F6F8",
            borderRadius: 8,
            padding: "14px 16px",
            background: "#FFFFFF",
            marginBottom: 16,
          }}
        >
          <p
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: "#333333",
              margin: "0 0 12px",
              fontFamily: "'Montserrat', sans-serif",
              lineHeight: "18px",
            }}
          >
            Log in with your Fridays Cyprus Rewards App account to access your vouchers
          </p>
          <button
            type="button"
            onClick={onLoginClick}
            style={{
              width: "100%",
              height: 40,
              borderRadius: 22,
              background: "#DA1A35",
              color: "#FFFFFF",
              border: "none",
              fontSize: 12,
              fontWeight: 400,
              fontFamily: "'Montserrat', sans-serif",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Log in to Rewards App
          </button>
        </div>
      ) : (
        <div
          style={{
            border: "1px solid #F4F6F8",
            borderRadius: 8,
            padding: "14px 16px",
            background: "#FFFFFF",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                background: "#DA1A35",
                borderRadius: 12,
                padding: "3px 8px",
                height: "20px",
                width:"38px",
                color: "#FFFFFF",
                fontSize: 10,
                fontWeight: 400,
                fontFamily: "'inter', sans-serif",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              PRO
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "#333333",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Fridays Rewards Member
            </span>
          </div>
          <button
            type="button"
            onClick={onLogoutClick}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              fontSize: 12,
              fontWeight: 400,
              color: "#9EA2AD",
              textDecoration: "underline",
              fontFamily: "'inter', sans-serif",
            }}
          >
            Log out
          </button>
        </div>
      )}

      {/* Birthday Coupon Card */}
      <div
        onClick={() => onSelect(selectedId === "birthday" ? null : "birthday")}
        style={{
          border: "1.5px solid #F4F6F8",
          borderRadius: 8,
          padding: "10px 12px",
          background: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          marginBottom: 12,
          transition: "border-color 0.2s",
        }}
      >
        <div style={{ flex: 1, paddingRight: 12 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 400,
              color: "#333333",
              margin: "0 0 4px",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Birthday Coupon
          </p>
          <p
            style={{
              fontSize: 12,
              color: "#A4A4A4",
              margin: 0,
              fontWeight: 400,
              fontFamily: "'Open Sans', sans-serif",
              lineHeight:"20px"
            }}
          >
            Get a free dessert on your special day
          </p>
        </div>
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
          {selectedId === "birthday" ? (
            <CircleTickIcon  />
          ) : (
            <CircleTickEmpty/>
          )}
        </div>
      </div>

      {/* €20 Voucher Card */}
      <div
        onClick={() => onSelect(selectedId === "voucher20" ? null : "voucher20")}
        style={{
          border: "1.5px solid #F4F6F8",
          borderRadius: 8,
          padding: "10px 12px",
          background: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          marginBottom: 12,
          transition: "border-color 0.2s",
        }}
      >
        <div style={{ flex: 1, paddingRight: 12 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 400,
              color: "#333333",
              margin: "0 0 4px",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            €20 Voucher
          </p>
          <p
            style={{
               fontSize: 12,
              color: "#A4A4A4",
              margin: 0,
              fontWeight: 400,
              fontFamily: "'Open Sans', sans-serif",
              lineHeight:"20px"
            }}
          >
            Valid on all menu items for your next visit
          </p>
        </div>
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
          {selectedId === "voucher20" ? (
            <CircleTickIcon />
          ) : (
            <CircleTickEmpty/>
          )}
        </div>
      </div>
    </div>
  );
}
