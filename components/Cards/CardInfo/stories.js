import CardInfo from "./index.jsx";

export default {
  component: CardInfo,
  title: "CardInfo",
};

const Template = (args) => <CardInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Guitars",
  description: "Agora falta pouco para você tocar!",
  date: "21/06/1999",
  thumb: "/projects/guitars-share.png",
};
