import SimpleList from "./index";
import { projects } from "../Projects/models";
import CardInfo from "../../Cards/CardInfo";

export default {
  component: SimpleList,
  title: "SimpleList",
};

const Template = (args) => (
  <SimpleList {...args}>
    {args.projects.map((project, i) => (
      <li key={i}>
        <CardInfo {...project} />
      </li>
    ))}
  </SimpleList>
);

export const Default = Template.bind({});
Default.args = {
  projects,
  title: "Meus Projetos",
};
