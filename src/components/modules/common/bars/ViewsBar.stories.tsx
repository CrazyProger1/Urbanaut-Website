import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ViewsBar } from "./ViewsBar";

const meta = {
  title: "Modules/Common/Bars/ViewsBar",
  component: ViewsBar,
  tags: ["autodocs", "ai-generated"],
  args: {
    views: 970,
  },
} satisfies Meta<typeof ViewsBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
