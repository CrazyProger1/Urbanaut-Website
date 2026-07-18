import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SupposedBar } from "./SupposedBar";

const meta = {
  title: "Modules/Common/Bars/SupposedBar",
  component: SupposedBar,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof SupposedBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
