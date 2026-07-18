import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Label } from "./label";
import { Switch } from "./switch";

const meta = {
  title: "Shadcn/Switch",
  component: Switch,
  tags: ["autodocs", "ai-generated"],
  args: {
    onCheckedChange: fn(),
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="notifications" defaultChecked />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  ),
};
