import { PLACEHOLDERS } from "@/config";
import { Tooltip } from "@/components/ui/next/tooltip";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

type Props = {
  balance: number;
};

const GasMaskIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 10a8 8 0 0 1 16 0v3c0 4-3 7-6 7h-4c-3 0-6-3-6-7z" />
    <path d="M5 8q7-3 14 0" />
    <circle cx="8.5" cy="10.5" r="1.75" />
    <circle cx="15.5" cy="10.5" r="1.75" />
    <circle cx="12" cy="16" r="1.75" />
    <rect x="1" y="14" width="3" height="5" rx="0.5" transform="rotate(-40 4 16.5)" />
    <rect x="20" y="14" width="3" height="5" rx="0.5" transform="rotate(40 20 16.5)" />
  </svg>
);

export const BalanceBar = async ({ balance }: Props) => {
  const t = await getTranslations("Modules");
  return (
    <Tooltip content={t(PLACEHOLDERS.TOOLTIP_BALANCE)} asChild>
      <Button variant="ghost" className="hover:bg-accent relative transition-colors" asChild>
        <div className="text-foreground flex h-9 items-center gap-1.5 rounded-md px-1.5 text-sm font-medium select-none">
          <GasMaskIcon className="text-primary h-5 w-5" />
          <span className="tabular-nums">{balance}</span>
        </div>
      </Button>
    </Tooltip>
  );
};
