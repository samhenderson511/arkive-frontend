"use client";

import { Media } from "@/types";
import { useState } from "react";

export type RepeaterLink = {
  url: string;
  label: string;
  subMenu?: RepeaterLink[];
  logo?: Media;
};

export type NestedRepeaterLink = RepeaterLink & {
  subMenu?: (RepeaterLink | NestedRepeaterLink)[];
};

/**
 * A custom hook for managing hierarchical navigation menu state.
 * Handles navigation through nested menu structures with support for back navigation.
 *
 * @param {RepeaterLink[]} initialLinks - The initial array of navigation links to populate the menu
 *
 * @returns {Object} An object containing menu state and navigation methods
 * @returns {RepeaterLink[][]} returns.menuStack - Stack of menu levels, where each level is an array of links
 * @returns {RepeaterLink[]} returns.currentMenu - The currently active menu level
 * @returns {Function} returns.navigateToSubmenu - Function to navigate to a submenu
 * @returns {Function} returns.navigateBack - Function to navigate back to the previous menu level
 * @returns {NestedRepeaterLink | undefined} returns.parentMenuItem - The parent menu item of the current submenu
 *
 * @example
 * ```tsx
 * const {
 *   currentMenu,
 *   navigateToSubmenu,
 *   navigateBack,
 *   parentMenuItem
 * } = useMenuNavigation(initialLinks);
 *
 * // Navigate to a submenu
 * navigateToSubmenu(someSubmenuItems);
 *
 * // Navigate back to parent menu
 * navigateBack();
 * ```
 */
export function useMenuNavigation(initialLinks: RepeaterLink[]) {
  const [menuStack, setMenuStack] = useState<RepeaterLink[][]>([initialLinks]);

  const currentMenu = menuStack[menuStack.length - 1];

  const navigateToSubmenu = (submenu: (RepeaterLink | NestedRepeaterLink)[]) => {
    setMenuStack([...menuStack, submenu]);
  };

  const navigateBack = () => {
    if (menuStack.length > 1) {
      setMenuStack(menuStack.slice(0, -1));
    }
  };

  const findParentMenuItem = () => {
    if (menuStack.length <= 1) return null;
    const parentMenu = menuStack[menuStack.length - 2];
    return parentMenu.find((item) => {
      if ("subMenu" in item && Array.isArray(item.subMenu)) {
        return item.subMenu.every((subItem) =>
          currentMenu.some((currentItem) => currentItem.url === subItem.url)
        );
      }
      return false;
    }) as NestedRepeaterLink | undefined;
  };

  const parentMenuItem = findParentMenuItem();
  const resetMenuStack = () => {
    setMenuStack([initialLinks]);
  };

  return {
    menuStack,
    currentMenu,
    navigateToSubmenu,
    navigateBack,
    parentMenuItem,
    resetMenuStack,
  };
}
