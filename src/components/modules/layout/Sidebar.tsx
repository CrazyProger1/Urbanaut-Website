"use client";

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
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
  Map,
  CircleDollarSign,
  Newspaper,
  Send,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import React from "react";
import Image from "next/image";
import { Link } from "@/i18n";
import { PAGES } from "@/config";
import { FaInstagram, FaTelegram, FaTiktok, FaYoutube } from "react-icons/fa";
import { SearchForm } from "./SearchForm";


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
    </ShadcnSidebar>
  );
};
