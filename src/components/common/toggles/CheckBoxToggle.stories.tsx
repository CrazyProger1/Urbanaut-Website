import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BellIcon } from "lucide-react";
import { fn } from "storybook/test";
import { CheckBoxToggle } from "./CheckBoxToggle";

const meta = {
  title: "Common/Toggles/CheckBoxToggle",
  component: CheckBoxToggle,
  tags: ["autodocs", "ai-generated"],
  args: {
    title: "Email notifications",
    description: "Receive updates about new places",
    icon: <BellIcon className="size-5" />,
    onCheckedChange: fn(),
  },
} satisfies Meta<typeof CheckBoxToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <CheckBoxToggle {...args} />
    </div>
  ),
};

export const Checked: Story = {
  args: { defaultChecked: true },
  render: (args) => (
    <div className="w-80">
      <CheckBoxToggle {...args} />
    </div>
  ),
};
