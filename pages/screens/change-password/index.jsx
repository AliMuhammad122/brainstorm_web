import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader } from "../../../src/screensFlow/ui";
import { useChangePasswordMutation } from "../../../src/store/authApiSlice";
import Eye from "../../../public/assets/icons/Eye.svg";
import EyeSlash from "../../../public/assets/icons/EyeSlash.svg";

const Field = ({ label, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 14, color: "#333333", marginBottom: 8, fontWeight:400 }}>
        {label}
      </div>
      <div
        style={{
          height: 48,
          borderRadius: 8,
          background: "#F4F6F8",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 8,
        }}
      >
        <input
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="placeholder:text-[#777777]"
          style={{
            flex: 1,
            border: "none",
            background: "transparent",
            fontSize: 14,
            // color: "#A4A4A4",
            outline: "none",
            fontWeight:400
          }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: 0,
          }}
        >
        
            {showPassword ? <EyeSlash /> : <Eye />}

        </button>
      </div>
    </div>
  );
};

export default function ChangePasswordPage() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [toast, setToast] = useState({ show: false, text: "", type: "" });
  const toastTimeoutRef = useRef(null);

  const showToast = (text, type = "success") => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ show: true, text, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast({ show: false, text: "", type: "" });
    }, 3000);
  };

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleUpdate = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      showToast("All fields are required.", "error");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      showToast("Passwords do not match.", "error");
      return;
    }

    try {
      const res = await changePassword({
        currentPassword,
        newPassword,
        confirmNewPassword,
      }).unwrap();

      if (res.status === 200 || res.success) {
        showToast(res.message || "Password updated successfully!", "success");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        throw new Error(res.message || "Failed to change password.");
      }
    } catch (err) {
      console.error("Change password error:", err);
      showToast(err.data?.message || err.message || "Error changing password.", "error");
    }
  };

  return (
    <ScreensFrame>
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          color: "var(--text)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <PageHeader title="Change Password" onBack={() => router.back()} />

        <div style={{ padding: "12px 20px", flex: 1 }}>
          <Field
            label="Enter Old Password"
            placeholder="Enter old password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Field
            label="New Password"
            placeholder="Enter New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Field
            label="Confirm New Password"
            placeholder="Confirm new password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>

        <div style={{ padding: "0 20px 24px" }}>
          <button
            type="button"
            onClick={handleUpdate}
            disabled={isLoading}
            style={{
              width: "100%",
              height: 48,
              borderRadius: 26,
              border: "none",
              background: isLoading ? "var(--disabled)" : "#DA1A35",
              color: "#fff",
              fontSize: 14,
              fontWeight: 400,
              cursor: isLoading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontFamily:"'Open Sans'"
            }}
          >
            {isLoading && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ animation: "spin 1.5s linear infinite" }}
              >
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                <path d="M4 12a8 8 0 018-8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
              </svg>
            )}
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
      {toast.show && (
        <div
          className="custom-toast-container"
          style={{
            position: "fixed",
            top: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: toast.type === "success" ? "rgba(76, 175, 80, 0.95)" : "rgba(231, 28, 13, 0.95)",
            backdropFilter: "blur(8px)",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: 30,
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            zIndex: 9999,
            fontSize: 13,
            fontWeight: 500,
            whiteSpace: "nowrap",
            border: `1px solid ${toast.type === "success" ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.15)"}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {toast.type === "success" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {toast.text}
        </div>
      )}
    </ScreensFrame>
  );
}
