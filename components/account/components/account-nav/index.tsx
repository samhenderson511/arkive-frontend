"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/common";
import { signOut } from "@/lib/data";
import { IconLogout } from "@tabler/icons-react";
import { barlow } from "app/fonts";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useState } from "react";

const AccountNav = () => {
  const route = usePathname();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
  };

  const navItems = [
    { href: "/account", label: "Overview" },
    { href: "/account/profile", label: "Profile" },
    { href: "/account/addresses", label: "Addresses" },
    { href: "/account/orders", label: "Orders" },
    {
      onClick: () => setOpen(true),
      label: "Log out",
      icon: <IconLogout size={20} />,
    },
  ];

  return (
    <>
      <div className="flex flex-col w-full gap-4">
        <h3 className={clsx(barlow.className, "uppercase text-3xl")}>Account</h3>
        <nav>
          <ul className="flex flex-col items-stretch justify-start gap-3">
            {navItems.map(({ href, label, onClick, icon }) => {
              const active = route === href;
              return (
                <li key={label}>
                  <Button
                    variant={active ? "secondary" : "ghost"}
                    href={href}
                    onClick={onClick}
                    className={"!w-full justify-between"}
                  >
                    {label}
                    {icon}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log out</DialogTitle>
            <DialogDescription>Are you sure you want to log out?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant={"ghost"}>
              Cancel
            </Button>
            <Button variant={"destructive"} onClick={handleLogout}>
              Log out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccountNav;
