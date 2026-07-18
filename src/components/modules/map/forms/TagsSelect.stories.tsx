import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { TagsSelect } from "./TagsSelect";

const meta = {
  title: "Modules/Map/Forms/TagsSelect",
  component: TagsSelect,
  tags: ["autodocs", "ai-generated"],
  args: {
    tags: ["factory", "hospital", "bunker", "village", "church"],
    selected: ["factory", "bunker"],
    onSelect: fn(),
    onRemove: fn(),
  },
} satisfies Meta<typeof TagsSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <TagsSelect {...args} />
    </div>
  ),
};
