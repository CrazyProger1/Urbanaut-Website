import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HeroSection } from "./HeroSection";

const meta = {
  title: "Modules/Main/Sections/HeroSection",
  component: HeroSection,
  tags: ["autodocs", "ai-generated"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    isAuthenticated: false,
  },
} satisfies Meta<typeof HeroSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Anonymous: Story = {};

export const Authenticated: Story = {
  args: { isAuthenticated: true },
};
