import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import ReactCountryFlag from "react-country-flag";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader } from "../../../src/screensFlow/ui";
import {
  useGetProfileQuery,
  useGetPresignedUrlMutation,
  useUpdateProfileMutation,
} from "../../../src/store/authApiSlice";
import { countryCodes } from "../../../data/countryCodes";
import Skeleton from "../../../components/Skeleton";
import EditProfile from "../../../public/assets/icons/editprofile.svg";

export default function ProfilePage() {
  const router = useRouter();

  const { data, isLoading } = useGetProfileQuery();
  const profile = data?.data;
  console.log("profile", profile?.media?.[0]?.media_thumb_url);

  const [getPresignedUrl] = useGetPresignedUrlMutation();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCode, setPhoneCode] = useState("+357");
  const [phoneNumber, setPhoneNumber] = useState("");
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

  const handleUpdateProfile = async () => {
    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        gender: gender,
        dob: dob,
      };

      if (uploadedPicture) {
        payload.profile_picture = uploadedPicture;
      }

      const res = await updateProfile(payload).unwrap();
      if (res.status === 200 || res.success) {
        showToast(res?.message || "Profile updated successfully!", "success");
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
              background: "var(--surface)",
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
                  <EditProfile />
                </div>
              </div>
            )}
            <div className="space-y-1">
              <div style={{ fontSize: 16, fontWeight: 400, color: "var(--text)", fontFamily: "'Anton'" }}>
                {isLoading ? <Skeleton width={120} height={14} style={{ margin: "4px 0" }} /> : `${firstName} ${lastName}`}
              </div>
              <div style={{ fontSize: 12, color: "#A4A4A4", fontFamily: "'Montserrat'" }}>
                {isLoading ? <Skeleton width={160} height={12} style={{ margin: "4px 0" }} /> : email}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8,marginTop:"10px" }}>
            <label style={{ fontSize: 14, color: "#333333", }}>First Name</label>
            {isLoading ? (
              <Skeleton height={44} borderRadius={10} />
            ) : (
              <input
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{
                  height: 44,
                  borderRadius: 8,
                  border: "none",
                  background: "var(--surface)",
                  padding: "0 12px",
                  fontSize: 14,
                  color: "#333333",
                  fontFamily: "'Montserrat'",
                  outline:"none"
                }}
              />
            )}

            <label style={{ fontSize: 14, color: "#333333", marginTop:"4px" }}>Last Name</label>
            {isLoading ? (
              <Skeleton height={44} borderRadius={10} />
            ) : (
              <input
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{
                  height: 44,
                  borderRadius: 8,
                  border: "none",
                  background: "var(--surface)",
                  padding: "0 12px",
                  fontSize: 14,
                  color: "#333333",
                  fontFamily: "'Montserrat'",
                  outline: "none" 
                }}
              />
            )}

            <label style={{ fontSize: 14, color: "#333333", marginTop:"4px" }}>Email</label>
            {isLoading ? (
              <Skeleton height={44} borderRadius={10} />
            ) : (
              <input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  height: 44,
                  borderRadius: 8,
                  border: "none",
                  background: "var(--surface)",
                  padding: "0 12px",
                  fontSize: 14,
                  color: "#333333",
                  fontFamily: "'Montserrat'",
                  outline: "none"
                }}
              />
            )}

            <label style={{ fontSize: 14, color: "#333333", marginTop:"4px" }}>Phone Number</label>
            {isLoading ? (
              <Skeleton height={44} borderRadius={8} />
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "var(--surface)",
                  borderRadius: 8,
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
                    fontSize: 14,
                    color: "#777777",
                    fontFamily: "'Montserrat'",
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
                    padding: "0 8px",
                    fontSize: 13,
                    color: "var(--text)",
                    fontFamily: "'Montserrat'",
                    outline: "none"
                  }}
                />
                <button
                  type="button"
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#DA1A35",
                    fontSize: 14,
                    padding: "0 8px",
                    cursor: "pointer",
                  }}
                >
                  Send Otp
                </button>
              </div>
            )}

            <label style={{ fontSize: 14, color: "#333333", marginTop: "4px" }}>Gender</label>
            {isLoading ? (
              <Skeleton height={44} borderRadius={10} />
            ) : (
              <div style={{ position: "relative" }}>
                <button
                  type="button"
                  onClick={() => setGenderOpen(!genderOpen)}
                  style={{
                    width: "100%",
                    height: 44,
                    borderRadius: 8,
                    border: "none",
                    background: "var(--surface)",
                    padding: "0 12px",
                    fontSize: 14,
                    color: gender ? "#333333" : "var(--muted)",
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
                    style={{
                      transform: genderOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  >
                    <path d="M6 9l6 6 6-6" stroke="#666" strokeWidth="2" />
                  </svg>
                </button>

                {genderOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: 48,
                      left: 0,
                      right: 0,
                      background: "var(--surface)",
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
                          color: "#333333",
                          cursor: "pointer",
                          background: gender === opt ? "var(--surface-alt)" : "transparent",
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => (e.target.style.background = "var(--surface-alt)")}
                        onMouseLeave={(e) =>
                          (e.target.style.background = gender === opt ? "var(--surface-alt)" : "transparent")
                        }
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <label style={{ fontSize: 14, color: "#333333", marginTop: "4px" }}>DOB</label>
            {isLoading ? (
              <Skeleton height={44} borderRadius={8} />
            ) : (
              <input
                placeholder="YYYY/MM/DD"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                style={{
                  height: 44,
                  borderRadius: 8,
                  border: "none",
                  background: "var(--surface)",
                  padding: "0 12px",
                  fontSize: 14,
                  color: "#333333",
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
              background: (isLoading || isUpdating || isUploading) ? "var(--disabled)" : "#D9142C",
              color: "#fff",
              fontSize: 14,
              fontWeight: 400,
              marginTop: 20,
              cursor: (isLoading || isUpdating || isUploading) ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontFamily:"'Open Sans'"
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
