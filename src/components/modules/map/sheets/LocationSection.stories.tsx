import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LocationSection } from "./LocationSection";

const meta = {
  title: "Modules/Map/Sheets/LocationSection",
  component: LocationSection,
  tags: ["autodocs", "ai-generated"],
  args: {
    point: [50.4501, 30.5234],
  },
} satisfies Meta<typeof LocationSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <LocationSection {...args} />
    </div>
  ),
};
