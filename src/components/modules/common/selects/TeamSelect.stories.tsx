import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { TeamSelect } from "./TeamSelect";

const meta = {
  title: "Modules/Common/Selects/TeamSelect",
  component: TeamSelect,
  tags: ["autodocs", "ai-generated"],
  args: {
    teams: [
      { id: "team-1", name: "Night Stalkers", motto: "Into the dark", members_count: 12 },
      { id: "team-2", name: "Rust Seekers", members_count: 5 },
      { id: "team-3", name: "Ghost Crew", motto: "Silent moves", members_count: 8 },
    ],
    onSearchTeamsAction: fn(),
    onSelectTeamAction: fn(),
  },
} satisfies Meta<typeof TeamSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-96">
      <TeamSelect {...args} />
    </div>
  ),
};
