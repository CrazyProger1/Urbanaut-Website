import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { APIPreservationLevel } from "@/types";
import { PreservationBar } from "./PreservationBar";

const preservationLevels: APIPreservationLevel[] = ["NONE", "LOW", "MEDIUM", "HIGH", "AWESOME"];

const meta = {
  title: "Modules/Common/Bars/PreservationBar",
  component: PreservationBar,
  tags: ["autodocs", "ai-generated"],
  args: {
    preservation: { level: "HIGH" },
  },
} satisfies Meta<typeof PreservationBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllLevels: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {preservationLevels.map((level) => (
        <PreservationBar key={level} preservation={{ level }} />
      ))}
    </div>
  ),
};
