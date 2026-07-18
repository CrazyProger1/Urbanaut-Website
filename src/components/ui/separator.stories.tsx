import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Separator } from "./separator";

const meta = {
  title: "Shadcn/Separator",
  component: Separator,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <p className="text-sm">Abandoned places</p>
      <Separator className="my-3" />
      <p className="text-sm text-muted-foreground">1,240 explored</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-6 items-center gap-3 text-sm">
      <span>Places</span>
      <Separator orientation="vertical" />
      <span>Areas</span>
      <Separator orientation="vertical" />
      <span>Teams</span>
    </div>
  ),
};
