import "@/styles/globals.scss";
import { UserProvider } from "@/context/UserContext";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { VenueProvider } from "@/context/VenueContext";

export default function App({ Component, pageProps }) {
  return (
    <VenueProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </VenueProvider>
  );
}
