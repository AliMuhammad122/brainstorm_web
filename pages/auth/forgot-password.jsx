import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useTheme } from "../../context/ThemeContext";
import { useForgotPasswordMutation } from "../../src/store/authApiSlice";
import LeftDecorationIcon from "../../public/assets/icons/Left_decoration.svg";
import RightDecorationIcon from "../../public/assets/icons/Right_decoration.svg";
import BackIcon from "../../public/assets/icons/back.svg";

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
           <BackIcon width={20} height={20} alt="" className={isDark ? "text-[#555570]" : "text-[#333333]"}/>
          </button>

          <div className="flex flex-col items-center " style={{gap:"6px"}}>
            <h1
              className="text-center text-[24px] font-normal uppercase"
              style={{ fontFamily: "Anton, sans-serif",color: isDark ? "#EAEAF2" : "#333333" }}
            >
              Forgot Password
            </h1>
            <p className={`text-center text-sm font-montserrat font-normal leading-snug ${isDark ? "text-[#9595AA]" : "text-[#606060]"}`}
              style={{  width:"270px"}}
            >
              Please enter your email address linked with account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={inputClass}
              />
            </div>
<div className="mt-3">

            <button
              type="submit"
              disabled={loading}
              className={`
              w-full ${isDark ? "bg-[#E52E4A]" : "bg-[#DA1A35]"} text-white h-[48px] rounded-full 
              text-sm font-open-sans font-normal cursor-pointer
              active:scale-95 transition disabled:opacity-50
              `}
              >
              {loading ? "Sending..." : "Send Code"}
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
