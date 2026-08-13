import React from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader } from "../../../src/screensFlow/ui";

const sections = [
  {
    title: "1. Categories of Data We Collect",
    body:
      "At Urban Connect, protecting your privacy is our highest priority. We collect various types of information to enhance your experience, including personal details like your full name, email, and geographic location, as well as usage data that helps us understand your interaction with our app. This allows us to refine our services and provide tailored content.",
  },
  {
    title: "2. Ways We Utilize Your Personal Data",
    body:
      "We understand the importance of your personal data. We are committed to protecting your information and using it responsibly. We ensure that all data collected is handled with care and in compliance with applicable laws.",
  },
  {
    title: "3. Utilizing Your Personal Information",
    body:
      "We value your personal data immensely. Our commitment is to protect your information and utilize it responsibly. We guarantee that all data collected is managed with diligence and in accordance with relevant regulations.",
  },
  {
    title: "4. How We Handle Your Personal Data",
    body:
      "We appreciate the significance of your personal data. We are devoted to safeguarding your information and using it in a responsible manner. We ensure that all information is treated with the utmost care and in line with applicable laws.",
  },
];

export default function PrivacyPolicyPage() {
  const router = useRouter();

  return (
    <ScreensFrame>
      <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
        <PageHeader title="Privacy Policy" onBack={() => router.back()} />

        <div style={{ padding: "14px 18px 24px" }}>
          {sections.map((section) => (
            <div key={section.title} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 16, fontWeight: 400, color: "#333333" }}>
                {section.title}
              </div>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 12,
                  lineHeight: 1.55,
                  color: "#A4A4A4",
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
