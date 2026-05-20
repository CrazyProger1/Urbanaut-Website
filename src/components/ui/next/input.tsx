"use client";

import React, { useEffect, useState } from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n";

type Props = { query?: string } & React.ComponentProps<"input">;

export const Input = ({ query, ...props }: Props) => {
  const [value, setValue] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!query) {
      return;
    }

    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(query, value);
    } else {
      params.delete(query);
    }

    router.push(`${pathname}?${params}`, { scroll: false });
  }, [value]);

  return (
    <>
      <ShadcnInput
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        {...props}
      />
    </>
  );
};
