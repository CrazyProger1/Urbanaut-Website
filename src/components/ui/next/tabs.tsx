"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { Tabs as ShadcnTabs } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useRouter } from "@/i18n";
import { useSearchParams } from "next/navigation";

type Props = {
  query?: string;
} & React.ComponentProps<typeof TabsPrimitive.Root>;

export const Tabs = ({ children, query, ...props }: Props) => {
  const [activeTab, setActiveTab] = useState<string>();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!query) return;

    const tab = searchParams.get(query);

    if (tab) {
      setActiveTab(tab);
    } else {
      setActiveTab(undefined);
    }
  }, [searchParams]);

  return (
    <ShadcnTabs
      value={query && activeTab}
      onValueChange={(value) => {
        if (!query) return;
        const params = new URLSearchParams(searchParams);
        params.set(query, value);
        router.push(`?${params}`, { scroll: false });
      }}
      {...props}
    >
      {children}
    </ShadcnTabs>
  );
};
