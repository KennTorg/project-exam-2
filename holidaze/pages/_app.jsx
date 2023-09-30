import "@/styles/globals.scss";
import { UserProvider } from "@/context/UserContext";
import { VenueProvider } from "@/context/VenueContext";
import { config } from "@fortawesome/fontawesome-svg-core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <VenueProvider>
      <UserProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </UserProvider>
    </VenueProvider>
  );
}
