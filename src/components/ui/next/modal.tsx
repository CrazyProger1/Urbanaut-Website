"use client";

import { Dialog as ShadcnDialog } from "@/components/ui/dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  visible?: boolean;
  children?: ReactNode;
  query?: string;
};

export const Modal = ({ visible = false, children, query }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [actualVisible, setActualVisible] = useState<boolean>(false);
  useEffect(() => {
    if (visible) {
      setActualVisible(visible);
    } else if (query) {
      setActualVisible(searchParams.get(query) === "true");
    } else {
      setActualVisible(false);
    }
  }, [query, visible, searchParams]);

  const handleOpenChanged = (open: boolean) => {
    if (open) return;
    if (query) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(query);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <ShadcnDialog open={actualVisible} onOpenChange={handleOpenChanged}>
      {children}
    </ShadcnDialog>
  );
};
