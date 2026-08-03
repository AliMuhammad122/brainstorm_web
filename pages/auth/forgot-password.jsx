import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "../../context/ThemeContext";
import { useForgotPasswordMutation } from "../../src/store/authApiSlice";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const { isDark } = useTheme();
  const router = useRouter();

  const [forgotPassword, { isLoading: loading }] = useForgotPasswordMutation();

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
    if (!email) {
      showToast("Email address is required.", "error");
      return;
    }

    try {
      const response = await forgotPassword({ email }).unwrap();
      if (response.status === 200 || response.success) {
        showToast(response.message || "OTP sent successfully!", "success");
        // Redirect on success to verify otp screen, passing email, phone, and reset password type
        const phone = response.data?.phone || "";
        setTimeout(() => {
          router.push(`/auth/verify-otp?email=${email}&phone=${phone}&type=forgot`);
        }, 1200);
      } else {
        throw new Error(response.message || "Failed to request reset OTP.");
      }
    } catch (err) {
      console.error("Forgot Password Error:", err);
      showToast(err.data?.error?.message || err.data?.message || err.message || "Failed to request reset OTP.", "error");
    }
  };

  const shellStyle = { backgroundColor: "#DA1A35" };

  const inputBg = isDark
    ? "bg-[#2B2B2B] text-white placeholder-gray-500"
    : "bg-[#F2F2F2] text-[#1a1a1a] placeholder-gray-400";

  return (
    <div className="min-h-screen flex justify-center" style={{ backgroundColor: isDark ? "#0B0B0B" : "#F8F9FA" }}>
      <div className="w-full max-w-[430px] min-h-screen flex flex-col relative shadow-2xl" style={shellStyle}>
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
          flex flex-col gap-6 overflow-y-auto
          ${isDark
            ? "bg-[#0B0B0B] text-white shadow-[0_-10px_30px_rgba(0,0,0,0.35)]"
            : "bg-white text-[#1a1a1a] border border-[#F0F0F0] shadow-[0_-12px_30px_rgba(227,28,61,0.12)]"}
        `}
      >
        <button
          type="button"
          onClick={() => router.back()}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center
            shadow-sm border active:scale-95 transition self-start
            ${isDark ? "bg-[#1A1A1A] border-[#2A2A2A]" : "bg-white border-gray-200"}
          `}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        <div className="space-y-2">
          <h1
            className="text-center text-2xl font-black tracking-wider uppercase"
            style={{ fontFamily: "Anton, sans-serif" }}
          >
            Forgot Password
          </h1>
          <p className={`text-center text-md leading-snug ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Please enter your email address linked with account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={`text-sm font-semibold ${isDark ? "text-gray-200" : "text-[#1a1a1a]"}`}>
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`
                w-full px-4 py-3.5 rounded-xl text-sm outline-none transition
                focus:ring-2 focus:ring-[#E31C3D]
                ${inputBg}
              `}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full bg-[#E31C3D] text-white py-3.5 rounded-full
              text-base font-semibold tracking-wide mt-1
              active:scale-95 transition disabled:opacity-50
            "
          >
            {loading ? "Sending..." : "Send Code"}
          </button>
        </form>

        <p className={`text-center text-sm pt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Remember your password?{" "}
          <Link href="/auth/login" className="text-[#E31C3D] font-semibold hover:underline">
            Back to Login
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
    </div>
  );
}
