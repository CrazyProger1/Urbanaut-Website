import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/ui/button";
import { TeamCard } from "./TeamCard";

const meta = {
  title: "Modules/Common/Cards/TeamCard",
  component: TeamCard,
  tags: ["autodocs", "ai-generated"],
  args: {
    team: {
      id: "team-1",
      name: "Night Stalkers",
      motto: "Into the dark",
      members_count: 12,
    },
  },
} satisfies Meta<typeof TeamCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-96">
      <TeamCard {...args} />
    </div>
  ),
};

export const WithScoreAndAction: Story = {
  args: {
    score: 3,
    action: (
      <Button size="sm" variant="outline">
        Join
      </Button>
    ),
  },
  render: (args) => (
    <div className="w-96">
      <TeamCard {...args} />
    </div>
  ),
};
