import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const meta = {
  title: "Shadcn/Popover",
  component: Popover,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="grid gap-3">
          <p className="text-sm font-medium">Rename place</p>
          <div className="grid gap-2">
            <Label htmlFor="rename">Name</Label>
            <Input id="rename" defaultValue="Abandoned Factory" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Open: Story = {
  render: () => (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <p className="text-sm">Popover content</p>
      </PopoverContent>
    </Popover>
  ),
};
