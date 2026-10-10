export const ICON_CLASS = "w-[18px] h-[18px] shrink-0";

export const navLinkClass = (active: boolean) =>
  `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-meta-4 ${
    active ? "bg-gray-100 dark:bg-meta-4" : ""
  }`;

export const subNavLinkClass = (active: boolean) =>
  `group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-black duration-300 ease-in-out hover:text-primary ${
    active ? "!text-primary" : ""
  }`;
