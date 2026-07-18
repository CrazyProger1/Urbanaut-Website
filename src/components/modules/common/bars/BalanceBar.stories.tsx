import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BalanceBar } from "./BalanceBar";

const meta = {
  title: "Modules/Common/Bars/BalanceBar",
  component: BalanceBar,
  tags: ["autodocs", "ai-generated"],
  args: {
    balance: 1250,
  },
} satisfies Meta<typeof BalanceBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
