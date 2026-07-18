import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Plus } from "lucide-react";
import { expect, fn, within } from "storybook/test";
import { Button } from "./button";

const meta = {
  title: "Shadcn/Button",
  component: Button,
  tags: ["autodocs", "ai-generated"],
  args: {
    children: "Button",
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Destructive: Story = {
  args: { variant: "destructive" },
};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const Link: Story = {
  args: { variant: "link" },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const Icon: Story = {
  args: { size: "icon", children: <Plus /> },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const CssCheck: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await expect(getComputedStyle(button).borderRadius).toBe("8px");
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button>Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">
          <Plus />
        </Button>
        <Button size="icon-xs">
          <Plus />
        </Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  ),
};
