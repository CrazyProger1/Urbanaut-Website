"use client";

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import React from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n";
import { ALTS, IMAGES, PAGES, SIDEBAR_GROUPS } from "@/config";

export const Sidebar = () => {
  const sidebar = useSidebar();
  const pathname = usePathname();

  return (
    <ShadcnSidebar collapsible="icon" className="drop-shadow-volume">
      <SidebarContent>
        <SidebarGroup>
          <Link className="flex flex-row items-center gap-4" href={PAGES.MAIN}>
            <Image
              className="cursor-pointer"
              src={IMAGES.LOGO}
              alt={ALTS.LOGO_PHOTO}
              width="64"
              height="64"
            />
            {sidebar.open && <div className="text-2xl font-extrabold">Urbanaut</div>}
          </Link>
        </SidebarGroup>
        <Separator />
        {SIDEBAR_GROUPS.map((section, index) => (
          <SidebarGroup key={`${section.title}-${index}`}>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url} target={item.target}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </ShadcnSidebar>
  );
};
