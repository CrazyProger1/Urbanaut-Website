import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CoordinatesBar } from "./CoordinatesBar";

const meta = {
  title: "Modules/Common/Bars/CoordinatesBar",
  component: CoordinatesBar,
  tags: ["autodocs", "ai-generated"],
  args: {
    point: [50.4501, 30.5234],
  },
} satisfies Meta<typeof CoordinatesBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
