import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Store, Moon, Sun } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { useThemeStore } from "../../store/themeStore";

export const Header: React.FC = () => {
  const itemCount = useCartStore((state) => state.getItemCount());
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <header className="sticky top-0 z-50 w-full bg-surface shadow-sm transition-colors duration-200 border-b border-slate-200/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-text-main"
        >
          <Store className="h-6 w-6 text-primary" />
          <span>Cartly</span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={toggleTheme}
            className="p-2 text-text-muted hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-full bg-slate-100 dark:bg-slate-800"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <Link
            to="/"
            className="text-text-muted hover:text-primary font-medium transition-colors hidden sm:block"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="relative text-text-muted hover:text-primary transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-surface">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};
