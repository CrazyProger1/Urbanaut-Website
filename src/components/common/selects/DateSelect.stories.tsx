import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { DateSelect } from "./DateSelect";

const meta = {
  title: "Common/Selects/DateSelect",
  component: DateSelect,
  tags: ["autodocs", "ai-generated"],
  args: {
    label: "Visited on",
    placeholder: "Pick a date",
    onChange: fn(),
  },
} satisfies Meta<typeof DateSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-64">
      <DateSelect {...args} />
    </div>
  ),
};

export const WithValue: Story = {
  args: { value: new Date(2026, 6, 18) },
  render: (args) => (
    <div className="w-64">
      <DateSelect {...args} />
    </div>
  ),
};
