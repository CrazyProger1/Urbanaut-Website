"use client";

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Calendar,
  Home,
  Search,
  Settings,
  Map,
  CircleDollarSign,
  Newspaper,
  Send,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import React from "react";
import Image from "next/image";
import { Link } from "@/i18n";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  User,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PAGES } from "@/config";
import { FaInstagram, FaTelegram, FaTiktok, FaYoutube } from "react-icons/fa";


export function NavUser(
  {
    user,
  }: {
    user: {
      name: string
      email: string
      avatar: string
    }
  }) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="?auth=true">
                <DropdownMenuItem>
                  <User />
                  Login (Temporary)
                </DropdownMenuItem>
              </Link>
              <Link href={PAGES.PROFILE}>
              <DropdownMenuItem>
                <User />
                Profile
              </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Map",
    url: PAGES.MAP,
    icon: Map,
  },
  {
    title: "Blog",
    url: "#",
    icon: Newspaper,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
];
const socialNetworks = [
  {
    title: "YouTube",
    url: "https://www.youtube.com/@UrbanautOfficial",
    icon: FaYoutube,
  },
  {
    title: "Instagram",
    url: "https://www.instagram.com/urbanautofficial/",
    icon: FaInstagram,
  },
  {
    title: "Telegram",
    url: "https://t.me/urbanautofficial",
    icon: FaTelegram,
  },
  {
    title: "TikTok",
    url: "#",
    icon: FaTiktok,
    disabled: true,
  },
];

const support = [
  {
    title: "Donate",
    url: "#",
    icon: CircleDollarSign,
    disabled: true,
  },
  {
    title: "Feedback",
    url: "#",
    icon: Send,
    disabled: true,
  },
];

export const Sidebar = () => {
  const sidebar = useSidebar();
  return (
    <ShadcnSidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <Link className="flex flex-row items-center gap-4" href="/">
            <Image
              className="cursor-pointer"
              src="/web-app-manifest-192x192.png"
              alt="logo"
              width="64"
              height="64"
            />
            {sidebar.open && <div className="font-extrabold text-2xl">
              Urbanaut
            </div>}
          </Link>

        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            Platforms
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {socialNetworks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild disabled={item.disabled}>
                    <Link href={item.url} target="_blank">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            Support Us
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {support.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild disabled={item.disabled}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: "Urbanaut", email: "urbanautdev@gmail.com", avatar: "/web-app-manifest-192x192.png" }} />
      </SidebarFooter>
    </ShadcnSidebar>
  );
};
