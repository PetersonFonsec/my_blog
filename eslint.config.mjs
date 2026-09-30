import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  {
    ignores: [
      ".next/**",
      ".generated/**",
      "out/**",
      "build/**",
      // Legacy code not imported by any page (depends on uninstalled packages
      // such as styled-components, swiper and prismic-javascript).
      ".storybook/**",
      "components/*/**",
      "services/{about,client,profile,project}.js",
    ],
  },
];

export default eslintConfig;
