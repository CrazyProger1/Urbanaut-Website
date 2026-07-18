import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { QueryToast } from "./QueryToast";

const meta = {
  title: "Common/Toasts/QueryToast",
  component: QueryToast,
  tags: ["autodocs", "ai-generated"],
  args: {
    query: "welcome",
    content: "Welcome back, explorer!",
    onOpen: fn(),
    onClose: fn(),
  },
} satisfies Meta<typeof QueryToast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Triggered: Story = {
  parameters: {
    nextjs: {
      navigation: {
        query: { welcome: "true" },
      },
    },
  },
  render: (args) => (
    <div className="text-sm text-muted-foreground">
      <QueryToast {...args} />
      <p>Fires a toast when the welcome query parameter is true.</p>
    </div>
  ),
};
