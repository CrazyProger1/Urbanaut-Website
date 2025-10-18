"use client";

import React, { useEffect, useState } from "react";
import { toast, ToastContent, ToastOptions } from "react-toastify";
import { usePathname, useRouter } from "@/i18n";
import { useSearchParams } from "next/navigation";

type Props<TData = unknown> = {
  query: string,
  content: ToastContent<TData>,
  options?: ToastOptions<TData>,
}

export const QueryToast = ({ query, content, options }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (searchParams.get(query) && !isShown) {
      setIsShown(true);
      toast(content, {
        ...options, onClose: () => {
          const params = new URLSearchParams(searchParams);
          params.delete(query);
          router.push(`${pathname}?${params}`);
          setIsShown(false);
        },
      });
    }
    return () => {
      setIsShown(false);
    };
  }, [query, searchParams]);

  return <></>;
};

