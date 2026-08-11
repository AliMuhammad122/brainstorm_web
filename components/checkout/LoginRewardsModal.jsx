import React, { useState } from "react";
import Eye from "../../public/assets/icons/Eye.svg"
import EyeSlash from "../../public/assets/icons/EyeSlash.svg"
import ErrorIcon from "../../public/assets/icons/Error.svg"
import CloseIcon from "../../public/assets/icons/close.svg"

/**
 * LoginRewardsModal: A modal for logging in to the Rewards app with validations.
 * Matches the Figma design screenshots.
 */
export default function LoginRewardsModal({ open, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Errors state
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  if (!open) return null;

  const validateEmail = (val) => {
    if (!val) {
      return "Email is required";
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val)) {
      return "Invalid email format";
    }
    return "";
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (emailError) setEmailError(validateEmail(val));
    if (formError) setFormError("");
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (passwordError) setPasswordError(val ? "" : "Password is required");
    if (formError) setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mailErr = validateEmail(email);
    const passErr = password ? "" : "Password is required";

    setEmailError(mailErr);
    setPasswordError(passErr);

    if (mailErr || passErr) return;

    // Authentication Simulation
    // Demo credentials: email = "jack@friday.cy" and password = "password123"
    if (email.toLowerCase() === "jack@friday.cy" && password === "password123") {
      onLoginSuccess({ email });
      // Reset & close
      setEmail("");
      setPassword("");
      setFormError("");
      onClose();
    } else {
      setFormError("Incorrect email and password, Please try again");
    }
  };

  const handleClose = () => {
    // Reset state
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
    setFormError("");
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.4)",
          zIndex: 9998,
          backdropFilter: "blur(2px)",
        }}
      />

      {/* Modal Container */}
      <div
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "calc(100% - 32px)",
          maxWidth: 335,
          background: "#FFFFFF",
          borderRadius: 8,
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
          zIndex: 9999,
          padding: "20px 14px 18px",
          fontFamily: "'Montserrat', sans-serif",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "#333333",
            }}
          >
            Log in to Rewards
          </span>
          <button
            type="button"
            onClick={handleClose}
            style={{
              position: "absolute",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              background: "#F4F6F8",
              border: "none",
              cursor: "pointer",
              // padding: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#8E8E8E",
            }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#E8E8E8", marginBottom: 16 }} />

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* General Form Error Alert */}
          {formError && (
            <div
              style={{
                display: "flex",
                height:"32px",  
                alignItems: "center",
                gap: 8,
                background: "#DA1A351A",
                // border: "1px solid #FFCDCE",
                borderRadius: 8,
                padding: "10px 12px",
                marginBottom: 15,
              }}
            >
              {/* Red Alert Warning Icon */}
              <ErrorIcon />
              <span style={{ fontSize: 10, color: "#DA1A35", fontWeight: 400 }}>
                {formError}
              </span>
            </div>
          )}

          {/* Email field */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 400,
                color: "#333333",
                marginBottom: 4,
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="placeholder:text-[#777777]"
              style={{
                width: "100%",
                height: "40px",
                padding: "12px 10px",
                border: emailError ? "1.5px solid #D00416" : "1.5px solid #F4F6F8",
                borderRadius: 8,
                fontSize: 10,
                color: "#333333",
                background: "#F4F6F8",
                fontFamily: "'Montserrat', sans-serif",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
            {emailError && (
              <span style={{ display: "block", fontSize: 11, color: "#D00416", marginTop: 4 }}>
                {emailError}
              </span>
            )}
          </div>

          {/* Password field */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 400,
                color: "#333333",
                marginBottom: 4,
              }}
            >
              Password
            </label>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter password"
                className="placeholder:text-[#777777]"
                style={{
                  width: "100%",
                  height: "40px",
                  padding: "12px 40px 12px 10px",
                  border: passwordError ? "1.5px solid #D00416" : "1.5px solid #F4F6F8",
                  borderRadius: 8,
                  fontSize: 10,
                  color: "#333333",
                  background: "#F4F6F8",
                  fontFamily: "'Montserrat', sans-serif",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#8E8E8E",
                  padding: 0,
                }}
              >
                {showPassword ? <Eye size={16} /> : <EyeSlash size={16} />}
              </button>
            </div>
            {passwordError && (
              <span style={{ display: "block", fontSize: 11, color: "#D00416", marginTop: 4 }}>
                {passwordError}
              </span>
            )}
          </div>

          <div style={{ height: 1, background: "#E8E8E8", marginBottom: 16 }} />


          {/* Submit button */}
          <button
            type="submit"
            style={{
              width: "100%",
              height: 40,
              borderRadius: 22,
              background: "#DA1A35",
              color: "#FFFFFF",
              border: "none",
              fontSize: 12,
              fontWeight: 400,
              fontFamily: "'Montserrat', sans-serif",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
