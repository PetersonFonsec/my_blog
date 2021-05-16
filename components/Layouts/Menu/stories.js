import Menu from "./index";
import { links } from "../Header/models";

export default {
  component: Menu,
  title: "Menu",
};

const Template = (args) => <Menu {...args} />;

export const Default = Template.bind({});
Default.args = {
  links,
  active: "skills",
  show: true,
};
