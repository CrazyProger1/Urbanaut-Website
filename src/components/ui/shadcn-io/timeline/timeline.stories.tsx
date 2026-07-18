import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FlagIcon } from "lucide-react";
import { Timeline, TimelineItem } from "./timeline";

const meta = {
  title: "Shadcn/Timeline",
  component: Timeline,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Timeline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-96">
      <Timeline>
        <TimelineItem
          date="16:30"
          title="Expedition started"
          description="Team gathered at the meeting point"
          icon={<FlagIcon />}
          status="completed"
        />
        <TimelineItem
          date="18:00"
          title="Factory reached"
          description="Exploring the main workshop"
          status="in-progress"
        />
        <TimelineItem
          date="21:00"
          title="Return"
          description="Planned way back"
          status="pending"
        />
      </Timeline>
    </div>
  ),
};
