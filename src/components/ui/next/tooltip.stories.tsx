import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/ui/button";
import { Tooltip } from "./tooltip";

const meta = {
  title: "UI/Next/Tooltip",
  component: Tooltip,
  tags: ["autodocs", "ai-generated"],
  args: {
    content: "Show place details",
    asChild: true,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outline">Hover me</Button>
    </Tooltip>
  ),
};
