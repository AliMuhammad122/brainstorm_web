import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader } from "../../../src/screensFlow/ui";

const offers = [
  {
    id: "offer-1",
    status: "Pending",
    title: "Pizza Palace",
    meta: "Highway Cafe - 3 days ago",
    points: "+120 Points",
    action: "Redeem",
    muted: true,
  },
  {
    id: "offer-2",
    status: "Redeem",
    title: "Invite 5 friends to get points",
    meta: "TGI Friday - 7 hours ago",
    points: "+80 Points",
    action: "Redeem",
  },
  {
    id: "offer-3",
    status: "Redeem",
    title: "20% Discount on Fried Items",
    meta: "TGI Friday - 5 hours ago",
    points: "+80 Points",
    action: "Redeem",
  },
];

export default function BrowseRewardsPage() {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);
  const [redeeming, setRedeeming] = useState(false);
  const [earned, setEarned] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleRedeem = (offer) => {
    if (offer.muted || loadingId || redeeming) return;
    setLoadingId(offer.id);
    setRedeeming(true);
    timerRef.current = setTimeout(() => {
      setLoadingId(null);
      setRedeeming(false);
      setEarned(true);
    }, 700);
  };

  return (
    <ScreensFrame>
      <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
        <PageHeader title="Browse Rewards" onBack={() => router.back()} />
        <style>{`
          @keyframes spin{to{transform:rotate(360deg)}}
          @keyframes dotPulse{0%{transform:scale(0.6);opacity:.35}50%{transform:scale(1);opacity:1}100%{transform:scale(0.6);opacity:.35}}
        `}</style>

        <div style={{ padding: "10px 20px 24px" }}>
          <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 12 }}>
            Reward Offers
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {offers.map((offer) => (
              <div
                key={offer.id}
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
                      color: offer.muted ? "#B58C3A" : "#D9142C",
                      background: offer.muted ? "#FFF2CE" : "#FDE8EA",
                      padding: "2px 8px",
                      borderRadius: 12,
                      display: "inline-block",
                      marginBottom: 6,
                    }}
                  >
                    {offer.status}
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      color: "var(--text)",
                    }}
                  >
                    {offer.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--muted)",
                      marginTop: 4,
                    }}
                  >
                    {offer.meta}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, color: "var(--text)", marginBottom: 10 }}>
                    {offer.points}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRedeem(offer)}
                    style={{
                      borderRadius: 16,
                      padding: "6px 14px",
                      border: offer.muted ? "1px solid #CFCFCF" : "1px solid #F1C1C7",
                      background: offer.muted ? "#fff" : "#FDE8EA",
                      color: offer.muted ? "#B0B0B0" : "#D9142C",
                      fontSize: 12,
                      cursor: offer.muted ? "default" : "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {offer.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {redeeming && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 200,
              padding: 20,
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 320,
                background: "var(--surface)",
                borderRadius: 12,
                padding: "24px 20px 22px",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: 48,
                    height: 48,
                  }}
                >
                  {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (i * 45 * Math.PI) / 180;
                    const x = 20 + Math.cos(angle) * 16;
                    const y = 20 + Math.sin(angle) * 16;
                    return (
                      <span
                        key={`dot-${i}`}
                        style={{
                          position: "absolute",
                          left: x,
                          top: y,
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          background: "#D9142C",
                          animation: "dotPulse 1s ease-in-out infinite",
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>
                Redeeming Points
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>
                Your points are redeeming please wait until complete
              </div>
            </div>
          </div>
        )}
        {earned && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 210,
              padding: 20,
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 330,
                background: "var(--surface)",
                borderRadius: 14,
                padding: "22px 18px 18px",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    background: "#FDE8EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#D9142C",
                  }}
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 10h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Z"
                      stroke="#D9142C"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M4 10h16M12 10v11"
                      stroke="#D9142C"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M7.5 7.5c0-1.4 1.1-2.5 2.5-2.5 1.9 0 2 2.5 2 2.5s-.1-2.5 2-2.5c1.4 0 2.5 1.1 2.5 2.5 0 1.4-1.1 2.5-2.5 2.5H10c-1.4 0-2.5-1.1-2.5-2.5Z"
                      stroke="#D9142C"
                      strokeWidth="1.6"
                    />
                    <circle cx="12" cy="12" r="3.2" fill="#D9142C" />
                    <path
                      d="M12 10.4v3.4M10.8 12h2.4"
                      stroke="#fff"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M5 15.5h.5M18.5 15.5h.5M6.2 17.5h.5M17.3 17.5h.5"
                      stroke="#D9142C"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>
                You Earned 80 Points
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--muted)",
                  marginBottom: 16,
                }}
              >
                You earned 80 points as a reward enjoy your point to new order
              </div>
              <button
                type="button"
                onClick={() => {
                  setEarned(false);
                  router.push("/screens/rewards/history");
                }}
                style={{
                  width: "100%",
                  height: 44,
                  borderRadius: 22,
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  fontSize: 14,
                  color: "var(--text)",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </ScreensFrame>
  );
}
