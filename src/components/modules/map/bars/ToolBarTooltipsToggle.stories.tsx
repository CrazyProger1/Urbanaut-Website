import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ToolBarTooltipsToggle } from "./ToolBarTooltipsToggle";

const meta = {
  title: "Modules/Map/Bars/ToolBarTooltipsToggle",
  component: ToolBarTooltipsToggle,
  tags: ["autodocs", "ai-generated"],
  args: {
    value: false,
    onToggle: fn(),
  },
} satisfies Meta<typeof ToolBarTooltipsToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {};

export const Expanded: Story = {
  args: { value: true },
};
