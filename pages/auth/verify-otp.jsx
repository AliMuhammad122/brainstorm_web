import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "../../context/ThemeContext";
import {
  useVerifyOtpMutation,
  useSignupMutation,
  useRequestOtpMutation,
} from "../../src/store/authApiSlice";

export default function EnterOTPPage() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const { isDark } = useTheme();
  const router = useRouter();
  const { phone } = router.query;
  const inputRefs = useRef([]);

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [signup, { isLoading: isSigningUp }] = useSignupMutation();
  const [requestOtp, { isLoading: isResending }] = useRequestOtpMutation();

  const loading = isVerifying || isSigningUp;

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
    if (!phone) {
      alert("Phone number is missing.");
      return;
    }
    try {
     const res = await requestOtp({ phone }).unwrap();
     console.log(res)
      alert(res?.message || "OTP resent successfully!");
    } catch (err) {
      console.error("Resend OTP Error:", err);
      alert(err?.data?.error.message || "Failed to resend OTP.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isComplete) return;
    if (!phone) {
      alert("Phone number is missing. Please start the signup flow again.");
      return;
    }
    
    try {
      const otpNumber = Number(otp.join(""));
      await verifyOtp({ phone, otp: otpNumber }).unwrap();
      
      alert("Phone verified successfully!");
      sessionStorage.setItem("is_phone_verified", "true");
      sessionStorage.setItem("verified_phone", phone);
      router.push("/auth/signup");
    } catch (err) {
      // console.error("Verification Error:", err);
      alert(err?.data?.error.message || "Verification failed. Please check the OTP and try again.");
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
            disabled={isResending}
          >
            {isResending ? "Resending..." : "Resend OTP"}
          </button>
        </p>

        <p className={`text-center text-sm pt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Wrong number?{" "}
          <Link href="/auth/signup" className="text-[#E31C3D] font-semibold hover:underline">
            Back to Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
