import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "../../context/ThemeContext";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { isDark } = useTheme();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log("Reset email sent to:", email);
    }, 1000);
  };

  const shellStyle = { backgroundColor: "#DA1A35" };

  const inputBg = isDark
    ? "bg-[#2B2B2B] text-white placeholder-gray-500"
    : "bg-[#F2F2F2] text-[#1a1a1a] placeholder-gray-400";

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
    </div>
  );
}
