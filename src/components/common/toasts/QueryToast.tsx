"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

type Props = {
  query: string;
  content: React.ReactNode;
  onClose?: () => void;
};

export const QueryToast = ({ query, content, onClose }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [actualVisible, setActualVisible] = useState<boolean>(false);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (query) {
      setActualVisible(searchParams.get(query) === "true");
    } else {
      setActualVisible(false);
    }
  }, [query, searchParams]);

  useEffect(() => {
    const handleClose = () => {
      const params = new URLSearchParams(searchParams);
      params.delete(query);
      router.push(`${pathname}?${params}`);
      onClose?.();
      setIsShown(false);
    };

    if (actualVisible && !isShown) {
      setIsShown(true);
      toast.success(content, { onAutoClose: handleClose, onDismiss: handleClose });
    }
    return () => {
      setIsShown(false);
    };
  }, [actualVisible]);

  return <></>;
};
