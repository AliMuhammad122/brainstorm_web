import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "../../context/ThemeContext";
import ReactCountryFlag from "react-country-flag";
import { countryCodes } from "../../data/countryCodes";
import { useRequestOtpMutation, useSignupMutation } from "../../src/store/authApiSlice";

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
            const matchingCountry = countryCodes.find(c => savedData.phone.startsWith(c.dial_code.replace("+", "")));
            if (matchingCountry) {
              const code = matchingCountry.dial_code;
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
  const score = password ? [hasUppercase, hasNumber, hasSymbol, hasMinLength].filter(Boolean).length : 0;

  const validatePhone = (code, phone) => {
    if (!code) {
      setPhoneError("Country code is required");
      return false;
    }
    if (!phone) {
      setPhoneError("Phone number is required");
      return false;
    }
    if (phone.length < 7 || phone.length > 15) {
      setPhoneError("Enter a valid phone number");
      return false;
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      setForm((prev) => ({ ...prev, phone: digitsOnly }));
      validatePhone(form.phoneCode, digitsOnly);
      setIsVerified(false);
      sessionStorage.removeItem("is_phone_verified");
      sessionStorage.removeItem("verified_phone");
    } else if (name === "phoneCode") {
      setForm((prev) => ({ ...prev, phoneCode: value }));
      validatePhone(value, form.phone);
      setIsVerified(false);
      sessionStorage.removeItem("is_phone_verified");
      sessionStorage.removeItem("verified_phone");
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      validatePhone(value, form.phone);
    }
  };

  const shellStyle = { backgroundColor: "#DA1A35" };

  const inputBg = isDark ? "bg-[#2B2B2B]" : "bg-[#F2F2F2]";
  const inputTx = isDark ? "text-white placeholder-gray-500" : "text-[#1a1a1a] placeholder-gray-400";
  const fieldCls = `w-full px-4 py-3.5 rounded-xl text-sm outline-none transition focus:ring-2 focus:ring-[#E31C3D] ${inputBg} ${inputTx}`;
  const labelCls = `text-sm font-semibold ${isDark ? "text-gray-200" : "text-[#1a1a1a]"}`;

  const currentCountry = countryCodes.find((c) => c.dial_code === form.phoneCode);

  return (
    <div className="min-h-screen flex flex-col" style={shellStyle}>
      <div className="relative h-[26vh] min-h-[150px] shrink-0 overflow-hidden">
        <div className="absolute -left-6">
          <Image
            src="/assets/images/login_left_decoration.png"
            width="190"
            height="190"
            alt=""
            className="pointer-events-none"
          />
        </div>
        <div className="absolute -top-2 -right-2">
          <Image
            src="/assets/images/login_right.png"
            width="130"
            height="130"
            alt=""
            className="pointer-events-none"
          />
        </div>
      </div>

      <div
        className={`
          flex-1 rounded-t-[28px] px-6 pt-9 pb-10
          flex flex-col gap-5 overflow-y-auto
          ${isDark
            ? "bg-[#0B0B0B] text-white shadow-[0_-10px_30px_rgba(0,0,0,0.35)]"
            : "bg-white text-[#1a1a1a] border border-[#F0F0F0] shadow-[0_-12px_30px_rgba(227,28,61,0.12)]"}
        `}
      >
        <div className="space-y-2">
          <h1
            className="text-center text-[22px] font-black tracking-wider uppercase"
            style={{ fontFamily: "Anton, sans-serif" }}
          >
            Sign Up Account
          </h1>
          <p className={`text-center text-sm leading-snug ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Please enter your details to sign up account
          </p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>First Name</label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
              className={fieldCls}
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
              className={fieldCls}
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
              className={fieldCls}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Phone Number</label>

            <div className={`flex items-center rounded-xl ${inputBg}`}>
              <div className="relative flex items-center gap-0.5 pl-3 shrink-0">
                {currentCountry && (
                  <ReactCountryFlag
                    countryCode={currentCountry.code}
                    svg
                    style={{ width: 22, height: 22, objectFit: "cover", borderRadius: 3 }}
                  />
                )}
                <MdKeyboardArrowDown className="text-gray-400 w-4 h-4" />
                <select
                  name="phoneCode"
                  value={form.phoneCode}
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full"
                >
                  {countryCodes.map((country, idx) => (
                    <option key={idx} value={country.dial_code}>
                      {country.code} {country.dial_code}
                    </option>
                  ))}
                </select>
              </div>

              <div className={`w-px h-5 mx-2 shrink-0 ${isDark ? "bg-[#3A3A3A]" : "bg-gray-300"}`} />

              <span className={`text-sm font-medium shrink-0 ${isDark ? "text-white" : "text-[#1a1a1a]"}`}>
                {form.phoneCode}
              </span>

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="(444) 1234-5678"
                className={`flex-1 mx-2 py-3.5 text-sm bg-transparent outline-none ${inputTx}`}
              />

              <button
                type="button"
                className={`shrink-0 pr-4 text-sm font-semibold ${isVerified ? "text-green-500" : "text-[#E31C3D]"} disabled:opacity-50`}
                onClick={handleSendOtp}
                disabled={isSendingOtp || isVerified}
              >
                {isSendingOtp ? "Sending..." : isVerified ? "Verified ✓" : "Send Otp"}
              </button>
            </div>

            {phoneError && <p className="text-xs text-red-500">{phoneError}</p>}
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
                className={`${fieldCls} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
              </button>
            </div>
            {password.length > 0 && (
              <div className="mt-2 space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span></span>
                  <span className={`font-semibold ${score <= 2 ? "text-[#E31C3D]" : score === 3 ? "text-[#F1C40F]" : "text-[#2ECC71]"}`}>
                    {score <= 2 ? "Weak" : score === 3 ? "Good" : "Strong"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className={`h-1.5 flex-1 rounded-full ${score > 0 ? (score <= 2 ? "bg-[#E31C3D]" : score === 3 ? "bg-[#F1C40F]" : "bg-[#2ECC71]") : (isDark ? "bg-[#2B2B2B]" : "bg-gray-200")}`}></div>
                  <div className={`h-1.5 flex-1 rounded-full ${score > 2 ? (score === 3 ? "bg-[#F1C40F]" : "bg-[#2ECC71]") : (isDark ? "bg-[#2B2B2B]" : "bg-gray-200")}`}></div>
                  <div className={`h-1.5 flex-1 rounded-full ${score > 3 ? "bg-[#2ECC71]" : (isDark ? "bg-[#2B2B2B]" : "bg-gray-200")}`}></div>
                </div>
                {
                  password !== confirmPassword && (
<div className="text-[11px] text-gray-400 mt-2 space-y-1">
                  <p className="font-semibold text-gray-400">Must contain at least:</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 font-medium text-gray-500">
                    <span className="flex items-center">
                      {hasUppercase ? (
                        <svg className="w-3.5 h-3.5 text-[#2ECC71] mr-0.5 shrink-0 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-gray-400 mr-0.5 shrink-0 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      <span className={hasUppercase ? "text-[#2ECC71]" : "text-gray-400"}>At least 1 uppercase</span>
                    </span>
                    <span className="flex items-center">
                      {hasNumber ? (
                        <svg className="w-3.5 h-3.5 text-[#2ECC71] mr-0.5 shrink-0 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-gray-400 mr-0.5 shrink-0 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      <span className={hasNumber ? "text-[#2ECC71]" : "text-gray-400"}>At least 1 number</span>
                    </span>
                    <span className="flex items-center">
                      {hasSymbol ? (
                        <svg className="w-3.5 h-3.5 text-[#2ECC71] mr-0.5 shrink-0 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-gray-400 mr-0.5 shrink-0 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      <span className={hasSymbol ? "text-[#2ECC71]" : "text-gray-400"}>At least 1 symbol</span>
                    </span>
                    <span className="flex items-center">
                      {hasMinLength ? (
                        <svg className="w-3.5 h-3.5 text-[#2ECC71] mr-0.5 shrink-0 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-gray-400 mr-0.5 shrink-0 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      <span className={hasMinLength ? "text-[#2ECC71]" : "text-gray-400"}>At least 8 character</span>
                    </span>
                  </div>
                </div>
                  )
                }
                {/* <div className="text-[11px] text-gray-400 mt-2 space-y-1">
                  <p className="font-semibold text-gray-400">Must contain at least:</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 font-medium text-gray-500">
                    <span className="flex items-center">
                      {hasUppercase ? (
                        <svg className="w-3.5 h-3.5 text-[#2ECC71] mr-0.5 shrink-0 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-gray-400 mr-0.5 shrink-0 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      <span className={hasUppercase ? "text-[#2ECC71]" : "text-gray-400"}>At least 1 uppercase</span>
                    </span>
                    <span className="flex items-center">
                      {hasNumber ? (
                        <svg className="w-3.5 h-3.5 text-[#2ECC71] mr-0.5 shrink-0 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-gray-400 mr-0.5 shrink-0 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      <span className={hasNumber ? "text-[#2ECC71]" : "text-gray-400"}>At least 1 number</span>
                    </span>
                    <span className="flex items-center">
                      {hasSymbol ? (
                        <svg className="w-3.5 h-3.5 text-[#2ECC71] mr-0.5 shrink-0 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-gray-400 mr-0.5 shrink-0 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      <span className={hasSymbol ? "text-[#2ECC71]" : "text-gray-400"}>At least 1 symbol</span>
                    </span>
                    <span className="flex items-center">
                      {hasMinLength ? (
                        <svg className="w-3.5 h-3.5 text-[#2ECC71] mr-0.5 shrink-0 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-gray-400 mr-0.5 shrink-0 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      <span className={hasMinLength ? "text-[#2ECC71]" : "text-gray-400"}>At least 8 character</span>
                    </span>
                  </div>
                </div> */}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className={`${fieldCls} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
              </button>
            </div>
            {password && confirmPassword && password === confirmPassword && (
              <div className="mt-2 space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span></span>
                  <span className={`font-semibold ${score <= 2 ? "text-[#E31C3D]" : score === 3 ? "text-[#F1C40F]" : "text-[#2ECC71]"}`}>
                    {score <= 2 ? "Weak" : score === 3 ? "Good" : "Strong"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className={`h-1.5 flex-1 rounded-full ${score > 0 ? (score <= 2 ? "bg-[#E31C3D]" : score === 3 ? "bg-[#F1C40F]" : "bg-[#2ECC71]") : (isDark ? "bg-[#2B2B2B]" : "bg-gray-200")}`}></div>
                  <div className={`h-1.5 flex-1 rounded-full ${score > 2 ? (score === 3 ? "bg-[#F1C40F]" : "bg-[#2ECC71]") : (isDark ? "bg-[#2B2B2B]" : "bg-gray-200")}`}></div>
                  <div className={`h-1.5 flex-1 rounded-full ${score > 3 ? "bg-[#2ECC71]" : (isDark ? "bg-[#2B2B2B]" : "bg-gray-200")}`}></div>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSendingOtp || isSigningUp}
            className="
              w-full bg-[#E31C3D] text-white py-3.5 rounded-full
              text-base font-semibold tracking-wide mt-2
              active:scale-95 transition disabled:opacity-50
            "
          >
            {isSigningUp ? "Signing up..." : isSendingOtp ? "Sending OTP..." : "Sign Up"}
          </button>
        </form>

        <p className={`text-center text-sm pb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#E31C3D] font-semibold hover:underline">
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
    </div>
  );
}
