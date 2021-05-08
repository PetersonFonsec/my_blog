import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  button {
    border: none;
    background: none;
    outline: none;
    padding: 0;

    &:not(:disabled) {
      cursor: pointer;
    }
  }

  ul,
  ol {
    padding: 0;
    list-style: none;
    margin: 0;
  }

  a {
    cursor: pointer;
    text-decoration: none;
    color: inherit;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
    display: block;
  }

  video,
  iframe,
  img {
    max-width: 100%;
    max-height: 100%;
  }

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Montserrat', sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    box-sizing: border-box;
  }

  html, body {
    background-color: ${({ theme }) => theme.background.primary};
    padding: 0;
    margin: 0;
    overflow: visible;
  }
`;
