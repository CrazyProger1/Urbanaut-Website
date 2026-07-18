import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MoonIcon } from "lucide-react";
import { fn } from "storybook/test";
import { SwitchToggle } from "./SwitchToggle";

const meta = {
  title: "Common/Toggles/SwitchToggle",
  component: SwitchToggle,
  tags: ["autodocs", "ai-generated"],
  args: {
    title: "Dark theme",
    description: "Use the dark color scheme",
    icon: <MoonIcon className="size-5" />,
    onCheckedChange: fn(),
  },
} satisfies Meta<typeof SwitchToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <SwitchToggle {...args} />
    </div>
  ),
};

export const Checked: Story = {
  args: { defaultChecked: true },
  render: (args) => (
    <div className="w-80">
      <SwitchToggle {...args} />
    </div>
  ),
};
