import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { UserSelect } from "./UserSelect";

const meta = {
  title: "Modules/Common/Selects/UserSelect",
  component: UserSelect,
  tags: ["autodocs", "ai-generated"],
  args: {
    users: [
      { id: "user-1", usernames: ["stalker"], first_name: "Oleh", last_name: "Danko", rank: "STALKER" },
      { id: "user-2", usernames: ["rookie"], first_name: "Ivan", rank: "ROOKIE" },
      { id: "user-3", usernames: ["legend"], first_name: "Marta", last_name: "Koval", rank: "LEGEND" },
    ],
    onSearchUsersAction: fn(),
    onSelectUserAction: fn(),
  },
} satisfies Meta<typeof UserSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-96">
      <UserSelect {...args} />
    </div>
  ),
};
