import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "../../context/ThemeContext";
import { useLoginMutation } from "../../src/store/authApiSlice";
import LeftDecorationIcon from "../../public/assets/icons/Left_decoration.svg";
import RightDecorationIcon from "../../public/assets/icons/Right_decoration.svg";
import EyeIcon from "../../public/assets/icons/Eye.svg";
import EyeSlashIcon from "../../public/assets/icons/EyeSlash.svg";

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
      const { auth_token, ...user } = response?.data || {};
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
    w-full px-4 py-4 rounded-[8px] font-normal font-montserrat placeholder:text-sm outline-none
    focus:ring-0 focus:outline-0 transition
    ${isDark
      ? "bg-[#161625] text-[#EAEAF2] placeholder-[#9595AA]"
      : "bg-[#F4F6F8] text-[#333333] placeholder-[#777777]"}
  `;

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
          pb-10
          flex
          flex-col
          gap-5
          overflow-y-auto
          ${isDark
              ? "bg-[#0D0D1A] border border-[#2A2A40] shadow-[0_-10px_30px_rgba(0,0,0,0.35)]"
              : "bg-white border border-[#F0F0F0] shadow-[0_-12px_30px_rgba(218,26,53,0.12)]"}
        `}
        >
          <div className="flex flex-col items-center " style={{ gap: "6px" }}>
            <h1
              className="text-center text-[24px] font-normal uppercase"
              style={{ fontFamily: "Anton, sans-serif", color: isDark ? "#EAEAF2" : "#333333" }}
            >
              Login to Account
            </h1>
            <p className={`text-center text-sm font-montserrat font-normal ${isDark ? "text-[#9595AA]" : "text-[#606060]"}`}
              style={{ width: "270px" }}
            >
              Please enter your email and password to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={`text-sm font-montserrat font-normal ${isDark ? "text-[#EAEAF2]" : "text-[#333333]"}`}>
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
              <label className={`text-sm font-montserrat font-normal ${isDark ? "text-[#EAEAF2]" : "text-[#333333]"}`}>
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
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDark ? "text-gray-400" : "text-[#777777]"}`}
                >
                  {showPassword ? <EyeSlashIcon width={20} height={20} /> : <EyeIcon width={20} height={20} />}
                </button>
              </div>
            </div>

            <div className="text-right -mt-3 pb-1.5">
              <Link
                href="/auth/forgot-password"
                className={`text-xs transition font-normal font-montserrat ${isDark ? "text-[#6E6E85]" : "text-[#A4A4A4]"}`}
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`
              w-full ${isDark ? "bg-[#E52E4A]" : "bg-[#DA1A35]"}  text-white py-4 rounded-full
              text-sm font-open-sans font-normal cursor-pointer
              active:scale-95 transition disabled:opacity-50
            `}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="flex items-center gap-3">
            <div className={`flex-1 h-px ${isDark ? "bg-[#2A2A40]" : "bg-[#F4F6F8]"}`} />
            <span className={`text-sm font-normal font-montserrat whitespace-nowrap ${isDark ? "text-[#6E6E85]" : "text-[#A4A4A4]"}`}>Or Login with</span>
            <div className={`flex-1 h-px ${isDark ? "bg-[#2A2A40]" : "bg-[#F4F6F8]"}`} />
          </div>

          <div className="flex justify-center  gap-5">
            {[
              { key: "facebook", icon: "/assets/icons/Facebook.svg" },
              { key: "google", icon: "/assets/icons/Google.svg" },
              { key: "apple", icon: "/assets/icons/Apple.svg" },
            ].map(({ key, icon }) => (
              <button
                key={key}
                onClick={() => handleSocialLogin(key)}
                className="w-9 h-9 rounded-full cursor-pointer flex items-center justify-center active:scale-105 transition"
                style={{
                  background: isDark ? "#0D0D1A" : "#FFFFFF",
                  border: isDark ? "1px solid #2A2A40" : "1px solid #F4F6F8",
                }}
              >
                <img src={icon} className="" alt={key} />
              </button>
            ))}
          </div>

          <button
            className="
            w-fit flex self-center mx-auto border border-[#DA1A35] py-2 px-3.5 cursor-pointer rounded-full
            text-sm font-normal font-open-sans active:scale-95 transition
          "
            style={{
              color: isDark ? "#EAEAF2" : "#1a1a1a",
              background: isDark ? "transparent" : "#FFFFFF",
            }}
          >
            Continue as Guest
          </button>

          <p className={`text-center font-normal font-montserrat text-sm ${isDark ? "text-[#A4A4A4]" : "text-[#A4A4A4]"}`}>
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-[#DA1A35] font-normal font-montserrat hover:underline">
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
    </div>
  );
}
