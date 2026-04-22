import { PLACEHOLDERS } from "@/config";
import { Tooltip } from "@/components/ui/next/tooltip";
import { getTranslations } from "next-intl/server";

type Props = {
  balance: number;
};

const GasMaskIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 10a8 8 0 0 1 16 0v3c0 3-3 6-6 6h-4c-3 0-6-3-6-6z" />
    <circle cx="9" cy="9" r="1.5" />
    <circle cx="15" cy="9" r="1.5" />
    <path d="M10 19v2h4v-2" />
  </svg>
);

export const BalanceBar = async ({ balance }: Props) => {
  const t = await getTranslations("Modules");
  return (
    <Tooltip content={t(PLACEHOLDERS.TOOLTIP_BALANCE)} asChild>
      <div className="text-foreground flex h-9 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium select-none">
        <GasMaskIcon className="text-primary h-4 w-4" />
        <span className="tabular-nums">{balance}</span>
      </div>
    </Tooltip>
  );
};