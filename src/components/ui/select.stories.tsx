import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";

const meta = {
  title: "Shadcn/Select",
  component: Select,
  tags: ["autodocs", "ai-generated"],
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select security level" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Security</SelectLabel>
          <SelectItem value="free">Free access</SelectItem>
          <SelectItem value="guarded">Guarded</SelectItem>
          <SelectItem value="alarm">Alarm system</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select security level" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="free">Free access</SelectItem>
      </SelectContent>
    </Select>
  ),
};
