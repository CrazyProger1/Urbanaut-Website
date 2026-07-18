import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { KarmaBar } from "./KarmaBar";

const meta = {
  title: "Modules/Common/Bars/KarmaBar",
  component: KarmaBar,
  tags: ["autodocs", "ai-generated"],
  args: {
    karma: 42,
  },
} satisfies Meta<typeof KarmaBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
