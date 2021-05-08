import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

import { useState } from "react";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "../styles/global";
import { darkTheme, defaultTheme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(true);

  return (
    <>
      <ThemeProvider theme={theme ? darkTheme : defaultTheme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
