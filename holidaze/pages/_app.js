import "@/styles/globals.scss";
import { UserProvider } from "@/context/UserContext";
import { VenueProvider } from "@/context/VenueContext";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <VenueProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </VenueProvider>
  );
}
