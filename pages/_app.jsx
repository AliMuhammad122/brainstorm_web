import { Provider } from "react-redux";
import Head from "next/head";
import { DM_Sans, Nunito, Montserrat, Poppins } from "next/font/google";
import store from "../src/store/store";
import { ThemeProvider } from "../context/ThemeContext";
import { ScreensFlowProvider } from "../context/ScreensFlowContext";
import RouteLoader from "../components/RouteLoader";
import SplashScreen from "../components/SplashScreen";
import "antd/dist/reset.css";
import "leaflet/dist/leaflet.css";
import "../styles/globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

function AppContent({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>TGI Friday</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
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
          <div className={`${dmSans.variable} ${nunito.variable} ${montserrat.variable} ${poppins.variable} font-body`}>
            <SplashScreen />
            <AppContent Component={Component} pageProps={pageProps} />
          </div>
        </ScreensFlowProvider>
      </Provider>
    </ThemeProvider>
  );
}
