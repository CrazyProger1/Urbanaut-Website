import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Mobile } from "./Mobile";

const meta = {
  title: "Common/Utils/Mobile",
  component: Mobile,
  tags: ["autodocs", "ai-generated"],
  args: {
    children: <p className="rounded-md border p-4 text-sm">Visible only on mobile viewports.</p>,
  },
} satisfies Meta<typeof Mobile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  globals: {
    viewport: { value: "mobile1" },
  },
};
