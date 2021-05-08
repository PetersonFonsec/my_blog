import {
  blue,
  green,
  black,
  dark,
  white,
  light,
  lighter,
  gray,
  breakpoints,
} from "./variaves";

export const defaultTheme = {
  darkTheme: false,

  background: {
    primary: white,
    secondary: light,
    tertiary: green,
    contrast: blue,
  },

  colors: {
    primary: black,
    secondary: white,
    tertiary: gray,
    contrast: blue,
  },

  breakpoints,
};

export const darkTheme = {
  darkTheme: true,

  background: {
    primary: black,
    secondary: dark,
    tertiary: blue,
    contrast: green,
  },

  colors: {
    primary: white,
    secondary: dark,
    tertiary: lighter,
    contrast: green,
  },

  breakpoints,
};
