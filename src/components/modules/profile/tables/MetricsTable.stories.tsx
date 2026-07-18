import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { UserDetail } from "@/types";
import { MetricsTable } from "./MetricsTable";

const user: UserDetail = {
  id: "user-1",
  usernames: ["stalker"],
  first_name: "Oleh",
  settings: { language: "en" },
  achievements: [],
  metrics: [
    { key: "friends", value: 14 },
    { key: "teams", value: 2 },
    { key: "referrals", value: 5 },
  ],
  created_at: "2024-03-01T00:00:00Z",
  rank: "STALKER",
};

const meta = {
  title: "Modules/Profile/Tables/MetricsTable",
  component: MetricsTable,
  tags: ["autodocs", "ai-generated"],
  args: {
    user,
  },
} satisfies Meta<typeof MetricsTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
