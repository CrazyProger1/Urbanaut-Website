import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DateRangeSelect } from "./DateRangeSelect";

const meta = {
  title: "Common/Selects/DateRangeSelect",
  component: DateRangeSelect,
  tags: ["autodocs", "ai-generated"],
  args: {
    label: "Expedition period",
  },
} satisfies Meta<typeof DateRangeSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <DateRangeSelect {...args} />
    </div>
  ),
};
