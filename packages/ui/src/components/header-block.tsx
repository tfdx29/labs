import { useEffect, useState } from "react";
import { RiArrowRightLine, RiMenuLine } from "@remixicon/react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

import { Button } from "@labs/ui/components/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@labs/ui/components/sheet";

const navLinks = [
  { label: "Product", href: "#" },
  { label: "Solutions", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Resources", href: "#" },
];

function ThemeToggleSelect() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="size-8 bg-transparent border border-input" />;
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      className="size-8 p-0 border border-input bg-transparent hover:bg-accent flex items-center justify-center rounded-none cursor-pointer rounded-2xl"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="size-4 text-foreground" />
      ) : (
        <Sun className="size-4 text-foreground" />
      )}
    </Button>
  );
}

export function HeaderBlock() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-6">
        <a href="#" className="flex shrink-0 items-center gap-2.5">
          <span className="grid grid-cols-2 gap-0.5" aria-hidden="true">
            <span className="size-2.5 bg-primary" />
            <span className="size-2.5 bg-primary" />
            <span className="size-2.5 bg-primary" />
            <span className="size-2.5 bg-primary" />
          </span>
          <span className="text-base font-bold tracking-tight">Acme</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <Button
            render={<a href="/login" />}
            nativeButton={false}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground "
          >
            Sign in
          </Button>
          <Button
            render={<a href="/register" />}
            nativeButton={false}
            size="sm"
          >
            Get Started
            <RiArrowRightLine data-icon="inline-end" aria-hidden="true" />
          </Button>
          <ThemeToggleSelect />
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                aria-label="Open menu"
                className="ml-auto md:hidden"
              />
            }
          >
            <RiMenuLine aria-hidden="true" />
          </SheetTrigger>
          <SheetContent side="right" className="w-3/4 max-w-xs">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2.5">
                <span className="grid grid-cols-2 gap-0.5" aria-hidden="true">
                  <span className="size-2 bg-primary" />
                  <span className="size-2 bg-primary" />
                  <span className="size-2 bg-primary" />
                  <span className="size-2 bg-primary" />
                </span>
                Acme
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col px-4">
              {navLinks.map((link) => (
                <SheetClose
                  key={link.label}
                  nativeButton={false}
                  render={
                    <a
                      href={link.href}
                      className="border-b border-border py-3 text-sm font-medium text-muted-foreground transition-colors last:border-b-0 hover:text-foreground"
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>

            <SheetFooter className="flex flex-col gap-2">
              <SheetClose
                nativeButton={false}
                render={
                  <Button
                    render={<a href="/login" />}
                    nativeButton={false}
                    variant="outline"
                    className="w-full"
                  />
                }
              >
                Sign in
              </SheetClose>
              <SheetClose
                nativeButton={false}
                render={
                  <Button
                    render={<a href="/register" />}
                    nativeButton={false}
                    className="w-full"
                  />
                }
              >
                Get Started
                <RiArrowRightLine data-icon="inline-end" aria-hidden="true" />
              </SheetClose>
              <div className="mt-2 flex w-full justify-center">
                <ThemeToggleSelect />
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default HeaderBlock;
