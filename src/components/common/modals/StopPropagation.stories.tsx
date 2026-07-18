import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StopPropagation } from "./StopPropagation";

const meta = {
  title: "Common/Modals/StopPropagation",
  component: StopPropagation,
  tags: ["autodocs", "ai-generated"],
  args: {
    children: <p className="text-sm">Clicks inside this box do not bubble up.</p>,
    className: "rounded-md border p-4",
  },
} satisfies Meta<typeof StopPropagation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
