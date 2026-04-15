import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useTheme } from "../../context/ThemeContext";
import {
  MdKeyboardArrowDown,
  MdMenu,
  MdOutlineLocationOn,
} from "react-icons/md";
import { BANNERS, CATEGORY_DATA, DRAWER_LINKS, PRICES } from "./data";
import {
  IcoBack,
  IcoHamburger,
  IcoChevron,
  IcoClose,
  IcoGrid,
  IcoSearchW,
} from "./icons";
import FoodCart from "../../public/assets/icons/food-cart.png";
import PromotionalBanner from "../../public/assets/images/banner-image.png";


export function PageHeader({ title, onBack, transparent }) {
  const { tokens, isDark } = useTheme();
  const isTransparent = !!transparent;
  const headerBg = isTransparent ? "transparent" : tokens.headerBg;
  const backBg = isTransparent ? "rgba(255,255,255,0.95)" : (isDark ? "rgba(255,255,255,0.1)" : "#f4f4f4");
  const textColor = isTransparent ? "#111" : tokens.headerText;
  const backIconColor = isTransparent ? "#111" : tokens.headerText;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 20px 14px",
        background: headerBg,
        flexShrink: 0,
      }}
    >
      <button
        onClick={onBack}
        style={{
          width: 38,
          height: 38,
          borderRadius: 13,
          background: backBg,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <IcoBack c={backIconColor} />
      </button>
      <span
        style={{
          flex: 1,
          textAlign: "center",
          fontSize: 17,
          fontWeight: 800,
          color: textColor,
          letterSpacing: -0.4,
        }}
      >
        {title}
      </span>
      <div style={{ width: 38 }} />
    </div>
  );
}

export function RadioDot({ active, activeColor = "#E53935" }) {
  return (
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        border: `2px solid ${active ? activeColor : "var(--border)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "border-color 0.15s",
      }}
    >
      {active && (
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: activeColor,
          }}
        />
      )}
    </div>
  );
}

const Sunburst = () => (
  <div
    style={{
      position: "absolute",
      right: 55,
      top: "50%",
      transform: "translateY(-50%)",
      width: 280,
      height: 280,
      pointerEvents: "none",
      zIndex: 1,
    }}
  >
    {Array.from({ length: 18 }).map((_, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          width: 280,
          height: 1.8,
          background: "rgba(255,255,255,0.12)",
          top: "50%",
          left: "50%",
          transformOrigin: "0 50%",
          transform: `translateY(-50%) rotate(${i * 20}deg)`,
        }}
      />
    ))}
  </div>
);

export function Carousel() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % BANNERS.length);
    }, 3500);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (idx) => {
    setActive(idx);
    startTimer();
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goTo(
        diff > 0
          ? (active + 1) % BANNERS.length
          : (active - 1 + BANNERS.length) % BANNERS.length,
      );
    }
    touchStartX.current = null;
  };

  const banner = BANNERS[active];

  return (
    <div className="px-5">
      <div
        className="relative rounded-2xl overflow-hidden select-none"
        style={{
          minHeight: 175,
          // background: "linear-gradient(135deg, #B8111C 0%, #E31C3D 55%, #FF4A5A 100%)",
          // boxShadow: "0 4px 16px rgba(227,28,61,0.25)",
          cursor: "grab",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Sunray bg */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "repeating-conic-gradient(rgba(255,255,255,0.2) 0deg, transparent 4deg, transparent 9deg)",
          }}
        />

        {/* Animated food emoji */}
        <div
          key={`emoji-${active}`}
          className="absolute left-0 bottom-0 leading-none pointer-events-none"
          style={{
            fontSize: 130,
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))",
            animation: "floatBurger 3s ease-in-out infinite",
          }}
        >
          {/* {banner.emoji} */}
        </div>

        <img
          src={PromotionalBanner.src}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center items-center gap-1.5 pt-3 pb-1">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-300"
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i === active ? "#E31C3D" : "#D1D5DB",
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes floatBurger {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

// export function Carousel() {
//   const [slide, setSlide] = useState(0);
//   const t = useRef(null);

//   const start = () => {
//     clearInterval(t.current);
//     t.current = setInterval(() => setSlide((p) => (p + 1) % BANNERS.length), 3800);
//   };

//   useEffect(() => {
//     start();
//     return () => clearInterval(t.current);
//   }, []);

//   const go = (i) => {
//     setSlide(i);
//     start();
//   };

//   return (
//     <div style={{ background: "#fff", overflow: "hidden" }}>
//       <div style={{ display: "flex", transition: "transform 0.52s cubic-bezier(0.4,0,0.2,1)", transform: `translateX(-${slide * 100}%)` }}>
//         {BANNERS.map((bn) => (
//           <div
//             key={bn.id}
//             style={{
//               minWidth: "100%",
//               height: 190,
//               background: `linear-gradient(145deg,${bn.from},${bn.to})`,
//               position: "relative",
//               overflow: "hidden",
//               display: "flex",
//               alignItems: "center",
//               padding: "0 24px",
//             }}
//           >
//             <Sunburst />
//             <img
//               src={bn.img}
//               alt=""
//               style={{
//                 position: "absolute",
//                 right: -8,
//                 bottom: -10,
//                 width: 215,
//                 height: 215,
//                 objectFit: "cover",
//                 borderRadius: 16,
//                 zIndex: 2,
//                 filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.5))",
//               }}
//               onError={(e) => {
//                 e.target.style.display = "none";
//               }}
//             />
//             <div style={{ zIndex: 3, maxWidth: "52%", position: "relative" }}>
//               <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 11.5, fontStyle: "italic", fontWeight: 500, margin: "0 0 5px" }}>
//                 {bn.eyebrow}
//               </p>
//               <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 13, fontWeight: 400, margin: "0 0 1px" }}>{bn.sub}</p>
//               <p style={{ fontSize: 33, fontWeight: 900, color: "#fff", margin: "0 0 5px", letterSpacing: -1.2, lineHeight: 1 }}>
//                 {bn.highlight}
//               </p>
//               <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 11, margin: 0, lineHeight: 1.55, whiteSpace: "pre-line" }}>{bn.desc}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div style={{ display: "flex", justifyContent: "center", gap: 5, padding: "11px 0 10px", background: "#fff" }}>
//         {BANNERS.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => go(i)}
//             style={{
//               height: 7,
//               borderRadius: 4,
//               border: "none",
//               cursor: "pointer",
//               padding: 0,
//               transition: "all 0.32s",
//               width: i === slide ? 22 : 7,
//               background: i === slide ? "#e53935" : "#ddd",
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

export function FilterModal({ onClose, onApply, initCats, initPrice }) {
  const [sc, setSc] = useState(initCats);
  const [sp, setSp] = useState(initPrice);
  const toggle = (c) =>
    setSc((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));
  const cats = CATEGORY_DATA.map((c) => c.name);

  const modalContent = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--overlay)",
        zIndex: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--bg)",
          borderRadius: 24,
          width: "100%",
          maxWidth: 350,
          boxShadow: "0 24px 80px rgba(0,0,0,0.28)",
          overflow: "hidden",
          animation: "popIn 0.26s cubic-bezier(0.34,1.56,0.64,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 22px 0",
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "var(--text)",
              letterSpacing: -0.4,
            }}
          >
            Filter
          </span>
          <button
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: "var(--surface-alt)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={onClose}
          >
            <IcoClose />
          </button>
        </div>
        <div style={{ height: 1, background: "var(--border-subtle)", margin: "16px 0 0" }} />
        <div style={{ padding: "16px 22px 0" }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "var(--text)",
              margin: "0 0 10px",
            }}
          >
            Category
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {cats.map((c) => {
              const on = sc.includes(c);
              return (
                <button
                  key={c}
                  onClick={() => toggle(c)}
                  style={{
                    padding: "6px 13px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    background: on ? "var(--surface-alt)" : "var(--bg)",
                    color: on ? "var(--text)" : "var(--muted)",
                    border: `1.5px solid ${on ? "var(--border)" : "var(--border-subtle)"}`,
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ padding: "16px 22px 0" }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "var(--text)",
              margin: "0 0 10px",
            }}
          >
            Price Range
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {PRICES.map((p) => {
              const on = sp === p;
              return (
                <button
                  key={p}
                  onClick={() => setSp(on ? "" : p)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 13px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    background: on ? "var(--surface-alt)" : "var(--bg)",
                    color: on ? "var(--text)" : "var(--muted)",
                    border: `1.5px solid ${on ? "var(--border)" : "var(--border-subtle)"}`,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      border: `2px solid ${on ? "var(--text)" : "var(--subtle)"}`,
                      background: on ? "var(--text)" : "transparent",
                      display: "inline-block",
                    }}
                  />
                  {p}
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ padding: "20px 22px 22px" }}>
          <button
            onClick={() => onApply(sc, sp)}
            style={{
              width: "100%",
              height: 50,
              borderRadius: 25,
              border: "none",
              fontSize: 15,
              fontWeight: 700,
              color: "var(--text)",
              cursor: "pointer",
              fontFamily: "inherit",
              background: sc.length || sp ? "var(--surface-alt)" : "var(--border)",
            }}
          >
            Apply Filter {sc.length || sp ? "✓" : ""}
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof document !== "undefined") {
    return createPortal(modalContent, document.body);
  }
  return modalContent;
}

const BRAND_RED = "var(--primary)";

export function ViewOrderFAB({ cartCount, total, onTap }) {
  const hasItems = cartCount > 0;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "10px 18px 26px",
        background: "linear-gradient(to top,var(--bg) 75%,rgba(0,0,0,0))",
        zIndex: 50,
      }}
    >
      <button
        type="button"
        onClick={onTap}
        style={{
          width: "100%",
          height: 56,
          borderRadius: 28,
          background: BRAND_RED,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
          boxShadow: "0 10px 32px rgba(218,26,53,0.38)",
          fontFamily: "'Montserrat',sans-serif",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            background: "rgba(255,255,255,0.22)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginRight: 12,
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 800, color: "var(--on-primary)" }}>
            {cartCount}
          </span>
        </div>
        <span
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 15,
            fontWeight: 700,
            color: "var(--on-primary)",
            letterSpacing: 0.2,
          }}
        >
          View Order
        </span>
        <span
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "var(--on-primary)",
            paddingRight: 8,
          }}
        >
          €{typeof total === "number" ? total.toFixed(2) : total}
        </span>
      </button>
    </div>
  );
}

export function AppChrome({ cart, onMenu, onCartTap }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px 12px",
          background: "var(--surface)",
          flexShrink: 0,
        }}
      >
        <button
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: "var(--surface-alt)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={onMenu}
        >
          <MdMenu size={22} color="var(--text)" />
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <p
            style={{ fontSize: 11, color: "var(--subtle)", fontWeight: 500, margin: 0 }}
          >
            Your Location
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <MdOutlineLocationOn size={16} color="var(--primary)" />
            <span
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "var(--text)",
                letterSpacing: -0.4,
              }}
            >
              Limassol, Cyprus
            </span>
            <MdKeyboardArrowDown size={18} color="var(--primary)" />
          </div>
        </div>
        <button
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: "var(--surface-alt)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
          onClick={onCartTap}
        >
          <Image src={FoodCart} width={22} height={22} alt="Cart" className="theme-icon" />
          {cart > 0 && (
            <div
              style={{
                position: "absolute",
                top: -1,
                right: -1,
                minWidth: 16,
                height: 16,
                background: "var(--primary)",
                borderRadius: 8,
                fontSize: 9,
                fontWeight: 800,
                color: "var(--on-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 3px",
              }}
            >
              {cart}
            </div>
          )}
        </button>
      </div>
    </>
  );
}

export function Drawer({
  onClose,
  onMenuScreen,
  onHome,
  onCatScreen,
  onOrdersHistory,
  onLoyaltyRewards,
}) {
  const router = useRouter();
  const { isDark } = useTheme();
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Icons use actual filenames from public/assets/icons (names may differ slightly, e.g. loylity_icon.svg for Loyalty).
  const sectionOne = [
    { label: "Orders History", icon: "/assets/icons/order_history_icon.svg" },
    { label: "Loyalty Rewards", icon: "/assets/icons/loylity_icon.svg" },
    { label: "Notifications", icon: "/assets/icons/notification_icon.svg" },
  ];

  const sectionTwo = [
    { label: "My Profile", icon: "/assets/icons/profile_icon.svg" },
    { label: "Change Password", icon: "/assets/icons/change_password_icon.svg" },
    { label: "App Appearance", icon: "/assets/icons/app_appearance_icon.svg" },
    { label: "Languages", icon: "/assets/icons/language_icon.svg" },
    { label: "Privacy Policy", icon: "/assets/icons/privacy_icon.svg" },
    { label: "Terms & Conditions", icon: "/assets/icons/terms_icon.svg" },
  ];

  const logoutItem = {
    label: "Logout",
    icon: "/assets/icons/logout_icon.svg",
  };

  const navigate = (path) => {
    if (onClose) onClose();
    router.push(path);
  };
  const handleOrdersHistory = () => {
    if (onOrdersHistory) {
      onOrdersHistory();
      return;
    }
    navigate("/screens/order-history");
  };
  const handleLoyaltyRewards = () => {
    if (onLoyaltyRewards) {
      onLoyaltyRewards();
      return;
    }
    navigate("/screens/rewards");
  };
  const handleProfile = () => navigate("/screens/profile");
  const handleChangePassword = () => navigate("/screens/change-password");
  const handleAppearance = () => navigate("/screens/appearance");
  const handleLanguages = () => navigate("/screens/languages");
  const handlePrivacy = () => navigate("/screens/privacy-policy");
  const handleTerms = () => navigate("/screens/terms");

  const cardBg = isDark ? "#1C1C1E" : "#F4F6F8";
  const pageBg = isDark ? "#0B0B0B" : "#fff";
  const iconFilter = isDark ? "brightness(0) invert(1)" : "none";
  const textColor = isDark ? "#fff" : "var(--text)";
  const dividerColor = isDark ? "rgba(255,255,255,0.08)" : "#ECEFF3";
  const chevronColor = isDark ? "#fff" : "#ccc";

  const renderRow = (item, isLast, onClick) => (
    <button
      key={item.label}
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "14px 16px",
        background: "none",
        border: "none",
        borderBottom: isLast ? "none" : `1px solid ${dividerColor}`,
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          background: isDark ? "#1C1C1E" : "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 12,
          flexShrink: 0,
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <img
          src={item.icon}
          alt={item.label}
          style={{
            width: 18,
            height: 18,
            objectFit: "contain",
            filter: iconFilter,
          }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>
      <span
        style={{
          flex: 1,
          fontSize: 14,
          fontWeight: 500,
          color: textColor,
        }}
      >
        {item.label}
      </span>
      <IcoChevron c={chevronColor} />
    </button>
  );

  const drawerContent = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: pageBg,
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        overscrollBehavior: "none",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px 12px",
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            border: "none",
            background: isDark ? "#1C1C1E" : "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <IcoBack c={textColor} />
        </button>
        <span
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: textColor,
          }}
        >
          Menu
        </span>
        <button
          type="button"
          onClick={onClose}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            border: "none",
            background: isDark ? "#1C1C1E" : "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <IcoClose c={textColor} />
        </button>
      </div>

      {/* Middle: section cards + spacer pushes Logout to bottom */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          padding: "20px 20px 0",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            background: cardBg,
            borderRadius: 16,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            flexShrink: 0,
          }}
        >
          {sectionOne.map((item, idx) =>
            renderRow(item, idx === sectionOne.length - 1, () => {
              if (item.label === "Orders History") {
                handleOrdersHistory();
                return;
              }
              if (item.label === "Loyalty Rewards") {
                handleLoyaltyRewards();
                return;
              }
              onClose();
            }),
          )}
        </div>
        <div
          style={{
            background: cardBg,
            borderRadius: 16,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            flexShrink: 0,
          }}
        >
          {sectionTwo.map((item, idx) =>
            renderRow(item, idx === sectionTwo.length - 1, () => {
              if (item.label === "My Profile") {
                handleProfile();
                return;
              }
              if (item.label === "Change Password") {
                handleChangePassword();
                return;
              }
              if (item.label === "App Appearance") {
                handleAppearance();
                return;
              }
              if (item.label === "Languages") {
                handleLanguages();
                return;
              }
              if (item.label === "Privacy Policy") {
                handlePrivacy();
                return;
              }
              if (item.label === "Terms & Conditions") {
                handleTerms();
                return;
              }
              onClose();
            }),
          )}
        </div>
        <div style={{ flex: 1, minHeight: 24 }} />
      </div>

      {/* Logout at bottom */}
      <div
        style={{
          flexShrink: 0,
          padding: "16px 20px calc(24px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <div
          style={{
            background: cardBg,
            borderRadius: 16,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          {renderRow(logoutItem, true, () => onClose())}
        </div>
      </div>
    </div>
  );

  if (typeof document !== "undefined") {
    return createPortal(drawerContent, document.body);
  }
  return drawerContent;
}
