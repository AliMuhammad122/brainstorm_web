import React from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader } from "../../../src/screensFlow/ui";
import { useTheme } from "../../../context/ThemeContext";

export default function TermsPage() {
  const router = useRouter();
  const  {isDark} = useTheme();

  return (
    <ScreensFrame>
      <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
        <PageHeader title="Terms and Conditions" onBack={() => router.back()} />

        <div style={{ padding: "14px 18px 24px" }}>
          <p
            style={{
              fontSize: 12,
              color: isDark?"#6E6E85":"#A4A4A4",
              margin: "2px 0 16px",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Last updated on 06/12/2025
          </p>

          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 400,
                color: isDark?"#EAEAF2":"#333333",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Terms and Conditions
            </div>
            <p
              style={{
                margin: "8px 0 0",
                fontSize: 12,
                lineHeight: 1.2,
                fontWeight: 400,
                color: isDark?"#6E6E85":"#A4A4A4",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Hello and welcome to Brainstorm! We're thrilled to have you here. By using our app, you agree to our terms of service, so please use it responsibly and ensure your account remains secure. Your privacy is important to us, and we handle your data in accordance with our Privacy Policy. Remember, all content within the app is owned by Brainstorm and is protected by copyright laws, so please refrain from any unauthorized use. While we strive for a smooth experience, we cannot be held liable for any issues that may arise during your use of the app. Our terms may be updated occasionally, and by continuing to use the app, you acknowledge and accept these changes. Thank you for being part of our community!
            </p>
          </div>
        </div>
      </div>
    </ScreensFrame>
  );
}

