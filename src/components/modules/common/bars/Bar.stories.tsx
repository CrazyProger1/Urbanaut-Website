import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MapPin } from "lucide-react";
import type { BaseColor } from "@/utils/colors";
import { Bar } from "./Bar";

const baseColors: BaseColor[] = ["red", "green", "yellow", "blue", "purple", "white"];

const meta = {
  title: "Modules/Common/Bars/Bar",
  component: Bar,
  tags: ["autodocs", "ai-generated"],
  args: {
    icon: <MapPin className="text-primary h-5 w-5" />,
    children: "42",
  },
} satisfies Meta<typeof Bar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTooltip: Story = {
  args: { tooltip: "Places explored" },
};

export const AsLink: Story = {
  args: { href: "/map", color: "white", children: "factory" },
};

export const Palette: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {baseColors.map((color) => (
        <Bar {...args} key={color} color={color}>
          {color}
        </Bar>
      ))}
    </div>
  ),
};
