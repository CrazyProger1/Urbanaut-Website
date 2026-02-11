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
import React from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n";
import { ALTS, IMAGES, PAGES, SIDEBAR_GROUPS } from "@/config";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslations } from "next-intl";


export const Sidebar = () => {
  const sidebar = useSidebar();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const t = useTranslations("Sidebar");

  return (
    <ShadcnSidebar collapsible="icon" className="drop-shadow-volume select-none">
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
        {/*<Separator />*/}
        {SIDEBAR_GROUPS.map((section, index) => (
          <SidebarGroup key={`${section.title}-${index}`}>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem className="cursor-pointer" key={item.title}>
                    <SidebarMenuButton
                      className={cn(item.disabled && "disabled")}
                      asChild
                      isActive={pathname === item.url}
                      tooltip={t(item.title)}
                    >
                      {item.disabled ? (
                        <div className="flex">
                          <item.icon />
                          <span>{t(item.title)}</span>
                          <Lock className="ml-auto" />
                        </div>
                      ) : (
                        <Link
                          href={item.url}
                          target={item.target}
                          onClick={() => {
                            if (isMobile) {
                              sidebar.toggleSidebar();
                            }
                          }}
                        >
                          <item.icon />
                          <span>{t(item.title)}</span>
                        </Link>
                      )}
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
