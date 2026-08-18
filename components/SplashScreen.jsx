import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export default function SplashScreen() {
  const { isDark } = useTheme();

  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fading out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1500);

    // Completely remove from DOM after fade animation ends (500ms transition)
    const removeTimer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: isDark?"#0D0D1A":"#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999999,
        transition: "opacity 0.5s ease",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      <img
        src={isDark ? "/assets/icons/Splashbg_Dark.svg" : "/assets/icons/Splashbg.svg"}
        alt="Splash Background"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "375px",
          height: "100%",
          objectFit: "fill",
          zIndex: -1,
        }}
      />
      <img
        src="/assets/images/SplashScreen.png"
        alt="Splash Logo"
        style={{
          width: 220,
          height: "auto",
          maxWidth: "60%",
          position: "relative",
          zIndex: 1,
        }}
      />
    </div>
  );
}
