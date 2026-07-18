import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ExperienceBar } from "./ExperienceBar";

const meta = {
  title: "Modules/Common/Bars/ExperienceBar",
  component: ExperienceBar,
  tags: ["autodocs", "ai-generated"],
  args: {
    experience: 3400,
  },
} satisfies Meta<typeof ExperienceBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
