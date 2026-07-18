import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { UserDetail } from "@/types";
import { UserActivitySection } from "./UserActivitySection";

const user: UserDetail = {
  id: "user-1",
  usernames: ["stalker"],
  first_name: "Oleh",
  settings: { language: "en" },
  achievements: [],
  metrics: [],
  created_at: "2024-03-01T00:00:00Z",
  rank: "STALKER",
};

const meta = {
  title: "Modules/Profile/Sections/UserActivitySection",
  component: UserActivitySection,
  tags: ["autodocs", "ai-generated"],
  args: {
    user,
  },
} satisfies Meta<typeof UserActivitySection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-2xl">
      <UserActivitySection {...args} />
    </div>
  ),
};
