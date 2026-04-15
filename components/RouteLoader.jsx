import { useEffect, useState } from "react";
import { useRouter } from "next/router";

/**
 * Instant route change feedback - shows immediately on tap.
 * Gives React-SPA-like perceived performance.
 */
export default function RouteLoader() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router]);

  if (!loading) return null;

  return (
    <div
      className="route-loader-bar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: "linear-gradient(90deg, #DA1A35, #ff4d6a)",
        zIndex: 99999,
      }}
    />
  );
}
