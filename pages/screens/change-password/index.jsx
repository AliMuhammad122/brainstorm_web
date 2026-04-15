import React from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader } from "../../../src/screensFlow/ui";

const Field = ({ label, placeholder }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ fontSize: 12, color: "var(--text)", marginBottom: 6 }}>
      {label}
    </div>
    <div
      style={{
        height: 44,
        borderRadius: 10,
        background: "var(--surface)",
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        gap: 8,
      }}
    >
      <input
        placeholder={placeholder}
        type="password"
        style={{
          flex: 1,
          border: "none",
          background: "transparent",
          fontSize: 13,
        }}
      />
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6Z"
          stroke="#777"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="12" r="2.8" stroke="#777" strokeWidth="1.6" />
      </svg>
    </div>
  </div>
);

export default function ChangePasswordPage() {
  const router = useRouter();

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
          <Field label="Enter Old Password" placeholder="Enter old password" />
          <Field label="New Password" placeholder="Enter New password" />
          <Field label="Confirm New Password" placeholder="Confirm new password" />
        </div>

        <div style={{ padding: "0 20px 24px" }}>
          <button
            type="button"
            style={{
              width: "100%",
              height: 52,
              borderRadius: 26,
              border: "none",
              background: "#D9142C",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Update Password
          </button>
        </div>
      </div>
    </ScreensFrame>
  );
}
