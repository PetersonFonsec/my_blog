import * as nextImage from "next/legacy/image";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

import { ThemeProvider } from "styled-components";
import { darkTheme } from "../styles/theme";

import GlobalStyle from "../styles/global";

export const decorators = [
  (Story) => (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  layout: "fullscreen",
  actions: { argTypesRegex: "^on[A-Z].*" },
};

// Replace next/image for Storybook
Object.defineProperty(nextImage, "default", {
  configurable: true,
  value: (props) => {
    const { width, height } = props;
    const ratio = (height / width) * 100;
    return (
      <div
        style={{
          paddingBottom: `${ratio}%`,
        }}
      >
        <img
          style={{
            objectFit: "cover",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          {...props}
        />
      </div>
    );
  },
});
