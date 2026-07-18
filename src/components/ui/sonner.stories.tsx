import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { toast } from "sonner";
import { Button } from "./button";
import { Toaster } from "./sonner";

const meta = {
  title: "Shadcn/Sonner",
  component: Toaster,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toaster />
      <Button variant="outline" onClick={() => toast.success("Place saved")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error("Failed to save place")}>
        Error
      </Button>
      <Button variant="outline" onClick={() => toast.info("Expedition starts soon")}>
        Info
      </Button>
    </div>
  ),
};
