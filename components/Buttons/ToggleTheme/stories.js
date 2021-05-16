import ToggleTheme from "./index";

export default {
  component: ToggleTheme,
  title: "ToggleTheme",
};

const Template = (args) => <ToggleTheme {...args} />;

export const Default = Template.bind({});
Default.args = {
  darkTheme: true,
};

export const Light = Template.bind({});
Light.args = {
  darkTheme: false,
};
