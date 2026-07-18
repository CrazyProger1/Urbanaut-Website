import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OrderingControl } from "./OrderingControl";

const meta = {
  title: "Common/Controls/OrderingControl",
  component: OrderingControl,
  tags: ["autodocs", "ai-generated"],
  args: {
    query: "ordering",
    columns: [
      { name: "Karma", key: "karma" },
      { name: "Experience", key: "experience" },
      { name: "Views", key: "views" },
    ],
  },
} satisfies Meta<typeof OrderingControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDefaultOrdering: Story = {
  args: {
    defaultOrdering: "-karma",
  },
};
