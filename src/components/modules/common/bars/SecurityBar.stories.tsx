import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SecurityBar } from "./SecurityBar";

const meta = {
  title: "Modules/Common/Bars/SecurityBar",
  component: SecurityBar,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof SecurityBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
