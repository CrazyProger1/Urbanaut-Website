import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchIcon, XIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from "./input-group";

const meta = {
  title: "Shadcn/InputGroup",
  component: InputGroup,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof InputGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <InputGroup className="w-72">
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search places..." />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" variant="ghost" aria-label="Clear">
          <XIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithText: Story = {
  render: () => (
    <InputGroup className="w-72">
      <InputGroupInput placeholder="urbanaut" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>.club</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <InputGroup className="w-72">
      <InputGroupTextarea placeholder="Describe the place..." />
    </InputGroup>
  ),
};
