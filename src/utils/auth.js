const TOKEN_KEY = "token";
const USER_KEY = "user";
const AUTH_EXPIRED_EVENT = "app:auth_expired";

/**
 * Retrieve the stored auth token from localStorage.
 */
export const getStoredToken = () => {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (err) {
    console.error("Failed to read auth token:", err);
    return null;
  }
};

/**
 * Store the auth token in localStorage.
 */
export const setStoredToken = (token) => {
  if (typeof window === "undefined") return;
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch (err) {
    console.error("Failed to store auth token:", err);
  }
};

/**
 * Retrieve stored user metadata from localStorage.
 */
export const getStoredUser = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Failed to read user data:", err);
    return null;
  }
};

/**
 * Store user metadata in localStorage.
 */
export const setStoredUser = (user) => {
  if (typeof window === "undefined") return;
  try {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  } catch (err) {
    console.error("Failed to store user data:", err);
  }
};

/**
 * Clear stored auth credentials from localStorage.
 */
export const clearStoredAuth = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (err) {
    console.error("Failed to clear auth:", err);
  }
};

/**
 * Notify the application that the user's session has expired (e.g. 401 Unauthorized).
 */
export const emitAuthExpired = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(AUTH_EXPIRED_EVENT));
};

/**
 * Subscribe to auth expired events to trigger navigation/UI state updates.
 */
export const onAuthExpired = (handler) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(AUTH_EXPIRED_EVENT, handler);
  return () => window.removeEventListener(AUTH_EXPIRED_EVENT, handler);
};
