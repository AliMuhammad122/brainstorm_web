import React from "react";

export const IcoHamburger = ({ c = "var(--text)" }) => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <rect width="20" height="2.2" rx="1.1" fill={c} />
    <rect y="6.4" width="13" height="2.2" rx="1.1" fill={c} />
    <rect y="12.8" width="20" height="2.2" rx="1.1" fill={c} />
  </svg>
);

export const IcoCart = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--text)"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

export const IcoSearch = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--subtle)"
    strokeWidth="2.3"
    strokeLinecap="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const IcoFilter = ({ c = "var(--muted)" }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke={c}
    strokeWidth="2"
    strokeLinecap="round"
  >
    <circle cx="5" cy="6" r="2" />
    <circle cx="19" cy="12" r="2" />
    <circle cx="5" cy="18" r="2" />
    <line x1="7" y1="6" x2="22" y2="6" />
    <line x1="2" y1="12" x2="17" y2="12" />
    <line x1="7" y1="18" x2="22" y2="18" />
  </svg>
);

export const IcoPin = ({ size = 11, color = "var(--primary)" }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 11 13" fill="none">
    <path
      d="M5.5 0C3.01 0 1 2.01 1 4.5c0 3.375 4.5 8.5 4.5 8.5S10 7.875 10 4.5C10 2.01 7.99 0 5.5 0z"
      fill={color}
    />
    <circle cx="5.5" cy="4.5" r="1.6" fill="var(--on-primary)" />
  </svg>
);

export const IcoTruck = () => (
  <svg width="17" height="12" viewBox="0 0 22 14" fill="none">
    <rect
      x="1"
      y="1.5"
      width="12"
      height="9"
      rx="1.5"
      stroke="var(--primary)"
      strokeWidth="1.4"
      fill="none"
    />
    <path
      d="M13 5h5l3 4v3h-8V5z"
      stroke="var(--primary)"
      strokeWidth="1.4"
      fill="none"
      strokeLinejoin="round"
    />
    <circle cx="5" cy="12.5" r="1.5" fill="var(--primary)" />
    <circle cx="17.5" cy="12.5" r="1.5" fill="var(--primary)" />
  </svg>
);

export const IcoClock = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--subtle)"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const IcoClose = ({ c = "var(--muted)" }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke={c}
    strokeWidth="2.4"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const IcoBack = ({ c = "var(--text)" }) => (
  <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
    <path
      d="M8.5 1.5L1.5 8.5l7 7"
      stroke={c}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IcoChevron = ({ c = "var(--subtle)" }) => (
  <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
    <path
      d="M1.5 1.5l5 5-5 5"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

export const IcoGrid = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--muted)"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

export const IcoSearchW = () => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--on-primary)"
    strokeWidth="2.2"
    strokeLinecap="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const IcoPlus = ({ c = "var(--on-primary)", size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <line x1="7" y1="1" x2="7" y2="13" stroke={c} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="1" y1="7" x2="13" y2="7" stroke={c} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const IcoMinus = ({ c = "var(--primary)" }) => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <line x1="1" y1="7" x2="13" y2="7" stroke={c} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const IcoInfo = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--subtle)"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="8" strokeWidth="2.5" />
    <line x1="12" y1="12" x2="12" y2="16" />
  </svg>
);

