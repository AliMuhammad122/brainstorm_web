import React from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader } from "../../../src/screensFlow/ui";

const sections = [
  {
    title: "1. Acceptance of Terms",
    body:
      "By accessing and using this application, you agree to be bound by these terms and all applicable laws and regulations.",
  },
  {
    title: "2. User Responsibilities",
    body:
      "You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.",
  },
  {
    title: "3. Service Changes",
    body:
      "We may modify or discontinue any part of the service at any time without prior notice.",
  },
  {
    title: "4. Limitation of Liability",
    body:
      "We are not liable for any indirect, incidental, or consequential damages arising from the use of the service.",
  },
];

export default function TermsPage() {
  const router = useRouter();

  return (
    <ScreensFrame>
      <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
        <PageHeader title="Terms & Conditions" onBack={() => router.back()} />

        <div style={{ padding: "14px 20px 24px" }}>
          {sections.map((section) => (
            <div key={section.title} style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
                {section.title}
              </div>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 12,
                  lineHeight: 1.55,
                  color: "var(--muted)",
                }}
              >
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ScreensFrame>
  );
}
