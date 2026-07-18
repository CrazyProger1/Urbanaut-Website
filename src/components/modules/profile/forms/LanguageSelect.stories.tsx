import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { LanguageSelect } from "./LanguageSelect";

const meta = {
  title: "Modules/Profile/Forms/LanguageSelect",
  component: LanguageSelect,
  tags: ["autodocs", "ai-generated"],
  args: {
    languages: ["en", "uk", "ru"],
    value: "en",
    onChange: fn(),
  },
} satisfies Meta<typeof LanguageSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-64">
      <LanguageSelect {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div className="w-64">
      <LanguageSelect {...args} />
    </div>
  ),
};
