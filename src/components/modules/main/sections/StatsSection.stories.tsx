import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatsSection } from "./StatsSection";

const meta = {
  title: "Modules/Main/Sections/StatsSection",
  component: StatsSection,
  tags: ["autodocs", "ai-generated"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    stats: {
      places_count: 12480,
      areas_count: 940,
      users_count: 3120,
      countries_count: 14,
      expeditions_count: 265,
    },
  },
} satisfies Meta<typeof StatsSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { stats: undefined },
};
