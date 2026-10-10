import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import { ICON_CLASS } from "./constants";

type MenuIconProps = {
  icon: LucideIcon | IconType;
};

const MenuIcon = ({ icon: Icon }: MenuIconProps) => (
  <Icon className={ICON_CLASS} size={18} aria-hidden />
);

export default MenuIcon;
