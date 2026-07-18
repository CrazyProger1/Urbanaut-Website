import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { StopPropagation } from "./StopPropagation";
import { ModalPortal } from "./ModalPortal";

const meta = {
  title: "Common/Modals/ModalPortal",
  component: ModalPortal,
  tags: ["autodocs", "ai-generated"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ModalPortal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Visible: Story = {
  args: {
    visible: true,
    onClose: fn(),
    children: (
      <StopPropagation className="bg-card w-80 rounded-lg border p-6">
        <p className="text-sm">Modal content rendered through the portal.</p>
      </StopPropagation>
    ),
  },
  render: (args) => (
    <div className="h-96">
      <ModalPortal {...args} />
    </div>
  ),
};
