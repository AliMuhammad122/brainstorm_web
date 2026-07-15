import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useTheme } from "../../context/ThemeContext";
import { useLoginMutation } from "../../src/store/authApiSlice";

export default function LoginPage() {
  const { isDark } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [toast, setToast] = useState({ show: false, text: "", type: "" });
  const toastTimeoutRef = useRef(null);

  const showToast = (text, type = "success") => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ show: true, text, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast({ show: false, text: "", type: "" });
    }, 3000);
  };

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      const { auth_token, ...user } = response?.data;
      console.log(user, auth_token)
      console.log("Login Success:", response);

      const token = response.data?.auth_token;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }

      router.push("/");
    } catch (error) {
      console.error("Login Error:", error);
      showToast(error?.data?.error?.message || error?.data?.message || "Failed to login. Please check your credentials and try again.", "error");
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(provider);
  };

  const shellStyle = { backgroundColor: "#DA1A35" };

  const inputClass = `
    w-full px-4 py-3.5 rounded-xl text-sm outline-none
    focus:ring-2 focus:ring-[#DA1A35] transition
    ${isDark
      ? "bg-[#2B2B2B] text-white placeholder-gray-500"
      : "bg-[#F2F2F2] text-[#1a1a1a] placeholder-gray-400"}
  `;

  return (
    <div className="min-h-screen flex flex-col" style={shellStyle}>
      {/* Header section */}
      <div className="relative h-[38vh] min-h-[200px] shrink-0 overflow-hidden">
        <div className="absolute -left-6 top-0">
          <Image
            src="/assets/images/login_left_decoration.png"
            width={190}
            height={190}
            alt=""
            className="pointer-events-none"
          />
        </div>
        <div className="absolute -top-2 -right-2">
          <Image
            src="/assets/images/login_right.png"
            width={130}
            height={130}
            alt=""
            className="pointer-events-none"
          />
        </div>
      </div>

      {/* Card */}
      <div
        className={`
          flex-1
          rounded-t-[28px]
          px-6
          pt-9
          pb-10
          flex
          flex-col
          gap-5
          overflow-y-auto
          ${isDark
            ? "bg-[#0B0B0B] text-white shadow-[0_-10px_30px_rgba(0,0,0,0.35)]"
            : "bg-white text-[#1a1a1a] border border-[#F0F0F0] shadow-[0_-12px_30px_rgba(218,26,53,0.12)]"}
        `}
      >
        <div className="space-y-2">
          <h1
            className="text-center text-[22px] font-black tracking-wider uppercase"
            style={{ fontFamily: "Anton, sans-serif" }}
          >
            Login to Account
          </h1>
          <p className={`text-center text-sm leading-snug ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Please enter your email and password to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={`text-sm font-semibold ${isDark ? "text-gray-200" : "text-[#1a1a1a]"}`}>
              Password
            </label>
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
                className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
              </button>
            </div>
          </div>

          <div className="text-right -mt-2">
            <Link
              href="/auth/forgot-password"
              className={`text-xs transition ${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-[#DA1A35]"}`}
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full bg-[#DA1A35] text-white py-3.5 rounded-full
              text-base font-semibold tracking-wide
              active:scale-95 transition disabled:opacity-50
            "
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center gap-3">
          <div className={`flex-1 h-px ${isDark ? "bg-[#222]" : "bg-gray-200"}`} />
          <span className={`text-xs whitespace-nowrap ${isDark ? "text-gray-400" : "text-gray-500"}`}>Or Login with</span>
          <div className={`flex-1 h-px ${isDark ? "bg-[#222]" : "bg-gray-200"}`} />
        </div>

        <div className="flex justify-center gap-5">
          {[
            { key: "facebook", icon: "/assets/images/facebook_icon.png" },
            { key: "google", icon: "/assets/images/google_icon.png" },
            { key: "apple", icon: "/assets/images/apple_icon.png" },
          ].map(({ key, icon }) => (
            <button
              key={key}
              onClick={() => handleSocialLogin(key)}
              className="w-12 h-12 rounded-full flex items-center justify-center active:scale-95 transition"
              style={{
                background: isDark ? "#141414" : "#FFFFFF",
                border: isDark ? "1px solid #2A2A2A" : "1px solid #F0F0F0",
                boxShadow: isDark ? "none" : "0 10px 22px rgba(0,0,0,0.08)",
              }}
            >
              <img src={icon} alt={key} className="w-5 h-5 object-contain" />
            </button>
          ))}
        </div>

        <button
          className="
            w-full border border-[#DA1A35] py-3 rounded-full
            text-sm font-medium active:scale-95 transition
          "
          style={{
            color: isDark ? "#FFFFFF" : "#1a1a1a",
            background: isDark ? "transparent" : "#FFFFFF",
          }}
        >
          Continue as Guest
        </button>

        <p className={`text-center text-sm pb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-[#DA1A35] font-semibold hover:underline">
            Sign Up
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
  );
}
