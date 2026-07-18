import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ContributorsSection } from "./ContributorsSection";

const meta = {
  title: "Modules/Map/Sheets/ContributorsSection",
  component: ContributorsSection,
  tags: ["autodocs", "ai-generated"],
  args: {
    creator: {
      id: "user-1",
      usernames: ["stalker"],
      first_name: "Oleh",
      last_name: "Danko",
      rank: "STALKER",
    },
  },
} satisfies Meta<typeof ContributorsSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-96">
      <ContributorsSection {...args} />
    </div>
  ),
};
