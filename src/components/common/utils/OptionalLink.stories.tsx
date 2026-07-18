import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OptionalLink } from "./OptionalLink";

const meta = {
  title: "Common/Utils/OptionalLink",
  component: OptionalLink,
  tags: ["autodocs", "ai-generated"],
  args: {
    children: <span className="text-sm">Abandoned Factory</span>,
    className: "underline underline-offset-4",
  },
} satisfies Meta<typeof OptionalLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithHref: Story = {
  args: { href: "/places/abandoned-factory" },
};

export const WithoutHref: Story = {};
