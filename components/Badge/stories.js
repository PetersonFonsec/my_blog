import Badge from "./index";

export default {
  component: Badge,
  title: "Badge",
};

const Template = (args) => <Badge {...args}>{args.content}</Badge>;

export const Default = Template.bind({});
Default.args = {
  color: "red",
  content: "Angular",
  children: "Angular",
};

export const React = Template.bind({});
React.args = {
  color: "blue",
  content: "React",
  children: "React",
};

export const Vue = Template.bind({});
Vue.args = {
  color: "green",
  content: "Vue",
  children: "Vue",
};

export const WordPress = Template.bind({});
WordPress.args = {
  color: "darkBlue",
  content: "WordPress",
};
