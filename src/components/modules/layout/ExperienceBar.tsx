import { PLACEHOLDERS } from "@/config";
import { Tooltip } from "@/components/ui/next/tooltip";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

type Props = {
  experience: number;
};

export const ExperienceBar = async ({ experience }: Props) => {
  const t = await getTranslations("Modules");
  return (
    <Tooltip content={t(PLACEHOLDERS.TOOLTIP_EXPERIENCE)} asChild>
      <Button variant="ghost" className="hover:bg-accent relative transition-colors" asChild>
        <div className="text-foreground flex h-9 items-center gap-1.5 rounded-md px-1.5 text-sm font-medium select-none">
          <Zap className="text-primary h-5 w-5" />
          <span className="tabular-nums">{experience}</span>
        </div>
      </Button>
    </Tooltip>
  );
};
