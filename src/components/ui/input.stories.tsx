import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./input";
import { Label } from "./label";

const meta = {
  title: "Shadcn/Input",
  component: Input,
  tags: ["autodocs", "ai-generated"],
  args: {
    placeholder: "Search places...",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "invalid value" },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="place-name">Place name</Label>
      <Input id="place-name" placeholder="Abandoned Factory" />
    </div>
  ),
};
