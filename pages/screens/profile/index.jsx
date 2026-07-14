import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReactCountryFlag from "react-country-flag";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader } from "../../../src/screensFlow/ui";
import { useGetProfileQuery } from "../../../src/store/authApiSlice";
import { countryCodes } from "../../../data/countryCodes";

export default function ProfilePage() {
  const router = useRouter();
  
  const { data, isLoading } = useGetProfileQuery();
  const profile = data?.data;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCode, setPhoneCode] = useState("+357");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || "");
      setLastName(profile.last_name || "");
      setEmail(profile.email || "");
      setGender(profile.gender || "");
      setDob(profile.dob || "");
      
      if (profile.phone) {
        const matchingCountry = countryCodes.find(c => profile.phone.startsWith(c.dial_code.replace("+", "")));
        if (matchingCountry) {
          setPhoneCode(matchingCountry.dial_code);
          setPhoneNumber(profile.phone.substring(matchingCountry.dial_code.replace("+", "").length));
        } else {
          setPhoneNumber(profile.phone);
        }
      }
    }
  }, [profile]);

  const currentCountry = countryCodes.find((c) => c.dial_code === phoneCode);

  return (
    <ScreensFrame>
      <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
        <PageHeader title="My Profile" onBack={() => router.back()} />

        <div style={{ padding: "14px 20px 24px" }}>
          <div
            style={{
              background: "var(--surface)",
              borderRadius: 14,
              padding: 12,
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 10,
                background:
                  "linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.2))",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: 4,
                  bottom: 4,
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M4 20h4l10-10-4-4L4 16v4Z"
                    stroke="#D9142C"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>
                {isLoading ? "Loading..." : `${firstName} ${lastName}`}
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>
                {isLoading ? "Loading..." : email}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <label style={{ fontSize: 12, color: "var(--text)" }}>First Name</label>
            <input
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{
                height: 44,
                borderRadius: 10,
                border: "none",
                background: "var(--surface)",
                padding: "0 12px",
                fontSize: 13,
                color: "var(--text)",
              }}
            />

            <label style={{ fontSize: 12, color: "var(--text)" }}>Last Name</label>
            <input
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{
                height: 44,
                borderRadius: 10,
                border: "none",
                background: "var(--surface)",
                padding: "0 12px",
                fontSize: 13,
                color: "var(--text)",
              }}
            />

            <label style={{ fontSize: 12, color: "var(--text)" }}>Email</label>
            <input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                height: 44,
                borderRadius: 10,
                border: "none",
                background: "var(--surface)",
                padding: "0 12px",
                fontSize: 13,
                color: "var(--text)",
              }}
            />

            <label style={{ fontSize: 12, color: "var(--text)" }}>Phone Number</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "var(--surface)",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "0 10px",
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  borderRight: "1px solid var(--border)",
                  fontSize: 12,
                  color: "var(--muted)",
                }}
              >
                {currentCountry ? (
                  <ReactCountryFlag
                    countryCode={currentCountry.code}
                    svg
                    style={{ width: 18, height: 14, objectFit: "cover", borderRadius: 2 }}
                  />
                ) : (
                  <span style={{ width: 10, height: 10, borderRadius: 5, background: "#4CAF50" }} />
                )}
                {phoneCode}
              </div>
              <input
                placeholder="(444) 1234-5678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={{
                  flex: 1,
                  height: 44,
                  border: "none",
                  background: "transparent",
                  padding: "0 10px",
                  fontSize: 13,
                  color: "var(--text)",
                }}
              />
              <button
                type="button"
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#D9142C",
                  fontSize: 12,
                  padding: "0 12px",
                  cursor: "pointer",
                }}
              >
                Send Otp
              </button>
            </div>

            <label style={{ fontSize: 12, color: "var(--text)" }}>Gender</label>
            <button
              type="button"
              style={{
                height: 44,
                borderRadius: 10,
                border: "none",
                background: "var(--surface)",
                padding: "0 12px",
                fontSize: 13,
                color: gender ? "var(--text)" : "var(--muted)",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              {gender || "Select Gender"}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" stroke="#666" strokeWidth="2" />
              </svg>
            </button>

            <label style={{ fontSize: 12, color: "var(--text)" }}>DOB</label>
            <input
              placeholder="DD/MM/YYYY"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              style={{
                height: 44,
                borderRadius: 10,
                border: "none",
                background: "var(--surface)",
                padding: "0 12px",
                fontSize: 13,
                color: "var(--text)",
              }}
            />
          </div>

          <button
            type="button"
            style={{
              width: "100%",
              height: 52,
              borderRadius: 26,
              border: "none",
              background: "#D9142C",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              marginTop: 22,
              cursor: "pointer",
            }}
          >
            Update Profile
          </button>
        </div>
      </div>
    </ScreensFrame>
  );
}
