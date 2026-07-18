import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/ui/button";
import { CopyToast } from "./CopyToast";

const meta = {
  title: "Common/Toasts/CopyToast",
  component: CopyToast,
  tags: ["autodocs", "ai-generated"],
  args: {
    clipboard: "50.4501, 30.5234",
    children: <Button variant="outline">Copy coordinates</Button>,
  },
} satisfies Meta<typeof CopyToast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
