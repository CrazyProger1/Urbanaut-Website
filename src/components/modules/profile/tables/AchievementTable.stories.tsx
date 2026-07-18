import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { UserDetail } from "@/types";
import { AchievementTable } from "./AchievementTable";

const user: UserDetail = {
  id: "user-1",
  usernames: ["stalker"],
  first_name: "Oleh",
  settings: { language: "en" },
  metrics: [],
  created_at: "2024-03-01T00:00:00Z",
  achievements: [
    {
      id: 1,
      name: "First Steps",
      weight: 10,
      icon: "footprints",
      significance: "INITIATION",
      slug: "first-steps",
      karma: 5,
      experience: 100,
      money: 0,
    },
    {
      id: 2,
      name: "Pathfinder",
      weight: 30,
      icon: "compass",
      significance: "GROWTH",
      slug: "pathfinder",
      karma: 15,
      experience: 400,
      money: 0,
    },
    {
      id: 3,
      name: "Urban Legend",
      weight: 90,
      icon: "crown",
      significance: "TRANSCENDENCE",
      slug: "urban-legend",
      karma: 100,
      experience: 5000,
      money: 10,
    },
  ],
};

const meta = {
  title: "Modules/Profile/Tables/AchievementTable",
  component: AchievementTable,
  tags: ["autodocs", "ai-generated"],
  args: {
    user,
  },
} satisfies Meta<typeof AchievementTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
