import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Motion } from "./Motion";

const meta = {
  title: "Lib/Motion",
  component: Motion,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Motion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FadeIn: Story = {
  args: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    children: <div className="rounded-md border p-6 text-sm">Animated content</div>,
  },
};
