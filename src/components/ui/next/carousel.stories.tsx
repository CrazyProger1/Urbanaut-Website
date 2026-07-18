import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Carousel } from "./carousel";

const meta = {
  title: "UI/Next/Carousel",
  component: Carousel,
  tags: ["autodocs", "ai-generated"],
  args: {
    images: [
      { src: "/images/stubs/place-photo.webp", alt: "Place photo" },
      { src: "/images/stubs/place-photo.webp?second", alt: "Place photo" },
      { src: "/images/stubs/place-photo.webp?third", alt: "Place photo", href: "#" },
    ],
  },
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-96">
      <Carousel {...args} />
    </div>
  ),
};
