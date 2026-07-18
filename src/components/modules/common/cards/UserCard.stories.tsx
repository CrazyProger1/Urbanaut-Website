import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserCard } from "./UserCard";

const meta = {
  title: "Modules/Common/Cards/UserCard",
  component: UserCard,
  tags: ["autodocs", "ai-generated"],
  args: {
    user: {
      id: "user-1",
      usernames: ["stalker"],
      first_name: "Oleh",
      last_name: "Danko",
      rank: "STALKER",
      experience: 15400,
      karma: 320,
    },
  },
} satisfies Meta<typeof UserCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-96">
      <UserCard {...args} />
    </div>
  ),
};

export const WithMetrics: Story = {
  args: { metrics: true, role: "owner" },
  render: (args) => (
    <div className="w-96">
      <UserCard {...args} />
    </div>
  ),
};

export const WithScore: Story = {
  args: { score: 1 },
  render: (args) => (
    <div className="w-96">
      <UserCard {...args} />
    </div>
  ),
};
