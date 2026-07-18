import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MapIcon } from "lucide-react";
import { SidebarButton } from "./SidebarButton";

const meta = {
  title: "Common/Buttons/SidebarButton",
  component: SidebarButton,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof SidebarButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <MapIcon className="size-4" />
        <span>Open map</span>
      </>
    ),

    asChild: false,
  },
};
