import React from "react";

const BRAND_RED = "var(--primary)";

const STEPS = [
  "Order Confirmed",
  "Order Processed",
  "Order Shipped",
  "Order Delivered",
];

export default function OrderProgressStepper({ activeStep = 1 }) { // defaulting to 1 based on test imagery
  return (
    <div style={{ padding: "0" }}>
      {/* Container for texts strictly positioned above each dot */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
          position: "relative",
          height: 14,
        }}
      >
        {STEPS.map((s, i) => (
          <span
            key={s}
            style={{
              position: "absolute",
              left: `${(i / (STEPS.length - 1)) * 100}%`,
              transform: "translateX(-50%)",
              fontSize: 9,
              fontWeight: 400,
              color: "var(--subtle)",
              whiteSpace: "nowrap",
            }}
          >
            {s}
          </span>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          height: 24,
        }}
      >
        {/* Background track */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: 4,
            background: "var(--border)",
            transform: "translateY(-50%)",
          }}
        />

        {/* Active track */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: `calc(${(activeStep / (STEPS.length - 1)) * 100}%)`,
            height: 4,
            background: BRAND_RED,
            transform: "translateY(-50%)",
            transition: "width 0.4s ease",
          }}
        />

        {/* Nodes layer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {STEPS.map((s, i) => {
            const isCompleted = i < activeStep;
            const isCurrent = i === activeStep;
            const isFuture = i > activeStep;

            return (
              <div
                key={s}
                style={{
                  width: isCurrent ? 24 : 16,
                  height: isCurrent ? 24 : 16,
                  borderRadius: "50%",
                  background: isFuture ? "var(--bg)" : BRAND_RED,
                  border: isFuture ? "3px solid var(--border)" : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                  boxShadow: isCurrent ? "0 0 0 4px var(--primary-soft)" : "none",
                }}
              >
                {isCompleted && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                
                {isCurrent && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 2s linear infinite" }}>
                    <path d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2ZM12 20A8 8 0 1 1 20 12A8 8 0 0 1 12 20Z" fill="rgba(255,255,255,0.3)"/>
                    <path d="M12 4A8 8 0 0 1 20 12" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
