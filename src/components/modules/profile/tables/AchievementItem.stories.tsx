import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { APIAchievementSignificance } from "@/types";
import { AchievementItem } from "./AchievementItem";

const significances: APIAchievementSignificance[] = [
  "INITIATION",
  "GROWTH",
  "MASTERY",
  "VALOR",
  "TRANSCENDENCE",
];

const meta = {
  title: "Modules/Profile/Tables/AchievementItem",
  component: AchievementItem,
  tags: ["autodocs", "ai-generated"],
  args: {
    achievement: {
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
  },
} satisfies Meta<typeof AchievementItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllSignificances: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {significances.map((significance) => (
        <AchievementItem
          key={significance}
          achievement={{ ...args.achievement, significance, name: significance.toLowerCase() }}
        />
      ))}
    </div>
  ),
};
