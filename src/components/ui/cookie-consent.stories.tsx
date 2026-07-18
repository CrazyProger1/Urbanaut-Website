import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { CookieConsent } from "./cookie-consent";

const meta = {
  title: "Shadcn/CookieConsent",
  component: CookieConsent,
  tags: ["autodocs", "ai-generated"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    mode: true,
    onAcceptCallback: fn(),
    onDeclineCallback: fn(),
  },
} satisfies Meta<typeof CookieConsent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="h-screen">
      <CookieConsent {...args} />
    </div>
  ),
};

export const Small: Story = {
  render: (args) => (
    <div className="h-screen">
      <CookieConsent {...args} variant="small" />
    </div>
  ),
};

export const Minimal: Story = {
  render: (args) => (
    <div className="h-screen">
      <CookieConsent {...args} variant="minimal" />
    </div>
  ),
};
