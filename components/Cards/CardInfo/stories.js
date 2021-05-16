import CardInfo from "./index.jsx";

export default {
  component: CardInfo,
  title: "CardInfo",
  decorators: [(story) => <div style={{ width: "300px" }}>{story()}</div>],
};

const Template = (args) => <CardInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Guitars",
  description: "Agora falta pouco para você tocar!",
  date: "21/06/1999",
  thumb: "/projects/guitars-share.png",
};
