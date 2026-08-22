import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import Head from "next/head";
import { DM_Sans, Nunito, Montserrat, Poppins, Anton, Open_Sans, Inter, Instrument_Sans } from "next/font/google";
import store from "../src/store/store";
import { ThemeProvider } from "../context/ThemeContext";
import { ScreensFlowProvider } from "../context/ScreensFlowContext";
import RouteLoader from "../components/RouteLoader";
import SplashScreen from "../components/SplashScreen";
import { getStoredToken, onAuthExpired } from "../src/utils/auth";
import "antd/dist/reset.css";
import "../styles/globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-open-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument",
  display: "swap",
});

const PUBLIC_PATHS = new Set([
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/verify-otp",
  "/auth/set-password",
  "/auth/test",
  "/login",
  "/signup",
  "/forgot-password",
  "/verify-otp",
  "/set-password",
]);

const isPublicRoute = (path) => {
  if (!path) return false;
  const cleanPath = path.split("?")[0].replace(/\/$/, "") || "/";
  return PUBLIC_PATHS.has(cleanPath) || cleanPath.startsWith("/auth");
};

function AuthGuard({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const checkAuth = useCallback(
    (targetUrl) => {
      const path = targetUrl || router.asPath || "";
      const isPublic = isPublicRoute(path);
      const token = getStoredToken();

      if (!token && !isPublic) {
        setIsAuthorized(false);
        router.replace("/auth/login");
      } else if (
        token &&
        (path === "/auth/login" ||
          path === "/login" ||
          path === "/auth/signup" ||
          path === "/signup")
      ) {
        setIsAuthorized(true);
        router.replace("/");
      } else {
        setIsAuthorized(true);
      }
    },
    [router]
  );

  useEffect(() => {
    // Initial authentication verification
    checkAuth();

    const handleRouteChange = (url) => {
      checkAuth(url);
    };

    const handleAuthExpired = () => {
      const isPublic = isPublicRoute(router.asPath);
      if (!isPublic) {
        setIsAuthorized(false);
        router.replace("/auth/login");
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);
    const unsubscribeAuthExpired = onAuthExpired(handleAuthExpired);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      unsubscribeAuthExpired();
    };
  }, [checkAuth, router]);

  const isPublic = isPublicRoute(router.asPath);

  // Suppress rendering protected components until authorized
  if (!isAuthorized && !isPublic) {
    return null;
  }

  return children;
}

function AppContent({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>TGI Friday</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <RouteLoader />
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    </>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <ScreensFlowProvider>
          <div
            className={`${dmSans.variable} ${nunito.variable} ${montserrat.variable} ${poppins.variable} ${anton.variable} ${openSans.variable} ${inter.variable} ${instrumentSans.variable} font-body`}
          >
            <SplashScreen />
            <AppContent Component={Component} pageProps={pageProps} />
          </div>
        </ScreensFlowProvider>
      </Provider>
    </ThemeProvider>
  );
}


