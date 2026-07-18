import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Sheet } from "./sheet";

const meta = {
  title: "UI/Next/Sheet",
  component: Sheet,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    open: true,
    query: "sheet",
  },
  render: (args) => (
    <Sheet {...args}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Query-driven sheet</SheetTitle>
          <SheetDescription>Closes by removing its query parameter.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};
