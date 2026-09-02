import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { useThemeStore } from "../../store/themeStore";

export const Layout: React.FC = () => {
  const isDark = useThemeStore((state) => state.isDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-200">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-surface border-t border-slate-200/20 py-6 text-center text-text-muted text-sm transition-colors duration-200">
        &copy; {new Date().getFullYear()} Cartly. All rights reserved.
      </footer>
    </div>
  );
};
