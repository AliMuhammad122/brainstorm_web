import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import parsePhoneNumberFromString from "libphonenumber-js";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader } from "../../../src/screensFlow/ui";
import {
  useGetProfileQuery,
  useGetPresignedUrlMutation,
  useUpdateProfileMutation,
  useRequestOtpMutation,
} from "../../../src/store/authApiSlice";
import CountrySelect, { COUNTRY_OPTIONS } from "../../../components/CountrySelect";
import Skeleton from "../../../components/Skeleton";
import EditProfile from "../../../public/assets/icons/editprofile.svg";
import { useTheme } from "../../../context/ThemeContext";
import DropDown from "../../../public/assets/icons/GenderArrow.svg"

export default function ProfilePage() {
  const router = useRouter();
  const {isDark}=useTheme()

  const { data, isLoading } = useGetProfileQuery();
  const profile = data?.data;
  console.log("profile", profile?.media?.[0]?.media_thumb_url);

  const [getPresignedUrl] = useGetPresignedUrlMutation();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [requestOtp, { isLoading: isSendingOtp }] = useRequestOtpMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCode, setPhoneCode] = useState("+357");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [gender, setGender] = useState("");
  const [genderOpen, setGenderOpen] = useState(false);
  const [dob, setDob] = useState("");

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [uploadedPicture, setUploadedPicture] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [toast, setToast] = useState({ show: false, text: "", type: "" });
  const toastTimeoutRef = useRef(null);

  const showToast = (text, type = "success") => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ show: true, text, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast({ show: false, text: "", type: "" });
    }, 3000);
  };

  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
    setIsUploading(true);

    try {
      const response = await getPresignedUrl({ fileName: file.name }).unwrap();
      
      if (response.status === 200 && response.data?.presignedUrl) {
        const { presignedUrl, media_url } = response.data;

        const uploadRes = await fetch(presignedUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
            "x-amz-acl": "public-read",
          },
        });

        if (uploadRes.ok) {
          setUploadedPicture({
            id: profile?.media?.[0]?.id || null,
            media_url: media_url,
            format: file.type === "image/png" ? "img/png" : file.type, // Map image/png to img/png if that matches user body: "format": "img/png"
          });
          showToast("Image uploaded successfully!", "success");
        } else {
          throw new Error("Failed to upload image to storage");
        }
      } else {
        throw new Error(response.message || "Failed to generate pre-signed URL");
      }
    } catch (err) {
      console.error("Upload error:", err);
      showToast(err.message || "Error uploading image.", "error");
      setAvatarPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const validatePhone = (code, phone) => {
    if (!code) {
      setPhoneError("Country code is required");
      return false;
    }
    if (!phone) {
      setPhoneError("Phone number is required");
      return false;
    }
    const country = COUNTRY_OPTIONS.find(c => c.dialCode === code);
    if (country) {
      try {
        const fullNumber = code + phone;
        const parsed = parsePhoneNumberFromString(fullNumber, country.value);
        if (parsed && !parsed.isValid()) {
          setPhoneError("Please enter a valid phone number for the selected country.");
          return false;
        }
      } catch {
        setPhoneError("Please enter a valid phone number.");
        return false;
      }
    } else {
      if (phone.length < 7 || phone.length > 15) {
        setPhoneError("Enter a valid phone number");
        return false;
      }
    }
    setPhoneError("");
    return true;
  };

  const handleSendOtp = async () => {
    const formattedPhone = `${phoneCode.replace("+", "")}${phoneNumber}`;
    if (!validatePhone(phoneCode, phoneNumber)) {
      return;
    }
    try {
      await requestOtp({ phone: formattedPhone }).unwrap();
      const payload = {
        first_name: firstName,
        last_name: lastName,
        gender: gender,
        dob: dob,
        phoneCode,
        phoneNumber,
      };
      sessionStorage.setItem("profile_data", JSON.stringify(payload));
      router.push(`/auth/verify-otp?phone=${formattedPhone}&from=/screens/profile`);
    } catch (error) {
      console.error("OTP Request Error:", error);
      showToast(error?.data?.error?.message || error?.data?.message || "Failed to send OTP. Please check your phone number and try again.", "error");
    }
  };

  const handleCountryChange = (option) => {
    const nextCode = option ? option.dialCode : "+357";
    setPhoneCode(nextCode);
    validatePhone(nextCode, phoneNumber);
    setIsVerified(false);
    sessionStorage.removeItem("is_phone_verified");
    sessionStorage.removeItem("verified_phone");
  };

  const handlePhoneChange = (val) => {
    const digitsOnly = val.replace(/\D/g, "");
    setPhoneNumber(digitsOnly);
    validatePhone(phoneCode, digitsOnly);
    setIsVerified(false);
    sessionStorage.removeItem("is_phone_verified");
    sessionStorage.removeItem("verified_phone");
  };

  const handleUpdateProfile = async () => {
    const formattedPhone = `${phoneCode.replace("+", "")}${phoneNumber}`;
    const originalPhone = profile?.phone || "";
    const isPhoneModified = formattedPhone !== originalPhone;

    if (isPhoneModified) {
      const verified = sessionStorage.getItem("is_phone_verified") === "true";
      const verifiedPhone = sessionStorage.getItem("verified_phone");

      if (!verified || verifiedPhone !== formattedPhone) {
        showToast("Please verify your new phone number first.", "error");
        return;
      }
    }

    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        gender: gender,
        dob: dob,
      };

      if (isPhoneModified) {
        payload.phone = formattedPhone;
      }

      if (uploadedPicture) {
        payload.profile_picture = uploadedPicture;
      }

      const res = await updateProfile(payload).unwrap();
      if (res.status === 200 || res.success) {
        showToast(res?.message || "Profile updated successfully!", "success");
        sessionStorage.removeItem("profile_data");
        sessionStorage.removeItem("is_phone_verified");
        sessionStorage.removeItem("verified_phone");
        setIsVerified(false);
      } else {
        throw new Error(res.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Update profile error:", err);
      showToast(err.data?.message || err.message || "Error updating profile.", "error");
    }
  };

  useEffect(() => {
    if (profile) {
      let dbFirstName = profile.first_name || "";
      let dbLastName = profile.last_name || "";
      let dbGender = profile.gender || "";
      let dbDob = profile.dob ? profile.dob.split("T")[0].replace(/-/g, "/") : "";
      let dbPhoneCode = "+357";
      let dbPhoneNumber = "";

      if (profile.phone) {
        const matchingCountry = COUNTRY_OPTIONS.find(c => profile.phone.startsWith(c.dialCode.replace("+", "")));
        if (matchingCountry) {
          dbPhoneCode = matchingCountry.dialCode;
          dbPhoneNumber = profile.phone.substring(matchingCountry.dialCode.replace("+", "").length);
        } else {
          dbPhoneNumber = profile.phone;
        }
      }

      if (typeof window !== "undefined") {
        const verified = sessionStorage.getItem("is_phone_verified") === "true";
        const verifiedPhone = sessionStorage.getItem("verified_phone");
        const savedDataStr = sessionStorage.getItem("profile_data");

        if (savedDataStr) {
          try {
            const savedData = JSON.parse(savedDataStr);
            if (savedData.first_name) dbFirstName = savedData.first_name;
            if (savedData.last_name) dbLastName = savedData.last_name;
            if (savedData.gender) dbGender = savedData.gender;
            if (savedData.dob) dbDob = savedData.dob;
            if (savedData.phoneCode) dbPhoneCode = savedData.phoneCode;
            if (savedData.phoneNumber) {
              dbPhoneNumber = savedData.phoneNumber;
              const formatted = `${savedData.phoneCode.replace("+", "")}${savedData.phoneNumber}`;
              if (verified && verifiedPhone === formatted) {
                setIsVerified(true);
              }
            }
          } catch (e) {
            console.error("Error restoring profile data:", e);
          }
        }
      }

      setFirstName(dbFirstName);
      setLastName(dbLastName);
      setEmail(profile.email || "");
      setGender(dbGender);
      setDob(dbDob);
      setPhoneCode(dbPhoneCode);
      setPhoneNumber(dbPhoneNumber);
    }
  }, [profile]);

  return (
    <ScreensFrame>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />
      <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
        <PageHeader title="My Profile" onBack={() => router.back()} />

        <div style={{ padding: "16px 20px 0px" }}>
          <div
            style={{
              background: isDark?"#161625":"#F4F6F8",
              borderRadius: 8,
              padding: 12,
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 14,
            }}
          >
            {isLoading ? (
              <Skeleton width={80} height={80} borderRadius={8} />
            ) : (
              <div
                onClick={() => !isUploading && fileInputRef.current?.click()}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                  // background:
                  //   "linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.2))",
                  position: "relative",
                  overflow: "hidden",
                  cursor: isUploading ? "not-allowed" : "pointer",
                }}
              >
                {(avatarPreview || profile?.media?.[0]?.media_thumb_url) && (
                  <img
                    src={avatarPreview || profile.media[0].media_thumb_url}
                    alt="Profile Avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      opacity: isUploading ? 0.5 : 1,
                      transition: "opacity 0.2s",
                    }}
                  />
                )}
                {isUploading && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0,0,0,0.4)",
                      zIndex: 1,
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ animation: "spin 1.5s linear infinite" }}
                    >
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                      <path d="M4 12a8 8 0 018-8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
                <div
                  style={{
                    position: "absolute",
                    right:-1,
                    bottom: 0,
                    // width: 20,
                    // height: 20,
                    // borderRadius: 9,
                    // background: "#fff",
                    // display: "flex",
                    // alignItems: "center",
                    // justifyContent: "center",
                    // boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    zIndex: 2,
                  }}
                >
                  <EditProfile color={isDark? "#0D0D1A" : "#FFFFFF"} />
                </div>
              </div>
            )}
            <div className="space-y-1">
              <div style={{ fontSize: 16, fontWeight: 400, color: isDark?"#EAEAF2":"#333333", fontFamily: "'Anton'" }}>
                {isLoading ? <Skeleton width={120} height={14} style={{ margin: "4px 0" }} /> : `${firstName} ${lastName}`}
              </div>
              <div style={{ fontSize: 12, color: isDark?"#6E6E85":"#A4A4A4", fontFamily: "'Montserrat'" }}>
                {isLoading ? <Skeleton width={160} height={12} style={{ margin: "4px 0" }} /> : email}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8,marginTop:"10px" }}>
            <label style={{ fontSize: 14, color: isDark?"#EAEAF2": "#333333", }}>First Name</label>
            {isLoading ? (
              <Skeleton height={44} borderRadius={10} />
            ) : (
              <input
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`${isDark?"placeholder:text-[#9595AA]"
                  :"placeholder:text-[#777777]"}`}
                style={{
                  height: 48,
                  borderRadius: 8,
                  border: "none",
                  background: isDark?"#161625":"#F4F6F8",
                  padding: "0 12px",
                  fontSize: 14,
                  color: isDark?"#EAEAF2": "#333333",
                  fontFamily: "'Montserrat'",
                  outline:"none"
                }}
              />
            )}

            <label style={{ fontSize: 14, color: isDark?"#EAEAF2": "#333333", marginTop:"4px" }}>Last Name</label>
            {isLoading ? (
              <Skeleton height={44} borderRadius={10} />
            ) : (
              <input
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`${isDark?"placeholder:text-[#9595AA]"
                  :"placeholder:text-[#777777]"}`}
                style={{
                  height: 48,
                  borderRadius: 8,
                  border: "none",
                  background: isDark?"#161625":"#F4F6F8",
                  padding: "0 12px",
                  fontSize: 14,
                  color: isDark?"#EAEAF2": "#333333",
                  fontFamily: "'Montserrat'",
                  outline: "none" 
                }}
              />
            )}

            <label style={{ fontSize: 14, color: isDark?"#EAEAF2": "#333333", marginTop:"4px" }}>Email</label>
            {isLoading ? (
              <Skeleton height={44} borderRadius={10} />
            ) : (
              <input
                placeholder="Enter your email"
                value={email}
                readOnly
                className={`${isDark?"placeholder:text-[#9595AA]"
                  :"placeholder:text-[#777777]"}`}
                style={{
                  height: 48,
                  borderRadius: 8,
                  border: "none",
                  background: isDark?"#161625":"#F4F6F8",
                  padding: "0 12px",
                  fontSize: 14,
                  color: isDark?"#EAEAF2": "#333333",
                  fontFamily: "'Montserrat'",
                  outline: "none",
                  cursor: "not-allowed"
                }}
              />
            )}

            <label style={{ fontSize: 14, color: isDark ? "#EAEAF2" : "#333333", marginTop: "4px" }}>Phone Number</label>
            {isLoading ? (
              <Skeleton height={44} borderRadius={8} />
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: isDark ? "#161625" : "#F4F6F8",
                  borderRadius: 8,
                  paddingLeft: 10,
                  transition: "background 0.2s",
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  <CountrySelect
                    value={phoneCode}
                    onChange={handleCountryChange}
                    isDisabled={true}
                  />
                </div>

                {/* Divider line */}
                <div
                  style={{
                    height: 44,
                    width: 1,
                    flexShrink: 0,
                    background: isDark ? "#2A2A40" : "#E9EAEB",
                  }}
                />

                <input
                  type="tel"
                  name="phone"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={phoneNumber}
                  readOnly
                  placeholder="(444) 1234-5678"
                  className={isDark ? "placeholder:text-[#9595AA]" : "placeholder:text-[#777777]"}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    height: 48,
                    background: "transparent",
                    border: "none",
                    padding: "0 12px",
                    outline: "none",
                    fontSize: 14,
                    color: isDark ? "#EAEAF2" : "#333333",
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 400,
                    cursor: "not-allowed"
                  }}
                />
              </div>
            )}
            {phoneError && (
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "#DA1A35", fontFamily: "'Montserrat', sans-serif" }}>
                {phoneError}
              </p>
            )}

            <label style={{ fontSize: 14, color: isDark?"#EAEAF2": "#333333", marginTop: "4px" }}>Gender</label>
            {isLoading ? (
              <Skeleton height={44} borderRadius={10} />
            ) : (
              <div style={{ position: "relative" }}>
                <button
                  type="button"
                  onClick={() => setGenderOpen(!genderOpen)}
                  className={`${isDark?"placeholder:text-[#9595AA]"
                  :"placeholder:text-[#777777]"}`}
                  style={{
                    width: "100%",
                    height: 48,
                    borderRadius: 8,
                    border: "none",
                    background: isDark?"#161625":"#F4F6F8",
                    padding: "0 12px",
                    fontSize: 14,
                    color: gender ? isDark?"#EAEAF2": "#333333" : isDark?"#9595AA":"#777777",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                >
                  {gender || "Select Gender"}
                 <DropDown class={isDark?"#C8C8D8":"#333333"} alt="Dropdown" />
                </button>

                {genderOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: 48,
                      left: 0,
                      right: 0,
                      background: isDark?"#0D0D1A":"#FFFFFF",
                      borderRadius: 8,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      overflow: "hidden",
                      zIndex: 10,
                      border: "1px solid var(--border)",
                    }}
                  >
                    {["Male", "Female", "Prefer not to say"].map((opt) => (
                      <div
                        key={opt}
                        onClick={() => {
                          setGender(opt);
                          setGenderOpen(false);
                        }}
                        style={{
                          padding: "12px 16px",
                          fontSize: 14,
                          color: isDark?"#EAEAF2": "#333333",
                          cursor: "pointer",
                          background: gender === opt ? isDark?"#161625":"#F4F6F8" : "transparent",
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => (e.target.style.background = isDark?"#161625":"#F4F6F8")}
                        onMouseLeave={(e) =>
                          (e.target.style.background = gender === opt ? isDark?"#161625":"#F4F6F8" : "transparent")
                        }
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <label style={{ fontSize: 14, color: isDark?"#EAEAF2": "#333333", marginTop: "4px" }}>DOB</label>
            {isLoading ? (
              <Skeleton height={44} borderRadius={8} />
            ) : (
              <input
                placeholder="YYYY/MM/DD"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className={`${isDark?"placeholder:text-[#9595AA]"
                  :"placeholder:text-[#777777]"}`}
                style={{
                  height: 48,
                  borderRadius: 8,
                  border: "none",
                  background: isDark?"#161625":"#F4F6F8",
                  padding: "0 12px",
                  fontSize: 14,
                  color: isDark?"#EAEAF2": "#333333",
                  fontFamily: "'Montserrat'",
                  outline: "none"
                }}
              />
            )}
          </div>

          <button
            type="button"
            onClick={handleUpdateProfile}
            disabled={isLoading || isUpdating || isUploading}
            style={{
              width: "100%",
              height: 48,
              borderRadius: 26,
              border: "none",
              background: (isLoading || isUpdating || isUploading) ? "var(--disabled)" : isDark?"#E52E4A":"#DA1A35",
              color: "#fff",
              fontSize: 14,
              fontWeight: 400,
              marginTop: 20,
              cursor: (isLoading || isUpdating || isUploading) ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontFamily:"'Open Sans'",
              marginBottom:"20px"
            }}
          >
            {(isUpdating || isUploading) && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ animation: "spin 1.5s linear infinite" }}
              >
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                <path d="M4 12a8 8 0 018-8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
              </svg>
            )}
            {isLoading ? "Loading..." : (isUpdating ? "Updating..." : (isUploading ? "Uploading image..." : "Update Profile"))}
          </button>
        </div>
      </div>
      {toast.show && (
        <div
          className="custom-toast-container"
          style={{
            position: "fixed",
            top: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: toast.type === "success" ? "rgba(76, 175, 80, 0.95)" : "rgba(231, 28, 13, 0.95)",
            backdropFilter: "blur(8px)",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: 30,
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            zIndex: 9999,
            fontSize: 12,
            fontWeight: 400,
            whiteSpace: "nowrap",
            border: `1px solid ${toast.type === "success" ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.15)"}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "'Montserrat'",
          }}
        >
          {toast.type === "success" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {toast.text}
        </div>
      )}
    </ScreensFrame>
  );
}
