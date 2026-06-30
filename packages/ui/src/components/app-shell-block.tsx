import * as React from "react";
import { type ReactElement } from "react";
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiBarChartBoxLine,
  RiChat3Line,
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiFileTextLine,
  RiGlobalLine,
  RiHome5Line,
  RiLayoutGridLine,
  RiLogoutBoxRLine,
  RiMoreLine,
  RiNotification3Line,
  RiPaletteLine,
  RiSearchLine,
  RiSettings3Line,
  RiShieldUserLine,
  RiTimeLine,
  RiUser3Line,
  RiUserLine,
} from "@remixicon/react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@labs/ui/components/avatar";
import { Badge } from "@labs/ui/components/badge";
import { Button } from "@labs/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@labs/ui/components/dropdown-menu";
import { Kbd, KbdGroup } from "@labs/ui/components/kbd";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@labs/ui/components/popover";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@labs/ui/components/progress";
import { Separator } from "@labs/ui/components/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@labs/ui/components/sidebar";

const navItems = [
  { label: "Dashboard", icon: RiHome5Line, active: true, href: "/dashboard" },
  {
    label: "Workspaces",
    icon: RiLayoutGridLine,
    href: "/workspaces",
  },
  { label: "Analytics", icon: RiBarChartBoxLine, active: false, href: "#" },
  { label: "Team", icon: RiUserLine, active: false, href: "#" },
  { label: "Settings", icon: RiSettings3Line, active: false, href: "#" },
];

const workspaces = [
  { label: "Design System", icon: RiPaletteLine },
  { label: "Marketing Site", icon: RiGlobalLine },
  { label: "Admin Panel", icon: RiShieldUserLine },
];

const navCommands = [
  ...navItems.map((item) => ({
    label: `Go to ${item.label}`,
    icon: item.icon,
  })),
  ...workspaces.map((ws) => ({ label: `Open ${ws.label}`, icon: ws.icon })),
];

const actionCommands = [
  { label: "Invite a teammate", icon: RiUser3Line },
  { label: "View notifications", icon: RiNotification3Line },
];

const stats = [
  { label: "Total revenue", value: "$48,240", delta: "+12.5%", positive: true },
  { label: "Active users", value: "8,941", delta: "+4.3%", positive: true },
  { label: "Conversion", value: "3.24%", delta: "-0.8%", positive: false },
];

const currentUserDefault = {
  name: "Alex Morton",
  initials: "AM",
  email: "alex@acme.com",
  avatar: "https://i.pravatar.cc/150?img=12",
};

const activity = [
  {
    id: 1,
    user: "Sofia Reyes",
    initials: "SR",
    avatar: "https://i.pravatar.cc/150?img=45",
    action: "Closed issue",
    target: "Payment gateway timeout",
    time: "2 Min Ago",
    icon: RiCheckboxCircleLine,
  },
  {
    id: 2,
    user: "James Okafor",
    initials: "JO",
    avatar: "https://i.pravatar.cc/150?img=33",
    action: "Updated report",
    target: "Q2 Revenue Summary",
    time: "18 Min Ago",
    icon: RiFileTextLine,
  },
  {
    id: 3,
    user: "Mia Chen",
    initials: "MC",
    avatar: "https://i.pravatar.cc/150?img=20",
    action: "Scheduled review",
    target: "Infrastructure audit",
    time: "1 Hour Ago",
    icon: RiTimeLine,
  },
  {
    id: 4,
    user: "Daniel Park",
    initials: "DP",
    avatar: "https://i.pravatar.cc/150?img=53",
    action: "Closed issue",
    target: "Dashboard cache miss",
    time: "3 Hours Ago",
    icon: RiCheckboxCircleLine,
  },
];

const projects = [
  { name: "Horizon Rebrand", progress: 72, status: "On Track" },
  { name: "API v3 Migration", progress: 38, status: "At Risk" },
  { name: "Mobile App Launch", progress: 91, status: "On Track" },
];

const initialNotifications = [
  {
    id: 1,
    icon: RiChat3Line,
    title: "Sofia Reyes commented on Payment gateway timeout",
    time: "2 Min Ago",
    unread: true,
  },
  {
    id: 2,
    icon: RiCheckboxCircleLine,
    title: "Deploy to production succeeded",
    time: "1 Hour Ago",
    unread: true,
  },
  {
    id: 3,
    icon: RiErrorWarningLine,
    title: "API v3 Migration was flagged at risk",
    time: "3 Hours Ago",
    unread: false,
  },
];

function NotificationsMenu() {
  const [items, setItems] = React.useState(initialNotifications);
  const unread = items.filter((n) => n.unread).length;

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));

  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="outline" size="icon" className="relative" />}
        aria-label="Notifications"
      >
        <RiNotification3Line aria-hidden="true" />
        {unread > 0 && (
          <span
            className="absolute top-1 right-1 size-1.5 bg-primary"
            aria-hidden="true"
          />
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[320px] gap-0 p-0"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight">
              Notifications
            </span>
            {unread > 0 && (
              <Badge
                variant="secondary"
                className="h-5 px-1.5 text-[10px] font-medium"
              >
                {unread} New
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="xs"
            className="text-xs text-muted-foreground hover:text-foreground"
            onClick={markAllRead}
            disabled={unread === 0}
          >
            Mark all read
          </Button>
        </div>

        <Separator />

        <ul className="flex flex-col">
          {items.map((item, index) => (
            <li key={item.id}>
              <div
                className={[
                  "flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/40",
                  item.unread ? "bg-muted/30" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center bg-muted text-muted-foreground">
                  <item.icon className="size-3.5" aria-hidden="true" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p
                    className={[
                      "text-xs leading-snug",
                      item.unread
                        ? "font-medium text-foreground"
                        : "text-foreground/80",
                    ].join(" ")}
                  >
                    {item.title}
                  </p>
                  <span className="text-[10px] text-muted-foreground tabular-nums">
                    {item.time}
                  </span>
                </div>
                {item.unread && (
                  <span
                    className="mt-1 size-1.5 shrink-0 bg-primary"
                    aria-label="Unread"
                  />
                )}
              </div>
              {index < items.length - 1 && <Separator />}
            </li>
          ))}
        </ul>

        <Separator />

        <div className="px-4 py-2.5 text-center">
          <Button
            variant="link"
            size="sm"
            className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
            render={<a href="#" />}
            nativeButton={false}
          >
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface User {
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
}

function UserMenu({
  trigger,
  align = "start",
  user,
  onSignOut,
}: {
  trigger: ReactElement;
  align?: "start" | "end";
  user?: User;
  onSignOut?: () => void;
}) {
  const userDisplayName = user?.name || currentUserDefault.name;
  const userEmail = user?.email || currentUserDefault.email;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={trigger} />
      <DropdownMenuContent align={align} className="w-44">
        <div className="flex flex-col gap-0.5 px-2 py-1.5">
          <p className="truncate text-xs font-semibold text-foreground">
            {userDisplayName}
          </p>
          <p className="truncate text-[10px] text-muted-foreground">
            {userEmail}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <RiUser3Line aria-hidden="true" />
          Account
        </DropdownMenuItem>
        <DropdownMenuItem>
          <RiSettings3Line aria-hidden="true" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={onSignOut}>
          <RiLogoutBoxRLine aria-hidden="true" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function AppShellBlock({
  children,
  user,
  onSignOut,
  onNavigate,
}: {
  children?: React.ReactNode;
  user?: User;
  onSignOut?: () => void;
  onNavigate?: (href: string) => void;
}) {
  const [commandOpen, setCommandOpen] = React.useState(false);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const userDisplayName = user?.name || currentUserDefault.name;
  const userEmail = user?.email || currentUserDefault.email;
  const userAvatar = user?.avatar || currentUserDefault.avatar;
  const userInitials =
    userDisplayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || currentUserDefault.initials;

  const userFirstName = userDisplayName.split(" ")[0];
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <SidebarProvider defaultOpen className="min-h-svh">
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex h-10 items-center gap-2.5 px-2">
            <div className="grid grid-cols-2 gap-0.5" aria-hidden="true">
              <div className="size-2 bg-primary" />
              <div className="size-2 bg-primary" />
              <div className="size-2 bg-primary" />
              <div className="size-2 bg-primary" />
            </div>
            <span className="font-bold tracking-tight group-data-[collapsible=icon]:hidden">
              Acme
            </span>
            <Badge
              variant="secondary"
              className="ml-auto px-1.5 py-0 text-[10px] font-medium group-data-[collapsible=icon]:hidden"
            >
              Pro
            </Badge>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => {
                  const isActive =
                    item.href === currentPath ||
                    (item.href === "/dashboard" && currentPath === "/");
                  return (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={item.label}
                        render={
                          <a
                            href={item.href}
                            onClick={(e) => {
                              if (item.href.startsWith("/") && onNavigate) {
                                e.preventDefault();
                                onNavigate(item.href);
                              }
                            }}
                          />
                        }
                      >
                        <item.icon aria-hidden="true" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {workspaces.map((ws) => (
                  <SidebarMenuItem key={ws.label}>
                    <SidebarMenuButton
                      tooltip={ws.label}
                      render={
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        />
                      }
                    >
                      <ws.icon aria-hidden="true" />
                      <span>{ws.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="flex items-center gap-2.5 p-1">
            <Avatar className="size-7">
              <AvatarImage
                src={userAvatar}
                alt={userDisplayName}
                className="grayscale"
              />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
              <p className="truncate text-xs leading-none font-semibold">
                {userDisplayName}
              </p>
              <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                {userEmail}
              </p>
            </div>
            <UserMenu
              user={user}
              onSignOut={onSignOut}
              trigger={
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6 shrink-0 group-data-[collapsible=icon]:hidden"
                  aria-label="More options"
                >
                  <RiMoreLine className="size-3.5" aria-hidden="true" />
                </Button>
              }
            />
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b border-border px-4 sm:px-6">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Acme</span>
            <span className="text-xs text-muted-foreground/40">/</span>
            <span className="text-xs font-semibold">Dashboard</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="hidden h-8 w-56 items-center gap-2 border border-border bg-background px-3 text-xs text-muted-foreground transition-colors hover:bg-muted/50 focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:outline-none sm:inline-flex"
            >
              <RiSearchLine className="size-4 shrink-0" aria-hidden="true" />
              <span className="flex-1 text-left">Search…</span>
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </button>
            <NotificationsMenu />
            <UserMenu
              align="end"
              user={user}
              onSignOut={onSignOut}
              trigger={
                <button
                  type="button"
                  className="cursor-pointer rounded-none outline-none focus-visible:ring-1 focus-visible:ring-ring/50"
                  aria-label="Account menu"
                >
                  <Avatar className="size-8 ring-1 ring-border ring-offset-1 ring-offset-background transition-opacity hover:opacity-80">
                    <AvatarImage
                      src={userAvatar}
                      alt={userDisplayName}
                      className="grayscale"
                    />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                </button>
              }
            />
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-6">
          {
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold tracking-tight">
                    Welcome back, {userFirstName}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Here&apos;s what&apos;s happening across your workspace
                    today.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden shrink-0 sm:flex"
                >
                  Export Report
                </Button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {stats.map((card) => (
                  <div
                    key={card.label}
                    className="border border-border bg-card p-4 transition-shadow hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-medium text-muted-foreground">
                        {card.label}
                      </p>
                      <span
                        className={`flex items-center gap-0.5 text-xs font-semibold tabular-nums ${
                          card.positive
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {card.positive ? (
                          <RiArrowUpLine
                            className="size-3"
                            aria-hidden="true"
                          />
                        ) : (
                          <RiArrowDownLine
                            className="size-3"
                            aria-hidden="true"
                          />
                        )}
                        {card.delta}
                      </span>
                    </div>
                    <p className="mt-2.5 text-2xl font-bold tracking-tight tabular-nums">
                      {card.value}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Vs. Last Month
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-5">
                <div className="border border-border bg-card lg:col-span-3">
                  <div className="flex items-center justify-between border-b border-border px-4 py-3">
                    <p className="text-sm font-semibold">Recent activity</p>
                    <Button
                      nativeButton={false}
                      variant="ghost"
                      className="h-auto px-0 py-0 text-xs text-muted-foreground hover:text-foreground"
                      render={<a href="#" />}
                    >
                      View All
                    </Button>
                  </div>
                  <ul className="divide-y divide-border">
                    {activity.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/40"
                      >
                        <Avatar className="mt-0.5 size-7 shrink-0">
                          <AvatarImage
                            src={item.avatar}
                            alt={item.user}
                            className="grayscale"
                          />
                          <AvatarFallback className="text-[10px]">
                            {item.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs">
                            <span className="font-semibold">{item.user}</span>
                            <span className="text-muted-foreground">
                              {" "}
                              {item.action}{" "}
                            </span>
                            <span className="font-medium">{item.target}</span>
                          </p>
                          <p className="mt-0.5 text-[11px] text-muted-foreground">
                            {item.time}
                          </p>
                        </div>
                        <item.icon
                          className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                          aria-hidden="true"
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-border bg-card lg:col-span-2">
                  <div className="flex items-center justify-between border-b border-border px-4 py-3">
                    <p className="text-sm font-semibold">Active projects</p>
                    <Button
                      nativeButton={false}
                      variant="ghost"
                      className="h-auto px-0 py-0 text-xs text-muted-foreground hover:text-foreground"
                      render={<a href="#" />}
                    >
                      View All
                    </Button>
                  </div>
                  <ul className="divide-y divide-border">
                    {projects.map((project) => {
                      const atRisk = project.status !== "On Track";
                      return (
                        <li
                          key={project.name}
                          className="px-4 py-3.5 transition-colors hover:bg-muted/40"
                        >
                          <Progress value={project.progress} className="gap-2">
                            <div className="flex w-full items-center justify-between gap-2">
                              <ProgressLabel className="truncate text-xs font-semibold text-foreground">
                                {project.name}
                              </ProgressLabel>
                              {atRisk ? (
                                <Badge
                                  variant="outline"
                                  className="shrink-0 text-[10px] text-muted-foreground"
                                >
                                  {project.status}
                                </Badge>
                              ) : (
                                <Badge
                                  variant="secondary"
                                  className="shrink-0 text-[10px]"
                                >
                                  {project.status}
                                </Badge>
                              )}
                              <ProgressValue className="ml-0 w-8 shrink-0 text-right text-[11px]" />
                            </div>
                          </Progress>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </>
          }
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
