import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ActionsSection } from "./ActionsSection";

const meta = {
  title: "Modules/Map/Sheets/ActionsSection",
  component: ActionsSection,
  tags: ["autodocs", "ai-generated"],
  args: {
    shareLink: "https://urbanaut.club/map?place=1",
    editLink: "?edit=true",
    complainLink: "?complain=true",
    planExpeditionLink: "?expedition=true",
    isFavorite: false,
    toggleFavoriteAction: fn(),
  },
} satisfies Meta<typeof ActionsSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-96">
      <ActionsSection {...args} />
    </div>
  ),
};

export const Favorite: Story = {
  args: { isFavorite: true },
  render: (args) => (
    <div className="w-96">
      <ActionsSection {...args} />
    </div>
  ),
};
