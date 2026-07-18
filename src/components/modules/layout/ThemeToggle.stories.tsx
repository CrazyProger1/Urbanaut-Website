import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ThemeToggle } from "./ThemeToggle";

const meta = {
  title: "Modules/Layout/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof ThemeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
