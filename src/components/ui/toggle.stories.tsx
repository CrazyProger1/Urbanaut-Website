import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Bold } from "lucide-react";
import { fn } from "storybook/test";
import { Toggle } from "./toggle";

const meta = {
  title: "Shadcn/Toggle",
  component: Toggle,
  tags: ["autodocs", "ai-generated"],
  args: {
    children: "Toggle",
    onPressedChange: fn(),
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Pressed: Story = {
  args: { defaultPressed: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithIcon: Story = {
  args: { children: <Bold />, "aria-label": "Toggle bold" },
};
