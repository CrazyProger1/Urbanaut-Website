import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TimelineSection } from "./TimelineSection";

const meta = {
  title: "Modules/Map/Sheets/TimelineSection",
  component: TimelineSection,
  tags: ["autodocs", "ai-generated"],
  args: {
    builtAt: new Date(1954, 2, 1),
    abandonedAt: new Date(1998, 9, 15),
    createdAt: new Date(2026, 5, 2),
  },
} satisfies Meta<typeof TimelineSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <TimelineSection {...args} />
    </div>
  ),
};
