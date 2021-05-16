import Aside from "./index";

import SectionProfile from "../Sections/Profile";
import SectionSkills from "../Sections/Skills";

export default {
  component: Aside,
  title: "Aside",
};

const Template = (args) => (
  <Aside {...args}>
    <SectionProfile />
    <SectionSkills />
  </Aside>
);

export const Default = Template.bind({});
