import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { LanguageTabs } from "./LanguageTabs";

const meta = {
  title: "Modules/Common/Selects/LanguageTabs",
  component: LanguageTabs,
  tags: ["autodocs", "ai-generated"],
  args: {
    languages: ["en", "uk", "ru"],
    onChange: fn(),
    content: {
      en: <p className="text-sm text-muted-foreground">English content</p>,
      uk: <p className="text-sm text-muted-foreground">Український вміст</p>,
      ru: <p className="text-sm text-muted-foreground">Русский контент</p>,
    },
  },
} satisfies Meta<typeof LanguageTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
