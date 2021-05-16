import Socials from "./index.jsx";

export default {
  component: Socials,
  title: "Socials",
  decorators: [
    (story) => (
      <div style={{ width: "300px", margin: "40px auto" }}>{story()}</div>
    ),
  ],
};

const Template = (args) => <Socials {...args} />;

export const Default = Template.bind({});
