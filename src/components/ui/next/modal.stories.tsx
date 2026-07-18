import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Modal } from "./modal";

const meta = {
  title: "UI/Next/Modal",
  component: Modal,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Visible: Story = {
  args: {
    visible: true,
  },
  render: (args) => (
    <Modal {...args}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Query-driven modal</DialogTitle>
          <DialogDescription>
            Opens when its query parameter is set to true, or when the visible prop is passed.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Modal>
  ),
};
