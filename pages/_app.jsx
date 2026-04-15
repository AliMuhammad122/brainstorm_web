import { useEffect } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "../src/store/store";
import { ThemeProvider } from "../context/ThemeContext";
import { ScreensFlowProvider } from "../context/ScreensFlowContext";
import RouteLoader from "../components/RouteLoader";
import "antd/dist/reset.css";
import "leaflet/dist/leaflet.css";
import "../styles/globals.css";

function AppContent({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/menu");
    router.prefetch("/categories");
    router.prefetch("/cart");
    router.prefetch("/select");
    router.prefetch("/checkout");
    router.prefetch("/track-order");
  }, [router]);

  return (
    <>
      <RouteLoader />
      <Component {...pageProps} />
    </>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <ScreensFlowProvider>
          <div className="font-body">
            <AppContent Component={Component} pageProps={pageProps} />
          </div>
        </ScreensFlowProvider>
      </Provider>
    </ThemeProvider>
  );
}
