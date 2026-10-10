import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import SidebarLinkGroup from "./SidebarLinkGroup";
import MenuIcon from "./MenuIcon";
import {
  SidebarDropdownConfig,
  SidebarLinkConfig,
  SidebarMenuSection,
  menuSections,
} from "./menuConfig";
import { navLinkClass, subNavLinkClass } from "./constants";
import { User } from "../../types/user";
import { hasRole } from "../../config/roles";

type SidebarMenuProps = {
  pathname: string;
  user: User;
  sidebarExpanded: boolean;
  setSidebarExpanded: (value: boolean) => void;
};

const SidebarMenu = ({
  pathname,
  user,
  sidebarExpanded,
  setSidebarExpanded,
}: SidebarMenuProps) => {
  const renderLink = (item: SidebarLinkConfig) => {
    const to = typeof item.to === "function" ? item.to(user) : item.to;
    const active = item.isActive?.(pathname) ?? pathname.includes(to);

    return (
      <li key={item.label}>
        <NavLink to={to} className={navLinkClass(active)}>
          <MenuIcon icon={item.icon} />
          <span className="flex-1">{item.label}</span>
          {item.trailing}
        </NavLink>
      </li>
    );
  };

  const renderDropdown = (item: SidebarDropdownConfig) => (
    <SidebarLinkGroup
      key={item.label}
      activeCondition={item.isActive(pathname)}
    >
      {(handleClick, open) => (
        <>
          <NavLink
            to="#"
            className={navLinkClass(item.isActive(pathname))}
            onClick={(e) => {
              e.preventDefault();
              sidebarExpanded ? handleClick() : setSidebarExpanded(true);
            }}
          >
            <MenuIcon icon={item.icon} />
            <span className="flex-1">{item.label}</span>
            <ChevronDown
              className={`absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </NavLink>
          <div className={`overflow-hidden ${!open ? "hidden" : ""}`}>
            <ul className="mt-3 mb-4 flex flex-col gap-2 pl-6">
              {item.children.map((child) => (
                <li key={child.to}>
                  <NavLink
                    to={child.to}
                    className={({ isActive }) => subNavLinkClass(isActive)}
                  >
                    {child.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </SidebarLinkGroup>
  );

  const renderSection = (section: SidebarMenuSection) => {
    const visibleItems = section.items.filter((item) =>
      hasRole(user.role, item.roles),
    );

    if (visibleItems.length === 0) return null;

    return (
      <div key={section.title} className="mb-5">
        <h3 className="mb-2 ml-4 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
          {section.title}
        </h3>
        <ul className="flex flex-col gap-1">
          {visibleItems.map((item) =>
            item.kind === "dropdown" ? renderDropdown(item) : renderLink(item),
          )}
        </ul>
      </div>
    );
  };

  return <>{menuSections.map(renderSection)}</>;
};

export default SidebarMenu;
