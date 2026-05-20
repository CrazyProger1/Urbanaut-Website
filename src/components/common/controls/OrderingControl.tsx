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
  defaultOrdering?: string;
  columns: OrderingColumn[];
  query?: string;
};

const DESC_PREFIX = "-";

export const OrderingControl = ({ query, columns, defaultOrdering }: Props) => {
  const [isDescending, setIsDescending] = useState(false);
  const [order, setOrder] = useState<string>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!defaultOrdering) {
      return;
    }

    if (defaultOrdering.startsWith(DESC_PREFIX)) {
      setIsDescending(defaultOrdering[0] === DESC_PREFIX);
      setOrder(defaultOrdering.slice(1));
    }
  }, [defaultOrdering]);

  useEffect(() => {
    if (!query) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    const prefix = isDescending ? DESC_PREFIX : "";

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
