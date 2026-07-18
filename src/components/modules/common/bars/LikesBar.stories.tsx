import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LikesBar } from "./LikesBar";

const meta = {
  title: "Modules/Common/Bars/LikesBar",
  component: LikesBar,
  tags: ["autodocs", "ai-generated"],
  args: {
    likes: 128,
  },
} satisfies Meta<typeof LikesBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
