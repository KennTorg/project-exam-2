import "@/styles/globals.scss";
import { UserProvider } from "@/context/UserContext";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
