"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useSidebar } from "../context/SidebarContext";

const AppHeader: React.FC = () => {
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 flex w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex w-full items-center justify-between px-4 py-3 md:px-6">

        <div className="flex items-center gap-4">

          <button
            onClick={handleToggle}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Menüyü aç/kapat"
          >
            {isMobileOpen ? "✕" : "☰"}
          </button>

          <Link
            href="/admin"
            className="text-xl font-extrabold text-yellow-500"
          >
            KAZANIX
          </Link>

        </div>

        <div className="hidden lg:block">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ara..."
              className="h-10 w-[300px] rounded-lg border border-gray-200 bg-transparent px-4 text-sm text-gray-800 outline-none focus:border-yellow-500 dark:border-gray-800 dark:text-white"
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
              Ctrl + K
            </span>
          </div>
        </div>

        <Link
          href="/"
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:border-yellow-500 dark:border-gray-800 dark:text-gray-300"
        >
          Siteye Git
        </Link>

      </div>
    </header>
  );
};

export default AppHeader;
