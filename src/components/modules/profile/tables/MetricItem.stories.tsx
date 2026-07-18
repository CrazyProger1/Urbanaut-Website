import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MetricItem } from "./MetricItem";

const meta = {
  title: "Modules/Profile/Tables/MetricItem",
  component: MetricItem,
  tags: ["autodocs", "ai-generated"],
  args: {
    value: 128,
    label: "places",
    tooltip: "Places explored",
  },
} satisfies Meta<typeof MetricItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AsLink: Story = {
  args: { href: "/map" },
};
