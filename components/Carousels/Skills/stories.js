import SkillsCarousel from "./index";

export default {
  component: SkillsCarousel,
  title: "SkillsCarousel",
  decorators: [
    (story) => (
      <div style={{ width: "400px", margin: "50px auto" }}>{story()}</div>
    ),
  ],
};

const Template = (args) => <SkillsCarousel {...args} />;

export const Default = Template.bind({});
