import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./context-menu";

const meta = {
  title: "Shadcn/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof ContextMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-40 w-72 items-center justify-center rounded-md border border-dashed text-sm">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuLabel>Map actions</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>Add place here</ContextMenuItem>
        <ContextMenuItem>Copy coordinates</ContextMenuItem>
        <ContextMenuCheckboxItem checked>Show areas</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Clear selection</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
