import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DropdownUser from "./DropdownUser";
import {
  menuSections,
  MenuIconType,
  SidebarDropdownConfig,
  SidebarLinkConfig,
} from "../Sidebar/menuConfig";
import MenuIcon from "../Sidebar/MenuIcon";
import { User } from "../../types/user";
import { hasRole } from "../../config/roles";

type SearchNavItem = {
  id: string;
  label: string;
  to: string;
  section: string;
  icon: MenuIconType;
  parentLabel?: string;
};

type HeaderProps = {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
  user?: User;
};

const getSearchableNavLinks = (user: User | undefined): SearchNavItem[] => {
  const links: SearchNavItem[] = [];

  for (const section of menuSections) {
    for (const item of section.items) {
      if (item.kind === "link") {
        const link = item as SidebarLinkConfig;
        if (!hasRole(user?.role, link.roles)) {
          continue;
        }
        const to =
          typeof link.to === "function"
            ? link.to(user || ({} as User))
            : link.to;
        links.push({
          id: `${section.title}-${link.label}-${to}`,
          label: link.label,
          to,
          section: section.title,
          icon: link.icon,
        });
        continue;
      }

      const dropdown = item as SidebarDropdownConfig;
      if (!hasRole(user?.role, dropdown.roles)) {
        continue;
      }
      for (const child of dropdown.children) {
        links.push({
          id: `${section.title}-${dropdown.label}-${child.to}`,
          label: child.label,
          to: child.to,
          section: section.title,
          icon: dropdown.icon,
          parentLabel: dropdown.label,
        });
      }
    }
  }

  return links;
};

const Header = ({ sidebarOpen, setSidebarOpen, user }: HeaderProps) => {
  const navigate = useNavigate();
  const searchWrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const navLinks = useMemo(() => getSearchableNavLinks(user), [user]);

  const filteredLinks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return navLinks;
    return navLinks.filter((item) => {
      const haystack = [
        item.label,
        item.parentLabel || "",
        item.section,
        item.to,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [navLinks, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, isOpen]);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (
        searchWrapRef.current &&
        !searchWrapRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const goTo = (to: string) => {
    navigate(to);
    setQuery("");
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (event.key === "ArrowDown" || event.key === "Enter")) {
      setIsOpen(true);
      return;
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (!filteredLinks.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredLinks.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (prev) => (prev - 1 + filteredLinks.length) % filteredLinks.length,
      );
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const target = filteredLinks[activeIndex];
      if (target) goTo(target.to);
    }
  };

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none z-10">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke min-w-4  shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src="/logo.svg" alt="Logo" width={100} />
          </Link>
        </div>

        <div className="hidden sm:block flex-1 max-w-xl mr-4">
          <div className="relative" ref={searchWrapRef}>
            <div className="relative">
              <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2">
                <svg
                  className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                    fill=""
                  />
                </svg>
              </span>

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                onKeyDown={onKeyDown}
                placeholder="Type to search pages..."
                className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
                autoComplete="off"
                role="combobox"
                aria-expanded={isOpen}
                aria-controls="header-nav-search-list"
                aria-autocomplete="list"
              />
            </div>

            {isOpen && (
              <div
                id="header-nav-search-list"
                role="listbox"
                className="absolute left-0 top-full z-50 mt-2 w-full min-w-[280px] max-w-xl overflow-hidden rounded-md border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark xl:w-125"
              >
                <div className="max-h-80 overflow-y-auto py-1">
                  {filteredLinks.length === 0 ? (
                    <p className="px-4 py-3 text-sm text-gray-500">
                      No matching pages
                    </p>
                  ) : (
                    filteredLinks.map((item, index) => {
                      const isActive = index === activeIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => goTo(item.to)}
                          className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                            isActive
                              ? "bg-gray-100 dark:bg-meta-4"
                              : "hover:bg-gray-50 dark:hover:bg-meta-4/60"
                          }`}
                        >
                          <MenuIcon icon={item.icon} />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-medium text-black dark:text-white">
                              {item.parentLabel
                                ? `${item.parentLabel} › ${item.label}`
                                : item.label}
                            </span>
                            <span className="block truncate text-xs text-gray-500">
                              {item.section} · {item.to}
                            </span>
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
