import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "../../context/ThemeContext";
import { useRequestOtpMutation, useSignupMutation } from "../../src/store/authApiSlice";
import LeftDecorationIcon from "../../public/assets/icons/Left_decoration.svg";
import RightDecorationIcon from "../../public/assets/icons/Right_decoration.svg";
import EyeIcon from "../../public/assets/icons/Eye.svg";
import EyeSlashIcon from "../../public/assets/icons/EyeSlash.svg";
import CheckIcon from "../../public/assets/icons/check_circle.svg"
import UncheckIcon from "../../public/assets/icons/uncheck.svg"
import parsePhoneNumberFromString from "libphonenumber-js";
import CountrySelect, { COUNTRY_OPTIONS } from "../../components/CountrySelect";


export default function SignupPage() {
  const { isDark } = useTheme();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({ phoneCode: "+357", phone: "" });
  const [phoneError, setPhoneError] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const [toast, setToast] = useState({ show: false, text: "", type: "" });
  const toastTimeoutRef = useRef(null);

  const showToast = (text, type = "success") => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ show: true, text, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast({ show: false, text: "", type: "" });
    }, 3000);
  };

  const [requestOtp, { isLoading: isSendingOtp }] = useRequestOtpMutation();
  const [signup, { isLoading: isSigningUp }] = useSignupMutation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const verified = sessionStorage.getItem("is_phone_verified") === "true";
      const verifiedPhone = sessionStorage.getItem("verified_phone");
      const savedDataStr = sessionStorage.getItem("signup_data");

      if (savedDataStr) {
        try {
          const savedData = JSON.parse(savedDataStr);
          if (savedData.first_name) setFirstName(savedData.first_name);
          if (savedData.last_name) setLastName(savedData.last_name);
          if (savedData.email) setEmail(savedData.email);
          if (savedData.password) {
            setPassword(savedData.password);
            setConfirmPassword(savedData.password);
          }
          if (savedData.phone) {
            const matchingCountry = COUNTRY_OPTIONS.find(c => savedData.phone.startsWith(c.dialCode.replace("+", "")));
            if (matchingCountry) {
              const code = matchingCountry.dialCode;
              const num = savedData.phone.substring(code.replace("+", "").length);
              setForm({ phoneCode: code, phone: num });

              if (verified && verifiedPhone === savedData.phone) {
                setIsVerified(true);
              }
            } else {
              setForm(prev => ({ ...prev, phone: savedData.phone }));
            }
          }
        } catch (e) {
          console.error("Error restoring signup data:", e);
        }
      }
    }
  }, []);

  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const hasMinLength = password.length >= 8;
  
  let score = 0;
  if (password) {
    const completedCount = [hasUppercase, hasNumber, hasSymbol, hasMinLength].filter(Boolean).length;
    if (completedCount === 2) {
      score = 2;
    } else if (completedCount === 3) {
      score = 3;
    } else if (completedCount === 4) {
      score = 4;
    } else {
      score = 0;
    }
  }

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
    const formattedPhone = `${form.phoneCode.replace("+", "")}${form.phone}`;
    if (!validatePhone(form.phoneCode, form.phone)) {
      return;
    }
    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone: formattedPhone,
        password,
        confirmPassword,
      };

      await requestOtp({ phone: formattedPhone }).unwrap();
      sessionStorage.setItem("signup_data", JSON.stringify(payload));
      router.push(`/auth/verify-otp?phone=${formattedPhone}`);
    } catch (error) {
      console.error("OTP Request Error:", error);
      showToast(error?.data?.error?.message || error?.data?.message || "Failed to send OTP. Please check your phone number and try again.", "error");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    const formattedPhone = `${form.phoneCode.replace("+", "")}${form.phone}`;
    if (!validatePhone(form.phoneCode, form.phone)) {
      return;
    }

    const verifiedPhone = sessionStorage.getItem("verified_phone");
    const isPhoneVerifiedInStorage = sessionStorage.getItem("is_phone_verified") === "true";

    if (isPhoneVerifiedInStorage && verifiedPhone === formattedPhone) {
      try {
        const payload = {
          first_name: firstName,
          last_name: lastName,
          email,
          phone: formattedPhone,
          password,
          confirmPassword,
        };
        const response = await signup(payload).unwrap();
        console.log("Signup Success:", response);
        showToast("Signup successful!", "success");
        sessionStorage.removeItem("signup_data");
        sessionStorage.removeItem("is_phone_verified");
        sessionStorage.removeItem("verified_phone");
        router.push("/login");
      } catch (error) {
        console.error("Signup Error:", error);
        showToast(error?.data?.error?.message || error?.data?.message || "Failed to sign up. Please try again.", "error");
      }
    } else {
      await handleSendOtp();
    }
  };

  const handleCountryChange = (option) => {
    const nextCode = option ? option.dialCode : "+357";
    setForm(prev => ({ ...prev, phoneCode: nextCode }));
    validatePhone(nextCode, form.phone);
    setIsVerified(false);
    sessionStorage.removeItem("is_phone_verified");
    sessionStorage.removeItem("verified_phone");
  };

  const handlePhoneChange = (val) => {
    const digitsOnly = val.replace(/\D/g, "");
    setForm(prev => ({ ...prev, phone: digitsOnly }));
    validatePhone(form.phoneCode, digitsOnly);
    setIsVerified(false);
    sessionStorage.removeItem("is_phone_verified");
    sessionStorage.removeItem("verified_phone");
  };

  const shellStyle = { backgroundColor: "#DA1A35" };

  const inputClass = `
    w-full px-3 py-4 rounded-[8px] font-normal text-sm font-montserrat placeholder:text-sm outline-none
    focus:ring-0 focus:outline-0 transition
    ${isDark
      ? "bg-[#161625] text-[#EAEAF2] placeholder-[#9595AA]"
      : "bg-[#F4F6F8] text-[#333333] placeholder-[#777777]"}
  `;
  const labelCls = `text-sm font-montserrat font-normal ${isDark ? "text-[#EAEAF2]" : "text-[#333333]"}`;

  return (
    <div className="min-h-screen flex justify-center" style={{ backgroundColor: isDark ? "#0D0D1A" : "#F8F9FA" }}>
      <div className="w-full max-w-[385px] min-h-screen flex flex-col relative shadow-2xl" style={shellStyle}>
        {/* Header section */}
        <div className="relative h-[33vh] min-h-[200px] shrink-0 overflow-hidden">
          <div className="absolute">
            <LeftDecorationIcon
              width={170}
              height={170}
              alt=""
              className="pointer-events-none"
            />
          </div>
          <div className="absolute -right-20">
            <RightDecorationIcon
              width={170}
              height={300}
              alt=""
              className="pointer-events-none"
            />
          </div>
        </div>

        {/* Card */}
        <div
          className={`
          flex-1
          rounded-t-[12px]
          px-6
          pt-7
          pb-6
          flex
          flex-col
          gap-5
          overflow-y-auto
          ${isDark
              ? "bg-[#0D0D1A] shadow-[0_-10px_30px_rgba(0,0,0,0.35)]"
              : "bg-white  shadow-[0_-12px_30px_rgba(218,26,53,0.12)]"}
        `}
        >
          <div className="flex flex-col items-center " style={{ gap: "6px" }}>
            <h1
              className="text-center text-[24px] text-[#333333] font-normal uppercase"
              style={{ fontFamily: "Anton, sans-serif",color: isDark ? "#EAEAF2" : "#333333" }}
            >
              Sign Up Account
            </h1>
            <p className={`text-center text-sm font-montserrat font-normal leading-snug ${isDark ? "text-[#9595AA]" : "text-[#606060]"}`}
              style={{ width: "270px" }}
            >
              Please enter your details to sign up account
            </p>
          </div>

          <form onSubmit={handleSignup} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>First Name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Last Name</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Phone Number</label>

              <div className={`flex items-center rounded-[8px] transition pl-2.5 ${isDark ? "bg-[#161625]" : "bg-[#F4F6F8]"}`}>
                <div className="shrink-0">
                  <CountrySelect
                    value={form.phoneCode}
                    onChange={handleCountryChange}
                  />
                </div>

                {/* Divider line */}
                <div className={`h-11 w-px  shrink-0 ${isDark ? "bg-[#2A2A40]" : "bg-[#E9EAEB]"}`} />

                <input
                  type="tel"
                  name="phone"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={form.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="(444) 1234-5678"
                  className={`flex-1 min-w-0 py-4 px-2 placeholder:text-sm bg-transparent outline-none font-normal font-montserrat ${isDark ? "text-[#EAEAF2] placeholder-[#9595AA]" : "text-[#333333] placeholder-[#777777]"}`}
                />

                <button
                  type="button"
                  className="shrink-0 pr-2 font-normal font-montserrat cursor-pointer active:scale-95 transition disabled:opacity-50"
                  style={{ color: isVerified ? "#2ECC71" : "#DA1A35", fontSize: "14px",color:isDark ? "#E52E4A" : "#DA1A35" }}
                  onClick={handleSendOtp}
                  disabled={isSendingOtp || isVerified}
                >
                  {isSendingOtp ? "Sending..." : isVerified ? "Verified ✓" : "Send Otp"}
                </button>
              </div>

              {phoneError && <p className="text-sm text-[#DA1A35] font-montserrat">{phoneError}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-2.5 top-1/2 -translate-y-1/2 ${isDark ? "text-gray-400" : "text-[#777777]"}`}
                >
                  {showPassword ? <EyeSlashIcon width={20} height={20} /> : <EyeIcon width={20} height={20} />}
                </button>
              </div>
              {password.length > 0 && (
                <div className=" space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span></span>
                    <span className={`font-normal text-[8px] font-instrument ${isDark?"text-[#6E6E85]":"text-[#A4A4A4]"}`}>
                      {score === 0 ? "" : score <= 2 ? "Weak" : score === 3 ? "Good" : "Strong"}
                    </span>
                  </div>
                   <div className="flex gap-2">
                    <div className={`h-1 flex-1 rounded-full ${score > 0 ? (isDark ? "bg-[#DA1A35]" : "bg-[#D00416]") : (isDark ? "bg-[#2A2A40]" : "bg-[#E8E8E8]")}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${score > 2 ? "bg-[#DFB400]" : (isDark ? "bg-[#2A2A40]" : "bg-[#E8E8E8]")}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${score > 3 ? "bg-[#1FC16B]" : (isDark ? "bg-[#2A2A40]" : "bg-[#E8E8E8]")}`}></div>
                  </div>
                  {
                    password !== confirmPassword && (
                      <div className=" mt-1 space-y-1 font-instrument">
                        <p className={`text-[10px] font-normal ${isDark ? "text-[#9595AA]" : "text-[#777777]"}`}>Must contain at least:</p>
                        <div className="flex gap-x-1 gap-y-1 font-normal text-[#777777] text-[8px] mt-1">
                          <span className="flex items-center justify-center">
                            {hasUppercase ? (
                              <CheckIcon
                                width={12}
                                height={12}
                                className="mr-0.5 shrink-0 inline-block align-middle"
                              />
                            ) : (
                              <UncheckIcon
                                width={12}
                                height={12}
                                className="mr-0.5 shrink-0 inline-block align-middle"
                              />
                            )}
                            <span className={` ${isDark ? "text-[#9595AA]" : "text-[#777777]"}`}>At least 1 uppercase</span>
                          </span>
                          <span className="flex items-center">
                            {hasNumber ? (
                              <CheckIcon
                                width={12}
                                height={12}
                                className="mr-0.5 shrink-0 inline-block align-middle"
                              />
                            ) : (
                              <UncheckIcon
                                width={12}
                                height={12}
                                className="mr-0.5 shrink-0 inline-block align-middle"
                              />
                            )}
                            <span className={` ${isDark ? "text-[#9595AA]" : "text-[#777777]"}`}>At least 1 number</span>
                          </span>
                          <span className="flex items-center">
                            {hasSymbol ? (
                              <CheckIcon
                                width={12}
                                height={12}
                                className="mr-0.5 shrink-0 inline-block align-middle"
                              />
                            ) : (
                              <UncheckIcon
                                width={12}
                                height={12}
                                className="mr-0.5 shrink-0 inline-block align-middle"
                              />
                            )}
                            <span className={` ${isDark ? "text-[#9595AA]" : "text-[#777777]"}`}>At least 1 symbol</span>
                          </span>
                          <span className="flex items-center">
                            {hasMinLength ? (
                              <CheckIcon
                                width={12}
                                height={12}
                                className="mr-0.5 shrink-0 inline-block align-middle"
                              />
                            ) : (
                              <UncheckIcon
                                width={12}
                                height={12}
                                className="mr-0.5 shrink-0 inline-block align-middle"
                              />
                            )}
                            <span className={` ${isDark ? "text-[#9595AA]" : "text-[#777777]"}`}>At least 8 character</span>
                          </span>
                        </div>
                      </div>)
                  }
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5 pb-3">
              <label className={labelCls}>Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-2.5 top-1/2 -translate-y-1/2 ${isDark ? "text-gray-400" : "text-[#777777]"}`}
                >
                  {showConfirmPassword ? <EyeSlashIcon width={20} height={20} /> : <EyeIcon width={20} height={20} />}
                </button>
              </div>
              {password && confirmPassword && password === confirmPassword && (
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span></span>
                    <span className={`font-normal text-[8px] font-instrument ${isDark?"text-[#6E6E85]":"text-[#A4A4A4]"}`}>
                      {score === 0 ? "" : score <= 2 ? "Weak" : score === 3 ? "Good" : "Strong"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className={`h-1 flex-1 rounded-full ${score > 0 ? (isDark ? "bg-[#DA1A35]" : "bg-[#D00416]") : (isDark ? "bg-[#2A2A40]" : "bg-[#E8E8E8]")}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${score > 2 ? "bg-[#DFB400]" : (isDark ? "bg-[#2A2A40]" : "bg-[#E8E8E8]")}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${score > 3 ? "bg-[#1FC16B]" : (isDark ? "bg-[#2A2A40]" : "bg-[#E8E8E8]")}`}></div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSendingOtp || isSigningUp}
              className={`
              w-full ${isDark ? "bg-[#E52E4A]" : "bg-[#DA1A35]"} text-white py-4 rounded-full
              text-sm font-open-sans font-normal cursor-pointer
              active:scale-95 transition disabled:opacity-50
            `}
            >
              {isSigningUp ? "Signing up..." : isSendingOtp ? "Sending OTP..." : "Sign Up"}
            </button>
          </form>

          <p className={`text-center font-normal font-montserrat text-sm ${isDark ? "text-[#A4A4A4]" : "text-[#A4A4A4]"}`}>
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[#DA1A35] font-normal font-montserrat hover:underline">
              Login
            </Link>
          </p>
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
              fontSize: 13,
              fontWeight: 500,
              whiteSpace: "nowrap",
              border: `1px solid ${toast.type === "success" ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.15)"}`,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {toast.type === "success" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {toast.text}
          </div>
        )}
      </div>
    </div>
  );
}
