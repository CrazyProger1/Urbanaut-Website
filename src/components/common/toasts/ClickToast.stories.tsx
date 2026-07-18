import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/ui/button";
import { ClickToast } from "./ClickToast";

const meta = {
  title: "Common/Toasts/ClickToast",
  component: ClickToast,
  tags: ["autodocs", "ai-generated"],
  args: {
    message: "Marked as visited!",
    children: <Button variant="outline">Mark visited</Button>,
  },
} satisfies Meta<typeof ClickToast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
