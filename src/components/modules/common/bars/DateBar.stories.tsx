import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DateBar } from "./DateBar";

const meta = {
  title: "Modules/Common/Bars/DateBar",
  component: DateBar,
  tags: ["autodocs", "ai-generated"],
  args: {
    date: new Date(2026, 6, 18),
    label: "Explored on",
  },
} satisfies Meta<typeof DateBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
