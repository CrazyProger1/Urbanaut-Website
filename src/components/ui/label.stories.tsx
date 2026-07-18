import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Label } from "./label";

const meta = {
  title: "Shadcn/Label",
  component: Label,
  tags: ["autodocs", "ai-generated"],
  args: {
    children: "Place name",
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
