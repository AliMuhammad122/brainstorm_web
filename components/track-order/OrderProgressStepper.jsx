import React from "react";
import { useTheme } from "../../context/ThemeContext";
import ProgressingOrder from "../../public/assets/icons/ProgressingOrder.svg"
import ProgressRemaining from "../../public/assets/icons/ProgressRemaining.svg"
import ProgressDone from "../../public/assets/icons/ProgressDone.svg"
const BRAND_RED = "var(--primary)";

const DELIVERY_STEPS = [
  "Order Confirmed",
  "Order Processed",
  "Order Shipped",
  "Order Delivered",
];

const PICKUP_STEPS = [
  "Order Confirmed",
  "Ready to Pickup",
  "Order Received",
];

export default function OrderProgressStepper({ activeStep = 1, orderType = "delivery" }) {
  const { isDark } = useTheme();
  const STEPS = orderType === "pickup" ? PICKUP_STEPS : DELIVERY_STEPS;
  const activeStepNum = Number(activeStep);
  const isAnyStepActive = !isNaN(activeStepNum) && activeStepNum >= 0 && activeStepNum < STEPS.length;

  return (
    <div style={{ padding: "0" }}>
      {/* Container for texts strictly positioned above each dot */}
      <div
        style={{
          display: "flex",
          width: "100%",
          marginBottom: isAnyStepActive ? 8 : 0,
          gap:"44px"
        }}
      >
        {STEPS.map((s, i) => {
          const isCurrent = i === activeStep;
          return (
            <div
              key={s}
              style={{
                flex: 1,
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transform: isCurrent ? "translateY(-3px)" : "translateY(8px)",
                transition: "transform 0.3s ease",
              }}
            >
              <span
                style={{
                  fontSize: 8,
                  fontWeight:isCurrent?500: 300,
                  color: isDark 
                    ? (isCurrent ? "#EAEAF2" : "#9595AA") 
                    : (isCurrent ? "#333333" : "#777777"),
                  whiteSpace: "nowrap",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {s}
              </span>
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          height: 24,
          width: "100%",
        }}
      >
        {/* Track container (inset on left/right based on column centers) */}
        <div
          style={{
            position: "absolute",
            left: `${(1 / (2.7 * STEPS.length)) * 100}%`,
            right: `${(1 / (2.7 * STEPS.length)) * 100}%`,
            height: 4.5,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {/* Background track */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              height: "100%",
              background: isDark ? "#2A2A40" : "#E8E8E8",
              borderRadius: 2,
            }}
          />

          {/* Active track */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: `${(activeStep / (STEPS.length - 1)) * 100}%`,
              background: BRAND_RED,
              borderRadius: 2,
              transition: "width 0.4s ease",
            }}
          />
        </div>

        {/* Nodes layer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            width: "100%",
            gap:"50px"
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
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                    position: "relative",
                    borderRadius: "50%",
                    // boxShadow: isCurrent ? "0 0 0 4px var(--primary-soft)" : "none",
                  }}
                >
                  {isCompleted && (
                    <ProgressDone
                      style={{
                        position: "absolute",
                        left: -30,
                        top: -26,
                        width: 84,
                        height: 84,
                      }}
                    />
                  )}
                  
                  {isCurrent && (
                    <ProgressingOrder
                      style={{
                        animation: "spin 2s linear infinite",
                         position: "absolute",
                        // left: -14,
                        top: 0,
                      }}
                    />
                  )}

                  {isFuture && (
                    <ProgressRemaining
                     color={isDark ? "#2A2A40" : "#E8E8E8"}
                    />
                  )}
                </div>
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
