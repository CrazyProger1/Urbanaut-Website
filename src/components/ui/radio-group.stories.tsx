import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./radio-group";

const meta = {
  title: "Shadcn/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs", "ai-generated"],
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="preserved">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="preserved" id="preserved" />
        <Label htmlFor="preserved">Preserved</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="damaged" id="damaged" />
        <Label htmlFor="damaged">Damaged</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="destroyed" id="destroyed" disabled />
        <Label htmlFor="destroyed">Destroyed</Label>
      </div>
    </RadioGroup>
  ),
};
