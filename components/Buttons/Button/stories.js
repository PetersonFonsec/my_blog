import Button from "./index";

export default {
  component: Button,
  title: "Button",
};

const Template = (args) => <Button {...args}>{args.content}</Button>;

export const Default = Template.bind({});
Default.args = {
  primary: false,
  large: false,
  uppercase: false,
  block: false,
  content: "content",
};

export const Uppercase = Template.bind({});
Uppercase.args = {
  primary: false,
  large: false,
  uppercase: true,
  block: false,
  content: "content",
};

export const Block = Template.bind({});
Block.args = {
  primary: false,
  large: false,
  uppercase: false,
  block: true,
  content: "content",
};
