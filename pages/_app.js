import "../styles/site.css";
import Preloader from "../components/Preloader";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Preloader />
      <Component {...pageProps} />
    </>
  );
}
