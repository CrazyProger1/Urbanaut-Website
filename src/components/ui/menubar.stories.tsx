import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "./menubar";

const meta = {
  title: "Shadcn/Menubar",
  component: Menubar,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Menubar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Map</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New place <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>New area</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Export</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Satellite</MenubarItem>
          <MenubarItem>Terrain</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};
