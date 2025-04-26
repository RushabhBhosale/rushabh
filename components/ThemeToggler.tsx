"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0 dark:rotate-90" />
        <MoonIcon className="h-[1.2rem] w-[1.2rem] absolute rotate-90 scale-0 transition-all dark:scale-100 dark:rotate-0" />
      </Button>
    </div>
  );
};

export default ThemeToggler;
