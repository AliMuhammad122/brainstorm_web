import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "../../context/ThemeContext";
import {
  useVerifyOtpMutation,
  useSignupMutation,
  useRequestOtpMutation,
  useForgotPasswordMutation,
} from "../../src/store/authApiSlice";

export default function EnterOTPPage() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const { isDark } = useTheme();
  const router = useRouter();
  const { phone, email, type } = router.query;
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
  const [signup, { isLoading: isSigningUp }] = useSignupMutation();
  const [requestOtp, { isLoading: isResending }] = useRequestOtpMutation();
  const [forgotPassword, { isLoading: isForgotResending }] = useForgotPasswordMutation();

  const loading = isVerifying || isSigningUp;
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
     console.log(res)
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
      router.push("/auth/signup");
    } catch (err) {
      showToast(err?.data?.error?.message || err?.data?.message || "Verification failed. Please check the OTP and try again.", "error");
    }
  };

  const shellStyle = { backgroundColor: "#DA1A35" };

  return (
    <div className="min-h-screen flex flex-col" style={shellStyle}>
      <div className="relative h-[52vh] min-h-[260px] shrink-0 overflow-hidden">
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
          flex-1 rounded-t-[28px] px-6 pt-6 pb-10
          flex flex-col gap-7 overflow-y-auto
          ${isDark
            ? "bg-[#0B0B0B] text-white shadow-[0_-10px_30px_rgba(0,0,0,0.35)]"
            : "bg-white text-[#1a1a1a] border border-[#F0F0F0] shadow-[0_-12px_30px_rgba(227,28,61,0.12)]"}
        `}
      >
        <button
          type="button"
          onClick={() => router.back()}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center self-start
            shadow-sm border active:scale-95 transition
            ${isDark ? "bg-[#1A1A1A] border-[#2A2A2A]" : "bg-white border-gray-200"}
          `}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        <div className="space-y-2">
          <h1
            className="text-center text-[22px] font-black tracking-wider uppercase"
            style={{ fontFamily: "Anton, sans-serif" }}
          >
            Enter OTP
          </h1>
          <p className={`text-center text-sm leading-snug ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Enter the OTP code we just sent you on your registered Phone number
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
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
                className={`
                  w-16 h-16 text-center text-xl font-bold rounded-2xl outline-none transition
                  focus:ring-2 focus:ring-[#E31C3D]
                  ${isDark ? "bg-[#2B2B2B] text-white" : "bg-[#F2F2F2] text-[#1a1a1a]"}
                  ${digit ? "border-2 border-[#E31C3D]" : "border-2 border-transparent"}
                `}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || !isComplete}
            className={`
              w-full py-3.5 rounded-full text-base font-semibold tracking-wide
              active:scale-95 transition
              ${isComplete
                ? "bg-[#E31C3D] text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"}
            `}
          >
            {loading ? "Verifying..." : "Submit"}
          </button>
        </form>

        <p className={`text-center text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Didn't get OTP?{" "}
          <button
            type="button"
            className="text-[#E31C3D] font-semibold hover:underline disabled:opacity-50"
            onClick={handleResend}
            disabled={resending}
          >
            {resending ? "Resending..." : "Resend OTP"}
          </button>
        </p>

        <p className={`text-center text-sm pt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Wrong number?{" "}
          <Link href="/auth/signup" className="text-[#E31C3D] font-semibold hover:underline">
            Back to Sign up
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
