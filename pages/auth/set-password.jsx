import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useTheme } from "../../context/ThemeContext";
import { useResetPasswordMutation } from "../../src/store/authApiSlice";
import LeftDecorationIcon from "../../public/assets/icons/Left_decoration.svg";
import RightDecorationIcon from "../../public/assets/icons/Right_decoration.svg";
import EyeIcon from "../../public/assets/icons/Eye.svg";
import EyeSlashIcon from "../../public/assets/icons/EyeSlash.svg";
import BackIcon from "../../public/assets/icons/back.svg";
import CheckIcon from "../../public/assets/icons/check_circle.svg";
import UncheckIcon from "../../public/assets/icons/uncheck.svg";

export default function CreateNewPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isDark } = useTheme();
  const router = useRouter();

  const [resetPassword, { isLoading: loading }] = useResetPasswordMutation();

  const [toast, setToast] = useState({ show: false, text: "", type: "" });
  const toastTimeoutRef = useRef(null);

  const showToast = (text, type = "success") => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ show: true, text, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast({ show: false, text: "", type: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast("Passwords do not match.", "error");
      return;
    }

    const email = sessionStorage.getItem("reset_email");
    if (!email) {
      showToast("Session expired. Please request OTP again.", "error");
      setTimeout(() => {
        router.push("/auth/forgot-password");
      }, 1500);
      return;
    }

    try {
      const res = await resetPassword({
        email,
        newPassword: password,
        confirmNewPassword: confirmPassword,
      }).unwrap();

      if (res.status === 200 || res.success) {
        showToast(res.message || "Password reset successfully!", "success");
        sessionStorage.removeItem("reset_email");
        sessionStorage.removeItem("reset_otp");
        setTimeout(() => {
          router.push("/auth/login");
        }, 1500);
      } else {
        throw new Error(res.message || "Failed to reset password.");
      }
    } catch (err) {
      console.error("Reset Password Error:", err);
      showToast(err.data?.error?.message || err.data?.message || err.message || "Failed to reset password.", "error");
    }
  };

  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const hasMinLength = password.length >= 8;
  
  let score = 0;
  if (password) {
    if (hasUppercase && hasNumber) {
      if (hasSymbol) {
        if (hasMinLength) {
          score = 4;
        } else {
          score = 3;
        }
      } else {
        score = 2;
      }
    } else {
      score = 0;
    }
  }

  const shellStyle = { backgroundColor: "#DA1A35" };

  const inputClass = `
    w-full px-3 py-4 rounded-[8px] font-normal text-sm font-montserrat placeholder:text-sm outline-none
    focus:ring-0 focus:outline-0 transition
    ${isDark
      ? "bg-[#2B2B2B] text-white placeholder-[#777777]"
      : "bg-[#F2F2F2] placeholder-[#777777]"}
  `;
  const labelCls = `text-sm font-montserrat font-normal ${isDark ? "text-gray-200" : "text-[#333333]"}`;

  return (
    <div className="min-h-screen flex justify-center" style={{ backgroundColor: isDark ? "#0B0B0B" : "#F8F9FA" }}>
      <div className="w-full max-w-[400px] min-h-screen flex flex-col relative shadow-2xl" style={shellStyle}>
        {/* Header section */}
        <div className="relative h-[45vh] min-h-[230px] shrink-0 overflow-hidden">
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

        <div
          className={`
          flex-1 rounded-t-[12px] px-5 pt-6.5
          pb-4 flex flex-col gap-3 overflow-y-auto
          ${isDark
              ? "bg-[#0B0B0B] text-white shadow-[0_-10px_30px_rgba(0,0,0,0.35)]"
              : "bg-white shadow-[0_-12px_30px_rgba(218,26,53,0.12)]"}
        `}
        >
          <button
            type="button"
            onClick={() => router.back()}
            className={`
            w-8 h-8 rounded-full flex items-center justify-center
             active:scale-95 transition self-start cursor-pointer
            ${isDark ? "bg-[#1A1A1A]" : "bg-[#F4F6F8]"}
          `}
          >
            <BackIcon width={20} height={20} alt="" />
          </button>

          <div className="flex flex-col items-center " style={{gap:"6px"}}>
            <h1
              className="text-center text-[24px] text-[#333333] font-normal uppercase"
              style={{ fontFamily: "Anton, sans-serif" }}
            >
              Create New Password
            </h1>
            <p className={`text-center text-sm font-montserrat font-normal leading-snug ${isDark ? "text-gray-400" : "text-[#606060]"}`}
              style={{  width:"255px"}}
            >
              Please your new password must be different then previous
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
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
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span></span>
                    <span className={`font-normal text-[8px] font-montserrat text-[#A4A4A4]`}>
                      {score === 0 ? "" : score <= 2 ? "Weak" : score === 3 ? "Good" : "Strong"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className={`h-1 flex-1 rounded-full ${score > 0 ? "bg-[#D00416]" : (isDark ? "bg-[#2B2B2B]" : "bg-gray-200")}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${score > 2 ? "bg-[#DFB400]" : (isDark ? "bg-[#2B2B2B]" : "bg-gray-200")}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${score > 3 ? "bg-[#1FC16B]" : (isDark ? "bg-[#2B2B2B]" : "bg-gray-200")}`}></div>
                  </div>
                  {
                    password !== confirmPassword && (
                      <div className="text-[#777777] mt-1 space-y-1 font-montserrat">
                        <p className="text-[10px] font-normal text-[#777777]">Must contain at least:</p>
                        <div className="flex gap-x-1 gap-y-1 font-normal text-[#777777] text-[8px] mt-1 flex-wrap">
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
                            <span className="text-[#777777]">At least 1 uppercase</span>
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
                            <span className="text-[#777777]">At least 1 number</span>
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
                            <span className="text-[#777777]">At least 1 symbol</span>
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
                            <span className="text-[#777777]">At least 8 character</span>
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
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span></span>
                    <span className={`font-normal text-[8px] font-montserrat text-[#A4A4A4]`}>
                      {score === 0 ? "" : score <= 2 ? "Weak" : score === 3 ? "Good" : "Strong"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className={`h-1 flex-1 rounded-full ${score > 0 ? "bg-[#D00416]" : (isDark ? "bg-[#2B2B2B]" : "bg-gray-200")}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${score > 2 ? "bg-[#DFB400]" : (isDark ? "bg-[#2B2B2B]" : "bg-gray-200")}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${score > 3 ? "bg-[#1FC16B]" : (isDark ? "bg-[#2B2B2B]" : "bg-gray-200")}`}></div>
                  </div>
                </div>
              )}
            </div>

            <div className="">
              <button
                type="submit"
                disabled={loading}
                style={{ fontSize: "14px", }}
                className="
                
                w-full bg-[#DA1A35] text-white h-[48px] rounded-full 
                 font-open-sans font-normal cursor-pointer
                active:scale-95 transition disabled:opacity-50
                "
              >
                {loading ? "Saving..." : "Create Password"}
              </button>
            </div>
          </form>
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
