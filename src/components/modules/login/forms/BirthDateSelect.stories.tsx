import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { BirthDateSelect } from "./BirthDateSelect";

const meta = {
  title: "Modules/Login/Forms/BirthDateSelect",
  component: BirthDateSelect,
  tags: ["autodocs", "ai-generated"],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof BirthDateSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-64">
      <BirthDateSelect {...args} />
    </div>
  ),
};

export const WithValue: Story = {
  args: { value: new Date(2000, 4, 12) },
  render: (args) => (
    <div className="w-64">
      <BirthDateSelect {...args} />
    </div>
  ),
};
