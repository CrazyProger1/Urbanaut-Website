import { cn } from "@/lib/utils";

export type BaseColor = "red" | "green" | "yellow" | "blue" | "purple" | "white";

export type BaseColorVariant =
  | "bg"
  | "hover"
  | "border"
  | "icon"
  | "solid"
  | "solid-hover"
  | "shadow";

const COLOR_VARIANTS: Record<BaseColor, Record<BaseColorVariant, string>> = {
  red: {
    bg: "bg-red-bg!",
    hover: "hover:bg-red-hover!",
    border: "border-red-border!",
    icon: "text-red-icon",
    solid: "bg-red-solid!",
    "solid-hover": "hover:bg-red-solid-hover!",
    shadow: "drop-shadow-red-shadow",
  },
  green: {
    bg: "bg-green-bg!",
    hover: "hover:bg-green-hover!",
    border: "border-green-border!",
    icon: "text-green-icon",
    solid: "bg-green-solid!",
    "solid-hover": "hover:bg-green-solid-hover!",
    shadow: "drop-shadow-green-shadow",
  },
  yellow: {
    bg: "bg-yellow-bg!",
    hover: "hover:bg-yellow-hover!",
    border: "border-yellow-border!",
    icon: "text-yellow-icon",
    solid: "bg-yellow-solid!",
    "solid-hover": "hover:bg-yellow-solid-hover!",
    shadow: "drop-shadow-yellow-shadow",
  },
  blue: {
    bg: "bg-blue-bg!",
    hover: "hover:bg-blue-hover!",
    border: "border-blue-border!",
    icon: "text-blue-icon",
    solid: "bg-blue-solid!",
    "solid-hover": "hover:bg-blue-solid-hover!",
    shadow: "drop-shadow-blue-shadow",
  },
  purple: {
    bg: "bg-purple-bg!",
    hover: "hover:bg-purple-hover!",
    border: "border-purple-border!",
    icon: "text-purple-icon",
    solid: "bg-purple-solid!",
    "solid-hover": "hover:bg-purple-solid-hover!",
    shadow: "drop-shadow-purple-shadow",
  },
  white: {
    bg: "bg-white-bg!",
    hover: "hover:bg-white-hover!",
    border: "border-white-border!",
    icon: "text-white-icon",
    solid: "bg-white-solid!",
    "solid-hover": "hover:bg-white-solid-hover!",
    shadow: "drop-shadow-white-shadow",
  },
};

export const getColorVariant = (color: BaseColor, variant: BaseColorVariant) =>
  COLOR_VARIANTS[color][variant];

export const getCardClass = (color: BaseColor) =>
  cn(
    getColorVariant(color, "bg"),
    getColorVariant(color, "border"),
    getColorVariant(color, "hover"),
  );

export const getBadgeClass = (color: BaseColor) =>
  cn(
    getColorVariant(color, "solid"),
    getColorVariant(color, "border"),
    "text-foreground",
    getColorVariant(color, "solid-hover"),
  );

export const getIconClass = (color: BaseColor) => getColorVariant(color, "icon");

export const getShadowClass = (color: BaseColor) => getColorVariant(color, "shadow");
