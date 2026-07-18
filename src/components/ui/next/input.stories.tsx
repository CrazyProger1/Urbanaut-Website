import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./input";

const meta = {
  title: "UI/Next/Input",
  component: Input,
  tags: ["autodocs", "ai-generated"],
  args: {
    query: "search",
    placeholder: "Search places...",
    className: "w-72",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
