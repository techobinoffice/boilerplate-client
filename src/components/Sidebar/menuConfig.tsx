import { ReactNode } from "react";
import { LayoutDashboard, LucideIcon, Settings, Users } from "lucide-react";
import { IconType } from "react-icons";
import { User } from "../../types/user";
import { ADMIN_ROLES } from "../../config/roles";

export type MenuIconType = LucideIcon | IconType;

export type SidebarLinkConfig = {
  kind: "link";
  label: string;
  to: string | ((user: User) => string);
  icon: MenuIconType;
  roles?: string[];
  isActive?: (pathname: string) => boolean;
  trailing?: ReactNode;
};

export type SidebarDropdownConfig = {
  kind: "dropdown";
  label: string;
  icon: MenuIconType;
  roles?: string[];
  isActive: (pathname: string) => boolean;
  children: { label: string; to: string }[];
};

export type SidebarMenuSection = {
  title: string;
  items: (SidebarLinkConfig | SidebarDropdownConfig)[];
};

// add a page here and it shows up in the sidebar and in the header page search
export const menuSections: SidebarMenuSection[] = [
  {
    title: "Overview",
    items: [
      {
        kind: "link",
        label: "Dashboard",
        to: "/dashboard",
        icon: LayoutDashboard,
        isActive: (p) => p.includes("dashboard"),
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        kind: "link",
        label: "Users",
        to: "/users",
        icon: Users,
        roles: ADMIN_ROLES,
        isActive: (p) => p === "/users" || p.startsWith("/users/"),
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        kind: "link",
        label: "Settings",
        to: "/settings",
        icon: Settings,
        isActive: (p) => p.includes("settings"),
      },
    ],
  },
];
