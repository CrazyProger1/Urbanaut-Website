import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { SearchableSelect } from "./SearchableSelect";

const meta = {
  title: "Common/Selects/SearchableSelect",
  component: SearchableSelect,
  tags: ["autodocs", "ai-generated"],
  args: {
    options: ["Kyiv", "Lviv", "Odesa", "Kharkiv", "Dnipro"],
    selectText: "Select city",
    searchPlaceholder: "Search city...",
    notFoundText: "No city found",
    onChange: fn(),
    onSearch: fn(),
  },
} satisfies Meta<typeof SearchableSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-64">
      <SearchableSelect {...args} />
    </div>
  ),
};

export const WithValue: Story = {
  args: { value: "Kyiv" },
  render: (args) => (
    <div className="w-64">
      <SearchableSelect {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div className="w-64">
      <SearchableSelect {...args} />
    </div>
  ),
};
