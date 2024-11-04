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

  #__next {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  main {
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .cms-content {
    h1{
      color: ${({ theme }) => theme.colors.primary};
      display: block;
      font-size: 24px;
      font-weight: 500;
      line-height: 29px;
      margin-bottom: 40px;

      @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: 40px;
        line-height: 49px;
      }

      @media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
        font-size: 48px;
        line-height: 59px;
        margin-right: 68px;
      }
    }

    strong {
      color: ${({ theme }) => theme.colors.contrast};
      display: block;
      font-weight: bold;
    }

    p {
      color: ${({ theme }) => theme.colors.primary};
      display: block;
    }
  }
`;
