import React from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader } from "../../../src/screensFlow/ui";

const activity = [
  {
    status: "Expired",
    title: "30% Discount Pizza",
    meta: "Buffalo Wings - 30 minutes ago",
    points: "100 Points",
    tone: "#D9142C",
  },
  {
    status: "Redeemed",
    title: "Invite 3 friends to get discount",
    meta: "Red Lobster - 1 hour ago",
    points: "50 Points",
    tone: "#1BAA5A",
  },
];

export default function RewardsHistoryPage() {
  const router = useRouter();

  return (
    <ScreensFrame>
      <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
        <PageHeader title="Rewards" onBack={() => router.back()} />

        <div style={{ padding: "12px 20px 24px" }}>
          <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 14 }}>
            Recent Activity
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {activity.map((row) => (
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
                      background:
                        row.status === "Redeemed" ? "#E9F7EF" : "#FDE8EA",
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
