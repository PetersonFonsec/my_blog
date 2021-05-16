import CardLite from "./index.jsx";

export default {
  component: CardLite,
  title: "CardLite",
};

const Template = (args) => <CardLite {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: "/icons/react.svg",
  alt: "React logo",
};
