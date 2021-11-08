import { BadgeComponent } from "./style";

function Badge({ children, color }) {
  return <BadgeComponent color={color}>{children}</BadgeComponent>;
}

export default Badge;
