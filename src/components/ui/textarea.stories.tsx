import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Textarea } from "./textarea";

const meta = {
  title: "Shadcn/Textarea",
  component: Textarea,
  tags: ["autodocs", "ai-generated"],
  args: {
    placeholder: "Describe the place...",
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "invalid description" },
};
