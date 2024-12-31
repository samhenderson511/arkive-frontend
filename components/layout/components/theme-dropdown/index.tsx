"use client";
import { Button } from "@/components/common";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/common/dropdown";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button title={"Theme"} variant="ghost" size="icon" className="!duration-0 relative">
          <IconSun size={20} className="scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
          <IconMoon size={20} className="absolute scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuCheckboxItem checked={theme === "light"} onClick={() => setTheme("light")}>
          Light
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={theme === "dark"} onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={theme === "system"} onClick={() => setTheme("system")}>
          System
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ModeToggle;
