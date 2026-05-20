import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n";

export type OrderingColumn = {
  name: string;
  key: string;
};

type Props = {
  defaultKey?: string;
  defaultOrdering?: "asc" | "desc";
  columns: OrderingColumn[];
  query?: string;
  descPrefix?: string;
  ascPrefix?: string;
};

export const OrderingControl = ({
  query,
  columns,
  defaultKey,
  defaultOrdering,
  descPrefix = "-",
  ascPrefix = "",
}: Props) => {
  const [isDescending, setIsDescending] = useState(defaultOrdering === "desc");
  const [order, setOrder] = useState<string | undefined>(defaultKey);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!query) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    const prefix = isDescending ? descPrefix : ascPrefix;

    if (order) {
      params.set(query, `${prefix}${order}`);
    } else {
      params.delete(query);
    }
    router.push(`${pathname}?${params}`);
  }, [isDescending, order]);

  return (
    <Tabs value={order} onValueChange={(value) => setOrder(value)}>
      <TabsList>
        {columns.map(({ name, key }) => (
          <TabsTrigger key={key} value={key}>
            {name}
          </TabsTrigger>
        ))}
        <button
          onClick={() => {
            setIsDescending((prev) => !prev);
          }}
          className="text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] items-center justify-center rounded-md border border-transparent px-2 py-1 transition-[color,box-shadow]"
        >
          {isDescending ? <ArrowDown className="size-4" /> : <ArrowUp className="size-4" />}
        </button>
      </TabsList>
    </Tabs>
  );
};
