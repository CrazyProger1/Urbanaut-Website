import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DescriptionSection } from "./DescriptionSection";

const meta = {
  title: "Modules/Map/Sheets/DescriptionSection",
  component: DescriptionSection,
  tags: ["autodocs", "ai-generated"],
  args: {
    description:
      "A vast industrial complex abandoned in the late 1990s. Most workshops are still standing, with heavy machinery left in place.",
  },
} satisfies Meta<typeof DescriptionSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-96">
      <DescriptionSection {...args} />
    </div>
  ),
};
