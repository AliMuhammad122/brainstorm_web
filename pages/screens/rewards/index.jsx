import React from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";

const recentActivity = [
  {
    status: "Expired",
    title: "30% Discount  Pizza",
    meta: "Buffalo Wings - 30 minutes ago",
    points: "100 Points",
    tone: "#D9142C",
    bg: "#FDE8EA",
  },
  {
    status: "Redeemed",
    title: "Invite 3 friends to get discount",
    meta: "Red Lobster - 1 hour ago",
    points: "50 Points",
    tone: "#1BAA5A",
    bg: "#E9F7EF",
  },
];

export default function RewardsPage() {
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
        <div
          style={{
            position: "relative",
            background: "#D9142C",
            color: "#fff",
            padding: "18px 20px 26px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.15,
              backgroundImage:
                "repeating-linear-gradient(120deg, transparent 0 14px, rgba(255,255,255,0.4) 14px 18px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: -30,
              top: -10,
              width: 140,
              height: 140,
              borderRadius: "50%",
              border: "12px solid rgba(255,255,255,0.25)",
              maskImage:
                "radial-gradient(circle at 70% 30%, #000 0 55%, transparent 55%)",
            }}
          />
          <button
            type="button"
            onClick={() => router.back()}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              border: "none",
              background: "rgba(255,255,255,0.2)",
              color: "#fff",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
              zIndex: 1,
            }}
          >
            {"<"}
          </button>
          <div
            style={{
              position: "absolute",
              top: 22,
              left: 0,
              right: 0,
              textAlign: "center",
              fontSize: 20,
              fontWeight: 500,
              zIndex: 1,
            }}
          >
            Rewards
          </div>

          <div style={{ marginTop: 28, position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 19,
                  background: "#FFD27A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#8B4A00",
                  fontWeight: 700,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="8" fill="#FFD27A" />
                  <path
                    d="M12 7v10M7 12h10"
                    stroke="#8B4A00"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>1.200</div>
              <div style={{ marginTop: 6, fontSize: 14 }}>Points</div>
              <div style={{ marginLeft: "auto", fontSize: 18, fontWeight: 600 }}>
                Level 1
              </div>
            </div>
            <div style={{ marginTop: 10, fontSize: 14 }}>
              200 points to up your level rank
            </div>
            <div
              style={{
                marginTop: 8,
                height: 10,
                background: "rgba(255,255,255,0.5)",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "45%",
                  background: "#fff",
                  borderRadius: 8,
                }}
              />
            </div>
            <div
              style={{
                marginTop: 8,
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
              }}
            >
              <span>Level 1</span>
              <span>Level 2</span>
            </div>
          </div>
        </div>

        <div style={{ padding: "16px 20px" }}>
          <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 12 }}>
            Quick action
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              type="button"
              onClick={() => router.push("/screens/rewards/browse")}
              style={{
                flex: 1,
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: "18px 12px",
                background: "var(--surface)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  border: "2px solid #2B2B2B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7 4h10v4a5 5 0 0 1-10 0V4Z"
                    stroke="#222"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M5 6H3a3 3 0 0 0 3 3"
                    stroke="#222"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M19 6h2a3 3 0 0 1-3 3"
                    stroke="#222"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path d="M12 13v3" stroke="#222" strokeWidth="1.6" />
                  <path
                    d="M8 20h8"
                    stroke="#222"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div style={{ fontSize: 13, color: "var(--text)" }}>
                Browse rewards
              </div>
            </button>
            <button
              type="button"
              onClick={() => router.push("/screens/rewards/history")}
              style={{
                flex: 1,
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: "18px 12px",
                background: "var(--surface)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  border: "2px solid #2B2B2B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 4h12v14l-2-1-2 1-2-1-2 1-2-1-2 1V4Z"
                    stroke="#222"
                    strokeWidth="1.6"
                  />
                  <path d="M9 8h6M9 12h6" stroke="#222" strokeWidth="1.6" />
                </svg>
              </div>
              <div style={{ fontSize: 13, color: "var(--text)" }}>
                View History
              </div>
            </button>
          </div>

          <div style={{ marginTop: 20, fontSize: 18, fontWeight: 500 }}>
            Recent Activity
          </div>
        </div>

        <div style={{ padding: "0 20px 32px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {recentActivity.map((row) => (
              <div
                key={row.title}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  padding: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "var(--surface)",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    background: "#FDE8EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#D9142C",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 10h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Z"
                      stroke="#D9142C"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M4 10h16M12 10v11"
                      stroke="#D9142C"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M7.5 7.5c0-1.4 1.1-2.5 2.5-2.5 1.9 0 2 2.5 2 2.5s-.1-2.5 2-2.5c1.4 0 2.5 1.1 2.5 2.5 0 1.4-1.1 2.5-2.5 2.5H10c-1.4 0-2.5-1.1-2.5-2.5Z"
                      stroke="#D9142C"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: row.tone,
                      background: row.bg,
                      padding: "2px 8px",
                      borderRadius: 12,
                      display: "inline-block",
                      marginBottom: 6,
                    }}
                  >
                    {row.status}
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      color: "var(--text)",
                    }}
                  >
                    {row.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--muted)",
                      marginTop: 4,
                    }}
                  >
                    {row.meta}
                  </div>
                </div>
                <div style={{ color: row.tone, fontWeight: 600 }}>
                  {row.points}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScreensFrame>
  );
}
