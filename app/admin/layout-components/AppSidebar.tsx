"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";

const navItems = [
  { name: "Dashboard", path: "/admin" },
  { name: "Kampanyalar", path: "/admin/campaigns" },
  { name: "İşletmeler", path: "/admin/businesses" },
  { name: "Kullanıcılar", path: "/admin/users" },
  { name: "Yorumlar", path: "/admin/comments" },
];

const AppSidebar: React.FC = () => {
  const pathname = usePathname();
  const { isExpanded, isMobileOpen } = useSidebar();

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 ${
        isExpanded ? "w-[290px]" : "w-[90px]"
      }`}
    >
      <div className="flex h-20 items-center justify-center border-b border-gray-200 dark:border-gray-800">
        <Link href="/admin" className="text-2xl font-extrabold text-yellow-500">
          {isExpanded ? "KAZANIX" : "K"}
        </Link>
      </div>

      <nav className="p-4">
        <div className="mb-3 text-xs font-semibold uppercase text-gray-400">
          {isExpanded && "Yönetim"}
        </div>

        <div className="space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center rounded-lg px-4 py-3 font-medium transition ${
                  active
                    ? "bg-yellow-500 text-black"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <span>{isExpanded ? item.name : item.name.charAt(0)}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export default AppSidebar;