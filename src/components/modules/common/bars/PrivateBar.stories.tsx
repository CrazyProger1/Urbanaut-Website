import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PrivateBar } from "./PrivateBar";

const meta = {
  title: "Modules/Common/Bars/PrivateBar",
  component: PrivateBar,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof PrivateBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
