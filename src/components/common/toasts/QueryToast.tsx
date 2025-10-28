"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "@/i18n";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

type Props = {
  query: string;
  content: React.ReactNode;
};

export const QueryToast = ({ query, content }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const handleClose = () => {
      const params = new URLSearchParams(searchParams);
      params.delete(query);
      router.push(`${pathname}?${params}`);
      setIsShown(false);
    };
    if (searchParams.get(query) && !isShown) {
      setIsShown(true);
      toast.success(content, { onAutoClose: handleClose, onDismiss: handleClose });
    }
    return () => {
      setIsShown(false);
    };
  }, [query, searchParams]);

  return <></>;
};
