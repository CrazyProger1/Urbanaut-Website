import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { APIListTeam, User } from "@/types";
import { LeaderboardSection } from "./LeaderboardSection";

const users: User[] = [
  { id: "user-1", usernames: ["stalker"], first_name: "Oleh", last_name: "Danko", rank: "STALKER", experience: 15400, karma: 320 },
  { id: "user-2", usernames: ["rookie"], first_name: "Ivan", rank: "ROOKIE", experience: 300, karma: 12 },
  { id: "user-3", usernames: ["legend"], first_name: "Marta", last_name: "Koval", rank: "LEGEND", experience: 99000, karma: 1200 },
];

const teams: APIListTeam[] = [
  { id: "team-1", name: "Night Stalkers", motto: "Into the dark", members_count: 12 },
  { id: "team-2", name: "Rust Seekers", members_count: 5 },
];

const meta = {
  title: "Modules/Main/Sections/LeaderboardSection",
  component: LeaderboardSection,
  tags: ["autodocs", "ai-generated"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    users,
    teams,
  },
} satisfies Meta<typeof LeaderboardSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutTeams: Story = {
  args: { teams: [] },
};
