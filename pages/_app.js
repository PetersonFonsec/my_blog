import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

import { useState } from "react";
import { ThemeProvider } from "styled-components";

import Head from "next/head";

import GlobalStyle from "../styles/global";
import { darkTheme, defaultTheme } from "../styles/theme";

import ButtonToggleTheme from "../components/Buttons/ToggleTheme/index";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(true);

  return (
    <>
      <ThemeProvider theme={theme ? darkTheme : defaultTheme}>
        <GlobalStyle />
        <ButtonToggleTheme
          darkTheme={theme}
          toggleTheme={() => setTheme(!theme)}
        />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
