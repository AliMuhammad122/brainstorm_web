import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useTheme } from "../../context/ThemeContext";
import {
  useVerifyOtpMutation,
  useRequestOtpMutation,
  useForgotPasswordMutation,
} from "../../src/store/authApiSlice";
import LeftDecorationIcon from "../../public/assets/icons/Left_decoration.svg";
import RightDecorationIcon from "../../public/assets/icons/Right_decoration.svg";
import BackIcon from "../../public/assets/icons/back.svg";

export default function EnterOTPPage() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const { isDark } = useTheme();
  const router = useRouter();
  const { phone, email, type, from } = router.query;
  const inputRefs = useRef([]);

  const [toast, setToast] = useState({ show: false, text: "", type: "" });
  const toastTimeoutRef = useRef(null);

  const showToast = (text, type = "success") => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ show: true, text, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast({ show: false, text: "", type: "" });
    }, 3000);
  };

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [requestOtp, { isLoading: isResending }] = useRequestOtpMutation();
  const [forgotPassword, { isLoading: isForgotResending }] = useForgotPasswordMutation();

  const loading = isVerifying;
  const resending = isResending || isForgotResending;

  const isComplete = otp.every((d) => d !== "");

  const handleOTPChange = (index, value) => {
    if (!/^[0-9]*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 3)]?.focus();
  };

  const handleResend = async () => {
    if (type === "forgot") {
      if (!email) {
        showToast("Email address is missing.", "error");
        return;
      }
      try {
        const res = await forgotPassword({ email }).unwrap();
        showToast(res?.message || "OTP resent successfully!", "success");
      } catch (err) {
        console.error("Resend Forgot OTP Error:", err);
        showToast(err?.data?.error?.message || err?.data?.message || "Failed to resend OTP.", "error");
      }
      return;
    }

    if (!phone) {
      showToast("Phone number is missing.", "error");
      return;
    }
    try {
      const res = await requestOtp({ phone }).unwrap();
      showToast(res?.message || "OTP resent successfully!", "success");
    } catch (err) {
      console.error("Resend OTP Error:", err);
      showToast(err?.data?.error?.message || err?.data?.message || "Failed to resend OTP.", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isComplete) return;

    if (type === "forgot") {
      if (!email) {
        showToast("Email is missing. Please start the forgot password flow again.", "error");
        return;
      }
      try {
        const otpNumber = Number(otp.join(""));
        await verifyOtp({ email, otp: otpNumber }).unwrap();

        showToast("OTP verified successfully!", "success");
        sessionStorage.setItem("reset_email", email);
        sessionStorage.setItem("reset_otp", String(otpNumber));
        setTimeout(() => {
          router.push("/auth/set-password");
        }, 1200);
      } catch (err) {
        console.error("Forgot OTP Verification Error:", err);
        showToast(err?.data?.error?.message || err?.data?.message || "Verification failed. Please check the OTP and try again.", "error");
      }
      return;
    }

    if (!phone) {
      showToast("Phone number is missing. Please start the signup flow again.", "error");
      return;
    }

    try {
      const otpNumber = Number(otp.join(""));
      await verifyOtp({ phone, otp: otpNumber }).unwrap();

      showToast("Phone verified successfully!", "success");
      sessionStorage.setItem("is_phone_verified", "true");
      sessionStorage.setItem("verified_phone", phone);
      router.push(from || "/auth/signup");
    } catch (err) {
      showToast(err?.data?.error?.message || err?.data?.message || "Verification failed. Please check the OTP and try again.", "error");
    }
  };

  const shellStyle = { backgroundColor: "#DA1A35" };

  return (
    <div className="min-h-screen flex justify-center" style={{ backgroundColor: isDark ? "#0D0D1A" : "#F8F9FA" }}>
      <div className="w-full max-w-[385px] min-h-screen flex flex-col relative shadow-2xl" style={shellStyle}>
        {/* Header section */}
        <div className="relative h-[52vh] min-h-[240px] shrink-0 overflow-hidden">
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
          flex-1 rounded-t-[12px] px-6 pt-6.5
          flex flex-col gap-3 overflow-y-auto
          ${isDark
              ? "bg-[#0D0D1A] text-white shadow-[0_-10px_30px_rgba(0,0,0,0.35)]"
              : "bg-white shadow-[0_-12px_30px_rgba(218,26,53,0.12)]"}
        `}
        >
          <button
            type="button"
            onClick={() => router.back()}
            className={`
            w-8 h-8 rounded-full flex items-center justify-center
             active:scale-95 transition self-start cursor-pointer
            ${isDark ? "bg-[#161625]" : "bg-[#F4F6F8]"}
          `}
          >
            <BackIcon width={20} height={20} alt="" className={isDark ? "text-[#555570]" : "text-[#333333]"} />
          </button>

          <div className="flex flex-col items-center " style={{gap:"7px"}}>
            <h1
              className="text-center text-[24px] text-[#333333] font-normal uppercase font-anton"
              style={{ color: isDark ? "#EAEAF2" : "#333333" }}
            >
              Enter OTP
            </h1>
            <p className={`text-center text-sm font-montserrat font-normal leading-snug ${isDark ? "text-[#9595AA]" : "text-[#606060]"}`}
              style={{  width:"255px"}}
            >
              Enter the OTP code we just sent you on your registered Phone number
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
            <div className="flex justify-center gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  style={{color:isDark ? "#9595AA" : "#777777"}}
                  className={`
                  w-16 h-16 text-center text-base font-normal font-montserrat rounded-[8px] outline-none transition
                  focus:ring-0 focus:outline-0 ${isDark ? "bg-[#161625]" : "bg-[#F4F6F8]"} 
                `}
                />
              ))}
            </div>

            <div className="mt-3">
              <button
                type="submit"
                disabled={loading || !isComplete}
                className={`
                w-full ${isDark ? "bg-[#E52E4A]" : "bg-[#DA1A35]"} text-white h-[48px] rounded-full 
                text-sm font-open-sans font-normal cursor-pointer
                active:scale-95 transition ${isDark ? "disabled:bg-[#353550] disabled:cursor-not-allowed" : "disabled:bg-[#D2D2D2] disabled:cursor-not-allowed"}
                `}
              >
                {loading ? "Verifying..." : "Submit"}
              </button>
            </div>
          </form>

          <p className={`text-center font-normal pt-2 font-open-sans text-sm ${isDark ? "text-gray-400" : "text-[#A4A4A4]"}`}>
            Didn&apos;t get OTP?{" "}
            <button
              type="button"
              style={{color:isDark ? "#DA1A35" : "#DA1A35"}}
              className="font-normal font-open-sans hover:underline cursor-pointer"
              onClick={handleResend}
              disabled={resending}
            >
              {resending ? "Resending..." : "Resend OTP"}
            </button>
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
