import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

import { useState } from "react";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "../styles/global";
import { darkTheme, defaultTheme } from "../styles/theme";

import Header from "../components/Layouts/Header/index";
import Footer from "../components/Layouts/Footer/index";
import ButtonToggleTheme from "../components/Buttons/ToggleTheme/index";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(true);

  return (
    <>
      <ThemeProvider theme={theme ? darkTheme : defaultTheme}>
        <GlobalStyle />
        <Header />
        <ButtonToggleTheme
          darkTheme={theme}
          toggleTheme={() => setTheme(!theme)}
        />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
