import React from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader } from "../../../src/screensFlow/ui";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <ScreensFrame>
      <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
        <PageHeader title="My Profile" onBack={() => router.back()} />

        <div style={{ padding: "14px 20px 24px" }}>
          <div
            style={{
              background: "var(--surface)",
              borderRadius: 14,
              padding: 12,
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 10,
                background:
                  "linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.2))",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: 4,
                  bottom: 4,
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M4 20h4l10-10-4-4L4 16v4Z"
                    stroke="#D9142C"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>
                David Miller
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>
                DavidMiller345211@hotmail.com
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <label style={{ fontSize: 12, color: "var(--text)" }}>First Name</label>
            <input
              placeholder="Enter first name"
              style={{
                height: 44,
                borderRadius: 10,
                border: "none",
                background: "var(--surface)",
                padding: "0 12px",
                fontSize: 13,
              }}
            />

            <label style={{ fontSize: 12, color: "var(--text)" }}>Last Name</label>
            <input
              placeholder="Enter last name"
              style={{
                height: 44,
                borderRadius: 10,
                border: "none",
                background: "var(--surface)",
                padding: "0 12px",
                fontSize: 13,
              }}
            />

            <label style={{ fontSize: 12, color: "var(--text)" }}>Email</label>
            <input
              placeholder="Enter your email"
              style={{
                height: 44,
                borderRadius: 10,
                border: "none",
                background: "var(--surface)",
                padding: "0 12px",
                fontSize: 13,
              }}
            />

            <label style={{ fontSize: 12, color: "var(--text)" }}>Phone Number</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "var(--surface)",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "0 10px",
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  borderRight: "1px solid var(--border)",
                  fontSize: 12,
                  color: "var(--muted)",
                }}
              >
                <span style={{ width: 10, height: 10, borderRadius: 5, background: "#4CAF50" }} />
                +357
              </div>
              <input
                placeholder="(444) 1234-5678"
                style={{
                  flex: 1,
                  height: 44,
                  border: "none",
                  background: "transparent",
                  padding: "0 10px",
                  fontSize: 13,
                }}
              />
              <button
                type="button"
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#D9142C",
                  fontSize: 12,
                  padding: "0 12px",
                  cursor: "pointer",
                }}
              >
                Send Otp
              </button>
            </div>

            <label style={{ fontSize: 12, color: "var(--text)" }}>Gender</label>
            <button
              type="button"
              style={{
                height: 44,
                borderRadius: 10,
                border: "none",
                background: "var(--surface)",
                padding: "0 12px",
                fontSize: 13,
                color: "var(--muted)",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              Select Gender
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" stroke="#666" strokeWidth="2" />
              </svg>
            </button>

            <label style={{ fontSize: 12, color: "var(--text)" }}>DOB</label>
            <input
              placeholder="DD/MM/YYYY"
              style={{
                height: 44,
                borderRadius: 10,
                border: "none",
                background: "var(--surface)",
                padding: "0 12px",
                fontSize: 13,
              }}
            />
          </div>

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
              marginTop: 22,
              cursor: "pointer",
            }}
          >
            Update Profile
          </button>
        </div>
      </div>
    </ScreensFrame>
  );
}
