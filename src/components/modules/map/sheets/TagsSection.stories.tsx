import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TagsSection } from "./TagsSection";

const meta = {
  title: "Modules/Map/Sheets/TagsSection",
  component: TagsSection,
  tags: ["autodocs", "ai-generated"],
  args: {
    tags: ["factory", "underground", "soviet"],
    preservation: { level: "HIGH" },
    isSupposed: true,
    isPrivate: true,
    hasSecurity: true,
  },
} satisfies Meta<typeof TagsSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-96">
      <TagsSection {...args} />
    </div>
  ),
};

export const TagsOnly: Story = {
  args: {
    preservation: undefined,
    isSupposed: false,
    isPrivate: false,
    hasSecurity: false,
  },
  render: (args) => (
    <div className="w-96">
      <TagsSection {...args} />
    </div>
  ),
};
