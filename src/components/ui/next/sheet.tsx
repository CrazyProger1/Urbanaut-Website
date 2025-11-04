"use client";

import { Sheet as ShadcnSheet } from "@/components/ui/sheet";
import { useRouter, usePathname } from "@/i18n";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Props = {
  open?: boolean;
  query?: string;
  children?: React.ReactNode;
};

export const Sheet = ({ open, query, children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const close = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    if (query && open) {
      params.delete(query);
    }
    const url = `${pathname}?${params}`;
    router.push(url, { scroll: false });
  }, [searchParams, pathname, open]);

  return (
    <ShadcnSheet open={open} onOpenChange={close}>
      {children}
    </ShadcnSheet>
  );
};
