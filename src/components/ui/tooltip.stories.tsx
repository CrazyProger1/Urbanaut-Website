import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

const meta = {
  title: "Shadcn/Tooltip",
  component: Tooltip,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Show place details</TooltipContent>
    </Tooltip>
  ),
};

export const Open: Story = {
  render: () => (
    <Tooltip open>
      <TooltipTrigger asChild>
        <Button variant="outline">Always visible</Button>
      </TooltipTrigger>
      <TooltipContent>Show place details</TooltipContent>
    </Tooltip>
  ),
};
