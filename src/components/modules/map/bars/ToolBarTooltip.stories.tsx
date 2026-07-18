import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PLACEHOLDERS } from "@/config";
import { ToolBarTooltip } from "./ToolBarTooltip";

const meta = {
  title: "Modules/Map/Bars/ToolBarTooltip",
  component: ToolBarTooltip,
  tags: ["autodocs", "ai-generated"],
  args: {
    tooltip: PLACEHOLDERS.TOOLTIP_BALANCE,
  },
} satisfies Meta<typeof ToolBarTooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <ToolBarTooltip {...args} />
    </div>
  ),
};
