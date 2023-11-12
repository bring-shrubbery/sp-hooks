import type { PropsWithChildren } from "react";
import Link from "next/link";
import { FileCodeIcon } from "lucide-react";

export const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <SidebarLink href="/basic">Basic</SidebarLink>
          <SidebarLink href="/array-values">Array Values</SidebarLink>
          <SidebarLink href="/with-default-values">
            With default values
          </SidebarLink>
          <SidebarLink href="/with-zod">With Zod</SidebarLink>
          <SidebarLink href="/with-weak-typesafety">
            With weak type safety
          </SidebarLink>
        </ul>
      </div>
    </aside>
  );
};

const SidebarLink = ({
  href,
  children,
  icon = <FileCodeIcon size={20} />,
}: PropsWithChildren<{ href: string; icon?: React.ReactNode }>) => {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        {icon}
        <span className="flex-1 ml-3 whitespace-nowrap">{children}</span>
      </Link>
    </li>
  );
};
