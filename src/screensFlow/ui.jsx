import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { createPortal } from "react-dom";
import { useScreensFlow } from "../../context/ScreensFlowContext";
import LocationModal from "./LocationModal";
import Image from "next/image";
import { useTheme } from "../../context/ThemeContext";
import { useLogoutMutation } from "../store/authApiSlice";
import {
  MdKeyboardArrowDown,
  MdMenu,
  MdOutlineLocationOn,
} from "react-icons/md";
import { BANNERS, CATEGORY_DATA, PRICES } from "./data";
import {
  IcoBack,
  IcoClose,
} from "./icons";
import FoodCart from "../../public/assets/icons/food-cart.png";
import PromotionalBanner from "../../public/assets/images/banner-image.png";
import CartIcon from "../../public/assets/icons/cart.svg"
import MenuIcon from "../../public/assets/icons/menu.svg"
import LocationIcon from "../../public/assets/icons/location.svg"
import DropDown from "../../public/assets/icons/Drop_down.svg"
import CloseIcon from "../../public/assets/icons/close.svg"
import BackIcon from "../../public/assets/icons/back.svg"
import MenuClose from "../../public/assets/icons/menuclose.svg"
import IcoChevron  from "../../public/assets/icons/IcoChevron.svg";


export function PageHeader({ title, onBack, transparent, rightElement }) {
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
        padding: "12px 20px 10px",
        background: headerBg,
        flexShrink: 0,
        borderBottom:"1px solid #F4F6F8"
      }}
    >
      <button
        onClick={onBack}
        style={{
          width: 32,
          height: 32,
          borderRadius: 10000,
          background: backBg,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <BackIcon />
      </button>
      <span
        style={{
          flex: 1,
          textAlign: "center",
          fontSize: 16,
          fontWeight: 400,
          color: textColor,
          letterSpacing: "0px",
          fontFamily: "'Montserrat',sans-serif",
        }}
      >
        {title}
      </span>
      {rightElement ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, flexShrink: 0 }}>
          {rightElement}
        </div>
      ) : (
        <div style={{ width: 32 }} />
      )}
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

// const Sunburst = () => (
//   <div
//     style={{
//       position: "absolute",
//       right: 55,
//       top: "50%",
//       transform: "translateY(-50%)",
//       width: 280,
//       height: 280,
//       pointerEvents: "none",
//       zIndex: 1,
//     }}
//   >
//     {Array.from({ length: 18 }).map((_, i) => (
//       <div
//         key={i}
//         style={{
//           position: "absolute",
//           width: 280,
//           height: 1.8,
//           background: "rgba(255,255,255,0.12)",
//           top: "50%",
//           left: "50%",
//           transformOrigin: "0 50%",
//           transform: `translateY(-50%) rotate(${i * 20}deg)`,
//         }}
//       />
//     ))}
//   </div>
// );

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

  // const banner = BANNERS[active];

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
              width: i === active ? 17 : 11,
              height: 5,
              borderRadius: 8,
              background: i === active ? "#E31C3D" : "var(--surface)",
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
        background: "#00000080",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
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
          borderRadius: "8px",
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
            padding: "20px 18px 10px",
          }}
        >
          <div className="border-b border-[#E8E8E8] flex justify-center items-center w-full pb-4.5 relative">
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "#333333",
                fontFamily: "'Montserrat'",
                lineHeight: "normal",
                textAlign: "center",
              }}
            >
              Filter
            </span>
            <button
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                background: "#F4F6F8",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                right: 0,
              }}
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </div>
        </div>
        {/* <div style={{ height: 1, background: "#E8E8E8", margin: "16px 0 0" }} /> */}
        <div style={{ padding: "2px 18px 0" }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 400,
              color: "#333333",
              margin: "0 0 7px",
              fontFamily: "Montserrat",
              lineHeight: "100%"
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
                    padding: "4px 10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 8,
                    fontSize: 8,
                    fontWeight: 400,
                    cursor: "pointer",
                    fontFamily: "'Montserrat'",
                    background: on ? "var(--surface-alt)" : "#FFFFFF",
                    color: on ? "#777777" : "#777777",
                    border: `1.5px solid ${on ? "var(--border)" : "#F4F6F8"}`,
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ padding: "10px 18px 0" }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 400,
              color: "#333333",
              margin: "0 0 7px",
              fontFamily: "Montserrat",
              lineHeight: "100%"
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
                    padding: "4px 10px",
                    borderRadius: 8,
                    fontSize: 8,
                    fontWeight: 400,
                    cursor: "pointer",
                    fontFamily: "'Montserrat'",
                    background: on ? "var(--surface-alt)" : "#FFFFFF",
                    color: on ? "#777777" : "#777777",
                    border: `1.5px solid ${on ? "var(--border)" : "#F4F6F8"}`,
                  }}
                >
                  {/* <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      border: `2px solid ${on ? "var(--text)" : "var(--subtle)"}`,
                      background: on ? "var(--text)" : "transparent",
                      display: "inline-block",
                    }}
                  /> */}
                  {p}
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ padding: "14px 18px 18px" }}>
          <button
            onClick={() => onApply(sc, sp)}
            style={{
              width: "100%",
              height: 40,
              borderRadius: 25,
              border: "none",
              fontSize: 12,
              fontWeight: 400,
              color: "#FFFFFF",
              cursor: "pointer",
              fontFamily: "'Montserrat'",
              background: sc.length || sp ? "#DA1A35" : "#D2D2D2",
            }}
          >
            Apply Filter
            {/* {sc.length || sp ? "✓" : ""} */}
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
  // const hasItems = cartCount > 0;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "10px 18px 12px",
        // background: "linear-gradient(to top,var(--bg) 75%,rgba(0,0,0,0))",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        type="button"
        onClick={onTap}
        style={{
          width: 335,
          height: 48,
          borderRadius: 28,
          background: BRAND_RED,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // alignSelf:"center",
          padding: "0 16px",
          fontFamily: "'Montserrat',sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "#DA1A35",
                fontFamily: "'Montserrat',sans-serif",
                lineHeight: 1,
              }}
            >
              {cartCount}
            </span>
          </div>
          <span
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: "#FFFFFF",
              fontFamily: "'Montserrat',sans-serif",
            }}
          >
            View Order
          </span>
        </div>
        <span
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: "#FFFFFF",
            fontFamily: "'Montserrat',sans-serif",
          }}
        >
          €{typeof total === "number" ? total.toFixed(2) : total}
        </span>
      </button>
    </div>
  );
}

export function AppChrome({ cart, onMenu, onCartTap }) {
  const { state } = useScreensFlow();
  const [locationModalOpen, setLocationModalOpen] = useState(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px 9px",
          background: "var(--bg)",
          flexShrink: 0,
          borderBottom: "1px solid var(--border)"
        }}
      >
        <button
          style={{
            width: 32,
            height: 32,
            borderRadius: 14,
            background: "var(--surface)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={onMenu}
        >
          <MenuIcon color="var(--text)" width={20} height={20} className="theme-icon" />
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
            style={{ fontSize: 10, color: "var(--text)", fontWeight: 400, marginBottom: 5 }}
          >
            Your Location
          </p>
          <div
            onClick={() => setLocationModalOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              cursor: "pointer",
              maxWidth: "100%",
            }}
          >
            <LocationIcon color="#DA1A35" width={20} height={20} />
            <span
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "var(--text)",
                letterSpacing: -0.4,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: 150,
                display: "inline-block",
              }}
            >
              {state.selectedLocation?.address || "Limassol, Cyprus"}
            </span>
            <DropDown width={10} height={6} color={"#DA1A35"} style={{ flexShrink: 0 }} />
          </div>
        </div>
        <button
          style={{
            width: 32,
            height: 32,
            borderRadius: 14,
            background: "var(--surface)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
          onClick={onCartTap}
        >
          {/* <Image src={FoodCart} width={22} height={22} alt="Cart" className="theme-icon" /> */}
          {/* <Image src={CartIcon} width={22} height={22} alt="Cart" className="theme-icon" /> */}
          <CartIcon color="var(--text)" width={20} height={20} />
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
      {locationModalOpen && (
        <LocationModal onClose={() => setLocationModalOpen(false)} />
      )}
    </>
  );
}

export function Drawer({
  isOpen,
  onClose,
  onOrdersHistory,
  onLoyaltyRewards,
}) {
  const router = useRouter();
  const { isDark } = useTheme();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      if (onClose) onClose();
      router.push("/login");
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Icons use actual filenames from public/assets/icons (names may differ slightly, e.g. loylity_icon.svg for Loyalty).
  const sectionOne = [
    { label: "Orders History", icon: "/assets/icons/order_history_icon.svg" },
    { label: "Loyalty Rewards", icon: "/assets/icons/loylity_icon.svg" },
    { label: "Notifications", icon: "/assets/icons/notification_icon.svg" },
  ];

  const sectionTwo = [
    { label: "My Profile", icon: "/assets/icons/profile_icon.svg" },
    { label: "Change Password", icon: "/assets/icons/change_password_icon.svg" },
    { label: "App Appearance", icon: "/assets/icons/theme.svg" },
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
  const textColor = isDark ? "#fff" : "#333333";
  const dividerColor = isDark ? "rgba(255,255,255,0.08)" : "#ECEFF3";
  const chevronColor = isDark ? "#fff" : "#ccc";

  const renderRow = (item, isLast, onClick, hideChevron) => (
    <button
      key={item.label}
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "10px 8px",
        background: "none",
        border: "none",
        // borderBottom: isLast ? "none" : `1px solid ${dividerColor}`,
        cursor: "pointer",
        textAlign: "left",
        fontSize: 14,
        fontWeight: 400,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          background: isDark ? "#1C1C1E" : "",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 4,
          flexShrink: 0,
          fontWeight: 400,
        }}
      >
        <img
          src={item.icon}
          alt={item.label}
          style={{
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
          fontWeight: 400,
          color: textColor,
        }}
      >
        {item.label}
      </span>
      {!hideChevron && <IcoChevron c={chevronColor} />}
    </button>
  );

  const drawerContent = (
    <div
      style={{
        position: "absolute",
        width: "100%",
        inset: 0,
        background: pageBg,
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        overscrollBehavior: "none",
        transition: "transform 0.3s ease-in-out, visibility 0.3s",
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        visibility: isOpen ? "visible" : "hidden",
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
          borderBottom: "1px solid #F4F6F8"

        }}
      >
        {/* <button
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
          </button> */}
        <span
          style={{
            fontSize: 16,
            fontWeight: 400,
            color: textColor,
            width: "100%",
            textAlign: "center",
            letterSpacing: "0px",
            fontFamily: "'Montserrat',sans-serif",
          }}
        >
          Menu
        </span>
        <button
          type="button"
          onClick={onClose}
          style={{
            width: 32,
            height: 30,
            borderRadius: 10000,
            border: "none",
            background: isDark ? "#1C1C1E" : "#F4F6F8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <MenuClose />
        </button>
      </div>

      {/* Middle: section cards + spacer pushes Logout to bottom */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          padding: "16px 20px 24px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          scrollbarWidth: "none",
        }}
      >
        <div
          style={{
            background: cardBg,
            borderRadius: 8,
            // boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            flexShrink: 0,
            paddingTop:"2px",
            paddingRight:"3px"
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
            borderRadius: 8,
            // boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            flexShrink: 0,
            paddingBottom:"12px",
            paddingRight:"3px"
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
        <div
          style={{
            marginTop:"70px",
            background: cardBg,
            borderRadius: 8,
            flexShrink: 0,
            paddingRight: "3px",
          }}
        >
          {renderRow(logoutItem, true, handleLogout, true)}
        </div>
      </div>

    </div>
  );

  return drawerContent;
}
