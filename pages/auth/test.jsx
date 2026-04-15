"use client";
import { useState } from "react";

/* ─── DARK MODE DESIGN TOKENS ─────────────────────────────────────── */
const C = {
  primary: "#DA1A35",
  primaryDk: "#DA1A35",
  primaryLt: "rgba(26,127,212,.15)",
  bg: "#111318",
  surface: "#1C1F27",
  surface2: "#252830",
  surface3: "#2E3240",
  border: "#2E3240",
  borderLt: "#3A3F52",
  text: "#F0F2F8",
  sub: "#A0A8C0",
  muted: "#606880",
  white: "#FFFFFF",
  red: "#FF5252",
  green: "#69F0AE",
  gold: "#FFD740",
};

/* ─── ASSETS ──────────────────────────────────────────────────────── */
const IMG = {
  tgi: "https://www.figma.com/api/mcp/asset/ff48d415-6ca6-4f8c-a94f-81ed4d7bf5ed",
  bay: "https://www.figma.com/api/mcp/asset/d37e9a29-a09a-4fe1-adb4-021e682d770d",
  yogurt:
    "https://www.figma.com/api/mcp/asset/8dd19e62-3539-4a0d-a0f5-0a27ec737e8e",
  hard: "https://www.figma.com/api/mcp/asset/d30f6e9f-085e-41cc-ad4a-2cbe3331d97f",
  jail: "https://www.figma.com/api/mcp/asset/f18be15a-999c-431b-9739-66573c5f8eb0",
  promo:
    "https://www.figma.com/api/mcp/asset/7a60eede-9ad9-4964-8356-1bf3ecf0b1fb",
};

const MENU_ITEMS = [
  {
    id: 1,
    name: "Jack Daniel's Burger",
    price: 16.5,
    cat: "Burgers",
    img: IMG.tgi,
    desc: "Smoky BBQ sauce, cheddar, crispy onions on a brioche bun",
    rating: 4.8,
    time: "15-20 min",
  },
  {
    id: 2,
    name: "Crispy Chicken Strips",
    price: 13.9,
    cat: "Chicken",
    img: IMG.bay,
    desc: "Hand-breaded chicken tenders with honey mustard dip",
    rating: 4.6,
    time: "12-15 min",
  },
  {
    id: 3,
    name: "Loaded Potato Skins",
    price: 9.5,
    cat: "Starters",
    img: IMG.yogurt,
    desc: "Crispy potato skins loaded with cheese, bacon & sour cream",
    rating: 4.5,
    time: "10-12 min",
  },
  {
    id: 4,
    name: "Friday's Signature Ribs",
    price: 24.9,
    cat: "Mains",
    img: IMG.hard,
    desc: "Fall-off-the-bone baby back ribs with our famous BBQ glaze",
    rating: 4.9,
    time: "25-30 min",
  },
  {
    id: 5,
    name: "Strawberry Cheesecake",
    price: 8.9,
    cat: "Desserts",
    img: IMG.jail,
    desc: "Fresh strawberry cheesecake with whipped cream topping",
    rating: 4.7,
    time: "5-8 min",
  },
  {
    id: 6,
    name: "Classic Caesar Salad",
    price: 11.5,
    cat: "Salads",
    img: IMG.tgi,
    desc: "Romaine lettuce, parmesan, croutons with house Caesar dressing",
    rating: 4.4,
    time: "8-10 min",
  },
];

const RESTAURANTS = [
  {
    id: 1,
    name: "TGI FRIDAY'S",
    img: IMG.tgi,
    distance: "2.2 Km",
    time: "09:00-22:00",
    rating: 4.8,
  },
  {
    id: 2,
    name: "36 BAY STREET",
    img: IMG.bay,
    distance: "1.2 Km",
    time: "10:00-23:00",
    rating: 4.5,
  },
  {
    id: 3,
    name: "YOGARTIST FROZEN YOGURT",
    img: IMG.yogurt,
    distance: "1.4 Km",
    time: "09:00-21:00",
    rating: 4.6,
  },
  {
    id: 4,
    name: "HARD ROCK CAFE",
    img: IMG.hard,
    distance: "3.1 Km",
    time: "11:00-23:00",
    rating: 4.7,
  },
  {
    id: 5,
    name: "JAILBIRD",
    img: IMG.jail,
    distance: "0.8 Km",
    time: "08:00-22:00",
    rating: 4.3,
  },
];

/* ─── ICONS ───────────────────────────────────────────────────────── */
const I = {
  menu: () => (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <rect x="2" y="4.5" width="16" height="1.8" rx="1" fill={C.text} />
      <rect x="2" y="9.1" width="16" height="1.8" rx="1" fill={C.text} />
      <rect x="2" y="13.7" width="16" height="1.8" rx="1" fill={C.text} />
    </svg>
  ),
  loc: () => (
    <svg width="13" height="13" viewBox="0 0 24 24">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"
        fill={C.primary}
      />
    </svg>
  ),
  down: (col = C.text) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 9l6 6 6-6"
        stroke={col}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  right: (col = C.muted) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18l6-6-6-6"
        stroke={col}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  left: (col = C.text) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M15 18l-6-6 6-6"
        stroke={col}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  search: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={C.muted} strokeWidth="2" />
      <path
        d="M16.5 16.5L21 21"
        stroke={C.muted}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  filter: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 6h16M7 12h10M10 18h4"
        stroke={C.sub}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  bell: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
      <path
        d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"
        stroke={C.text}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.73 21a2 2 0 01-3.46 0"
        stroke={C.text}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  home: (a) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"
        stroke={a ? C.primary : C.muted}
        strokeWidth="1.6"
        fill={a ? C.primaryLt : "none"}
      />
      <path
        d="M9 21V12h6v9"
        stroke={a ? C.primary : C.muted}
        strokeWidth="1.6"
      />
    </svg>
  ),
  cart: (a) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
        stroke={a ? C.primary : C.muted}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <line
        x1="3"
        y1="6"
        x2="21"
        y2="6"
        stroke={a ? C.primary : C.muted}
        strokeWidth="1.6"
      />
      <path
        d="M16 10a4 4 0 01-8 0"
        stroke={a ? C.primary : C.muted}
        strokeWidth="1.6"
      />
    </svg>
  ),
  wallet: (a) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7z"
        stroke={a ? C.primary : C.muted}
        strokeWidth="1.6"
      />
      <circle cx="17" cy="12" r="2" fill={a ? C.primary : C.muted} />
    </svg>
  ),
  profile: (a) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="8"
        r="4"
        stroke={a ? C.primary : C.muted}
        strokeWidth="1.6"
      />
      <path
        d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"
        stroke={a ? C.primary : C.muted}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  star: (f) => (
    <svg width="12" height="12" viewBox="0 0 24 24">
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={f ? C.gold : C.surface3}
      />
    </svg>
  ),
  truck: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"
        stroke={C.muted}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="5.5" cy="18.5" r="2.5" fill={C.muted} />
      <circle cx="18.5" cy="18.5" r="2.5" fill={C.muted} />
    </svg>
  ),
  clock: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={C.primary} strokeWidth="1.5" />
      <path
        d="M12 7v5l3 3"
        stroke={C.primary}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  dist: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L8 6h3v5H8l4 4 4-4h-3V6h3L12 2z" fill={C.muted} />
    </svg>
  ),
  plus: (col = C.white) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 5v14M5 12h14"
        stroke={col}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  minus: (col = C.primary) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14" stroke={col} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  logout: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
        stroke={C.red}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16 17l5-5-5-5M21 12H9"
        stroke={C.red}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

/* ─── STATUS BAR ──────────────────────────────────────────────────── */
function StatusBar() {
  return (
    <div
      style={{
        height: 47,
        background: C.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 22px 0",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: "Poppins,sans-serif",
          fontWeight: 600,
          fontSize: 17,
          color: C.text,
          letterSpacing: "-0.4px",
        }}
      >
        9:41
      </span>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: 3,
              borderRadius: 1,
              height: 7 + i * 1.5,
              background: C.text,
              opacity: i === 3 ? 0.3 : 1,
            }}
          />
        ))}
        <svg
          width="16"
          height="11"
          viewBox="0 0 16 11"
          style={{ margin: "0 2px" }}
        >
          <path
            d="M8 2C5.4 2 3 3.1 1.3 4.9L0 3.6C2.1 1.4 5 0 8 0s5.9 1.4 8 3.6L14.7 4.9C13 3.1 10.6 2 8 2z"
            fill={C.text}
          />
          <path
            d="M8 5.5c-1.7 0-3.2.7-4.3 1.8L2.4 6C3.8 4.5 5.8 3.5 8 3.5s4.2 1 5.6 2.5L12.3 7.3C11.2 6.2 9.7 5.5 8 5.5z"
            fill={C.text}
          />
          <circle cx="8" cy="10" r="1.8" fill={C.text} />
        </svg>
        <svg width="26" height="13" viewBox="0 0 26 13">
          <rect
            x=".5"
            y=".5"
            width="22"
            height="12"
            rx="3.5"
            stroke={C.text}
            strokeOpacity=".35"
          />
          <rect x="1.5" y="1.5" width="17" height="10" rx="2.5" fill={C.text} />
          <path d="M24 4.5v4a2 2 0 000-4z" fill={C.text} fillOpacity=".4" />
        </svg>
      </div>
    </div>
  );
}

/* ─── TOP NAV ─────────────────────────────────────────────────────── */
function TopNav({ onMenu, title, showBack, onBack, hideRight }) {
  return (
    <div
      style={{
        height: 56,
        background: C.surface,
        borderBottom: `1px solid ${C.border}`,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: 8,
        flexShrink: 0,
        position: "relative",
      }}
    >
      {showBack ? (
        <button
          onClick={onBack}
          style={{
            background: C.surface2,
            border: "none",
            borderRadius: 32,
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {I.left()}
        </button>
      ) : (
        <button
          onClick={onMenu}
          style={{
            background: C.surface2,
            border: "none",
            borderRadius: 32,
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <I.menu />
        </button>
      )}
      {title ? (
        <span
          style={{
            fontFamily: "Montserrat,sans-serif",
            fontSize: 16,
            color: C.text,
            flex: 1,
            textAlign: "center",
          }}
        >
          {title}
        </span>
      ) : (
        <div style={{ flex: 1, textAlign: "center" }}>
          <div
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: 10,
              color: C.muted,
            }}
          >
            Your Location
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <I.loc />
            <span
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: C.text,
              }}
            >
              Limassol, Cyprus
            </span>
            {I.down()}
          </div>
        </div>
      )}
      {hideRight ? (
        <div style={{ width: 32 }} />
      ) : (
        <div
          style={{
            width: 32,
            height: 32,
            background: C.surface2,
            borderRadius: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <I.bell />
        </div>
      )}
    </div>
  );
}

/* ─── BOTTOM NAV ──────────────────────────────────────────────────── */
function BottomNav({ active, go, cartCount }) {
  const tabs = [
    { id: "home", label: "Home", ic: I.home },
    { id: "cart", label: "Cart", ic: I.cart },
    { id: "wallet", label: "Wallet", ic: I.wallet },
    { id: "profile", label: "Profile", ic: I.profile },
  ];
  return (
    <div
      style={{
        height: 74,
        background: C.surface,
        borderTop: `1px solid ${C.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        paddingBottom: 14,
        flexShrink: 0,
      }}
    >
      {tabs.map(({ id, label, ic }) => {
        const a = active === id;
        return (
          <button
            key={id}
            onClick={() => go(id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px 10px",
              position: "relative",
            }}
          >
            {ic(a)}
            <span
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: 10,
                color: a ? C.primary : C.muted,
                fontWeight: a ? 700 : 400,
              }}
            >
              {label}
            </span>
            {id === "cart" && cartCount > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: 2,
                  right: 4,
                  background: C.red,
                  borderRadius: 10,
                  minWidth: 16,
                  height: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 3px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontSize: 9,
                    color: C.white,
                    fontWeight: 700,
                  }}
                >
                  {cartCount}
                </span>
              </div>
            )}
            {a && (
              <div
                style={{
                  width: 20,
                  height: 2,
                  borderRadius: 1,
                  background: C.primary,
                  marginTop: 1,
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ─── HOME SCREEN ─────────────────────────────────────────────────── */
function HomeScreen({ go }) {
  const [dot, setDot] = useState(1);
  const [q, setQ] = useState("");
  const list = RESTAURANTS.filter((r) =>
    r.name.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div style={{ flex: 1, overflowY: "auto", background: C.bg }}>
      {/* Search */}
      <div style={{ background: C.surface, padding: "12px 16px 16px" }}>
        <div
          style={{
            background: C.surface2,
            border: `1px solid ${C.border}`,
            borderRadius: 62,
            height: 46,
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            gap: 8,
          }}
        >
          <I.search />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search restaurant etc"
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: 13,
              color: C.text,
              background: "none",
              border: "none",
              outline: "none",
              flex: 1,
            }}
          />
          <I.filter />
        </div>
      </div>
      {/* Promo */}
      <div style={{ background: C.surface, padding: "0 16px 8px" }}>
        <div
          onClick={() => go("restaurant", RESTAURANTS[0])}
          style={{
            background: `linear-gradient(135deg,#02508C,#0a2d5a)`,
            borderRadius: 12,
            height: 204,
            overflow: "hidden",
            position: "relative",
            cursor: "pointer",
            border: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -20,
              top: -20,
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: "rgba(255,255,255,.05)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: -50,
              bottom: -50,
              width: 220,
              height: 220,
              borderRadius: "50%",
              border: "48px solid rgba(255,255,255,.04)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 30% 50%,rgba(26,127,212,.2),transparent 60%)",
            }}
          />
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <img
              src={IMG.promo}
              alt=""
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "55%",
                height: "160%",
                objectFit: "cover",
                objectPosition: "center top",
                transform: "scaleX(-1)",
                opacity: 0.8,
                filter: "brightness(.9)",
              }}
            />
          </div>
          <div style={{ position: "absolute", right: 14, top: 18, width: 162 }}>
            <span
              style={{
                fontFamily: "Anton,sans-serif",
                fontSize: 17,
                color: C.white,
                display: "block",
                lineHeight: 1.2,
              }}
            >
              Gonna be a good day!
            </span>
            <span
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: 13,
                color: "rgba(255,255,255,.8)",
                display: "block",
                marginTop: 52,
              }}
            >
              Get Fast
            </span>
            <div style={{ display: "flex", gap: 5, alignItems: "baseline" }}>
              <span
                style={{
                  fontFamily: "Anton,sans-serif",
                  fontSize: 30,
                  color: C.white,
                }}
              >
                500
              </span>
              <span
                style={{
                  fontFamily: "Anton,sans-serif",
                  fontSize: 19,
                  color: C.white,
                }}
              >
                Points
              </span>
            </div>
            <span
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: 11,
                color: "rgba(255,255,255,.7)",
                display: "block",
                lineHeight: 1.4,
                marginTop: 2,
              }}
            >
              Order more than €144 and get 500 points
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            marginTop: 8,
            paddingBottom: 4,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              onClick={() => setDot(i)}
              style={{
                height: 4,
                width: i === dot ? 18 : 10,
                borderRadius: 4,
                background: i === dot ? C.primary : C.surface3,
                cursor: "pointer",
                transition: "all .3s",
              }}
            />
          ))}
        </div>
      </div>
      {/* Nearby */}
      <div
        style={{ background: C.surface, marginTop: 6, padding: "14px 16px 0" }}
      >
        <span
          style={{
            fontFamily: "Montserrat,sans-serif",
            fontSize: 15,
            fontWeight: 700,
            color: C.text,
          }}
        >
          Nearby Restaurants
        </span>
        <div style={{ marginTop: 12 }}>
          {list.map((r) => (
            <div
              key={r.id}
              onClick={() => go("restaurant", r)}
              style={{
                background: C.surface2,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                overflow: "hidden",
                marginBottom: 14,
                cursor: "pointer",
              }}
            >
              <div style={{ position: "relative", height: 118 }}>
                <img
                  src={r.img}
                  alt={r.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(.75)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom,rgba(0,0,0,.1),rgba(0,0,0,.5))",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    background: C.primaryDk,
                    borderRadius: "7px 0 7px 0",
                    padding: "4px 10px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Montserrat,sans-serif",
                      fontSize: 10,
                      color: C.white,
                      fontWeight: 600,
                    }}
                  >
                    Restaurant
                  </span>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    background: "rgba(0,0,0,.5)",
                    borderRadius: 20,
                    padding: "3px 8px",
                    display: "flex",
                    gap: 3,
                    alignItems: "center",
                  }}
                >
                  {I.star(true)}
                  <span
                    style={{
                      fontFamily: "Montserrat,sans-serif",
                      fontSize: 11,
                      color: C.white,
                      fontWeight: 600,
                    }}
                  >
                    {r.rating}
                  </span>
                </div>
              </div>
              <div style={{ padding: "10px 12px 12px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Montserrat,sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      color: C.text,
                    }}
                  >
                    {r.name}
                  </span>
                  <div
                    style={{ display: "flex", gap: 4, alignItems: "center" }}
                  >
                    <I.dist />
                    <span
                      style={{
                        fontFamily: "Montserrat,sans-serif",
                        fontSize: 11,
                        color: C.muted,
                      }}
                    >
                      {r.distance}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 18, marginTop: 6 }}>
                  <div
                    style={{ display: "flex", gap: 4, alignItems: "center" }}
                  >
                    <I.truck />
                    <span
                      style={{
                        fontFamily: "Montserrat,sans-serif",
                        fontSize: 11,
                        color: C.muted,
                      }}
                    >
                      Free Delivery
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", gap: 4, alignItems: "center" }}
                  >
                    <I.clock />
                    <span
                      style={{
                        fontFamily: "Montserrat,sans-serif",
                        fontSize: 11,
                        color: C.muted,
                      }}
                    >
                      {r.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 20, background: C.surface }} />
    </div>
  );
}

/* ─── RESTAURANT SCREEN ───────────────────────────────────────────── */
function RestaurantScreen({ restaurant, go, addToCart }) {
  const cats = [
    "All",
    "Starters",
    "Burgers",
    "Chicken",
    "Mains",
    "Salads",
    "Desserts",
  ];
  const [cat, setCat] = useState("All");
  const items =
    cat === "All" ? MENU_ITEMS : MENU_ITEMS.filter((m) => m.cat === cat);
  return (
    <div style={{ flex: 1, overflowY: "auto", background: C.bg }}>
      <div style={{ position: "relative", height: 200 }}>
        <img
          src={restaurant?.img || IMG.tgi}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(.6)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom,rgba(0,0,0,.1),rgba(0,0,0,.7))",
          }}
        />
        <div style={{ position: "absolute", bottom: 16, left: 16 }}>
          <span
            style={{
              fontFamily: "Anton,sans-serif",
              fontSize: 22,
              color: C.white,
              display: "block",
            }}
          >
            {restaurant?.name || "TGI FRIDAY'S"}
          </span>
          <div style={{ display: "flex", gap: 14, marginTop: 4 }}>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <I.truck />
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontSize: 12,
                  color: "rgba(255,255,255,.85)",
                }}
              >
                Free Delivery
              </span>
            </div>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <I.clock />
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontSize: 12,
                  color: "rgba(255,255,255,.85)",
                }}
              >
                {restaurant?.time}
              </span>
            </div>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {I.star(true)}
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontSize: 12,
                  color: "rgba(255,255,255,.85)",
                }}
              >
                {restaurant?.rating}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ background: C.surface, borderBottom: `1px solid ${C.border}` }}
      >
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            padding: "0 12px",
            gap: 4,
            scrollbarWidth: "none",
          }}
        >
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                flexShrink: 0,
                padding: "12px 14px",
                background: "none",
                border: "none",
                borderBottom: `2.5px solid ${cat === c ? C.primary : "transparent"}`,
                fontFamily: "Montserrat,sans-serif",
                fontSize: 13,
                color: cat === c ? C.primary : C.muted,
                fontWeight: cat === c ? 700 : 400,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all .2s",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "12px 16px", background: C.bg }}>
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => go("item", item)}
            style={{
              background: C.surface,
              borderRadius: 10,
              padding: "12px",
              marginBottom: 10,
              display: "flex",
              gap: 12,
              cursor: "pointer",
              border: `1px solid ${C.border}`,
            }}
          >
            <img
              src={item.img}
              alt={item.name}
              style={{
                width: 80,
                height: 80,
                borderRadius: 8,
                objectFit: "cover",
                flexShrink: 0,
                filter: "brightness(.85)",
              }}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.text,
                }}
              >
                {item.name}
              </span>
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontSize: 11,
                  color: C.muted,
                  lineHeight: 1.4,
                }}
              >
                {item.desc}
              </span>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "auto",
                }}
              >
                <span
                  style={{
                    fontFamily: "Anton,sans-serif",
                    fontSize: 16,
                    color: C.primary,
                  }}
                >
                  €{item.price.toFixed(2)}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                  style={{
                    background: C.primary,
                    border: "none",
                    borderRadius: 20,
                    width: 30,
                    height: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  {I.plus()}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: 16 }} />
    </div>
  );
}

/* ─── ITEM DETAIL ─────────────────────────────────────────────────── */
function ItemScreen({ item, addToCart, go }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [opts, setOpts] = useState([]);
  const options = [
    "Extra Cheese +€1.50",
    "Extra Sauce +€0.50",
    "No Onions",
    "Extra Pickles +€0.75",
  ];
  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(item);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      go("cart");
    }, 1200);
  };
  return (
    <div style={{ flex: 1, overflowY: "auto", background: C.bg }}>
      <div style={{ position: "relative", height: 260 }}>
        <img
          src={item.img}
          alt={item.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(.7)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom,transparent 40%,rgba(0,0,0,.7))",
          }}
        />
      </div>
      <div
        style={{
          background: C.surface,
          borderRadius: "16px 16px 0 0",
          marginTop: -16,
          position: "relative",
          padding: "20px 16px",
          minHeight: 400,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: 1 }}>
            <span
              style={{
                fontFamily: "Anton,sans-serif",
                fontSize: 22,
                color: C.text,
                display: "block",
                lineHeight: 1.2,
              }}
            >
              {item.name}
            </span>
            <div
              style={{
                display: "flex",
                gap: 3,
                marginTop: 4,
                alignItems: "center",
              }}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i}>{I.star(i <= Math.round(item.rating))}</div>
              ))}
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontSize: 11,
                  color: C.muted,
                  marginLeft: 4,
                }}
              >
                {item.rating}
              </span>
            </div>
          </div>
          <span
            style={{
              fontFamily: "Anton,sans-serif",
              fontSize: 26,
              color: C.primary,
            }}
          >
            €{item.price.toFixed(2)}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 14,
            paddingTop: 14,
            borderTop: `1px solid ${C.border}`,
          }}
        >
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <I.truck />
            <span
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: 12,
                color: C.muted,
              }}
            >
              Free Delivery
            </span>
          </div>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <I.clock />
            <span
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: 12,
                color: C.muted,
              }}
            >
              {item.time}
            </span>
          </div>
        </div>
        <div style={{ marginTop: 18 }}>
          <span
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: C.text,
            }}
          >
            Description
          </span>
          <p
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: 13,
              color: C.sub,
              lineHeight: 1.6,
              marginTop: 8,
            }}
          >
            {item.desc}
          </p>
        </div>
        <div style={{ marginTop: 18 }}>
          <span
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: C.text,
            }}
          >
            Customise
          </span>
          {options.map((opt, i) => (
            <div
              key={i}
              onClick={() =>
                setOpts((p) =>
                  p.includes(i) ? p.filter((x) => x !== i) : [...p, i],
                )
              }
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: `1px solid ${C.border}`,
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontSize: 13,
                  color: C.sub,
                }}
              >
                {opt}
              </span>
              <div
                style={{
                  width: 20,
                  height: 20,
                  border: `2px solid ${opts.includes(i) ? C.primary : C.borderLt}`,
                  borderRadius: 4,
                  background: opts.includes(i) ? C.primary : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {opts.includes(i) && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12l5 5 9-9"
                      stroke={C.white}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 22,
          }}
        >
          <div
            style={{
              background: C.surface2,
              borderRadius: 24,
              display: "flex",
              overflow: "hidden",
              border: `1px solid ${C.border}`,
            }}
          >
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              style={{
                width: 38,
                height: 38,
                border: "none",
                background: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {I.minus()}
            </button>
            <span
              style={{
                fontFamily: "Anton,sans-serif",
                fontSize: 18,
                color: C.text,
                width: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => q + 1)}
              style={{
                width: 38,
                height: 38,
                border: "none",
                background: C.primary,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 24,
              }}
            >
              {I.plus()}
            </button>
          </div>
          <button
            onClick={handleAdd}
            style={{
              background: added ? "#1B5E20" : C.primary,
              border: "none",
              borderRadius: 24,
              padding: "12px 22px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              transition: "background .3s",
              flex: 1,
              marginLeft: 12,
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: 14,
                color: C.white,
                fontWeight: 700,
              }}
            >
              {added
                ? "✓ Added!"
                : `Add to Cart — €${(item.price * qty).toFixed(2)}`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── CART SCREEN ─────────────────────────────────────────────────── */
function CartScreen({ cart, updateCart, go }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  if (!cart.length)
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: C.bg,
          gap: 12,
          padding: 40,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 64 }}>🛒</div>
        <span
          style={{
            fontFamily: "Anton,sans-serif",
            fontSize: 24,
            color: C.text,
          }}
        >
          Your cart is empty
        </span>
        <span
          style={{
            fontFamily: "Montserrat,sans-serif",
            fontSize: 14,
            color: C.muted,
          }}
        >
          Add items from nearby restaurants
        </span>
        <button
          onClick={() => go("home")}
          style={{
            background: C.primary,
            border: "none",
            borderRadius: 24,
            padding: "12px 32px",
            fontFamily: "Montserrat,sans-serif",
            fontSize: 14,
            color: C.white,
            fontWeight: 700,
            cursor: "pointer",
            marginTop: 8,
          }}
        >
          Browse Restaurants
        </button>
      </div>
    );
  return (
    <div style={{ flex: 1, overflowY: "auto", background: C.bg }}>
      <div
        style={{
          background: C.surface,
          borderBottom: `1px solid ${C.border}`,
          padding: "12px 16px",
        }}
      >
        <span
          style={{
            fontFamily: "Montserrat,sans-serif",
            fontSize: 13,
            color: C.muted,
          }}
        >
          {cart.reduce((s, i) => s + i.qty, 0)} items in your cart
        </span>
      </div>
      <div style={{ padding: "12px 16px" }}>
        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              background: C.surface,
              borderRadius: 10,
              padding: "12px",
              marginBottom: 10,
              display: "flex",
              gap: 12,
              border: `1px solid ${C.border}`,
            }}
          >
            <img
              src={item.img}
              alt={item.name}
              style={{
                width: 64,
                height: 64,
                borderRadius: 8,
                objectFit: "cover",
                flexShrink: 0,
                filter: "brightness(.8)",
              }}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.text,
                }}
              >
                {item.name}
              </span>
              <span
                style={{
                  fontFamily: "Anton,sans-serif",
                  fontSize: 15,
                  color: C.primary,
                }}
              >
                €{item.price.toFixed(2)}
              </span>
              <div style={{ display: "flex", gap: 0, marginTop: 4 }}>
                <button
                  onClick={() => updateCart(item.id, -1)}
                  style={{
                    width: 28,
                    height: 28,
                    border: `1px solid ${C.border}`,
                    borderRadius: "6px 0 0 6px",
                    background: C.surface2,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {I.minus(C.text)}
                </button>
                <span
                  style={{
                    width: 32,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid ${C.border}`,
                    borderLeft: "none",
                    borderRight: "none",
                    fontFamily: "Montserrat,sans-serif",
                    fontSize: 13,
                    color: C.text,
                    background: C.surface2,
                  }}
                >
                  {item.qty}
                </span>
                <button
                  onClick={() => updateCart(item.id, 1)}
                  style={{
                    width: 28,
                    height: 28,
                    border: `1px solid ${C.border}`,
                    borderRadius: "0 6px 6px 0",
                    background: C.primary,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {I.plus()}
                </button>
              </div>
            </div>
            <span
              style={{
                fontFamily: "Anton,sans-serif",
                fontSize: 15,
                color: C.sub,
                flexShrink: 0,
              }}
            >
              €{(item.price * item.qty).toFixed(2)}
            </span>
          </div>
        ))}
        <div
          style={{
            background: C.surface,
            borderRadius: 10,
            padding: "14px",
            marginBottom: 10,
            display: "flex",
            gap: 10,
            alignItems: "center",
            border: `1px dashed ${C.primary}`,
          }}
        >
          <span style={{ fontSize: 20 }}>🎫</span>
          <input
            placeholder="Promo code / Loyalty points"
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: 13,
              border: "none",
              outline: "none",
              flex: 1,
              color: C.text,
              background: "none",
            }}
          />
          <button
            style={{
              background: C.primary,
              border: "none",
              borderRadius: 8,
              padding: "6px 12px",
              fontFamily: "Montserrat,sans-serif",
              fontSize: 12,
              color: C.white,
              cursor: "pointer",
            }}
          >
            Apply
          </button>
        </div>
        <div
          style={{
            background: C.surface,
            borderRadius: 10,
            padding: "16px",
            border: `1px solid ${C.border}`,
          }}
        >
          <span
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: C.text,
            }}
          >
            Order Summary
          </span>
          {[
            ["Subtotal", `€${total.toFixed(2)}`],
            ["Delivery", "Free"],
            ["Tax", `€${(total * 0.09).toFixed(2)}`],
          ].map(([l, v]) => (
            <div
              key={l}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontSize: 13,
                  color: C.sub,
                }}
              >
                {l}
              </span>
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontSize: 13,
                  color: l === "Delivery" ? C.green : C.text,
                  fontWeight: l === "Delivery" ? 700 : 400,
                }}
              >
                {v}
              </span>
            </div>
          ))}
          <div
            style={{
              borderTop: `1px solid ${C.border}`,
              marginTop: 12,
              paddingTop: 12,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: C.text,
              }}
            >
              Total
            </span>
            <span
              style={{
                fontFamily: "Anton,sans-serif",
                fontSize: 18,
                color: C.primary,
              }}
            >
              €{(total + total * 0.09).toFixed(2)}
            </span>
          </div>
        </div>
        <button
          onClick={() => go("checkout")}
          style={{
            width: "100%",
            background: C.primary,
            border: "none",
            borderRadius: 12,
            padding: "15px",
            fontFamily: "Montserrat,sans-serif",
            fontSize: 15,
            color: C.white,
            fontWeight: 700,
            cursor: "pointer",
            marginTop: 14,
            letterSpacing: 0.3,
          }}
        >
          Proceed to Checkout →
        </button>
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}

/* ─── CHECKOUT SCREEN ─────────────────────────────────────────────── */
function CheckoutScreen({ cart, go, clearCart }) {
  const [method, setMethod] = useState("card");
  const [done, setDone] = useState(false);
  const total = (cart.reduce((s, i) => s + i.price * i.qty, 0) * 1.09).toFixed(
    2,
  );
  const pay = () => {
    setDone(true);
    clearCart();
    setTimeout(() => go("success"), 500);
  };
  return (
    <div style={{ flex: 1, overflowY: "auto", background: C.bg }}>
      <div style={{ padding: "14px 16px" }}>
        <div
          style={{
            background: C.surface,
            borderRadius: 10,
            padding: "16px",
            marginBottom: 10,
            border: `1px solid ${C.border}`,
          }}
        >
          <span
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: C.text,
            }}
          >
            Delivery Address
          </span>
          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 12,
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 24 }}>📍</span>
            <div style={{ flex: 1 }}>
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.text,
                  display: "block",
                }}
              >
                Limassol, Cyprus
              </span>
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontSize: 12,
                  color: C.muted,
                }}
              >
                123 Anexartisias St, 3036
              </span>
            </div>
            <button
              style={{
                background: C.primaryLt,
                border: "none",
                borderRadius: 8,
                padding: "6px 10px",
                fontFamily: "Montserrat,sans-serif",
                fontSize: 11,
                color: C.primary,
                cursor: "pointer",
              }}
            >
              Change
            </button>
          </div>
        </div>
        <div
          style={{
            background: C.surface,
            borderRadius: 10,
            padding: "16px",
            marginBottom: 10,
            border: `1px solid ${C.border}`,
          }}
        >
          <span
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: C.text,
            }}
          >
            Payment Method
          </span>
          {[
            { id: "card", label: "Credit / Debit Card", icon: "💳" },
            { id: "cash", label: "Cash on Delivery", icon: "💵" },
            { id: "apple", label: "Apple Pay", icon: "🍎" },
          ].map((m) => (
            <div
              key={m.id}
              onClick={() => setMethod(m.id)}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                marginTop: 12,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  border: `2px solid ${method === m.id ? C.primary : C.borderLt}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {method === m.id && (
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      background: C.primary,
                    }}
                  />
                )}
              </div>
              <span style={{ fontSize: 18 }}>{m.icon}</span>
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontSize: 13,
                  color: C.text,
                  flex: 1,
                }}
              >
                {m.label}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            background: C.surface,
            borderRadius: 10,
            padding: "16px",
            marginBottom: 14,
            border: `1px solid ${C.border}`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: C.text,
              }}
            >
              Total to Pay
            </span>
            <span
              style={{
                fontFamily: "Anton,sans-serif",
                fontSize: 20,
                color: C.primary,
              }}
            >
              €{total}
            </span>
          </div>
        </div>
        <button
          onClick={pay}
          style={{
            width: "100%",
            background: done ? "#1B5E20" : C.primary,
            border: "none",
            borderRadius: 12,
            padding: "16px",
            fontFamily: "Montserrat,sans-serif",
            fontSize: 15,
            color: C.white,
            fontWeight: 700,
            cursor: "pointer",
            transition: "background .3s",
          }}
        >
          {done ? "✓ Processing..." : "Confirm & Pay"}
        </button>
      </div>
    </div>
  );
}

/* ─── SUCCESS SCREEN ──────────────────────────────────────────────── */
function SuccessScreen({ go }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: C.surface,
        padding: 32,
        gap: 14,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 80 }}>🎉</div>
      <span
        style={{ fontFamily: "Anton,sans-serif", fontSize: 28, color: C.text }}
      >
        Order Placed!
      </span>
      <span
        style={{
          fontFamily: "Montserrat,sans-serif",
          fontSize: 13,
          color: C.muted,
          lineHeight: 1.6,
        }}
      >
        Your order is being prepared. Estimated delivery time is 25–35 minutes.
      </span>
      <div
        style={{
          background: C.surface2,
          borderRadius: 12,
          padding: "16px 20px",
          marginTop: 6,
          width: "100%",
          border: `1px solid ${C.border}`,
        }}
      >
        <span
          style={{
            fontFamily: "Montserrat,sans-serif",
            fontSize: 12,
            color: C.sub,
          }}
        >
          Order #TGI-{Math.floor(4000 + Math.random() * 999)}
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            marginTop: 14,
            alignItems: "flex-start",
          }}
        >
          {["👨‍🍳", "🛵", "✅"].map((emoji, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 4 }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    background: i === 0 ? C.primary : C.surface3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                  }}
                >
                  {emoji}
                </div>
                <span
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontSize: 10,
                    color: i === 0 ? C.primary : C.muted,
                  }}
                >
                  {["Preparing", "On the way", "Delivered"][i]}
                </span>
              </div>
              {i < 2 && (
                <div
                  style={{
                    width: 20,
                    height: 2,
                    background: C.border,
                    marginBottom: 14,
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => go("home")}
        style={{
          background: C.primary,
          border: "none",
          borderRadius: 24,
          padding: "13px 40px",
          fontFamily: "Montserrat,sans-serif",
          fontSize: 14,
          color: C.white,
          fontWeight: 700,
          cursor: "pointer",
          width: "100%",
          marginTop: 4,
        }}
      >
        Back to Home
      </button>
      <button
        onClick={() => go("orders")}
        style={{
          background: "none",
          border: `1px solid ${C.border}`,
          borderRadius: 24,
          padding: "12px 40px",
          fontFamily: "Montserrat,sans-serif",
          fontSize: 13,
          color: C.sub,
          cursor: "pointer",
          width: "100%",
        }}
      >
        Track Order
      </button>
    </div>
  );
}

/* ─── WALLET SCREEN ───────────────────────────────────────────────── */
function WalletScreen() {
  return (
    <div style={{ flex: 1, overflowY: "auto", background: C.bg }}>
      <div
        style={{
          margin: "16px",
          borderRadius: 14,
          overflow: "hidden",
          background: "linear-gradient(135deg,#02508C,#0a2d5a)",
          padding: "24px",
          position: "relative",
          border: `1px solid ${C.border}`,
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -20,
            top: -20,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(255,255,255,.07)",
          }}
        />
        <span
          style={{
            fontFamily: "Montserrat,sans-serif",
            fontSize: 12,
            color: "rgba(255,255,255,.75)",
          }}
        >
          Loyalty Balance
        </span>
        <div
          style={{
            fontFamily: "Anton,sans-serif",
            fontSize: 46,
            color: C.white,
            lineHeight: 1.1,
            marginTop: 4,
          }}
        >
          1,250 <span style={{ fontSize: 22 }}>pts</span>
        </div>
        <span
          style={{
            fontFamily: "Montserrat,sans-serif",
            fontSize: 12,
            color: "rgba(255,255,255,.6)",
          }}
        >
          ≈ €12.50 reward value
        </span>
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          {[
            ["Next reward at", "1,500 pts"],
            ["Orders this month", "7"],
          ].map(([l, v]) => (
            <div
              key={l}
              style={{
                background: "rgba(255,255,255,.12)",
                borderRadius: 8,
                padding: "10px 14px",
                flex: 1,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontSize: 10,
                  color: "rgba(255,255,255,.7)",
                }}
              >
                {l}
              </div>
              <div
                style={{
                  fontFamily: "Anton,sans-serif",
                  fontSize: 16,
                  color: C.white,
                  marginTop: 4,
                }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          background: C.surface,
          borderRadius: 12,
          margin: "0 16px",
          padding: "16px",
          border: `1px solid ${C.border}`,
        }}
      >
        <span
          style={{
            fontFamily: "Montserrat,sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: C.text,
          }}
        >
          Recent Transactions
        </span>
        {[
          {
            icon: "🍔",
            label: "Jack Daniel's Burger",
            date: "Today",
            pts: "+125",
            pos: true,
          },
          {
            icon: "🍗",
            label: "Chicken Strips Meal",
            date: "Yesterday",
            pts: "+80",
            pos: true,
          },
          {
            icon: "🎁",
            label: "Loyalty Reward Used",
            date: "3 days ago",
            pts: "-200",
            pos: false,
          },
          {
            icon: "🥗",
            label: "Caesar Salad",
            date: "5 days ago",
            pts: "+55",
            pos: true,
          },
        ].map((t, i, arr) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              padding: "12px 0",
              borderBottom:
                i < arr.length - 1 ? `1px solid ${C.border}` : "none",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                background: C.surface2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              {t.icon}
            </div>
            <div style={{ flex: 1 }}>
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontSize: 13,
                  color: C.text,
                  fontWeight: 600,
                  display: "block",
                }}
              >
                {t.label}
              </span>
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontSize: 11,
                  color: C.muted,
                }}
              >
                {t.date}
              </span>
            </div>
            <span
              style={{
                fontFamily: "Anton,sans-serif",
                fontSize: 14,
                color: t.pos ? C.green : C.red,
              }}
            >
              {t.pts}
            </span>
          </div>
        ))}
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}

/* ─── ORDERS SCREEN ───────────────────────────────────────────────── */
function OrdersScreen({ go }) {
  const orders = [
    {
      id: "#TGI-4821",
      status: "Delivered",
      items: "Jack Daniel's Burger, Potato Skins",
      total: "€28.40",
      date: "Today, 14:32",
      icon: "✅",
    },
    {
      id: "#TGI-4719",
      status: "Delivered",
      items: "Friday's Signature Ribs",
      total: "€26.45",
      date: "Yesterday, 19:15",
      icon: "✅",
    },
    {
      id: "#TGI-4610",
      status: "Cancelled",
      items: "Crispy Chicken Strips x2",
      total: "€29.45",
      date: "3 days ago",
      icon: "❌",
    },
  ];
  return (
    <div style={{ flex: 1, overflowY: "auto", background: C.bg }}>
      <div style={{ padding: "12px 16px" }}>
        {orders.map((o, i) => (
          <div
            key={i}
            style={{
              background: C.surface,
              borderRadius: 10,
              padding: "16px",
              marginBottom: 10,
              border: `1px solid ${C.border}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 18 }}>{o.icon}</span>
                <span
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: C.text,
                  }}
                >
                  {o.id}
                </span>
              </div>
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontSize: 11,
                  color: o.status === "Delivered" ? C.green : C.red,
                  fontWeight: 700,
                  background:
                    o.status === "Delivered"
                      ? "rgba(105,240,174,.1)"
                      : "rgba(255,82,82,.1)",
                  padding: "3px 8px",
                  borderRadius: 20,
                }}
              >
                {o.status}
              </span>
            </div>
            <p
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: 12,
                color: C.muted,
                margin: "0 0 8px",
              }}
            >
              {o.items}
            </p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontSize: 11,
                  color: C.muted,
                }}
              >
                {o.date}
              </span>
              <span
                style={{
                  fontFamily: "Anton,sans-serif",
                  fontSize: 15,
                  color: C.primary,
                }}
              >
                {o.total}
              </span>
            </div>
            {o.status === "Delivered" && (
              <button
                onClick={() => go("restaurant", RESTAURANTS[0])}
                style={{
                  width: "100%",
                  background: C.primaryLt,
                  border: `1px solid ${C.primary}`,
                  borderRadius: 8,
                  padding: "9px",
                  fontFamily: "Montserrat,sans-serif",
                  fontSize: 12,
                  color: C.primary,
                  fontWeight: 700,
                  cursor: "pointer",
                  marginTop: 10,
                }}
              >
                Reorder
              </button>
            )}
          </div>
        ))}
      </div>
      <div style={{ height: 16 }} />
    </div>
  );
}

/* ─── PROFILE SCREEN ──────────────────────────────────────────────── */
function ProfileScreen({ go }) {
  const groups = [
    [
      { label: "Orders History", icon: "📋", dest: "orders" },
      { label: "Loyalty Rewards", icon: "🏆", dest: "wallet" },
      { label: "Notifications", icon: "🔔", dest: null },
    ],
    [
      { label: "My Profile", icon: "👤", dest: null },
      { label: "Change Password", icon: "🔒", dest: null },
      { label: "Languages", icon: "🌐", dest: null },
      { label: "Privacy Policy", icon: "📜", dest: null },
      { label: "Terms & Conditions", icon: "📄", dest: null },
    ],
  ];
  return (
    <div style={{ flex: 1, overflowY: "auto", background: C.bg }}>
      <div
        style={{
          background: C.surface,
          padding: "24px 16px 20px",
          borderBottom: `1px solid ${C.border}`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            background: "linear-gradient(135deg,#02508C,#1A7FD4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 34,
            margin: "0 auto 12px",
          }}
        >
          👤
        </div>
        <span
          style={{
            fontFamily: "Anton,sans-serif",
            fontSize: 20,
            color: C.text,
            display: "block",
          }}
        >
          Alex Johnson
        </span>
        <span
          style={{
            fontFamily: "Montserrat,sans-serif",
            fontSize: 13,
            color: C.muted,
          }}
        >
          alex@example.com
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 28,
            marginTop: 16,
          }}
        >
          {[
            ["12", "Orders"],
            ["1,250", "Points"],
            ["Gold", "Status"],
          ].map(([v, l]) => (
            <div
              key={l}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <span
                style={{
                  fontFamily: "Anton,sans-serif",
                  fontSize: 20,
                  color: C.primary,
                }}
              >
                {v}
              </span>
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontSize: 11,
                  color: C.muted,
                }}
              >
                {l}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "12px 16px" }}>
        {groups.map((g, gi) => (
          <div
            key={gi}
            style={{
              background: C.surface,
              borderRadius: 10,
              overflow: "hidden",
              marginBottom: 10,
              border: `1px solid ${C.border}`,
            }}
          >
            {g.map((item, i) => (
              <div
                key={i}
                onClick={() => item.dest && go(item.dest)}
                style={{
                  display: "flex",
                  padding: "15px 14px",
                  borderBottom:
                    i < g.length - 1 ? `1px solid ${C.border}` : "none",
                  cursor: item.dest ? "pointer" : "default",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 18, width: 24, textAlign: "center" }}>
                  {item.icon}
                </span>
                <span
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontSize: 14,
                    color: C.text,
                    flex: 1,
                  }}
                >
                  {item.label}
                </span>
                {I.right(C.muted)}
              </div>
            ))}
          </div>
        ))}
        <div
          style={{
            background: C.surface,
            borderRadius: 10,
            overflow: "hidden",
            border: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "15px 14px",
              cursor: "pointer",
              gap: 12,
              alignItems: "center",
            }}
          >
            <I.logout />
            <span
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: 14,
                color: C.red,
              }}
            >
              Logout
            </span>
          </div>
        </div>
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}

/* ─── SIDE DRAWER ─────────────────────────────────────────────────── */
function SideDrawer({ open, onClose, go }) {
  if (!open) return null;
  const items = [
    { label: "Orders History", icon: "📋", dest: "orders" },
    { label: "Loyalty Rewards", icon: "🏆", dest: "wallet" },
    { label: "Notifications", icon: "🔔", dest: null },
    null,
    { label: "My Profile", icon: "👤", dest: "profile" },
    { label: "Change Password", icon: "🔒", dest: null },
    { label: "Languages", icon: "🌐", dest: null },
    { label: "Privacy Policy", icon: "📜", dest: null },
    { label: "Terms & Conditions", icon: "📄", dest: null },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 50 }}>
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,.65)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "82%",
          background: C.surface,
          display: "flex",
          flexDirection: "column",
          boxShadow: "4px 0 30px rgba(0,0,0,.5)",
          animation: "slideIn .22s ease",
          border: `1px solid ${C.border}`,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg,#02508C,#0a2d5a)",
            padding: "50px 20px 24px",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              background: "rgba(255,255,255,.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              marginBottom: 12,
            }}
          >
            👤
          </div>
          <span
            style={{
              fontFamily: "Anton,sans-serif",
              fontSize: 20,
              color: C.white,
              display: "block",
            }}
          >
            Alex Johnson
          </span>
          <span
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: 12,
              color: "rgba(255,255,255,.65)",
            }}
          >
            🏅 Gold Member · 1,250 pts
          </span>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
          {items.map((item, i) =>
            item === null ? (
              <div
                key={i}
                style={{ height: 1, background: C.border, margin: "8px 16px" }}
              />
            ) : (
              <div
                key={i}
                onClick={() => {
                  onClose();
                  item.dest && go(item.dest);
                }}
                style={{
                  display: "flex",
                  padding: "14px 20px",
                  gap: 14,
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 18, width: 24, textAlign: "center" }}>
                  {item.icon}
                </span>
                <span
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontSize: 14,
                    color: C.text,
                    flex: 1,
                  }}
                >
                  {item.label}
                </span>
                {I.right(C.muted)}
              </div>
            ),
          )}
        </div>
        <div
          style={{
            padding: "12px 20px 32px",
            borderTop: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 14,
              cursor: "pointer",
              padding: "12px 0",
              alignItems: "center",
            }}
          >
            <I.logout />
            <span
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: 14,
                color: C.red,
              }}
            >
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN APP ────────────────────────────────────────────────────── */
export default function TGIFridayDarkMode() {
  const [screen, setScreen] = useState("home");
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentRestaurant, setCurrentRestaurant] = useState(RESTAURANTS[0]);

  const go = (dest, payload = null) => {
    setHistory((h) => [...h, screen]);
    if (dest === "item") {
      setCurrentItem(payload);
      setScreen("item");
      return;
    }
    if (dest === "restaurant") {
      setCurrentRestaurant(payload);
      setScreen("restaurant");
      return;
    }
    setScreen(dest);
    if (["home", "cart", "wallet", "profile", "orders"].includes(dest))
      setActiveTab(dest);
  };

  const goBack = () => {
    const prev = history[history.length - 1] || "home";
    setHistory((h) => h.slice(0, -1));
    setScreen(prev);
    if (["home", "cart", "wallet", "profile", "orders"].includes(prev))
      setActiveTab(prev);
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === item.id);
      return ex
        ? prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...item, qty: 1 }];
    });
  };

  const updateCart = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const showBack = ["restaurant", "item", "checkout"].includes(screen);
  const showNav = !["checkout", "success"].includes(screen);
  const titles = {
    checkout: "Checkout",
    orders: "Order History",
    wallet: "My Wallet",
    profile: "My Profile",
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@400;600;700&family=Poppins:wght@600&display=swap');@keyframes slideIn{from{transform:translateX(-100%)}to{transform:translateX(0)}}*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{display:none}`}</style>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "radial-gradient(circle at 30% 50%,#0d1929,#070b12)",
          padding: 24,
        }}
      >
        <div
          style={{
            width: 375,
            height: 812,
            background: C.bg,
            borderRadius: 44,
            overflow: "hidden",
            boxShadow:
              "0 40px 100px rgba(0,0,0,.8),0 0 0 9px #0a0a0a,0 0 0 11px #181818,0 0 60px rgba(26,127,212,.08)",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <SideDrawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            go={go}
          />
          <StatusBar />
          <TopNav
            onMenu={() => setDrawerOpen(true)}
            showBack={showBack}
            onBack={goBack}
            title={titles[screen] || null}
            hideRight={showBack}
          />
          {screen === "home" && <HomeScreen go={go} />}
          {screen === "restaurant" && (
            <RestaurantScreen
              restaurant={currentRestaurant}
              go={go}
              addToCart={addToCart}
            />
          )}
          {screen === "item" && (
            <ItemScreen item={currentItem} go={go} addToCart={addToCart} />
          )}
          {screen === "cart" && (
            <CartScreen cart={cart} updateCart={updateCart} go={go} />
          )}
          {screen === "checkout" && (
            <CheckoutScreen cart={cart} go={go} clearCart={() => setCart([])} />
          )}
          {screen === "success" && <SuccessScreen go={go} />}
          {screen === "wallet" && <WalletScreen />}
          {screen === "orders" && <OrdersScreen go={go} />}
          {screen === "profile" && <ProfileScreen go={go} />}
          {showNav && (
            <BottomNav
              active={activeTab}
              go={(t) => {
                setActiveTab(t);
                setScreen(t);
              }}
              cartCount={cartCount}
            />
          )}
        </div>
      </div>
    </>
  );
}
