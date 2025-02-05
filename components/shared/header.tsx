"use client";

import Link from "next/link";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-2xl font-bold">
            P2P Dashboard
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/dashboard" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/create-transaction" className="hover:underline">
                  Create Transaction
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
