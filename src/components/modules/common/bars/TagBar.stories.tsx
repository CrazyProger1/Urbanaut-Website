import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TagBar } from "./TagBar";

const meta = {
  title: "Modules/Common/Bars/TagBar",
  component: TagBar,
  tags: ["autodocs", "ai-generated"],
  args: {
    tag: "factory",
  },
} satisfies Meta<typeof TagBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
